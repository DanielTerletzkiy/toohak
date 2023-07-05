<script setup lang="ts">
import DGrid from "vuelize/src/components/flex/DGrid.vue"
import Button from "./Button.vue";
import {Answer} from "../../../../../../backend/shared/enums/Answer";
</script>

<template>
  <d-card class="wrapper" rounded="xl" background-color="transparent">
    <DGrid columns="2" gap="4">
      <Button v-for="type in Answer" :type="type"/>
    </DGrid>
  </d-card>
</template>

<style scoped lang="scss">
.wrapper {
  $length: calc((100px*2) + 4px);
  width: $length;
  height: $length;
  overflow: hidden;

}
</style>
