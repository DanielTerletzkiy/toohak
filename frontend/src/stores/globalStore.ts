import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {User} from "../../../backend/src/users/entities/user.entity.ts";
import ApiFetchService, {Method} from "../services/ApiFetch.ts";

export const useGlobalStore = defineStore("globalStore", () => {
    const socketId = computed<string>(
        () => localStorage.getItem("playerId") || ""
    );

    const isMobile = computed(() => {
        return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );
    });

    const canHost = computed(() => {
        return !isMobile.value;
    });

    const buttonSize = computed(() => {
        return screen.availWidth / 2;
    });

    const user = ref<User>()

    async function fetchCurrentUser() {
        user.value = await ApiFetchService.fetch(Method.Get, `/users/current`);
        return user;
    }

    async function setUsername(username: string){
        await ApiFetchService.fetch(Method.Post, `/users/username`, {username});
        return fetchCurrentUser();
    }

    return {
        isMobile,
        canHost,
        socketId,
        buttonSize,
        user,
        fetchCurrentUser,
        setUsername,
    };
});
