import { Injectable } from '@nestjs/common';
import { CreateUserAnswereDto } from './dto/create-user-answere.dto';
import { UpdateUserAnswereDto } from './dto/update-user-answere.dto';

@Injectable()
export class UserAnsweresService {
  create(createUserAnswereDto: CreateUserAnswereDto) {
    return 'This action adds a new userAnswere';
  }

  findAll() {
    return `This action returns all userAnsweres`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAnswere`;
  }

  update(id: number, updateUserAnswereDto: UpdateUserAnswereDto) {
    return `This action updates a #${id} userAnswere`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAnswere`;
  }
}
