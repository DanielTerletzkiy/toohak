<script setup lang="ts">
import ButtonGrid from "../../components/quiz/choices/button/ButtonGrid.vue";
import {useGlobalStore} from "../../stores/globalStore";
import {useQuestionStore} from "../../stores/questionStore";
import {storeToRefs} from "pinia";

const globalStore = useGlobalStore();
const {buttonSize, isMobile} = storeToRefs(globalStore);

const questionStore = useQuestionStore();
const {id, questionText, buttonsDeactivated} = storeToRefs(questionStore);
</script>

<template>
  <d-column class="page" block :wrap="false">
    <d-card elevation="4" rounded="xl" width="100%">
      <d-card-title class="question font-size-medium">
        <d-divider vertical block size="20px"/>
        {{ questionText }}
      </d-card-title>
      <d-card-subtitle class="ma-2"> Question</d-card-subtitle>
    </d-card>
    <ButtonGrid
        :key="id"
        :disabled="buttonsDeactivated"
        :size="`${(isMobile ? buttonSize : buttonSize/2) - 16}px`"
    />
  </d-column>
</template>

<style scoped lang="scss">
.page {
  height: 100%;
  padding: 12px !important;
  justify-content: space-between;

  .question {
    font-family: Consolas, sans-serif;
  }
}
</style>
