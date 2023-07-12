import {createApp} from 'vue'
import './style.css'
// @ts-ignore
import App from './App.vue'

import vuelize from "vuelize";
import {router} from "./plugins/router.ts";
import {pinia} from "./plugins/pinia.ts";
import {connectToSocketIoServer} from "./plugins/socket.ts";

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(vuelize);
connectToSocketIoServer().then(() => {
    app.mount('#app')
})
