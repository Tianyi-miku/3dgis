import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import store from './store'
import 'ant-design-vue/dist/antd.css';
import "cesium/Build/Cesium/Widgets/widgets.css";
import dataV from '@jiaminghi/data-view'

import * as Cesium from "cesium";

Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMDlmNTc5ZS0xYzVkLTQ5YWEtOWUyMC1hYmY1MzZmNDAwYzYiLCJpZCI6NDI3MDgsImlhdCI6MTY2NjgzNjAyMX0.OX-NEAOnl9imcfB7RUqaj_9WC7HqhqKrXHYqlq57SH8";


createApp(App).use(store).use(router).use(Antd).use(dataV).mount('#app')
