import {User} from 'src/users/entities/user.entity';
import {
    Column, CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {UserAnswers} from '../../user-answers/entities/user-answers.entity';

@Entity()
export class Lobby {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({type: "datetime"})
    createdDate: Date;

    @Column({type: "datetime", nullable: true})
    closedDate: Date;

    @ManyToMany(() => User, (user) => user.lobbies, {eager: true})
    @JoinColumn()
    players: User[];

    @OneToMany(() => UserAnswers, (userAnswers) => userAnswers.lobby)
    userAnswers: UserAnswers[];

    @ManyToOne(() => User, (user) => user.hostedLobbies, {eager: true})
    host: User;
}
