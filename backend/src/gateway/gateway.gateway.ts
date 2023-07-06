import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3080, {
  cors: {
    origin: '*',
  },
})
export class GatewayGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('lobby/join')
  async identity(
    @MessageBody() id: string,
    @ConnectedSocket() client: Socket,
  ): Promise<string> {
    client.join(id);
    this.server.to(id).emit('question/change', { index: 0, text: 5 });
    return id;
  }
}
