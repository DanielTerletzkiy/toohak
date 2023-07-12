<script setup lang="ts">
import DGrid from "vuelize/src/components/flex/DGrid.vue";
import { Answer } from "../../../../../../backend/shared/enums/Answer";
import Text from "./Text.vue";

const props = defineProps({
  answers: { type: Object, required: true },
  size: { type: String, default: "200px" }
});
</script>

<template>
  <d-card class="wrapper" rounded="xl" background-color="transparent">
    <DGrid columns="2" gap="20">
      <Text
        v-for="type in Answer"
        :type="type"
        :size="size"
      >
        {{ answers[type] }}
      </Text>
    </DGrid>
  </d-card>
</template>

<style scoped lang="scss">
.wrapper {
  $size: v-bind(size);
  $length: calc(($size * 2) + 20px);
  width: $length !important;
  height: max-content;
  //overflow: hidden;
}
</style>
