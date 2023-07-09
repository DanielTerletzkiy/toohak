import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayModule } from './gateway/gateway.module';
import { NameGeneratorService } from './name-generator/name-generator.service';
import { AnswerShuffleService } from './answer-shuffle/answer-shuffle.service';
import { QuestionApiService } from './question-api/question-api.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      autoLoadEntities: true,
      synchronize: true, //TODO: remove on prod
    }),
    GatewayModule,
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService, NameGeneratorService, AnswerShuffleService, QuestionApiService],
})
export class AppModule {}
