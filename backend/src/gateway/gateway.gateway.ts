import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  QuestionChangeHost,
  QuestionChangePlayer,
} from '../../shared/types/SocketData';
import { GatewayService } from './gateway.service';
import { SocketAction } from '../../shared/enums/Socket';
import { forwardRef, Inject } from '@nestjs/common';

@WebSocketGateway(3080, {

  cors: {
    origin: '*',
  },
})
export class GatewayGateway implements OnGatewayConnection {
  constructor(
    @Inject(forwardRef(() => GatewayService))
    private gatewayService: GatewayService,
  ) {}

  @WebSocketServer()
  server: Server;

  public handleConnection(@ConnectedSocket() client: Socket): void {
    console.log(client.handshake.query.playerId); // "persistent" playerId
  }

  @SubscribeMessage('lobby/join')
  async identity(
    @MessageBody() id: string,
    @ConnectedSocket() client: Socket,
  ): Promise<string> {
    client.join(id); //TODO Add database check if lobby exists

    //temp test stuff
    const questionHost: QuestionChangeHost = {
      index: 0,
      text: 'this is a test',
      answers: {
        a: 'b is true',
        b: 'c is false',
        c: 'a is false',
        d: 'c is true',
      },
    };

    const questionPlayer: QuestionChangePlayer = {
      index: 0,
      text: 'this is a test',
    };
    this.gatewayService.emit(questionHost, id, SocketAction.HostQuestionChange);
    this.gatewayService.emit(
      questionPlayer,
      id,
      SocketAction.PlayerQuestionChange,
    );
    return id;
  }
}
