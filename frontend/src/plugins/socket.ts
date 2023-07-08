import { io } from "socket.io-client";
// @ts-ignore
import { v4 as uuid } from "uuid";

if (!localStorage.getItem("playerId")) {
  localStorage.setItem("playerId", uuid());
}

export const socket = io({
  query: {
    playerId: localStorage.getItem("playerId"),
  },
});

export function connectToSocketIoServer() {
  return new Promise((resolve, reject) => {
    socket.on("connect", () => {
      console.log("Connected to the server.");
      resolve(socket);
    });

    socket.on("connect_error", (error) => {
      console.log("Error connecting to server:", error);
      reject(error);
    });
  });
}
