import {Injectable, ConflictException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {IsNull, Repository} from "typeorm";
import {UpdateUserDto} from "../users/dto/update-user.dto";
import {Lobby} from "./entities/lobby.entity";
import {CreateLobbyDto} from "./dto/create-lobby.dto";
import {User} from "../users/entities/user.entity";
import {UpdateLobbyDto} from "./dto/update-lobby.dto";

@Injectable()
export class LobbiesService {
    constructor(@InjectRepository(Lobby) private lobbyRepository: Repository<Lobby>) {
    }

    async create(createLobbyDto: CreateLobbyDto) {
        const openLobby = await this.hostHasOpenLobby(createLobbyDto.host);
        if(!!openLobby){
            throw new ConflictException(`Host still has open lobby: ${openLobby}`)
        }
        return this.lobbyRepository.save(createLobbyDto);
    }

    hostHasOpenLobby(user: User) {
        return this.lobbyRepository.findOneOrFail({
                where: {
                    host: {
                        socketId: user.socketId
                    },
                    closedDate: IsNull(),
                }
            }
        ).then((lobby) => lobby.id)
            .catch(() => false)
    }

    lobbyExists(id: Lobby['id']) {
        return this.lobbyRepository.exist({where: {id}})
    }

    async joinLobby(id: Lobby['id'], user: User){
        const lobby = await this.findOneActive(id);
        if(!lobby){
            throw new ConflictException(`This lobby does not exist (anymore)`)
        }

        lobby.players.push(user);
        return this.lobbyRepository.save(lobby);
    }

    findAll() {
        return this.lobbyRepository.find({});
    }

    findOne(id: Lobby['id']) {
        return this.lobbyRepository.findOne({
            where: {
                id
            }
        });
    }

    findOneActive(id: Lobby['id']) {
        return this.lobbyRepository.findOne({
            where: {
                id,
                closedDate: IsNull()
            }
        });
    }

    update(id: Lobby['id'], updateLobbyDto: UpdateLobbyDto) {
        return this.lobbyRepository.update({
                id,
            },
            updateLobbyDto
        );
    }

    remove(id: Lobby['id']) {
        return this.lobbyRepository.delete({
                id,
            }
        );
    }
}
