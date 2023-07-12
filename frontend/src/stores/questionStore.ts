import { defineStore } from "pinia";
import {computed, ref} from "vue";
import { Answer } from "../../../backend/shared/enums/Answer";
import {
  QuestionChangeHost,
  SubmitData,
} from "../../../backend/shared/types/SocketData";
import { useSocketEmit } from "../composables/socket.composable.ts";
import { SocketAction } from "../../../backend/shared/enums/Socket.ts";

export const useQuestionStore = defineStore("questionStore", () => {
  const id = ref("");
  const questionText = ref("");
  const voted = ref<Answer | boolean>(false);
  const correctAnswer = ref<Answer | null>(null);

  const answers = ref<QuestionChangeHost["answers"] | null>(null);

  const progress = ref<number>(30000);

  let interval: number = -1;

  function startCountdown() {
    // @ts-ignore
    interval = setInterval(() => {
      progress.value -= 1000;
      if (progress.value <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  function submit(answer: Answer) {
    if (voted.value !== false) {
      return;
    }
    voted.value = answer;
    const data: Partial<SubmitData> = {
      questionId: id.value,
      chosenAnswer: answer,
    };
    console.log({data})
    useSocketEmit(data, SocketAction.AnswerSubmit);
  }

  const buttonsDeactivated = computed(()=>voted.value !== false)

  return {
    id,
    questionText,
    voted,
    correctAnswer,
    answers,
    progress,
    startCountdown,
    submit,
    buttonsDeactivated
  };
});
