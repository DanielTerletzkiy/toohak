import { Lobby } from '../entities/lobby.entity';
import { User } from '../../users/entities/user.entity';

export class CreateLobbyDto implements Partial<Lobby> {
  host: User;
  questionDuration: number;
}
