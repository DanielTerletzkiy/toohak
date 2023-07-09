import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { LobbiesService } from './lobbies.service';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';

@WebSocketGateway()
export class LobbiesGateway {
  constructor(private readonly lobbiesService: LobbiesService) {}

  @SubscribeMessage('createLobby')
  create(@MessageBody() createLobbyDto: CreateLobbyDto) {
    return this.lobbiesService.create(createLobbyDto);
  }

  @SubscribeMessage('findAllLobbies')
  findAll() {
    return this.lobbiesService.findAll();
  }

  @SubscribeMessage('findOneLobby')
  findOne(@MessageBody() id: number) {
    return this.lobbiesService.findOne(id);
  }

  @SubscribeMessage('updateLobby')
  update(@MessageBody() updateLobbyDto: UpdateLobbyDto) {
    return this.lobbiesService.update(updateLobbyDto.id, updateLobbyDto);
  }

  @SubscribeMessage('removeLobby')
  remove(@MessageBody() id: number) {
    return this.lobbiesService.remove(id);
  }
}
