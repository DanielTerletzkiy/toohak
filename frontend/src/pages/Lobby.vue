<script setup lang="ts">
import {useLobbyStore} from "../stores/lobbyStore";
import {socket} from "../plugins/socket";
import {QuestionChangeHost, QuestionChangePlayer} from "../../../backend/shared/types/SocketData";
import {useRouter} from "vue-router";
import {useQuestionStore} from "../stores/questionStore";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";
import {useGlobalStore} from "../stores/globalStore.ts";

const router = useRouter()

const globalStore = useGlobalStore()
const {isHost} = globalStore;

const lobbyStore = useLobbyStore()
const {lobbyId} = lobbyStore;

const questionStore = useQuestionStore()
const {index, text, answers} = storeToRefs(questionStore)

function onQuestionChange(questionData: QuestionChangePlayer & QuestionChangeHost) {
  console.log({questionData})
  router.replace('/lobby/question')
  index.value = questionData.index;
  text.value = questionData.text;
  if(isHost){
    answers.value = questionData.answers;
  }
}

onMounted(() => {
  socket.on(`${isHost ? 'host' : 'player'}/question/change`, onQuestionChange)
})
</script>

<template>
  <router-view/>
</template>

<style scoped>

</style>
