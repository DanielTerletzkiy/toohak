import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {NameGeneratorService} from "../name-generator/name-generator.service";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>,
                private nameGeneratorService: NameGeneratorService) {
    }

    create(createUserDto: CreateUserDto) {
        if (!createUserDto.username) {
            createUserDto.username = this.nameGeneratorService.generateName();
        }
        return this.usersRepository.save(createUserDto);
    }

    findAll() {
        return this.usersRepository.find({});
    }

    findOne(id: User['socketId']) {
        return this.usersRepository.findOne({
            where: {
                socketId: id
            }
        });
    }

    update(id: User['socketId'], updateUserDto: UpdateUserDto) {
        return this.usersRepository.update({
                socketId: id,
            },
            updateUserDto
        );
    }

    remove(id: User['socketId']) {
        return this.usersRepository.delete({
                socketId: id,
            }
        );
    }
}
