import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { UserAnsweresService } from './user-answeres.service';
import { CreateUserAnswereDto } from './dto/create-user-answere.dto';
import { UpdateUserAnswereDto } from './dto/update-user-answere.dto';

@WebSocketGateway()
export class UserAnsweresGateway {
  constructor(private readonly userAnsweresService: UserAnsweresService) {}

  @SubscribeMessage('createUserAnswere')
  create(@MessageBody() createUserAnswereDto: CreateUserAnswereDto) {
    return this.userAnsweresService.create(createUserAnswereDto);
  }

  @SubscribeMessage('findAllUserAnsweres')
  findAll() {
    return this.userAnsweresService.findAll();
  }

  @SubscribeMessage('findOneUserAnswere')
  findOne(@MessageBody() id: number) {
    return this.userAnsweresService.findOne(id);
  }

  @SubscribeMessage('updateUserAnswere')
  update(@MessageBody() updateUserAnswereDto: UpdateUserAnswereDto) {
    return this.userAnsweresService.update(updateUserAnswereDto.id, updateUserAnswereDto);
  }

  @SubscribeMessage('removeUserAnswere')
  remove(@MessageBody() id: number) {
    return this.userAnsweresService.remove(id);
  }
}
