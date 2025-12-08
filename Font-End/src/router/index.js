import { createRouter, createWebHistory } from "vue-router";
import { useIndexStore } from "@/stores";

import IndexView from "@/view/IndexView/index.vue";
import indexAdminView from "@/view/AdminView/index.vue";
import indexMenagerView from "@/view/MenagerView/index.vue";
import indexUserView from "@/view/UserView/index.vue";

import { IndexRouter } from "./ViewRouter/IndexRouter";
import { AdminRouter } from "./ViewRouter/AdminRouter";
import {MenagerRouter} from "./ViewRouter/MenagerRouter";
import {UserRouter} from "./ViewRouter/UserRouter";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      component: IndexView,
      children: IndexRouter,
    },
    {
      path: "/admin",
      component: indexAdminView,
      children: AdminRouter,
      meta: { reqRole: "admin" },
    },
    {
      path: "/menager",
      component: indexMenagerView,
      children: MenagerRouter,
      meta: { reqRole: "menager" },
    },
    {
      path: "/user",
      component: indexUserView,
      children: UserRouter,
      meta: { reqRole: "user" },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const reqRole = to.meta?.reqRole;
  if (!reqRole) {
    return next();

  }
  const IndexStore = useIndexStore();
  const Is = await IndexStore.CheckProfile();
  if (!Is || IndexStore.user.role !== reqRole) {
    IndexStore.user = [];
    localStorage.removeItem("token");
    return next({ name: "login" });
  }
  return next();
});

export default router;
