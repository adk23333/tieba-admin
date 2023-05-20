import './assets/main.css'
import 'vant/lib/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {Button, Card, Cell, CellGroup, Col, Field, Row, Switch} from "vant";

const app = createApp(App)

app.use(createPinia())
app.use(router).use(Card).use(Button).use(CellGroup).use(Cell).use(Row).use(Col).use(Switch).use(Field)

app.mount('#app')
