<script setup lang="ts">
import DGrid from "vuelize/src/components/flex/DGrid.vue";
import Button from "./Button.vue";
import { Answer } from "../../../../../../backend/shared/enums/Answer";

const props = defineProps({ size: { type: String, default: "200px" } });
console.log(Object.keys(Answer));

function shuffleButtons(keys: (keyof Answer)[]): Answer[] {
  for (let i = keys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [keys[i], keys[j]] = [keys[j], keys[i]];
  }
  return keys.map((key) => Answer[key]);
}
</script>

<template>
  <d-card class="wrapper" rounded="xl" background-color="transparent">
    <DGrid columns="2" gap="4">
      <Button
        v-for="type in shuffleButtons(Object.keys(Answer) as (keyof Answer)[])"
        :type="type"
        :size="size"
      />
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
