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
import { UserAnswers } from '../../user-answers/entities/user-answers.entity';
import { Question } from 'src/questions/entities/question.entity';

@Entity()
export class Lobby {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'datetime' })
  createdDate: Date;

  @Column({ type: 'datetime', nullable: true })
  closedDate: Date;

  @ManyToMany(() => User, (user) => user.lobbies, { eager: true })
  @JoinTable()
  players: User[];

  @OneToMany(() => UserAnswers, (userAnswers) => userAnswers.lobby)
  userAnswers: UserAnswers[];

  @ManyToOne(() => User, (user) => user.hostedLobbies, { eager: true })
  host: User;

  @ManyToMany(() => Question, (question) => question.lobbies, { eager: true })
  @JoinTable()
  questions: Question[];

  @Column({ default: 0 })
  activeQuestion: number;

  @Column({ default: 30000 })
  questionDuration: number;

  getNextQuestion(): Question {
    if (this.activeQuestion < this.questions.length) {
      const question = this.questions[this.activeQuestion];
      this.activeQuestion++;
      return question;
    }
    return null;
  }

  noQuestions(): boolean {
    return this.activeQuestion > this.questions.length - 1;
  }
}
