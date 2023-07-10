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
import { ImportQuestionModule } from './import-question/import-question.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['dist/**/*.entity.js'],
      autoLoadEntities: true,
      synchronize: true, //TODO: remove on prod
    }),
    GatewayModule,
    QuestionsModule,
    UsersModule,
    LobbiesModule,
    UserAnswersModule,
    MiddlewareModule,
    NameGeneratorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserInjectMiddleware).forRoutes('*');
  }
}
