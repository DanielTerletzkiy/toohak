import { Module } from '@nestjs/common';
import { UserAnswersService } from './user-answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAnswer } from './entities/user-answer.entity';
import { UserAnswersController } from './user-answers.controller';
import { LobbyWorkerModule } from '../lobby-worker/lobby-worker.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserAnswer]), LobbyWorkerModule],
  providers: [UserAnswersService],
  controllers: [UserAnswersController],
  exports: [UserAnswersService],
})
export class UserAnswersModule {}
