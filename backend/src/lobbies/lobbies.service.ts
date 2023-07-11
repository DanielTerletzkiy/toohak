import {
  BadRequestException,
  ConflictException, forwardRef, Inject,
  Injectable,
  UnauthorizedException,
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
import { GatewayGateway } from '../gateway/gateway.gateway';

@Injectable()
export class LobbiesService {
  constructor(
    @InjectRepository(Lobby) private lobbyRepository: Repository<Lobby>,
    private questionsService: QuestionsService,
    @Inject(forwardRef(() => GatewayService))
    private gatewayService: GatewayService,
  ) {}

  async create(createLobbyDto: CreateLobbyDto,questionAmount = 10) {
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
    this.gatewayService.emit(null, id, SocketAction.LobbyUpdate);

    const lobby = await this.findOneActive(id);
    if (!lobby) {
      throw new ConflictException(`This lobby does not exist (anymore)`);
    }
    if (lobby.host.socketId === user.socketId) {
      throw new ConflictException(`This player is the lobby host`);
    }
    if (lobby.players.find((player) => player.socketId === user.socketId)) {
      return lobby;
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
    return this.lobbyRepository.save(lobby);
  }

  async closeLobby(id: Lobby['id']){
    const lobby = await this.findOneActive(id);
    lobby.closedDate = new Date();

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

  async getNextQuestion(id: Lobby['id'], player: User) {
    const lobby = await this.findOne(id);

    if (!lobby) {
      return;
    }

    if (lobby.host.socketId !== player.socketId) {
      throw new UnauthorizedException(
        'This user is not the host of this lobby',
      );
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
}
