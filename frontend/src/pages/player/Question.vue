<script setup lang="ts">
import ButtonGrid from "../../components/quiz/choices/button/ButtonGrid.vue";
import {useGlobalStore} from "../../stores/globalStore.ts";
import {useQuestionStore} from "../../stores/questionStore.ts";
import {storeToRefs} from "pinia";

const globalStore = useGlobalStore()
const {buttonSize} = storeToRefs(globalStore)

const questionStore = useQuestionStore()
const {text, voted} = storeToRefs(questionStore)
</script>

<template>
  <d-column class="page" block>
    <d-card elevation="4" rounded="xl" width="100%">
      <d-card-title>
        "{{ text }}"
      </d-card-title>
      <d-card-subtitle>
        Question
      </d-card-subtitle>
    </d-card>
    <d-spacer/>
    <ButtonGrid :disabled="!!voted" :size="`${buttonSize-12}px`"/>
  </d-column>
</template>

<style scoped lang="scss">
.page {
  height: calc(100vh - 54px);
  padding: 12px !important;
}
</style>
