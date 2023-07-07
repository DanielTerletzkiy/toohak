import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {QuestionChangeHost, QuestionChangePlayer} from "../../shared/types/SocketData";

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
    client.join(id); //TODO Add database check if lobby exists
    const questionHost : QuestionChangeHost = {
      index: 0,
      text: "this is a test",
      answers: {
        a: "b is true",
        b: "c is false",
        c: "a is false",
        d: "c is true"
      }
    }

    const questionPlayer: QuestionChangePlayer = {
      index: 0,
      text: "this is a test"
    }
    this.server.to(id).emit('host/question/change', questionHost);
    this.server.to(id).emit('player/question/change', questionPlayer);
    return id;
  }
}
