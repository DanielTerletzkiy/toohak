import { forwardRef, Module } from '@nestjs/common';
import { LobbiesService } from './lobbies.service';
import { Lobby } from './entities/lobby.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LobbiesController } from './lobbies.controller';
import { QuestionsModule } from '../questions/questions.module';
import { GatewayModule } from '../gateway/gateway.module';
import { LobbyWorkerModule } from '../lobby-worker/lobby-worker.module';

@Module({
  imports: [
    forwardRef(() => GatewayModule),
    TypeOrmModule.forFeature([Lobby]),
    QuestionsModule,
    forwardRef(() => LobbyWorkerModule),
  ],
  providers: [LobbiesService],
  controllers: [LobbiesController],
  exports: [LobbiesService],
})
export class LobbiesModule {}
