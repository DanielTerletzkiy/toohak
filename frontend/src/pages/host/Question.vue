<script setup lang="ts">
import { useGlobalStore } from "../../stores/globalStore";
import { useQuestionStore } from "../../stores/questionStore";
import { storeToRefs } from "pinia";
import TextGrid from "../../components/quiz/choices/text/TextGrid.vue";
import { useLobbyStore } from "../../stores/lobbyStore.ts";

const globalStore = useGlobalStore();
const { buttonSize } = storeToRefs(globalStore);

const lobbyStore = useLobbyStore();
const { lobby } = storeToRefs(lobbyStore);

const questionStore = useQuestionStore();
const { questionText, answers, correctAnswer, timerProgress, progress } =
  storeToRefs(questionStore);
</script>

<template>
  <d-card-title class="question font-size-large pt-16">
    {{ questionText }}
  </d-card-title>
  <d-card-subtitle v-if="progress" class="font-size-medium pb-16">
    Question {{ progress.current + 1}} / {{progress.total}}
  </d-card-subtitle>
  <TextGrid class="ma-2" :answers="answers" :size="`${buttonSize - 20}px`" />
  <d-card-subtitle v-if="lobby" class="ma-0">
    <d-progressbar
      class="progress"
      color="primary"
      :max="lobby.questionDuration"
      v-model="timerProgress"
      show-label
    >
      <template v-slot:progress> {{ Math.round(timerProgress) / 1000 }}s</template>
    </d-progressbar>
  </d-card-subtitle>
</template>

<style scoped lang="scss">
.question {
  font-family: Consolas, sans-serif;
}

.progress {
  zoom: 2;
  width: 100%;
}
</style>
