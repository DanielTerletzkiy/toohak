import { Module } from '@nestjs/common';
import { LobbysService } from './lobbys.service';
import { LobbysGateway } from './lobbys.gateway';

@Module({
  providers: [LobbysGateway, LobbysService],
})
export class LobbysModule {}
