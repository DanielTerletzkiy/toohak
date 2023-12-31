import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayModule } from './gateway/gateway.module';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';
import { LobbiesModule } from './lobbies/lobbies.module';
import { UserAnswersModule } from './user-answers/user-answers.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { UserInjectMiddleware } from './middleware/user-inject.middleware';
import { NameGeneratorModule } from './name-generator/name-generator.module';
import { LobbyWorkerModule } from './lobby-worker/lobby-worker.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/db.sqlite',
      entities: ['dist/**/*.entity.js'],
      autoLoadEntities: true,
      synchronize: true, //TODO: remove on prod
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'frontend', 'dist'),
    }),
    ScheduleModule.forRoot(),
    GatewayModule,
    LobbiesModule,
    QuestionsModule,
    UsersModule,
    UserAnswersModule,
    MiddlewareModule,
    NameGeneratorModule,
    LobbyWorkerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserInjectMiddleware).forRoutes('*');
  }
}
