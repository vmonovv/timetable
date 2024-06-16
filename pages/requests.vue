<script lang="ts" setup>
import Mail from "@/components/requests/Mail.vue";
import { accountss, mailss } from "@/data/mails";
import { useTicketsList } from "~/stores/ticketsList.store";
import { useAuthStore } from "~/stores/auth.store";
import { ref, onMounted } from "vue";

// Использование магазинов состояния
const ticketsListStore = useTicketsList();
const authStore = useAuthStore();
const tokenRef = ref<string>("");

interface Account {
  label: string;
  email: string;
  icon: string;
}

interface Mail {
  id: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  date: string;
  read: boolean;
  labels: string[];
}

const accounts = ref<Account[]>([]);
const mails = ref<Mail[]>([]);

const transformedData = ref<{ accounts: Account[]; mails: Mail[] }>({
  accounts: [],
  mails: [],
});

onMounted(async () => {
  authStore.initialize();
  tokenRef.value = authStore.user.access_token;
  await ticketsListStore.fetchTicketListData();

  transformedData.value = transformTicketsToAccountsAndMails(
    ticketsListStore.tickets_list
  );

  // Заполняем accounts и mails на основе transformedData
  accounts.value = transformedData.value.accounts;
  mails.value = transformedData.value.mails;

  console.log(accounts.value);
  if (mails.value.length > 0) {
    console.log(mails.value[0].id);
  }
});

const transformTicketsToAccountsAndMails = (
  tickets: any[]
): { accounts: Account[]; mails: Mail[] } => {
  if (!tickets || tickets.length === 0) {
    return { accounts: [], mails: [] };
  }

  const mails: Mail[] = tickets.map((ticket) => ({
    id: ticket.id,
    name: ticket.full_name,
    email: `${ticket.full_name}@example.com`,
    subject: `Причина запроса: ${ticket.type}`,
    text: `Внимание! Вам пришел запрос на ${ticket.data}`,
    date: ticket.created_at,
    read: false,
    labels: [ticket.type, ticket.status],
  }));

  const accounts: Account[] = [
    ...new Set(tickets.map((ticket) => `${ticket.full_name}@example.com`)),
  ].map((email) => ({
    label: email.split("@")[0],
    email: email,
    icon: "mdi:email-outline",
  }));

  return { accounts, mails };
};
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
    <Mail
      v-if="mails.length > 0"
      :accounts="accounts"
      :mails="mails"
      :nav-collapsed-size="4"
    />
  </div>
</template>
