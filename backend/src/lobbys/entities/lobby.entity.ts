import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAnswers } from '../../user-answers/entities/user-answers.entity';

/*@Entity()
export class Lobby {
  @OneToMany(() => UserAnswers, (userAnswere) => userAnswere.LobbyID)
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  Created: string;
  @Column()
  closedDate: string;
  @ManyToMany(() => User, (user) => user.id)
  @JoinColumn()
  UserID: number;
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  Host: number;
}*/

@Entity()
export class Lobby {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  createdDate: Date;

  @Column()
  closedDate: Date;

  @ManyToMany(() => User, (user) => user.lobbies)
  @JoinColumn()
  players: User[];

  @ManyToOne(() => UserAnswers, (userAnswers) => userAnswers.lobby)
  userAnswers: UserAnswers[];

  @OneToMany(() => User, (user) => user.hostedLobbies)
  host: User;
}
