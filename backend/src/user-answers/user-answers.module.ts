import { Module } from '@nestjs/common';
import { UserAnswersService } from './user-answers.service';
import { UserAnswersGateway } from './user-answers.gateway';

@Module({
  providers: [UserAnswersGateway, UserAnswersService],
})
export class UserAnswersModule {}
