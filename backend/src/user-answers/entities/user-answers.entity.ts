import { Lobby } from 'src/lobbies/entities/lobby.entity';
import { Question } from 'src/questions/entities/question.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from '../../../shared/enums/Answer';

@Entity()
export class UserAnswers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: Answer })
  chosenAnswer: Answer;

  @Column()
  reactionTime: number;

  @ManyToOne(() => User, (user) => user.userAnswers)
  user: User;

  @ManyToOne(() => Lobby, (lobby) => lobby.userAnswers)
  lobby: Lobby;

  @ManyToOne(() => Question, (question) => question.userAnswers)
  question: Question;
}
