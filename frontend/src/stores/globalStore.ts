import {defineStore} from "pinia";
import {computed} from "vue";

export const useGlobalStore = defineStore('globalStore', () => {
    const socketId = computed<string>(() => localStorage.getItem("playerId") || "");

    const isMobile = computed(() => {
        return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    })

    const canHost = computed(() => {
        return !isMobile.value;
    })

    const isHost = computed(() => {
        return false;
    })

    const buttonSize = computed(() => {
        return (screen.availWidth/2) - 4;
    })

    return {
        isMobile,
        canHost,
        socketId,
        isHost,
        buttonSize,
    }

})
