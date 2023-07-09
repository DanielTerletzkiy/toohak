import { Lobby } from "src/lobbys/entities/lobby.entity";
import { UserAnswere } from "src/user-answeres/entities/user-answere.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @ManyToMany(()=>Lobby, lobby => lobby.UserID)
  @OneToMany(()=>Lobby, lobby => lobby.Host)
  @OneToMany(()=>UserAnswere, userAnswere => userAnswere.UserID)
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  SocketID: string;
  @Column()
  Name: string;
}
