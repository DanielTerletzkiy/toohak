import { Module } from '@nestjs/common';
import { LobbiesService } from './lobbies.service';
import { Lobby } from './entities/lobby.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LobbiesController } from './lobbies.controller';
import { QuestionsModule } from '../questions/questions.module';
import { GatewayModule } from '../gateway/gateway.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lobby]), QuestionsModule, GatewayModule],
  providers: [LobbiesService],
  controllers: [LobbiesController],
})
export class LobbiesModule {}
