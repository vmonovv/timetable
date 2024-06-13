import { defineStore } from "pinia";
import { useAuthStore } from "~/stores/auth.store";

interface UserNameResponse {
  first_name: string;
  father_name: string;
}

interface NameState {
  first_name: string;
  father_name: string;
}

export const useNameStore = defineStore({
  id: "name",
  state: (): NameState => ({
    first_name: "",
    father_name: "",
  }),
  actions: {
    async fetchUserData() {
      const authStore = useAuthStore();
      authStore.initialize();

      const token = authStore.user.access_token;

      try {
        const userNameResponse = await $fetch<UserNameResponse>(
          "http://176.109.104.88:80/auth/user_name",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (
          userNameResponse &&
          userNameResponse.first_name &&
          userNameResponse.father_name
        ) {
          this.first_name = userNameResponse.first_name;
          this.father_name = userNameResponse.father_name;
        } else {
          console.error("Unexpected response structure:", userNameResponse);
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
