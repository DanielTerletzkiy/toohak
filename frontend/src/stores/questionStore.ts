import {defineStore} from "pinia";
import {ref} from "vue";
import {Answer} from "../../../backend/shared/enums/Answer";
import {QuestionChangeHost} from "../../../backend/shared/types/SocketData";

export const useQuestionStore = defineStore("questionStore", () => {
    const id = ref("");
    const questionText = ref("");
    const voted = ref<Answer | null>(null);
    const correctAnswer = ref<Answer | null>(null);

    const answers = ref<QuestionChangeHost["answers"] | null>(null);

    const progress = ref<number>(30000);

    let interval: number = -1;

    function startCountdown() {
        interval = setInterval(() => {
            progress.value -= 1000;
            if(progress.value<=0){
                clearInterval(interval);
            }
        }, 1000)
    }

    return {id, questionText, voted, correctAnswer, answers, progress, startCountdown};
});
