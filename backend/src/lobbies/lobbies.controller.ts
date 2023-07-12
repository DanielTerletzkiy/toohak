import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { LobbiesService } from './lobbies.service';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';
import { RequestPlayer } from '../middleware/user-inject.middleware';

@Controller('lobbies')
export class LobbiesController {
  constructor(private readonly lobbiesService: LobbiesService) {}

  @Post()
  create(
    @Body() createLobbyDto: CreateLobbyDto & { questionAmount: number },
    @Req() request: RequestPlayer,
  ) {
    createLobbyDto.host = request.player;
    return this.lobbiesService.create(
      createLobbyDto,
      createLobbyDto.questionAmount,
    );
  }

  @Post(':id/join')
  join(@Req() request: RequestPlayer, @Param('id') id: string) {
    return this.lobbiesService.joinLobby(id, request.player);
  }

  @Post(':id/start')
  start(@Req() request: RequestPlayer, @Param('id') id: string) {
    if (!this.lobbiesService.isHosting(id, request.player)) {
      throw new UnauthorizedException('This user is not the host');
    }
    return this.lobbiesService.startLobby(id);
  }

  @Get(':id/hosting')
  isHosting(@Req() request: RequestPlayer, @Param('id') id: string) {
    return this.lobbiesService.isHosting(id, request.player);
  }

  @Get('ongoing')
  findOngoing(@Req() request: RequestPlayer) {
    return this.lobbiesService.findOngoing(request.player);
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
  setQuestions(@Param('id') id: string) {
    return this.lobbiesService.setQuestions(id);
  }

  @Post(':id/questions/next')
  nextQuestions(@Req() request: RequestPlayer, @Param('id') id: string) {
    const isHost = this.lobbiesService.isHosting(id, request.player);
    if (!isHost) {
      throw new UnauthorizedException(
        'This user is not the host of this lobby',
      );
    }

    return this.lobbiesService.nextQuestion(id);
  }

  @Get(':id/scoreboard')
  getScoreboard(@Param('id') id: string) {
    return this.lobbiesService.getScoreboard(id);
  }
}
