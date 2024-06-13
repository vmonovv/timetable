<script lang="ts" setup>
import Mail from "@/components/requests/Mail.vue";
import { accounts, mails } from "@/data/mails";
const authStore = useAuthStore();
const tokenRef = ref("");

onMounted(async () => {
  await authStore.initialize(); // Предполагая, что это асинхронная операция
  tokenRef.value = authStore.user.access_token;
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
    <Mail :accounts="accounts" :mails="mails" :nav-collapsed-size="4" />
  </div>
</template>
