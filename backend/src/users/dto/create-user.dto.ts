import {User} from "../entities/user.entity";

export class CreateUserDto implements Partial<User>{
    socketId: string;
    username: string;
}
