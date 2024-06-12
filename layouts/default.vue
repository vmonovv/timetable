<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth.store";
import { useIsLoadingStore } from "~/stores/loading.store";

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  isLoadingStore.set(true);
  try {
    await authStore.initialize(); // Дождаться завершения инициализации
    const token = authStore.user.access_token;
    console.log(token);
    if (!token) {
      router.push("/login");
    }
  } catch (error) {
    console.error("Ошибка инициализации:", error);
    // Обработка ошибки инициализации, если это необходимо
  } finally {
    isLoadingStore.set(false);
  }
});
</script>

<template>
  <slot />
</template>

<style scoped></style>
