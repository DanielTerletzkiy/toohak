import { Injectable } from '@nestjs/common';
import { CreateUserAnswersDto } from './dto/create-user-answere.dto';
import { UpdateUserAnswersDto } from './dto/update-user-answere.dto';

@Injectable()
export class UserAnswersService {
  create(createUserAnswersDto: CreateUserAnswersDto) {
    return 'This action adds a new userAnswers';
  }

  findAll() {
    return `This action returns all userAnswers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAnswers`;
  }

  update(id: number, updateUserAnswersDto: UpdateUserAnswersDto) {
    return `This action updates a #${id} userAnswers`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAnswers`;
  }
}
