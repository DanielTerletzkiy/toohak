// @ts-ignore
import Home from "../pages/Home.vue";
import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"
import {useGlobalStore} from "../stores/globalStore.ts";
import {pinia} from "./pinia.ts";
import PlayerQuestion from "../pages/player/Question.vue";
import HostQuestion from "../pages/host/Question.vue";

const globalStore = useGlobalStore(pinia);

const routes: RouteRecordRaw[] = [
    {path: '/', component: Home},
    {path: '/question', component: globalStore.isHost ? HostQuestion : PlayerQuestion},
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
