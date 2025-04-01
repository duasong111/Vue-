import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";
import { createRouter, createWebHashHistory } from "vue-router";
// import Main from '/src/views/Main.vue'
import Main from "@/views/Main.vue";
import Home from "@/views/Home.vue";
import { Chicken } from "@element-plus/icons-vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: Home,
      },
      {
        path: "user",
        name: "user",
        component: () => import("@/views/User.vue"),
      },
      {
        path: "mall",
        name: "mall",
        component: () => import("@/views/Mall.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
