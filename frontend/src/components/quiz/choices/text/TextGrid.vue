<script setup lang="ts">
import DGrid from "vuelize/src/components/flex/DGrid.vue"
import {Answer} from "../../../../../../backend/shared/enums/Answer";
import Text from "./Text.vue";

const props = defineProps({
  answers: {type: Object, required: true}
})
</script>

<template>
  <d-card class="wrapper" rounded="xl" background-color="transparent">
    <DGrid columns="2" gap="20">
      <Text v-for="type in Answer" :type="type">
        {{answers[type]}}
      </Text>
    </DGrid>
  </d-card>
</template>

<style scoped lang="scss">
.wrapper {
  $length: calc((600px*2) + 20px);
  width: $length;
  height: max-content;
  overflow: hidden;

}
</style>
