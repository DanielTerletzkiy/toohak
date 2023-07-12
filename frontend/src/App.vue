<script setup lang="ts">
import {useGlobalStore} from "./stores/globalStore.ts";
import {useWorker} from "./composables/worker.composable.ts";

const globalStore = useGlobalStore();
const {canHost} = globalStore;

useWorker();

const requestWakeLock = async () => {
  try {
    const wakeLock = await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release', () => {
      console.log('Wake Lock was released');
    });
    console.log('Wake Lock is active');
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
};

requestWakeLock();

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
