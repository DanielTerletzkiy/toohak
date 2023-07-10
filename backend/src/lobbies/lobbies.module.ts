import { Module } from '@nestjs/common';
import { LobbiesService } from './lobbies.service';
import { Lobby } from './entities/lobby.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LobbiesController } from './lobbies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Lobby])],
  providers: [LobbiesService],
  controllers: [LobbiesController],
})
export class LobbiesModule {}
