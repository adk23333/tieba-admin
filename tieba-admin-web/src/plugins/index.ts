/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import router from '../router'
import pinia from '../store'
import Toast from "vue-toastification";
import {options} from "@/plugins/toast";

// Types
import type {App} from 'vue'


export function registerPlugins(app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(Toast, options)
}
