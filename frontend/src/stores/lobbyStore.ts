import { defineStore } from "pinia";
import { ref } from "vue";
import { useSocketEmit } from "../composables/socket.composable.ts";
import { SocketAction } from "../../../backend/shared/enums/Socket.ts";

export const useLobbyStore = defineStore("lobbyStore", () => {
  const lobbyId = ref<string>("");

  function joinLobby(id: string) {
    if (!id.length) {
      return;
    }
    console.log(id);
    lobbyId.value = id;
    useSocketEmit(id, SocketAction.LobbyJoin)
  }

  return { lobbyId, joinLobby };
});
