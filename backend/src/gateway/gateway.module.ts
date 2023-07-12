import { forwardRef, Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayGateway } from './gateway.gateway';
import { UsersModule } from '../users/users.module';
import { LobbiesModule } from '../lobbies/lobbies.module';
import { UserAnswersModule } from '../user-answers/user-answers.module';

@Module({
  imports: [
    UsersModule,
    forwardRef(() => LobbiesModule),
    forwardRef(() => UserAnswersModule),
  ],
  providers: [GatewayService, GatewayGateway],
  exports: [GatewayGateway, GatewayService],
})
export class GatewayModule {}
