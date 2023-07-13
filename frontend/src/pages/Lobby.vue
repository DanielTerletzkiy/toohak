<script setup lang="ts">
import {useLobbyStore} from "../stores/lobbyStore";
import {QuestionChangeHost, QuestionChangePlayer,} from "../../../backend/shared/types/SocketData";
import {useRouter} from "vue-router";
import {useQuestionStore} from "../stores/questionStore";
import {storeToRefs} from "pinia";
import {useGlobalStore} from "../stores/globalStore.ts";
import {useSocketListener} from "../composables/socket.composable.ts";
import {SocketAction} from "../../../backend/shared/enums/Socket.ts";
import {watch} from "vue";
import {Scoreboard as ScoreboardType} from "../../../backend/shared/types/Score.ts";
import {LobbyState} from "../../../backend/shared/enums/Lobby.ts";
import QrcodeVue from "qrcode.vue";
import {User} from "../../../backend/src/users/entities/user.entity.ts";
import Scoreboard from "../components/quiz/scoreboard/Scoreboard.vue";

const router = useRouter();

const globalStore = useGlobalStore();
const {socketId} = storeToRefs(globalStore);

const lobbyStore = useLobbyStore();
const {lobby, lobbyId, scoreboard, isHost, url} = storeToRefs(lobbyStore);
const {fetchLobby, start} = lobbyStore;

const questionStore = useQuestionStore();
const {id, questionText, answers, correctAnswer, progress, voted} =
    storeToRefs(questionStore);
const {startCountdown} = questionStore;

function copyId() {
  navigator.clipboard.writeText(lobbyId.value);
}

function onQuestionChange(
    questionData: QuestionChangePlayer & QuestionChangeHost
) {
  if (!lobby.value) {
    return;
  }
  voted.value = false;
  console.log({questionData});
  router.replace(`/lobby/${isHost.value ? "host" : "player"}/question`);

  id.value = questionData.id;
  questionText.value = questionData.questionText;

  progress.value = lobby.value.questionDuration;

  if (isHost.value) {
    answers.value = questionData.answers;
    correctAnswer.value = questionData.correctAnswer;
  }

  startCountdown();
}

watch(isHost, () => {
  useSocketListener(
      onQuestionChange,
      isHost.value
          ? SocketAction.HostQuestionChange
          : SocketAction.PlayerQuestionChange
  );
});

function onScoreboardUpdate(scoreboardPayload: ScoreboardType) {
  console.log({scoreboardPayload});
  scoreboard.value = scoreboardPayload;
}

useSocketListener(onScoreboardUpdate, SocketAction.ScoreboardUpdate);

async function onStateChange(state: LobbyState) {
  console.log({state});
  await fetchLobby();
  if (!lobby.value) {
    return;
  }
  switch (state) {
    case LobbyState.Idle:
      break;
    case LobbyState.Started:
      break;
    case LobbyState.Completed:
      break;
    case LobbyState.Closed:
      if (lobby.value.closedDate) {
        await router.replace("/");
      }
      break;
    case LobbyState.Scoreboard:
      break;
    case LobbyState.Question:
      break;
  }
}

useSocketListener(onStateChange, SocketAction.LobbyState);

useSocketListener(fetchLobby, SocketAction.LobbyUpdate);
</script>

<template>
  <router-view/>
  <d-column v-if="lobby && lobby.state === LobbyState.Idle" gap class="pa-6">
    <d-card-subtitle class="font-size-medium"> Players</d-card-subtitle>
    <d-card v-for="player in lobby.players as User[]" :key="player.socketId" block
            :color="player.socketId === socketId ? 'primary' : ''">
      <d-card-title class="font-size-medium" color="inherit">
        {{ player.username }}
      </d-card-title>
    </d-card>
  </d-column>
  <d-column v-if="isHost && lobby && lobby.state !== LobbyState.Idle" gap class="pa-6">
    <d-card-subtitle class="font-size-medium"> Scoreboard</d-card-subtitle>
    <Scoreboard :key="lobby.state"/>
  </d-column>
  <d-card v-if="isHost && lobby" class="fixed host">
    <d-card-title elevation="2">
      <d-icon name="qrcode-scan" :size="30"/>
      Lobby Info
    </d-card-title>
    <d-card-subtitle class="ml-10">{{ lobby.state }}</d-card-subtitle>
    <d-card-subtitle v-if="false">
      ID:
      <pre>{{ lobbyId }}</pre>
    </d-card-subtitle>
    <d-row class="pa-2">
      <d-tooltip position="left">
        <d-card root-tag="d-button" background-color="#fff" @click="copyId">
          <QrcodeVue
              render-as="svg"
              :size="300"
              :margin="2"
              :value="url"
          ></QrcodeVue>
        </d-card>
        <template v-slot:tooltip> Copy ID</template>
      </d-tooltip>
    </d-row>
    <d-row class="pa-2" elevation="n1">
      <d-button
          v-if="lobby.state === LobbyState.Idle"
          :disabled="!lobby.players.length"
          filled
          color="primary"
          block
          @click="start"
      >
        Start Lobby
        <template v-slot:prefix>
          <d-icon name="rocket" icon-style="monochrome" :size="30"/>
        </template>
        <template v-slot:suffix>
          <d-icon
              style="transform: scale(-1, 1)"
              name="rocket"
              icon-style="monochrome"
              :size="30"
          />
        </template>
      </d-button>
    </d-row>
  </d-card>
</template>

<style scoped lang="scss">
.fixed {
  position: absolute;

  &.host {
    right: 12px;
    bottom: 12px;
  }
}
</style>
