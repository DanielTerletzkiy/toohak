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
import { User } from "../../../backend/src/users/entities/user.entity.ts";
import { ref } from "vue";

const router = useRouter();

const globalStore = useGlobalStore();
const { isHost } = storeToRefs(globalStore);

const lobbyStore = useLobbyStore();
const { lobbyId } = lobbyStore;

const questionStore = useQuestionStore();
const { id, questionText, answers } = storeToRefs(questionStore);

function onQuestionChange(
  questionData: QuestionChangePlayer & QuestionChangeHost
) {
  console.log({ questionData });
  router.replace("/lobby/question");
  id.value = questionData.id;
  questionText.value = questionData.questionText;
  if (isHost.value) {
    answers.value = questionData.answers;
  }
}

useSocketListener(
  onQuestionChange,
  isHost.value
    ? SocketAction.HostQuestionChange
    : SocketAction.PlayerQuestionChange
);

const players = ref<User[]>([]);

function onLobbyUpdate(users: User[]) {
  console.log({ users });
  players.value = users;
}

//TODO: make controller http requests like in check-inventory

useSocketListener(onLobbyUpdate, SocketAction.LobbyUpdate);
</script>

<template>
  <router-view />
  <d-column gap class="pa-6">
    <d-card v-for="player in players" :key="player.socketId" block>
      <d-card-title class="font-size-medium">
        {{ player.username }}
      </d-card-title>
    </d-card>
  </d-column>
</template>

<style scoped></style>
