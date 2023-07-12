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
import {Scoreboard} from "../../../backend/shared/types/Score.ts";
import {LobbyState} from "../../../backend/shared/enums/Lobby.ts";
import QrcodeVue from 'qrcode.vue'

const router = useRouter();

const globalStore = useGlobalStore();
const {} = storeToRefs(globalStore);

const lobbyStore = useLobbyStore();
const {lobby, lobbyId, isHost, url} = storeToRefs(lobbyStore);
const {fetchLobby, start} = lobbyStore;

const questionStore = useQuestionStore();
const {id, questionText, answers, correctAnswer, progress} = storeToRefs(questionStore);
const {startCountdown} = questionStore;

function onQuestionChange(
    questionData: QuestionChangePlayer & QuestionChangeHost
) {
  if (!lobby.value) {
    return;
  }
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

function onScoreboardUpdate(scoreboard: Scoreboard) {
  console.log({scoreboard})
}

useSocketListener(
    onScoreboardUpdate,
    SocketAction.ScoreboardUpdate
);

useSocketListener(fetchLobby, SocketAction.LobbyUpdate);
</script>

<template>
  <router-view/>
  <d-column v-if="lobby" gap class="pa-6">
    <d-card-subtitle class="font-size-medium"> Players</d-card-subtitle>
    <d-card v-for="player in lobby.players" :key="player.socketId" block>
      <d-card-title class="font-size-medium">
        {{ player.username }}
      </d-card-title>
    </d-card>
  </d-column>
  <d-card v-if="isHost && lobby" class="fixed host">
    <d-card-title elevation="2">
      Host Tools
    </d-card-title>
    <d-card-subtitle v-if="false">
      ID:
      <pre>{{ lobbyId }}</pre>
    </d-card-subtitle>
    <d-row class="pa-2">
      <d-card background-color="#fff" class="pa-2">
        <QrcodeVue render-as="svg" :size="200" :value="url"></QrcodeVue>
      </d-card>
    </d-row>
    <d-row class="pa-2" elevation="n1">
      <d-button v-if="lobby.state === LobbyState.Idle" filled color="primary" block @click="start">
        Start Lobby
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
