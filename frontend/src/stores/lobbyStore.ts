import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import ApiFetchService, { Method } from "../services/ApiFetch.ts";
import { Lobby } from "../../../backend/src/lobbies/entities/lobby.entity.ts";
import { useGlobalStore } from "./globalStore.ts";

export const useLobbyStore = defineStore("lobbyStore", () => {
  const lobbyId = ref<string>("");

  const lobby = ref<Lobby>();

  function join(id: string) {
    if (!id.length) {
      return;
    }
    lobbyId.value = id;
    return ApiFetchService.fetch(Method.Post, `/lobbies/join/${id}`);
  }

  async function create() {
    const globalStore = useGlobalStore();
    const { canHost } = storeToRefs(globalStore);

    if (!canHost.value) {
      return;
    }

    const createdLobby = await ApiFetchService.fetch<Lobby>(Method.Post, `/lobbies`);

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
