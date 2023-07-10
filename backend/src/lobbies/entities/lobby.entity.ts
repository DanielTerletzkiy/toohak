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
    id: number;

    @CreateDateColumn({type: "datetime"})
    createdDate: Date;

    @Column({type: "datetime"})
    closedDate: Date;

    @ManyToMany(() => User, (user) => user.lobbies)
    @JoinColumn()
    players: User[];

    @OneToMany(() => UserAnswers, (userAnswers) => userAnswers.lobby)
    userAnswers: UserAnswers[];

    @ManyToOne(() => User, (user) => user.hostedLobbies)
    host: User;
}
