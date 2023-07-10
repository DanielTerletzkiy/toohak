import { onBeforeUnmount } from "vue";
import { socket } from "../plugins/socket";
import { SocketAction } from "../../../backend/shared/enums/Socket";
import { useLobbyStore } from "../stores/lobbyStore.ts";
import { storeToRefs } from "pinia";

export const useSocketListener = (
  callback: Function,
  action: SocketAction,
  ...args: string[]
) => {
  const address = [action, ...args].join("/");

  function listener(data: object) {
    callback(data, action);
  }

  //onMounted(() => {
    socket.on(address, listener);
  //});

  onBeforeUnmount(() => {
    socket.off(address, listener);
  });
};

export const useSocketEmit = (
  data: any,
  action: SocketAction,
  callback?: Function
) => {
  const lobbyStore = useLobbyStore();
  const { lobbyId } = storeToRefs(lobbyStore);

  const address = [action].join("/");
  if (typeof data === "object") {
    data.lobbyId = lobbyId.value; //lobbyId = name of socket room
  }
  return socket.emit(address, data, callback);
};
