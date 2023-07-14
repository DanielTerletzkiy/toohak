import {defineStore, storeToRefs} from "pinia";
import {computed, ref} from "vue";
import ApiFetchService, {Method} from "../services/ApiFetch.ts";
import {Lobby} from "../../../backend/src/lobbies/entities/lobby.entity.ts";
import {useGlobalStore} from "./globalStore.ts";
import {Scoreboard} from "../../../backend/shared/types/Score.ts";

export const useLobbyStore = defineStore("lobbyStore", () => {
    const lobbyId = ref<string>("");
    const lobby = ref<Lobby>();

    const scoreboard = ref<Scoreboard>();

    async function join(id: string, username?: string) {
        if (!id.length) {
            return;
        }

        if (username?.length) {
            await ApiFetchService.fetch(Method.Post, `/users/username`, {username});
        }

        const joinedLobby = await ApiFetchService.fetch<boolean>(Method.Post, `/lobbies/${id}/join`);
        if (!joinedLobby) {
            return;
        }
        lobbyId.value = id;
        await fetchLobby();
    }

    async function create(questionAmount = 10, questionDuration = 30000) {
        const globalStore = useGlobalStore();
        const {canHost} = storeToRefs(globalStore);

        if (!canHost.value) {
            return;
        }

        const createdLobby = await ApiFetchService.fetch<Lobby>(Method.Post, `/lobbies`, {
            questionAmount,
            questionDuration
        });

        lobbyId.value = createdLobby.id;
        await fetchLobby();
        return createdLobby;
    }

    async function start() {
        if (!lobbyId.value) {
            return;
        }

        await ApiFetchService.fetch<boolean>(Method.Post, `/lobbies/${lobbyId.value}/start`);
        await fetchLobby();
    }

    async function fetchLobby() {
        lobby.value = await ApiFetchService.fetch<Lobby>(
            Method.Get,
            `/lobbies/${lobbyId.value}`
        );
        console.log({lobby: lobby.value})
    }

    const isHost = computed(() => {
        if (!lobby.value) {
            return null;
        }

        const globalStore = useGlobalStore();
        const {socketId} = storeToRefs(globalStore);

        return lobby.value?.host.socketId === socketId.value;
    });

    const url = computed(() => {
        const url = new URL(window.location.href);
        url.pathname = "/";
        url.searchParams.set("lobby", lobbyId.value);
        return url.toString();
    })

    return {lobbyId, lobby, scoreboard, join, create, start, fetchLobby, isHost, url};
});
