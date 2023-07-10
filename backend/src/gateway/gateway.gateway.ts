import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GatewayService } from './gateway.service';
import { forwardRef, Inject } from '@nestjs/common';

@WebSocketGateway(3080, {
  cors: {
    origin: '*',
  },
})
export class GatewayGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(forwardRef(() => GatewayService))
    private gatewayService: GatewayService,
  ) {}

  @WebSocketServer()
  server: Server;

  public socketUsers = new Map<string, Socket>();

  public handleConnection(@ConnectedSocket() client: Socket): void {
    const playerId = client.handshake.query.playerId as string;
    console.log({ connect: playerId });
    this.socketUsers.set(playerId, client);
  }

  public handleDisconnect(@ConnectedSocket() client: Socket): void {
    const playerId = client.handshake.query.playerId as string;
    console.log({ disconnect: playerId });
    this.socketUsers.delete(playerId);
  }

  @SubscribeMessage('lobby/join')
  async identity(
    @MessageBody() id: string,
    @ConnectedSocket() client: Socket,
  ): Promise<string> {
    client.join(id); //TODO Add database check if lobby exists

    return id;
  }
}
