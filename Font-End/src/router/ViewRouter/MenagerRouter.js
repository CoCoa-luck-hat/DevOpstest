import dashboard from "@/view/MenagerView/page/dashboard.vue";
import reports from "@/view/MenagerView/page/reports.vue";
import users from "@/view/MenagerView/page/users.vue";

export const MenagerRouter = [
  {
    path: "",
    name: "menager-dashboard",
    component: dashboard,
    meta: { reqName: "DashBoard", iconMdi: "mdi-view-dashboard" },
  },
  {
    path: "reports",
    name: "menager-reports",
    component: reports,
    meta: { reqName: "Reports", iconMdi: "mdi-flag" },
  },
  {
      path: "users",
      name: "menager-users",
      component: users,
      meta: { reqName: "Users", iconMdi: "mdi-account-group" },
    },
];

export default MenagerRouter;
