import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Lobby } from '../../lobbies/entities/lobby.entity';
import { UserAnswer } from '../../user-answers/entities/user-answer.entity';

@Entity()
export class User {
  @PrimaryColumn()
  socketId: string;

  @Column()
  username: string;

  @ManyToMany(() => Lobby, (lobby) => lobby.players)
  lobbies: Lobby[];

  @OneToMany(() => Lobby, (lobby) => lobby.host)
  hostedLobbies: Lobby[];

  @OneToMany(() => UserAnswer, (userAnswers) => userAnswers.user)
  userAnswers: UserAnswer[];
}
