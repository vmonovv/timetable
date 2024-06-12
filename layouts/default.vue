<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth.store";
import { useIsLoadingStore } from "~/stores/loading.store";

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();
onMounted(() => {
  isLoadingStore.set(true); // Устанавливаем состояние загрузки

  // authStore.loadUserFromLocalStorage();

  const token = authStore.user.access_token;
  if (!token) {
    router.push("/login");
  }
  isLoadingStore.set(false); // Выключаем состояние загрузки, если токен найден
});

// Реагируем на изменения состояния авторизации
watchEffect(() => {
  if (!authStore.user.access_token) {
    router.push("/login");
  }
});
</script>

<template>
  <slot />
</template>

<style scoped></style>
