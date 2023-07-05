import {defineStore} from "pinia";
import {computed} from "vue";
import {socket} from "../plugins/socket.ts";

export const useGlobalStore = defineStore('globalStore', () => {
    const socketId = computed<string>(()=>socket.id);

    const isMobile = computed(() => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    })

    const canHost = computed(() => {
        return !isMobile.value;
    })

    return {isMobile, canHost, socketId}

})
