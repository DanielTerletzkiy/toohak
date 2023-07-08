<script setup lang="ts">
import {useLobbyStore} from "../stores/lobbyStore";
import {socket} from "../plugins/socket";
import {QuestionChangeHost, QuestionChangePlayer} from "../../../backend/shared/types/SocketData";
import {useRouter} from "vue-router";
import {useQuestionStore} from "../stores/questionStore";
import {storeToRefs} from "pinia";
import {useGlobalStore} from "../stores/globalStore.ts";
import {useSocketListener} from "../composables/socket.composable.ts";
import {SocketAction} from "../../../backend/shared/enums/Socket.ts";

const router = useRouter()

const globalStore = useGlobalStore()
const {isHost} = storeToRefs(globalStore);

const lobbyStore = useLobbyStore()
const {lobbyId} = lobbyStore;

const questionStore = useQuestionStore()
const {index, text, answers} = storeToRefs(questionStore)

function onQuestionChange(questionData: QuestionChangePlayer & QuestionChangeHost) {
  router.replace('/lobby/question')
  index.value = questionData.index;
  text.value = questionData.text;
  if (isHost.value) {
    answers.value = questionData.answers;
  }
}

useSocketListener(onQuestionChange, isHost.value ? SocketAction.HostQuestionChange : SocketAction.PlayerQuestionChange)
</script>

<template>
  <router-view/>
</template>

<style scoped>

</style>
