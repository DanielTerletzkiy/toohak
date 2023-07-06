<script setup lang="ts">
import {useGlobalStore} from "./stores/globalStore.ts";
import {useWorker} from "./composables/worker.composable.ts";

const globalStore = useGlobalStore();
const {canHost} = globalStore;

useWorker();

console.log(globalStore)

</script>

<template>
  <DRoot>
    <template v-slot:toolbar>
      <DToolbar>
          can host: {{canHost}}, socketId: {{globalStore.socketId}}
      </DToolbar>
    </template>
    <router-view></router-view>
  </DRoot>
</template>

<style scoped>

</style>
