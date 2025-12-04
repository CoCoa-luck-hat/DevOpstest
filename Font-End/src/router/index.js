import { createRouter, createWebHistory } from "vue-router";
import { useIndexStore } from "@/stores";

import IndexView from "@/view/IndexView/index.vue";
import indexAdminView from "@/view/AdminView/index.vue";

import { IndexRouter } from "./ViewRouter/IndexRouter";
import { AdminRouter } from "./ViewRouter/AdminRouter";

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
  ],
});

router.beforeEach(async (to, from, next) => {
  const reqRole = to.meta?.reqRole;
  if (!reqRole) {
    next();
    return;
  }
  const IndexStore = useIndexStore();
  const Is = await IndexStore.CheckProfile();
  if (!Is || IndexStore.user.role !== reqRole) {
    IndexStore.user = [];
    localStorage.removeItem("token");
    next({ name: "login" });
    return;
  }
  next();
});

export default router;
