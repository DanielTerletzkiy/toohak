import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { GatewayGateway } from './gateway/gateway.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      autoLoadEntities: true,
      synchronize: true, //TODO: remove on prod
    }),
  ],
  controllers: [AppController],
  providers: [AppService, GatewayGateway],
})
export class AppModule {}
