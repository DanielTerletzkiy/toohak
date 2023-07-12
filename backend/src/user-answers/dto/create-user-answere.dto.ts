import { UserAnswer } from '../entities/user-answer.entity';
import { Answer } from '../../../shared/enums/Answer';
import { Lobby } from '../../lobbies/entities/lobby.entity';
import { Question } from '../../questions/entities/question.entity';
import { User } from '../../users/entities/user.entity';

export class CreateUserAnswersDto implements Partial<UserAnswer> {
  chosenAnswer: Answer;
  lobby: Lobby;
  question: Question;
  user: User;
  reactionTime: number;
}
