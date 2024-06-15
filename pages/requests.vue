<script lang="ts" setup>
import Mail from "@/components/requests/Mail.vue";
import { useTicketsList } from "~/stores/ticketsList.store";
import { useAuthStore } from "~/stores/auth.store";
import { ref, onMounted, computed } from "vue";

const ticketsListStore = useTicketsList();
const authStore = useAuthStore();
const tokenRef = ref("");

const accounts = ref([]);
const mails = ref([]);

onMounted(async () => {
  authStore.initialize();
  tokenRef.value = authStore.user.access_token;
  await ticketsListStore.fetchTicketListData();
  console.log(ticketsListStore.tickets_list);

  const transformTicketsToAccountsAndMails = (tickets) => {
    if (!tickets || tickets.length === 0) {
      return { accounts: [], mails: [] };
    }

    const accounts = tickets.map((ticket) => ({
      id: ticket.id,
      name: ticket.full_name,
      email: `${ticket.full_name}@example.com`,
      subject: `Request Type: ${ticket.type}`,
      text: `Data: ${ticket.data}`,
      date: ticket.created_at,
      read: ticket.status === "Pending",
      labels: [ticket.type, ticket.status],
    }));

    const mails = [
      ...new Set(
        tickets.map(
          (ticket) =>
            `${ticket.full_name.split(" ").join(".").toLowerCase()}@example.com`
        )
      ),
    ].map((email) => ({
      label: email.split("@")[0],
      email: email,
      icon: "mdi:email-outline",
    }));

    return { accounts, mails };
  };

  const transformedData = transformTicketsToAccountsAndMails(
    ticketsListStore.tickets_list
  );
  accounts.value = transformedData.accounts;
  mails.value = transformedData.mails;
  console.log("Transformed Accounts:", accounts.value);
  console.log("Transformed Mails:", mails.value);
});
</script>

<template>
  <TheHeader />
  <div v-if="tokenRef" class="md:hidden">
    <image
      src="/examples/mail-dark.png"
      :width="1280"
      :height="727"
      alt="Mail"
      class="hidden dark:block"
    />
    <image
      src="/examples/mail-light.png"
      :width="1280"
      :height="727"
      alt="Mail"
      class="block dark:hidden"
    />
  </div>
  <div class="hidden flex-col md:flex">
    <!-- <Mail :accounts="accounts" :mails="mails" :nav-collapsed-size="4" /> -->
  </div>
</template>
