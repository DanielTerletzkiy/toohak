import { defineStore } from "pinia";
import {computed, ref} from "vue";
import { Answer } from "../../../backend/shared/enums/Answer";
import {
  QuestionChangeHost, QuestionProgress,
  SubmitData,
} from "../../../backend/shared/types/SocketData";
import { useSocketEmit } from "../composables/socket.composable.ts";
import { SocketAction } from "../../../backend/shared/enums/Socket.ts";

export const useQuestionStore = defineStore("questionStore", () => {
  const id = ref("");
  const questionText = ref("");
  const voted = ref<Answer | boolean>(false);
  const correctAnswer = ref<Answer | null>(null);

  const progress = ref<QuestionProgress | null>(null);

  const answers = ref<QuestionChangeHost["answers"] | null>(null);

  const timerProgress = ref<number>(30000);

  let interval: number = -1;

  function startCountdown() {
    resetCountdown();
    // @ts-ignore
    interval = setInterval(() => {
      timerProgress.value -= 1000;
      if (timerProgress.value <= 0) {
        resetCountdown()
      }
    }, 1000);
  }

  function resetCountdown(){
    clearInterval(interval);
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
    progress,
    answers,
    timerProgress,
    startCountdown,
    resetCountdown,
    submit,
    buttonsDeactivated
  };
});
