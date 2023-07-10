import { Lobby } from '../entities/lobby.entity';
import { User } from '../../users/entities/user.entity';
import { UserAnswers } from '../../user-answers/entities/user-answers.entity';

export class UpdateLobbyDto implements Partial<Lobby> {
  closedDate: Date;
  createdDate: Date;
  host: User;
  id: string;
  players: User[];
  userAnswers: UserAnswers[];
}
