<script setup lang="ts">
import {useLobbyStore} from "../stores/lobbyStore.ts";
import {socket} from "../plugins/socket.ts";
import {QuestionChange} from "../../../backend/shared/types/SocketData.ts";
import {useRouter} from "vue-router";
import {useQuestionStore} from "../stores/questionStore.ts";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";

const router = useRouter()

const lobbyStore = useLobbyStore()
const {lobbyId} = lobbyStore;

const questionStore = useQuestionStore()
const {index, text, voted} = storeToRefs(questionStore)

function onQuestionChange(questionData: QuestionChange) {
  console.log({questionData})
  router.replace('/lobby/question')
  index.value = questionData.index;
  text.value = questionData.text;
}

onMounted(() => {
  socket.on('question/change', onQuestionChange)
})
</script>

<template>
  <router-view/>
</template>

<style scoped>

</style>
