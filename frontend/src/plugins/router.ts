// @ts-ignore
import Home from "../pages/Home.vue";
import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
// @ts-ignore
import PlayerQuestion from "../pages/player/Question.vue";
// @ts-ignore
import HostQuestion from "../pages/host/Question.vue";
// @ts-ignore
import Lobby from "../pages/Lobby.vue";
import {useLobbyStore} from "../stores/lobbyStore.ts";
import {storeToRefs} from "pinia";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/lobby",
        name: "Lobby",
        component: Lobby,
        // @ts-ignore
        beforeEnter: (to, from, next) => {
            const lobbyStore = useLobbyStore();

            const {lobbyId} = storeToRefs(lobbyStore);

            if (!lobbyId.value) {
                next({name: "Home"});
            }
            next()
        },
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
