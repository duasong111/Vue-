import { createApp } from "vue";
// import './style.css'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";
import router from "./router";
import api from "@/api/api";
import { createPinia } from "pinia";
import "@/api/mock.js";
import { useAllDataStore } from "@/stores";
const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.$api = api;
app.use(pinia);
const store = useAllDataStore();
app.use(ElementPlus);
store.addMenu(router, "refresh");
app.use(router).mount("#app");
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
