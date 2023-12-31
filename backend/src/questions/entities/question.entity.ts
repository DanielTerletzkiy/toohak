import { UserAnswer } from 'src/user-answers/entities/user-answer.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Answer } from '../../../shared/enums/Answer';
import { Lobby } from '../../lobbies/entities/lobby.entity';

@Entity()
export class Question {
  @PrimaryColumn()
  id: string;

  @Column()
  questionText: string;

  @Column()
  a: string;

  @Column()
  b: string;

  @Column()
  c: string;

  @Column()
  d: string;

  @Column({ enum: Answer })
  correctAnswer: Answer;

  @OneToMany(() => UserAnswer, (userAnswers) => userAnswers.question)
  userAnswers: UserAnswer[];

  @ManyToMany(() => Lobby, (lobby) => lobby.questions)
  lobbies: Lobby[];
}
