import { Injectable } from '@nestjs/common';
import { SocketAction } from '../../shared/enums/Socket';
import { GatewayGateway } from './gateway.gateway';
import { Lobby } from '../lobbies/entities/lobby.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class GatewayService {
  constructor(
    private socket: GatewayGateway,
    private usersService: UsersService,
  ) {}

  emit(
    data: unknown,
    roomId: Lobby['id'],
    action: SocketAction,
    ...args: string[]
  ) {
    const address = [action, ...args].join('/');
    console.log({address})
    return this.socket.server.to(roomId).emit(address, data);
  }

  async updateLobby(id: Lobby['id']): Promise<void> {
    const clientSockets = await this.socket.server.in(id).fetchSockets();
    const playerIds = clientSockets.map(
      (client) => client.handshake.query.playerId as string,
    );

    console.log(playerIds);

    const promises = playerIds.map((playerId) =>
      this.usersService.findOne(playerId),
    );

    const players = await Promise.all(promises);

    this.emit(players, id, SocketAction.LobbyUpdate);
  }

  get socketUsers(){
    return this.socket.socketUsers;
  }

  closeRoom(id: Lobby['id']) {
    return this.socket.server.in(id).socketsLeave(id);
  }
}
