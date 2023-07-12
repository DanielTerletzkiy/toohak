import { Module } from '@nestjs/common';
import { UserAnswersService } from './user-answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAnswer } from './entities/user-answer.entity';
import { UserAnswersController } from './user-answers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserAnswer])],
  providers: [UserAnswersService],
  controllers: [UserAnswersController],
})
export class UserAnswersModule {}
