import { defineStore } from "pinia";
import { useAuthStore } from "~/stores/auth.store";

export const useNameStore = defineStore({
  id: "name",
  state: () => ({
    first_name: "",
    father_name: "",
  }),
  actions: {
    async fetchUserData() {
      const authStore = useAuthStore();
      authStore.initialize();
      const token = authStore.user.access_token;
      const userNameResponse: Response = await $fetch(
        "http://176.109.104.88:80/user_name",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userNameData = userNameResponse;
      this.first_name = userNameData.first_name;
      this.father_name = userNameData.father_name;
    },
  },
});
