import {defineStore} from "pinia";
import {ref} from "vue";
import {socket} from "../plugins/socket.ts";

export const useLobbyStore = defineStore('lobbyStore', () => {
    const lobbyId = ref<string>("");

    function joinLobby(id: string) {
        if (!id.length) {
            return;
        }
        console.log(id)
        lobbyId.value = id;
        socket.emit('lobby/join', id, (res: unknown) => {
            console.log(res)
        })
    }

    return {lobbyId, joinLobby}

})
