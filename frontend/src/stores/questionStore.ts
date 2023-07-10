import { defineStore } from "pinia";
import { ref } from "vue";
import { Answer } from "../../../backend/shared/enums/Answer";
import { QuestionChangeHost } from "../../../backend/shared/types/SocketData";

export const useQuestionStore = defineStore("questionStore", () => {
  const id = ref("");
  const questionText = ref("");
  const voted = ref<Answer | null>(null);

  const answers = ref<QuestionChangeHost["answers"] | null>(null);

  return { id, questionText, voted, answers };
});
