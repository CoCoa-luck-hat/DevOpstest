import dashboard from "@/view/AdminView/page/dashboard.vue";
import reports from "@/view/AdminView/page/reports.vue";
import users from "@/view/AdminView/page/users.vue";

export const AdminRouter = [
  {
    path: "",
    name: "admin-dashboard",
    component: dashboard,
    meta: { reqName: "DashBoard", iconMdi: "mdi-view-dashboard" },
  },
  {
    path: "reports",
    name: "admin-reports",
    component: reports,
    meta: { reqName: "Reports", iconMdi: "mdi-flag" },
  },
  {
    path: "users",
    name: "admin-users",
    component: users,
    meta: { reqName: "Users", iconMdi: "mdi-account-group" },
  },
];

export default AdminRouter;
