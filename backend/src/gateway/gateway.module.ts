import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayGateway } from './gateway.gateway';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [GatewayService, GatewayGateway],
  exports: [GatewayGateway, GatewayService],
})
export class GatewayModule {}
