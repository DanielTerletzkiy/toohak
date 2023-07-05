import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';

@WebSocketGateway(3080, {
  cors: {
    origin: '*',
  },
})
export class GatewayGateway {
  @WebSocketServer()
  server: Server;
}
