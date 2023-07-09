import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAnswersDto } from './create-user-answere.dto';

export class UpdateUserAnswersDto extends PartialType(CreateUserAnswersDto) {
  id: number;
}
