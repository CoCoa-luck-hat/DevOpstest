import { defineStore } from "pinia";
import { api } from "@/api/axios";
import router from "@/router";

export const useIndexStore = defineStore("Index", {
  state: () => ({
    user: [],
  }),
  actions: {
    async Register(data) {
      const response = await api.post("/register", data);
      return response.data;
    },
    async Login(data) {
      const response = await api.post("/login", data);
      localStorage.setItem("token", response.data.token);
      this.user = response.data.user;
      return response.data;
    },
    async CheckProfile() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.user = [];
        return false;
      }
      try {
        const response = await api.get("/profile");
        this.user = response.data.user;
        return true;
      } catch (error) {
        localStorage.removeItem("token");
        this.user = [];
        return false;
      }
    },
    Logout() {
      localStorage.removeItem("token");
      this.user = [];
      router.push({ name: "login" });
    },
  },
});
