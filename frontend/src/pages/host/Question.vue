<script setup lang="ts">
import { useGlobalStore } from "../../stores/globalStore";
import { useQuestionStore } from "../../stores/questionStore";
import { storeToRefs } from "pinia";
import TextGrid from "../../components/quiz/choices/text/TextGrid.vue";
import {useLobbyStore} from "../../stores/lobbyStore.ts";

const globalStore = useGlobalStore();
const {} = storeToRefs(globalStore);

const lobbyStore = useLobbyStore();
const {lobby} = storeToRefs(lobbyStore);

const questionStore = useQuestionStore();
const { questionText, answers, correctAnswer, progress } = storeToRefs(questionStore);
</script>

<template>
  <d-card-title> {{ questionText }} </d-card-title>
  <TextGrid :answers="answers" />
  <d-card-subtitle v-if="lobby" class="ma-0">
    <d-progressbar color="primary" :max="lobby.questionDuration" v-model="progress" width="100px"/>
    Time remaining: {{progress}}
  </d-card-subtitle>
</template>

<style scoped></style>
