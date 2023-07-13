import {User} from '../../src/users/entities/user.entity';

export type ScoreRound = { round: number, score: number, time: number };
export type ScoreRounds = { [key: User['socketId']]: ScoreRound[] };
export type ScoreTotal = { [key: User['socketId']]: number };

export type Scoreboard = {totalScore: ScoreTotal, score: ScoreRounds}

