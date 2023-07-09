import { UserAnswere } from "src/user-answeres/entities/user-answere.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lobby {
  @OneToMany(() => UserAnswere, userAnswere => userAnswere.LobbyID)
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  Created: string;
  @Column()
  closedDate: string;
  @ManyToMany(() => User, user => user.id)
  @JoinColumn()
  UserID: number;
  @ManyToOne(() => User, user => user.id)
  @JoinColumn()
  Host: number;
}
