import {defineStore} from "pinia";
import {ref} from "vue";
import {Answer} from "../../../backend/shared/enums/Answer";
import {QuestionChangeHost} from "../../../backend/shared/types/SocketData";

export const useQuestionStore = defineStore('questionStore', () => {
    const index = ref(0);
    const text = ref("");
    const voted = ref<Answer | null>(null);

    const answers = ref<QuestionChangeHost["answers"] | null>(null);

    return {index, text, voted, answers}

})
