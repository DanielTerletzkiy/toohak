import { defineStore } from "pinia";
import { ref } from "vue";
import {joinLobby} from "../api/lobby.ts";

export const useLobbyStore = defineStore("lobbyStore", () => {
  const lobbyId = ref<string>("");

  function join(id: string) {
    if (!id.length) {
      return;
    }
    console.log(id);
    lobbyId.value = id;
    joinLobby(id);
  }

  return { lobbyId, join };
});
