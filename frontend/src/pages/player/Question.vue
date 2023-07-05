<script setup lang="ts">
import ButtonGrid from "../../components/quiz/choices/button/ButtonGrid.vue";
import {useGlobalStore} from "../../stores/globalStore.ts";

const globalStore = useGlobalStore()
const {buttonSize} = globalStore
</script>

<template>
  <d-column class="page" block>
    <d-card-title elevation="4" rounded="xl">
      This is a question?
    </d-card-title>
    <d-spacer/>
    <ButtonGrid :size="`${buttonSize-12}px`"/>
  </d-column>
</template>

<style scoped lang="scss">
.page {
  height: calc(100vh - 54px);
  padding: 12px !important;
}
</style>
