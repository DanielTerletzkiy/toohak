import { Lobby } from '../entities/lobby.entity';
import { User } from '../../users/entities/user.entity';
import { UserAnswer } from '../../user-answers/entities/user-answer.entity';

export class UpdateLobbyDto implements Partial<Lobby> {
  closedDate: Date;
  createdDate: Date;
  host: User;
  id: string;
  players: User[];
  userAnswers: UserAnswer[];
}
