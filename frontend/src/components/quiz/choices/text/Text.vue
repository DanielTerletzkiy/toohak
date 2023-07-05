<script setup lang="ts">
import {computed, PropType} from "vue";
import {Answer} from "../../../../../../backend/shared/enums/Answer"
import {AnswerStyles} from "../../../../constants/AnswerStyles";

const props = defineProps({
  type: {type: Object as PropType<Answer>, required: true}
})

const currentType = computed(()=>AnswerStyles[props.type]);
</script>

<template>
<d-card class="text font-size-large px-4" glowing height="100px" width="450px" :color="currentType.color">
  <d-icon :name="currentType.icon" size="50px" class="pr-4"/>
  <slot/>
</d-card>
</template>

<style scoped lang="scss">
.button {
  //justify-content: space-between;
  align-items: center;
}
</style>
