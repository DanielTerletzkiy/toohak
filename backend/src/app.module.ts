import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayModule } from './gateway/gateway.module';
import { NameGeneratorService } from './name-generator/name-generator.service';
import { AnswerShuffleService } from './answer-shuffle/answer-shuffle.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      autoLoadEntities: true,
      synchronize: true, //TODO: remove on prod
    }),
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService, NameGeneratorService, AnswerShuffleService],
})
export class AppModule {}
