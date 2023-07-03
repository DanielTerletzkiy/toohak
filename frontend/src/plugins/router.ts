// @ts-ignore
import Home from "../pages/Home.vue";
import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"

const routes: RouteRecordRaw[] = [
    { path: '/', component: Home },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
