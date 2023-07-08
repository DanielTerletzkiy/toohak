import { Injectable } from '@nestjs/common';
import { SocketAction } from '../../shared/enums/Socket';
import { GatewayGateway } from './gateway.gateway';

@Injectable()
export class GatewayService {
  constructor(private socket: GatewayGateway) {}

  emit(data: object, roomId: string, action: SocketAction, ...args: string[]) {
    const address = [action, ...args].join('/');
    return this.socket.server.to(roomId).emit(address, data);
  }
}

//TODO
/*
server
sockets.on('connection', function (socket) {
    socket.on('join', function (room) {
        socket.join(room);
    });
});

//...

sockets.to('room1').emit('update', 'room1');
Client:

sio.emit('join', 'room1');
sio.on('update', function (room) {
    console.log(room);
});
*/
