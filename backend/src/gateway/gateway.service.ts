import { Injectable } from '@nestjs/common';
import { SocketAction, SocketPath } from '../../shared/enums/Socket';
import { GatewayGateway } from './gateway.gateway';

@Injectable()
export class GatewayService {
  constructor(private socket: GatewayGateway) {}

  emit(
    lobbyId: number | string,
    path: SocketPath,
    action: SocketAction,
    id: number | string,
    data: object,
  ) {
    const address = [lobbyId, path, action, id].join('/');
    return this.socket.server.emit(address, data);
  }
}
