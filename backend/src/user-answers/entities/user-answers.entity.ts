import { Lobby } from 'src/lobbies/entities/lobby.entity';
import { Question } from 'src/questions/entities/question.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Answer } from '../../../shared/enums/Answer';

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
