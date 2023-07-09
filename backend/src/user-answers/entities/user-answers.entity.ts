import { Lobby } from 'src/lobbys/entities/lobby.entity';
import { Question } from 'src/questions/entities/question.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Answer } from '../../../shared/enums/Answer';

/*@Entity()
export class UserAnswers {
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  @PrimaryColumn()
  UserID: User;

  @ManyToOne(() => Lobby, (lobby) => lobby.id)
  @JoinColumn()
  @PrimaryColumn()
  LobbyID: number;

  @ManyToOne(() => Question, (question) => question.id)
  @JoinColumn()
  @PrimaryColumn()
  QuestionID: string;

  @Column()
  choosenAnswere: string;

  @Column()
  Duration: string;
}*/

@Entity()
export class UserAnswers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: Answer })
  chosenAnswer: Answer;

  @Column()
  reactionTime: number;

  @OneToMany(() => User, (user) => user.userAnswers)
  user: User;

  @OneToMany(() => Lobby, (lobby) => lobby.userAnswers)
  lobby: Lobby;

  @OneToMany(() => Question, (question) => question.userAnswers)
  question: Question;
}
