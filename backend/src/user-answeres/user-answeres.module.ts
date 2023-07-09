import { Module } from '@nestjs/common';
import { UserAnsweresService } from './user-answeres.service';
import { UserAnsweresGateway } from './user-answeres.gateway';

@Module({
  providers: [UserAnsweresGateway, UserAnsweresService]
})
export class UserAnsweresModule {}
