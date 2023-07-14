import {Body, Controller, Get, Param, Patch, Post, Req} from '@nestjs/common';
import { UsersService } from './users.service';
import {RequestPlayer} from "../middleware/user-inject.middleware";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post('username')
  setName(@Body() body, @Req() request: RequestPlayer) {
    const user = request.player;
    user.username = body.username;
    return this.usersService.update(user.socketId, user);
  }
}
