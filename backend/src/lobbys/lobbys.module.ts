import { Module } from '@nestjs/common';
import { LobbysService } from './lobbys.service';
import { LobbysGateway } from './lobbys.gateway';
import { Lobby } from './entities/lobby.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Lobby])],
  providers: [LobbysGateway, LobbysService],
})
export class LobbysModule {}
