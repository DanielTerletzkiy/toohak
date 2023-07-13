import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../questions/entities/question.entity';
import { Repository } from 'typeorm';
import { UserAnswer } from './entities/user-answer.entity';
import { CreateUserAnswersDto } from './dto/create-user-answere.dto';
import { User } from '../users/entities/user.entity';
import { Lobby } from '../lobbies/entities/lobby.entity';
import { Answer } from '../../shared/enums/Answer';
import { LobbyWorkerService } from '../lobby-worker/lobby-worker.service';

@Injectable()
export class UserAnswersService {
  constructor(
    @InjectRepository(UserAnswer)
    private userAnswerRepository: Repository<UserAnswer>,
    private lobbyWorkerService: LobbyWorkerService,
  ) {}

  async create(createUserAnswersDto: CreateUserAnswersDto) {
    const isDuplicate = await this.isDuplicate(createUserAnswersDto);
    if (isDuplicate) {
      return;
    }
    return this.userAnswerRepository.save(createUserAnswersDto);
  }

  async logAnswer(
    lobby: Lobby,
    user: User,
    questionId: Question['id'],
    chosenAnswer: Answer,
  ) {
    const userAnswer = new UserAnswer();
    userAnswer.lobby = lobby;
    userAnswer.user = user;

    const question = new Question();
    question.id = questionId;
    userAnswer.question = question;

    userAnswer.chosenAnswer = chosenAnswer;

    userAnswer.reactionTime =
      new Date().getTime() - lobby.activeQuestionStart.getTime();

    const answer = await this.create(userAnswer);
    await this.lobbyWorkerService.checkQuestionTimeoutSkip(lobby.id);
    return answer;
  }

  async isDuplicate(createUserAnswersDto: CreateUserAnswersDto) {
    return this.userAnswerRepository
      .findOneOrFail({
        where: {
          lobby: {
            id: createUserAnswersDto.lobby.id,
          },
          question: {
            id: createUserAnswersDto.question.id,
          },
          user: {
            socketId: createUserAnswersDto.user.socketId,
          },
        },
      })
      .then(() => true)
      .catch(() => false);
  }
}
