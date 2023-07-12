<script setup lang="ts">
import { computed, PropType } from "vue";
import { Answer } from "../../../../../../backend/shared/enums/Answer";
import { AnswerStyles } from "../../../../constants/AnswerStyles";
import { useLobbyStore } from "../../../../stores/lobbyStore.ts";
import { storeToRefs } from "pinia";
import { useQuestionStore } from "../../../../stores/questionStore.ts";
import { LobbyState } from "../../../../../../backend/shared/enums/Lobby.ts";

const props = defineProps({
  type: { type: Object as PropType<Answer>, required: true },
  size: { type: String, default: "200px" },
});

const currentType = computed(() => AnswerStyles[props.type]);

const lobbyStore = useLobbyStore();
const { lobby } = storeToRefs(lobbyStore);

const questionStore = useQuestionStore();
const { correctAnswer } = storeToRefs(questionStore);

const showCorrect = computed(
  () =>
    lobby.value?.state !== LobbyState.Question &&
    props.type === correctAnswer.value
);
</script>

<template>
  <d-card
    class="text font-size-large px-4"
    :class="{ correct: showCorrect }"
    glowing
    height="100px"
    :width="size"
    :color="currentType.color"
    :outlined="showCorrect"
    outline-width="4px"
    :depressed="false"
  >
    <d-icon :name="currentType.icon" size="50px" class="pr-4" />
    <slot />
  </d-card>
</template>

<style scoped lang="scss">
.text {
  transition: transform 0.2s;

  &.correct {
    transform: scale(1.05);
  }
}
</style>
