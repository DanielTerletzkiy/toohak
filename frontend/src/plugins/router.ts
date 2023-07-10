// @ts-ignore
import Home from "../pages/Home.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// @ts-ignore
import PlayerQuestion from "../pages/player/Question.vue";
// @ts-ignore
import HostQuestion from "../pages/host/Question.vue";
// @ts-ignore
import Lobby from "../pages/Lobby.vue";
//import { storeToRefs } from "pinia";

//const lobbyStore = useLobbyStore(pinia);
//const { isHost } = storeToRefs(lobbyStore);
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/lobby",
    component: Lobby,
    children: [
      {
        path: "host/question",
        component: HostQuestion,
      },
      {
        path: "player/question",
        component: PlayerQuestion,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
