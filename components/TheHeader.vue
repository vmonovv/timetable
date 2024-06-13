<script setup lang="ts">
const route = useRoute();

const isActive = (path: string): boolean => {
  return route.path === path;
};
const authStore = useAuthStore();
const tokenRef = ref("");

onMounted(async () => {
  await authStore.initialize(); // Предполагая, что это асинхронная операция
  tokenRef.value = authStore.user.access_token;
});
</script>

<template>
  <section v-if="tokenRef" class="container">
    <div class="relative font-normal">
      <div class="flex items-center justify-between mt-6 mb-6">
        <ul class="text-[#64748B] font-medium flex -mx-2">
          <li class="text-[15px] mx-3">
            <NuxtLink :class="{ active: isActive('/') }" to="/"
              >Аналитика</NuxtLink
            >
          </li>
          <li class="text-[15px] mx-3">
            <NuxtLink :class="{ active: isActive('/doctors') }" to="/doctors"
              >Врачи</NuxtLink
            >
          </li>
          <li class="text-[15px] mx-3">
            <NuxtLink :class="{ active: isActive('/requests') }" to="/requests"
              >Заявки</NuxtLink
            >
          </li>
        </ul>

        <UserNav />
      </div>
    </div>
  </section>
  <div class="border-b">
    <div class="flex items-center px-4"></div>
  </div>
</template>

<style scoped>
.active {
  font-weight: bold;
  color: #000;
}
</style>
