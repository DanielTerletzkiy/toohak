import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { LobbysService } from './lobbys.service';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';

@WebSocketGateway()
export class LobbysGateway {
  constructor(private readonly lobbysService: LobbysService) {}

  @SubscribeMessage('createLobby')
  create(@MessageBody() createLobbyDto: CreateLobbyDto) {
    return this.lobbysService.create(createLobbyDto);
  }

  @SubscribeMessage('findAllLobbys')
  findAll() {
    return this.lobbysService.findAll();
  }

  @SubscribeMessage('findOneLobby')
  findOne(@MessageBody() id: number) {
    return this.lobbysService.findOne(id);
  }

  @SubscribeMessage('updateLobby')
  update(@MessageBody() updateLobbyDto: UpdateLobbyDto) {
    return this.lobbysService.update(updateLobbyDto.id, updateLobbyDto);
  }

  @SubscribeMessage('removeLobby')
  remove(@MessageBody() id: number) {
    return this.lobbysService.remove(id);
  }
}
