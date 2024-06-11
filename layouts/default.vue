<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth.store";
import { useIsLoadingStore } from "~/stores/loading.store";

const isLoadingStore = useIsLoadingStore();
const store = useAuthStore();
const router = useRouter();

// onMounted(async () => {
//   try {
//     const user = await account.get();
//     if (user) store.set(user);
//   } catch (error) {
//     // router.push("/login");
//   } finally {
//     isLoadingStore.set(false);
//   }
// });
</script>

<template>
  <slot />
</template>

<style scoped></style>
