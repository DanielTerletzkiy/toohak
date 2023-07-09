import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAnswereDto } from './create-user-answere.dto';

export class UpdateUserAnswereDto extends PartialType(CreateUserAnswereDto) {
  id: number;
}
