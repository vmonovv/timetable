import { defineStore } from "pinia";
import { useAuthStore } from "~/stores/auth.store";

interface Ticket {
  id: string;
  type: string;
  data: string;
  status: string;
  created_at: string;
  full_name: string;
}

export const useTicketsList = defineStore({
  id: "ticketsList",
  state: () => ({
    tickets_list: [] as Ticket[],
  }),
  actions: {
    async fetchTicketListData() {
      try {
        const authStore = useAuthStore();
        authStore.initialize();
        const token = authStore.user.access_token;
        const ticketsListResponse = await $fetch<Ticket[]>(
          "http://176.109.104.88:80/manager/tickets",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (ticketsListResponse && Array.isArray(ticketsListResponse)) {
          this.tickets_list = ticketsListResponse;
        } else {
          console.error("Unexpected response structure:", ticketsListResponse);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    },
  },
});
