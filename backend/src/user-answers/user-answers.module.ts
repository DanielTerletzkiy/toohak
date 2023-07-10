import { Module } from '@nestjs/common';
import { UserAnswersService } from './user-answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAnswers } from './entities/user-answers.entity';
import { UserAnswersController } from './user-answers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserAnswers])],
  providers: [UserAnswersService],
  controllers: [UserAnswersController],
})
export class UserAnswersModule {}
