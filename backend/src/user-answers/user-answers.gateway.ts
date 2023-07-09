import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { UserAnswersService } from './user-answers.service';
import { CreateUserAnswereDto } from './dto/create-user-answere.dto';
import { UpdateUserAnswereDto } from './dto/update-user-answere.dto';

@WebSocketGateway()
export class UserAnswersGateway {
  constructor(private readonly userAnswersService: UserAnswersService) {}

  @SubscribeMessage('createUserAnswere')
  create(@MessageBody() createUserAnswereDto: CreateUserAnswereDto) {
    return this.userAnswersService.create(createUserAnswereDto);
  }

  @SubscribeMessage('findAllUserAnswers')
  findAll() {
    return this.userAnswersService.findAll();
  }

  @SubscribeMessage('findOneUserAnswere')
  findOne(@MessageBody() id: number) {
    return this.userAnswersService.findOne(id);
  }

  @SubscribeMessage('updateUserAnswere')
  update(@MessageBody() updateUserAnswereDto: UpdateUserAnswereDto) {
    return this.userAnswersService.update(
      updateUserAnswereDto.id,
      updateUserAnswereDto,
    );
  }

  @SubscribeMessage('removeUserAnswere')
  remove(@MessageBody() id: number) {
    return this.userAnswersService.remove(id);
  }
}
