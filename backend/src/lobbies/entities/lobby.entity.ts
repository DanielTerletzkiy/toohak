import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAnswer } from '../../user-answers/entities/user-answer.entity';
import { Question } from 'src/questions/entities/question.entity';
import { LobbyState } from '../../../shared/enums/Lobby';

@Entity()
export class Lobby {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'datetime' })
  createdDate: Date;

  @Column({ type: 'datetime', nullable: true })
  closedDate: Date;

  @Column({ type: 'datetime', nullable: true })
  activeQuestionStart: Date;

  @ManyToMany(() => User, (user) => user.lobbies, { eager: true })
  @JoinTable()
  players: User[];

  @OneToMany(() => UserAnswer, (userAnswers) => userAnswers.lobby)
  userAnswers: UserAnswer[];

  @ManyToOne(() => User, (user) => user.hostedLobbies, { eager: true })
  host: User;

  @ManyToMany(() => Question, (question) => question.lobbies)
  @JoinTable()
  questions: Question[];

  @Column({ default: 0 })
  activeQuestion: number;

  @Column({ default: 30000 })
  questionDuration: number;

  @Column({ enum: LobbyState, default: LobbyState.Idle })
  state: LobbyState;

  getNextQuestion(): Question {
    if (this.activeQuestion < this.questions.length) {
      const question = this.questions[this.activeQuestion];
      this.activeQuestion++;
      this.activeQuestionStart = new Date();
      return question;
    }
    return null;
  }

  noQuestions(): boolean {
    return this.activeQuestion > this.questions.length - 1;
  }
}
