import { defineStore } from "pinia";
import { useAuthStore } from "~/stores/auth.store";

export const useRoleStore = defineStore({
  id: "role",
  state: () => ({
    role: "",
  }),
  actions: {
    async fetchUserData() {
      const authStore = useAuthStore();
      authStore.initialize();
      const token = authStore.user.access_token;
      const userInfoResponse: Response = await $fetch(
        "http://176.109.104.88:80/protected",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userInfo = userInfoResponse;
      this.role = userInfo.logged_in_as.role;
    },
  },
});
