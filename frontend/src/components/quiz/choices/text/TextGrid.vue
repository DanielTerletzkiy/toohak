<script setup lang="ts">
import DGrid from "vuelize/src/components/flex/DGrid.vue"
import {Answer} from "../../../../../../backend/shared/enums/Answer";
import Text from "./Text.vue";
</script>

<template>
  <d-card class="wrapper" rounded="xl" background-color="transparent">
    <DGrid columns="2" gap="20">
      <Text v-for="type in Answer" :type="type">
        text
      </Text>
    </DGrid>
  </d-card>
</template>

<style scoped lang="scss">
.wrapper {
  $length: calc((450px*2) + 20px);
  width: $length;
  height: max-content;
  overflow: hidden;

}
</style>
