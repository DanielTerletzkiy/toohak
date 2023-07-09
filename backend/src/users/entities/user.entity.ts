import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { Lobby } from '../../lobbys/entities/lobby.entity';
import { UserAnswers } from '../../user-answers/entities/user-answers.entity';

/*@Entity()
export class User {
  @ManyToMany(() => Lobby, (lobby) => lobby.UserID)
  @OneToMany(() => Lobby, (lobby) => lobby.Host)
  @OneToMany(() => UserAnswers, (userAnswere) => userAnswere.UserID)
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  SocketID: string;
  @Column()
  Name: string;
}*/

@Entity()
export class User {
  @PrimaryColumn()
  socketId: string;

  @Column()
  username: string;

  @ManyToMany(() => Lobby, (lobby) => lobby.players)
  lobbies: Lobby[];

  @ManyToOne(() => Lobby, (lobby) => lobby.host)
  hostedLobbies: Lobby;

  @ManyToOne(() => UserAnswers, (userAnswers) => userAnswers.user)
  userAnswers: UserAnswers[];
}
