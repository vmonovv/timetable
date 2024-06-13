<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth.store";
import { useIsLoadingStore } from "~/stores/loading.store";

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  isLoadingStore.set(true);
  try {
    await authStore.initialize();
    const token = authStore.user.access_token;
    if (!token) {
      router.push("/login");
    }
  } catch (error) {
    console.error("Ошибка инициализации:", error);
    router.push("/login");
  } finally {
    isLoadingStore.set(false);
  }
});
</script>

<template>
  <slot />
</template>

<style scoped></style>
