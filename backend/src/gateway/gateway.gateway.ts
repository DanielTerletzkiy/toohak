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
import { LobbiesService } from '../lobbies/lobbies.service';
import { UserAnswersService } from '../user-answers/user-answers.service';
import { SocketAction } from '../../shared/enums/Socket';
import { User } from '../users/entities/user.entity';
import { LobbyState } from '../../shared/enums/Lobby';
import { SubmitData } from '../../shared/types/SocketData';

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
    @Inject(forwardRef(() => LobbiesService))
    private lobbiesService: LobbiesService,
    @Inject(forwardRef(() => UserAnswersService))
    private userAnswersService: UserAnswersService,
  ) {}

  @WebSocketServer()
  server: Server;

  public socketUsers = new Map<string, Socket>();

  public handleConnection(@ConnectedSocket() client: Socket): void {
    const playerId = client.handshake.query.playerId as string;
    console.log({ connect: playerId });
    this.socketUsers.set(playerId, client);
  }

  public async handleDisconnect(
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const playerId = client.handshake.query.playerId as string;
    console.log({ disconnect: playerId });

    const hostedLobby = await this.lobbiesService.hostHasOpenLobby(playerId);
    if (typeof hostedLobby === 'string') {
      await this.lobbiesService.closeLobby(hostedLobby);
    }

    const playingLobby = await this.lobbiesService.playerHasOpenLobby(playerId);
    if (typeof playingLobby === 'string') {
      await this.lobbiesService.leaveLobby(playingLobby, playerId);
    }

    this.socketUsers.delete(playerId);
  }

  @SubscribeMessage(SocketAction.AnswerSubmit)
  async answerSubmit(
    @MessageBody() data: SubmitData[],
    @ConnectedSocket() client: Socket,
  ) {
    const { chosenAnswer, questionId } = data[0];
    const playerId = client.handshake.query.playerId as string;
    if (!playerId) {
      return;
    }

    const user = new User();
    user.socketId = playerId;

    const lobbyId = await this.lobbiesService.playerHasOpenLobby(user.socketId);
    if (typeof lobbyId === 'boolean') {
      return;
    }

    const lobby = await this.lobbiesService.findOneActive(lobbyId);
    if (lobby.state !== LobbyState.Question) {
      return;
    }

    await this.userAnswersService.logAnswer(
      lobby,
      user,
      questionId,
      chosenAnswer,
    );
  }
}
