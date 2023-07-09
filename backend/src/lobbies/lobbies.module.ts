import { Module } from '@nestjs/common';
import { LobbiesService } from './lobbies.service';
import { LobbiesGateway } from './lobbies.gateway';
import { Lobby } from './entities/lobby.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Lobby])],
  providers: [LobbiesGateway, LobbiesService],
})
export class LobbiesModule {}
