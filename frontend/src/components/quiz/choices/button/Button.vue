<script setup lang="ts">
import { computed, PropType } from "vue";
import { Answer } from "../../../../../../backend/shared/enums/Answer";
import { AnswerStyles } from "../../../../constants/AnswerStyles";
import { useQuestionStore } from "../../../../stores/questionStore.ts";
import { storeToRefs } from "pinia";
import { useLobbyStore } from "../../../../stores/lobbyStore.ts";
import { LobbyState } from "../../../../../../backend/shared/enums/Lobby.ts";

const props = defineProps({
  type: { type: Object as PropType<Answer>, required: true },
  size: { type: String, default: "100px" },
});

const questionStore = useQuestionStore();
const { voted, buttonsDeactivated } = storeToRefs(questionStore);
const { submit } = questionStore;

const lobbyStore = useLobbyStore();
const { lobby } = storeToRefs(lobbyStore);

const currentType = computed(() => AnswerStyles[props.type]);
</script>

<template>
  <d-card
    v-if="lobby"
    root-tag="d-button"
    class="button"
    role="button"
    glowing
    :height="size"
    :width="size"
    :color="currentType.color"
    :disabled="buttonsDeactivated || lobby.state !== LobbyState.Question"
    :outlined="voted === type"
    outline-width="4px"
    :outline-color="currentType.color"
    @click="() => submit(type)"
  >
    <d-icon :name="currentType.icon" :size="(parseInt(size) || 50) - 20" />
  </d-card>
</template>

<style scoped lang="scss">
.button {
  justify-content: center;
  align-items: center;
}
</style>
