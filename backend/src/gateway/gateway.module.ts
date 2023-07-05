import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayGateway } from './gateway.gateway';

@Module({
  providers: [GatewayService, GatewayGateway],
  exports: [GatewayGateway, GatewayService],
})
export class GatewayModule {}
