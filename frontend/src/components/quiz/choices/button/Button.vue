<script setup lang="ts">
import {computed, PropType} from "vue";
import {Answer} from "../../../../../../backend/shared/enums/Answer"
import {AnswerStyles} from "../../../../constants/AnswerStyles";

const props = defineProps({
  type: {type: Object as PropType<Answer>, required: true},
  size: {type: String, default: '100px'},
})

const currentType = computed(() => AnswerStyles[props.type]);
</script>

<template>
  <d-card root-tag="d-button" class="button" role="button" glowing :height="size" :width="size"
          :color="currentType.color">
    <d-icon :name="currentType.icon" :size="`${(parseInt(size) || 50)-20}px`"/>
  </d-card>
</template>

<style scoped lang="scss">
.button {
  justify-content: center;
  align-items: center;
}
</style>
