import { Lobby } from "src/lobbys/entities/lobby.entity";
import { Question } from "src/questions/entities/question.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class UserAnswere {

  @ManyToOne(() => User, user => user.id)
  @JoinColumn()
  @PrimaryColumn()
  UserID: User;
  @ManyToOne(() => Lobby, lobby => lobby.id)
  @JoinColumn()
  @PrimaryColumn()
  LobbyID: number;
  @ManyToOne(() => Question, question => question.id)
  @JoinColumn()
  @PrimaryColumn()
  QuestionID: string;
  @Column()
  choosenAnswere: string;
  @Column()
  Duration: string;
}
