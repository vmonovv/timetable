import { defineStore } from "pinia";
import { useAuthStore } from "~/stores/auth.store";

interface UserInfoResponse {
  logged_in_as: {
    role: string;
  };
}

interface RoleState {
  role: string;
}

export const useRoleStore = defineStore({
  id: "role",
  state: (): RoleState => ({
    role: "",
  }),
  actions: {
    async fetchUserData() {
      const authStore = useAuthStore();
      authStore.initialize();

      const token = authStore.user.access_token;

      try {
        const userInfoResponse = await $fetch<UserInfoResponse>(
          "http://176.109.104.88:80/auth/protected",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Убедитесь, что ответ содержит ожидаемые данные
        if (userInfoResponse && userInfoResponse.logged_in_as) {
          this.role = userInfoResponse.logged_in_as.role;
        } else {
          console.error("Unexpected response structure:", userInfoResponse);
        }
      } catch (error) {
        if (error instanceof RTCError) {
          console.error("Failed to fetch user data:", error);
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    },
  },
});
