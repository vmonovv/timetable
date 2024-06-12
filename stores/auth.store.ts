interface IAuthStore {
  access_token: string;
}

const defaultValue: { user: IAuthStore } = {
  user: {
    access_token: "",
  },
};

export const useAuthStore = defineStore("auth", {
  state: () => defaultValue,
  actions: {
    initialize() {
      const storedUser = localStorage.getItem("authUser");
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    },
    clear() {
      localStorage.removeItem("authUser");
      this.$patch(defaultValue);
    },
    set(input: IAuthStore) {
      localStorage.setItem("authUser", JSON.stringify(input));
      this.user = input;
    },
  },
});
