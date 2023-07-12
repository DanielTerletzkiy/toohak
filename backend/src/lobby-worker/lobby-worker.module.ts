import { forwardRef, Module } from '@nestjs/common';
import { LobbyWorkerService } from './lobby-worker.service';
import { LobbiesModule } from '../lobbies/lobbies.module';

@Module({
  imports: [forwardRef(() => LobbiesModule)],
  providers: [LobbyWorkerService],
  exports: [LobbyWorkerService],
})
export class LobbyWorkerModule {}
