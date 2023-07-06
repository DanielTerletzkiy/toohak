import {defineStore} from "pinia";
import {ref} from "vue";
import {Answer} from "../../../backend/shared/enums/Answer.ts";

export const useQuestionStore = defineStore('questionStore', () => {
    const index = ref(0);
    const text = ref("");
    const voted = ref<Answer | null>(null);

    return {index, text, voted}

})
