<script setup lang="ts">
import { useLobbyStore } from "../stores/lobbyStore";
import {
  QuestionChangeHost,
  QuestionChangePlayer,
} from "../../../backend/shared/types/SocketData";
import { useRouter } from "vue-router";
import { useQuestionStore } from "../stores/questionStore";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "../stores/globalStore.ts";
import { useSocketListener } from "../composables/socket.composable.ts";
import { SocketAction } from "../../../backend/shared/enums/Socket.ts";
import { watch } from "vue";

const router = useRouter();

const globalStore = useGlobalStore();
const {} = storeToRefs(globalStore);

const lobbyStore = useLobbyStore();
const { lobby, isHost } = storeToRefs(lobbyStore);
const { fetchLobby } = lobbyStore;

const questionStore = useQuestionStore();
const { id, questionText, answers } = storeToRefs(questionStore);

function onQuestionChange(
  questionData: QuestionChangePlayer & QuestionChangeHost
) {
  console.log({ questionData });
  router.replace(`/lobby/${isHost.value ? 'host' : 'player'}/question`);
  id.value = questionData.id;
  questionText.value = questionData.questionText;
  if (isHost.value) {
    answers.value = questionData.answers;
  }
}

watch(isHost, () => {
  console.log(isHost.value)
  useSocketListener(
    onQuestionChange,
    isHost.value
      ? SocketAction.HostQuestionChange
      : SocketAction.PlayerQuestionChange
  );
});

useSocketListener(fetchLobby, SocketAction.LobbyUpdate);
</script>

<template>
  <router-view/>
  <d-column v-if="lobby" gap class="pa-6">
    <d-card v-for="player in lobby.players" :key="player.socketId" block>
      <d-card-title class="font-size-medium">
        {{ player.username }}
      </d-card-title>
    </d-card>
  </d-column>
</template>

<style scoped></style>
