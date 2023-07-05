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
<d-card root-tag="d-button" class="button" role="button" glowing height="100px" width="100px" :color="currentType.color">
  <d-icon :name="currentType.icon" size="50px"/>
</d-card>
</template>

<style scoped lang="scss">
.button {
  justify-content: center;
  align-items: center;
}
</style>
