import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Lobby } from '../lobbies/entities/lobby.entity';
import { LobbiesService } from '../lobbies/lobbies.service';
import { LobbyState } from '../../shared/enums/Lobby';

@Injectable()
export class LobbyWorkerService {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    @Inject(forwardRef(() => LobbiesService))
    private lobbiesService: LobbiesService,
  ) {}

  async startLobby(lobbyId: Lobby['id']) {
    await this.lobbiesService.setState(lobbyId, LobbyState.Started);

    const timeout = setTimeout(() => this.nextQuestion(lobbyId), 5000);
    this.schedulerRegistry.addTimeout(`${lobbyId}/start`, timeout);
  }

  async nextQuestion(lobbyId: Lobby['id']) {
    let lobby = await this.lobbiesService.findOneWithQuestionData(lobbyId);
    if (!lobby) {
      return;
    }
    if (
      lobby.state === LobbyState.Completed ||
      lobby.state === LobbyState.Closed
    ) {
      return;
    }

    await this.lobbiesService.setState(lobbyId, LobbyState.Question);

    await this.lobbiesService.nextQuestion(lobbyId);
    lobby = await this.lobbiesService.findOneWithQuestionData(lobbyId);

    if (lobby.noQuestions) {
      return await this.lobbiesService.setState(lobbyId, LobbyState.Completed);
    }
    const timeout = setTimeout(
      () => this.showScoreboard(lobbyId),
      lobby.questionDuration,
    );
    this.schedulerRegistry.addTimeout(
      `${lobbyId}/scoreboard/${lobby.activeQuestion}`,
      timeout,
    );
  }

  async showScoreboard(lobbyId: Lobby['id']) {
    const lobby = await this.lobbiesService.findOneActive(lobbyId);
    if (!lobby) {
      return;
    }

    await this.lobbiesService.setState(lobbyId, LobbyState.Scoreboard);

    await this.lobbiesService.getScoreboard(lobbyId);

    const timeout = setTimeout(() => this.nextQuestion(lobbyId), 10000);
    this.schedulerRegistry.addTimeout(
      `${lobbyId}/question/${lobby.activeQuestion}`,
      timeout,
    );
  }

  async checkQuestionTimeoutSkip(lobbyId: Lobby['id']) {
    const lobby = await this.lobbiesService.findOneWithQuestionData(lobbyId);
    if (!lobby) {
      return;
    }

    const players = lobby.players;
    const question = lobby.currentQuestion;

    if (!question) {
      return;
    }

    const userAnswers = lobby.userAnswers.filter(
      (answer) => answer.question.id === question.id,
    );

    const allVoted = userAnswers.length === players.length;
    if (!allVoted) {
      return;
    }

    this.schedulerRegistry.deleteTimeout(
      `${lobbyId}/scoreboard/${lobby.activeQuestion}`,
    );

    return this.showScoreboard(lobbyId);
  }
}
