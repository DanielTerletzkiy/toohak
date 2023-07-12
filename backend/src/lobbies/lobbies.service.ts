import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Lobby } from './entities/lobby.entity';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { User } from '../users/entities/user.entity';
import { UpdateLobbyDto } from './dto/update-lobby.dto';
import { QuestionsService } from '../questions/questions.service';
import { GatewayService } from '../gateway/gateway.service';
import { SocketAction } from '../../shared/enums/Socket';
import {
  QuestionChangeHost,
  QuestionChangePlayer,
} from '../../shared/types/SocketData';
import { UserAnswer } from 'src/user-answers/entities/user-answer.entity';
import { Question } from 'src/questions/entities/question.entity';
import { LobbyWorkerService } from '../lobby-worker/lobby-worker.service';
import { LobbyState } from '../../shared/enums/Lobby';
import { Scoreboard } from '../../shared/types/Score';

@Injectable()
export class LobbiesService {
  constructor(
    @InjectRepository(Lobby) private lobbyRepository: Repository<Lobby>,
    private questionsService: QuestionsService,
    @Inject(forwardRef(() => GatewayService))
    private gatewayService: GatewayService,
    @Inject(forwardRef(() => LobbyWorkerService))
    private lobbyWorkerService: LobbyWorkerService,
  ) {}

  async create(createLobbyDto: CreateLobbyDto, questionAmount = 10) {
    const openLobby = await this.hostHasOpenLobby(createLobbyDto.host.socketId);
    if (!!openLobby) {
      throw new ConflictException(`Host still has open lobby: ${openLobby}`);
    }
    const lobby = await this.lobbyRepository.save(createLobbyDto);

    await this.setQuestions(lobby.id, questionAmount);

    const socketClient = this.gatewayService.socketUsers.get(
      createLobbyDto.host.socketId,
    );
    if (!socketClient) {
      throw new BadRequestException(`This client is not in the socket array`);
    }
    socketClient.join(lobby.id);
    this.gatewayService.emit(null, lobby.id, SocketAction.LobbyUpdate);
    return lobby;
  }

  hostHasOpenLobby(socketId: User['socketId']) {
    return this.lobbyRepository
      .findOneOrFail({
        where: {
          host: {
            socketId,
          },
          closedDate: IsNull(),
        },
      })
      .then((lobby) => lobby.id)
      .catch(() => false);
  }

  playerHasOpenLobby(user: User) {
    return this.lobbyRepository
      .findOneOrFail({
        where: {
          players: {
            socketId: user.socketId,
          },
          closedDate: IsNull(),
        },
      })
      .then((lobby) => lobby.id)
      .catch(() => false);
  }

  lobbyExists(id: Lobby['id']) {
    return this.lobbyRepository.exist({ where: { id } });
  }

  async joinLobby(id: Lobby['id'], user: User) {
    const socketClient = this.gatewayService.socketUsers.get(user.socketId);
    if (!socketClient) {
      throw new BadRequestException(`This client is not in the socket array`);
    }
    socketClient.join(id);

    const lobby = await this.findOneActive(id);
    if (!lobby) {
      throw new ConflictException(`This lobby does not exist (anymore)`);
    }
    if (lobby.host.socketId === user.socketId) {
      throw new ConflictException(`This player is the lobby host`);
    }
    if (lobby.players.find((player) => player.socketId === user.socketId)) {
      return;
      /*throw new ConflictException(
                                                              `This player is already participating in this lobby`,
                                                            );*/
    }
    const openLobby = await this.playerHasOpenLobby(user);
    if (!!openLobby) {
      throw new ConflictException(
        `This player is already participating in another lobby: ${openLobby}`,
      );
    }

    lobby.players.push(user);
    await this.lobbyRepository.save(lobby);
    this.gatewayService.emit(null, id, SocketAction.LobbyUpdate);
    return true;
  }

  async startLobby(id: Lobby['id']) {
    const lobby = await this.findOneActive(id);
    if (!lobby) {
      throw new ConflictException(`This lobby does not exist (anymore)`);
    }

    await this.lobbyRepository.save(lobby);
    await this.lobbyWorkerService.startLobby(lobby.id);
    return true;
  }

  async closeLobby(id: Lobby['id']) {
    const lobby = await this.findOneActive(id);
    lobby.closedDate = new Date();
    await this.setState(id, LobbyState.Completed);

    return this.lobbyRepository.save(lobby);
  }

  async setState(id: Lobby['id'], state: LobbyState) {
    const lobby = await this.findOne(id);

    lobby.state = state;

    return this.lobbyRepository.save(lobby);
  }

  async isHosting(id: Lobby['id'], user: User) {
    const lobby = await this.findOneActive(id);
    if (!lobby) {
      throw new ConflictException(`This lobby does not exist (anymore)`);
    }
    return lobby.host.socketId === user.socketId;
  }

  findOngoing(user: User) {
    return this.lobbyRepository.findOne({
      where: [
        {
          host: {
            socketId: user.socketId,
          },
          closedDate: IsNull(),
        },
        {
          players: {
            socketId: user.socketId,
          },
          closedDate: IsNull(),
        },
      ],
    });
  }

  findAll() {
    return this.lobbyRepository.find({});
  }

  findOne(id: Lobby['id']) {
    return this.lobbyRepository.findOne({
      where: {
        id,
      },
    });
  }

  findOneWithQuestionData(id: Lobby['id']) {
    return this.lobbyRepository.findOne({
      where: {
        id,
      },
      relations: {
        questions: true,
        userAnswers: true,
      },
    });
  }

  findOneActive(id: Lobby['id']) {
    return this.lobbyRepository.findOne({
      where: {
        id,
        closedDate: IsNull(),
      },
    });
  }

  update(id: Lobby['id'], updateLobbyDto: UpdateLobbyDto) {
    return this.lobbyRepository.update(
      {
        id,
      },
      updateLobbyDto,
    );
  }

  remove(id: Lobby['id']) {
    return this.lobbyRepository.delete({
      id,
    });
  }

  async setQuestions(id: Lobby['id'], count = 10) {
    const lobby = await this.findOne(id);

    if (!lobby) {
      return;
    }

    lobby.questions = await this.questionsService.getRandom(count);
    return this.lobbyRepository.save(lobby);
  }

  async nextQuestion(id: Lobby['id']) {
    const lobby = await this.findOneWithQuestionData(id);

    if (!lobby) {
      return;
    }

    const question = lobby.getNextQuestion();
    //console.log(entity.activeQuestion, entity.noQuestions(), !!question);
    await this.lobbyRepository.save(lobby);

    if (!question) {
      return null;
    }

    const changeHost: QuestionChangeHost = {
      id: question.id,
      questionText: question.questionText,
      answers: {
        a: question.a,
        b: question.b,
        c: question.c,
        d: question.d,
      },
    };

    const changePlayer: QuestionChangePlayer = {
      id: question.id,
      questionText: question.questionText,
    };

    this.gatewayService.emit(
      changePlayer,
      lobby.id,
      SocketAction.PlayerQuestionChange,
    );

    this.gatewayService.emit(
      changeHost,
      lobby.id,
      SocketAction.HostQuestionChange,
    );

    return question;
  }

  async getScoreboard(id: Lobby['id']) {
    const lobby = await this.findOneWithQuestionData(id);
    if (!lobby) {
      return;
    }

    const users = lobby.players;
    const questions = lobby.questions;
    const maxPoints = 1000;

    const score: Scoreboard = {};
    users.forEach((user: User) => {
      const userAnswers: UserAnswer[] = lobby.userAnswers.filter(
        (userAnswer: UserAnswer) => userAnswer.user.socketId === user.socketId,
      );
      score[user.socketId] = [];
      score[user.socketId][0] = 0;

      let i = 1;
      questions.forEach((question: Question) => {
        const answer = userAnswers.find(
          (userAnswer: UserAnswer) => userAnswer.question.id == question.id,
        );
        score[user.socketId][i] = 0;

        if (!answer) {
          return;
        }

        if (answer.question.correctAnswer === answer.chosenAnswer) {
          score[user.socketId][i] =
            (maxPoints * answer.reactionTime) / lobby.questionDuration;
        }

        score[user.socketId][0] += score[user.socketId][i];

        i++;
      });
    });

    console.log(score);
    this.gatewayService.emit(score, id, SocketAction.ScoreboardUpdate);

    return score;
  }
}
