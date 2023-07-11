import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import ApiFetchService, { Method } from "../services/ApiFetch.ts";
import { Lobby } from "../../../backend/src/lobbies/entities/lobby.entity.ts";
import { useGlobalStore } from "./globalStore.ts";

export const useLobbyStore = defineStore("lobbyStore", () => {
  const lobbyId = ref<string>("");

  const lobby = ref<Lobby>();

  async function join(id: string) {
    if (!id.length) {
      return;
    }

    const joinedLobby = await ApiFetchService.fetch<Lobby>(Method.Post, `/lobbies/join/${id}`);
    if(!joinedLobby){
      return;
    }
    lobbyId.value = id;
    lobby.value = joinedLobby;
  }

  async function create(questionAmount = 10, questionDuration = 30000) {
    const globalStore = useGlobalStore();
    const { canHost } = storeToRefs(globalStore);

    if (!canHost.value) {
      return;
    }

    const createdLobby = await ApiFetchService.fetch<Lobby>(Method.Post, `/lobbies`, {questionAmount,questionDuration});

    lobbyId.value = createdLobby.id;
    lobby.value = createdLobby;
    return createdLobby;
  }

  async function fetchLobby() {
    lobby.value = await ApiFetchService.fetch<Lobby>(
      Method.Get,
      `/lobbies/${lobbyId.value}`
    );
  }

  const isHost = computed(() => {
    if (!lobby.value) {
      return null;
    }

    const globalStore = useGlobalStore();
    const { socketId } = storeToRefs(globalStore);

    return lobby.value?.host.socketId === socketId.value;
  });

  return { lobbyId, lobby, join, create, fetchLobby, isHost };
});
