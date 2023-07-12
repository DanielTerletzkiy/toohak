<script setup lang="ts">
import {useGlobalStore} from "./stores/globalStore.ts";
import {useWorker} from "./composables/worker.composable.ts";

const globalStore = useGlobalStore();
const {canHost} = globalStore;

useWorker();

</script>

<template>
  <DRoot>
    <template v-slot:notifications>
      <d-notification-wrapper/>
    </template>
    <router-view></router-view>
  </DRoot>
</template>

<style lang="scss">
main {
  height: 100vh;
}
</style>
