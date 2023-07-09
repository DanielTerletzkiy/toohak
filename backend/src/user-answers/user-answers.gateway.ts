import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { UserAnswersService } from './user-answers.service';
import { CreateUserAnswersDto } from './dto/create-user-answere.dto';
import { UpdateUserAnswersDto } from './dto/update-user-answere.dto';

@WebSocketGateway()
export class UserAnswersGateway {
  constructor(private readonly userAnswersService: UserAnswersService) {}

  @SubscribeMessage('createUserAnswers')
  create(@MessageBody() createUserAnswersDto: CreateUserAnswersDto) {
    return this.userAnswersService.create(createUserAnswersDto);
  }

  @SubscribeMessage('findAllUserAnswers')
  findAll() {
    return this.userAnswersService.findAll();
  }

  @SubscribeMessage('findOneUserAnswers')
  findOne(@MessageBody() id: number) {
    return this.userAnswersService.findOne(id);
  }

  @SubscribeMessage('updateUserAnswers')
  update(@MessageBody() updateUserAnswersDto: UpdateUserAnswersDto) {
    return this.userAnswersService.update(
      updateUserAnswersDto.id,
      updateUserAnswersDto,
    );
  }

  @SubscribeMessage('removeUserAnswers')
  remove(@MessageBody() id: number) {
    return this.userAnswersService.remove(id);
  }
}
