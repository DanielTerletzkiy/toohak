import { UserAnswere } from "src/user-answeres/entities/user-answere.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Question {
@OneToMany(() => UserAnswere, userAnswere => userAnswere.QuestionID)
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
@Column()
correctAnswere: string;
}
