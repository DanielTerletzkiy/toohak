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

  questions: Question[];
  private activeQuestion: number = 0;

  getNextQuestion(): Question {
    if(this.activeQuestion < this.questions.length) {
      return this.questions[this.activeQuestion++];
    } 
    return null;
  }
}
