import {createApp} from 'vue'
import './style.css'
// @ts-ignore
import App from './App.vue'

import vuelize from "vuelize";
import {router} from "./plugins/router.ts";

const app = createApp(App);
app.use(vuelize);
app.use(router);
app.mount('#app')
