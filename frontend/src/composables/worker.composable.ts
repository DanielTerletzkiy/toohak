//import {useGlobalStore} from "../stores/globalStore.ts";
import {useLobbyStore} from "../stores/lobbyStore.ts";
import {watch} from "vue";
import {storeToRefs} from "pinia";
import {router} from "../plugins/router.ts";

export function useWorker() {
    //const globalStore = useGlobalStore();
    const lobbyStore = useLobbyStore();
    const {lobbyId} = storeToRefs(lobbyStore)

    watch(lobbyId, gotoLobby)
}

function gotoLobby(id: string) {
    console.log(id)
    if (!id.length) {
        return;
    }
    router.push("/lobby")
}
