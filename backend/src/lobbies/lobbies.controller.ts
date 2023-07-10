import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { LobbiesService } from './lobbies.service';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';
import { RequestPlayer } from '../middleware/user-inject.middleware';
import { Question } from 'src/questions/entities/question.entity';

@Controller('lobbies')
export class LobbiesController {
  constructor(private readonly lobbiesService: LobbiesService) {}

  @Post()
  create(
    @Body() createLobbyDto: CreateLobbyDto,
    @Req() request: RequestPlayer,
  ) {
    createLobbyDto.host = request.player;
    return this.lobbiesService.create(createLobbyDto);
  }

  @Post('join/:id')
  join(@Req() request: RequestPlayer, @Param('id') id: string) {
    return this.lobbiesService.joinLobby(id, request.player);
  }

  @Get()
  findAll() {
    return this.lobbiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lobbiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLobbyDto: UpdateLobbyDto) {
    return this.lobbiesService.update(id, updateLobbyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lobbiesService.remove(id);
  }

  @Post(':id/questions')
  setQuestions(@Param('id') id: string, questions: Question[]) {
    this.lobbiesService.setQuestions(id, questions);
  }

  @Get(':id/questions/next')
  nextQuestions(@Param('id') id: string) {
    return this.lobbiesService.getNextQuestion(id);
  }
}
