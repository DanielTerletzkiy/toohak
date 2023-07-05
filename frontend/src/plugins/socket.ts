import {io} from "socket.io-client";

export const socket = io();
export function connectToSocketIoServer() {
    return new Promise((resolve, reject) => {
        const socket = io();

        socket.on('connect', () => {
            console.log('Connected to the server.');
            resolve(socket);
        });

        socket.on('connect_error', (error) => {
            console.log('Error connecting to server:', error);
            reject(error);
        });
    });
}
