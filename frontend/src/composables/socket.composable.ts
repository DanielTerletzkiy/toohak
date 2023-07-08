import {onBeforeUnmount, onMounted} from "vue";
import {socket} from "../plugins/socket";
import {SocketAction} from "../../../backend/shared/enums/Socket";

export const useSocketListener = (
    callback: Function,
    action: SocketAction,
    ...args: string[]
) => {
    const address = [action, ...args].join("/");

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
