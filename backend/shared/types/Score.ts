import {User} from '../../src/users/entities/user.entity';

export type ScoreRounds = { [key: User['socketId']]: { round: number, score: number, time: number | string }[] };
export type ScoreTotal = { [key: User['socketId']]: number };

