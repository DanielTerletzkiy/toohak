<script setup lang="ts">
import DGrid from "vuelize/src/components/flex/DGrid.vue"
import Button from "./Button.vue";
import {Answer} from "../../../../../../backend/shared/enums/Answer";

const props = defineProps({size: {type: String, default: '200px'}})
</script>

<template>
  <d-card class="wrapper" rounded="xl" background-color="transparent">
    <DGrid columns="2" gap="4">
      <Button v-for="type in Answer" :type="type" :size="size"/>
    </DGrid>
  </d-card>
</template>

<style scoped lang="scss">
.wrapper {
  $size: v-bind(size);
  $length: calc(($size * 2) + 4px);
  width: $length;
  height: $length;
  overflow: hidden;

}
</style>
