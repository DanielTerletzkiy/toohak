// @ts-ignore
import Home from "../pages/Home.vue";
import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"
import {useGlobalStore} from "../stores/globalStore.ts";
import {pinia} from "./pinia.ts";
// @ts-ignore
import PlayerQuestion from "../pages/player/Question.vue";
// @ts-ignore
import HostQuestion from "../pages/host/Question.vue";
// @ts-ignore
import Lobby from "../pages/Lobby.vue";

const globalStore = useGlobalStore(pinia);

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/lobby',
        component: Lobby,
        children: [
            {
                path: 'question',
                component: globalStore.isHost ? HostQuestion : PlayerQuestion
            },
        ]
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
