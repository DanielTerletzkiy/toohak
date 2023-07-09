import { Module } from '@nestjs/common';
import { UserAnswersService } from './user-answers.service';
import { UserAnswersGateway } from './user-answers.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAnswers } from './entities/user-answers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAnswers])],
  providers: [UserAnswersGateway, UserAnswersService],
})
export class UserAnswersModule {}
