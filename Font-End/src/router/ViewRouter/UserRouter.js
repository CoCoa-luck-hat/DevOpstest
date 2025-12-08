import dashboard from "@/view/UserView/page/dashboard.vue";


export const UserRouter = [
  {
    path: "",
    name: "user-dashboard",
    component: dashboard,
    meta: { reqName: "DashBoard", iconMdi: "mdi-view-dashboard" },
  },
];

export default UserRouter;
