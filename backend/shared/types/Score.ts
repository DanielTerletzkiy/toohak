import { User } from '../../src/users/entities/user.entity';

export type Scoreboard = { [key: User['socketId']]: number[] };
