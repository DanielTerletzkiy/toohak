<script setup lang="ts">
import { useGlobalStore } from "../../stores/globalStore";
import { useQuestionStore } from "../../stores/questionStore";
import { storeToRefs } from "pinia";
import TextGrid from "../../components/quiz/choices/text/TextGrid.vue";

const globalStore = useGlobalStore();
const {} = storeToRefs(globalStore);

const questionStore = useQuestionStore();
const { questionText, answers } = storeToRefs(questionStore);
</script>

<template>
  <d-card-title> {{ questionText }} </d-card-title>
  <TextGrid :answers="answers" />
</template>

<style scoped></style>
