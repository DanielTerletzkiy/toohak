import {onBeforeUnmount, onMounted} from "vue";
import {socket} from "../plugins/socket";
import {SocketAction, SocketPath} from "../../../backend/shared/enums/Socket";

export const useSocketListener = (
    path: SocketPath,
    action: SocketAction,
    id: number | string,
    callback: Function
) => {
    const address = [path, action, id].join("/");

    function listener(data: object) {
        callback({data, action});
    }

    onMounted(() => {
        socket.on(address, listener);
    });

    onBeforeUnmount(() => {
        socket.off(address, listener);
    });
};
