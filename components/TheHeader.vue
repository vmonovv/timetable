<script setup lang="ts">
const route = useRoute();

const isActive = (path: string): boolean => {
  return route.path === path;
};
const authStore = useAuthStore();
const roleStore = useRoleStore();
const tokenRef = ref("");

onMounted(async () => {
  await authStore.initialize(); // Предполагая, что это асинхронная операция
  tokenRef.value = authStore.user.access_token;
  await roleStore.fetchUserData();
});
const router = useRouter();
const checkToken = async () => {
  try {
    const response = await $fetch(
      "http://176.109.104.88:80/auth/token_status",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenRef.value}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    await router.push("/login");
  }
};
</script>

<template>
  <section v-if="tokenRef" class="container">
    <div class="relative font-normal">
      <div class="flex items-center justify-between mt-6 mb-6">
        <ul class="text-[#64748B] font-medium flex -mx-2">
          <li class="text-[15px] mx-3">
            <NuxtLink
              v-if="roleStore.role == 'manager'"
              @click="checkToken"
              :class="{ active: isActive('/') }"
              to="/"
              >Аналитика</NuxtLink
            >
          </li>
          <li class="text-[15px] mx-3">
            <NuxtLink
            v-if="roleStore.role !== 'doctor'"
              @click="checkToken"
              :class="{ active: isActive('/doctors') }"
              to="/doctors"
              >Врачи</NuxtLink
            >
          </li>
          <li class="text-[15px] mx-3">
            <NuxtLink
              v-if="roleStore.role == 'manager'"
              @click="checkToken"
              :class="{ active: isActive('/requests') }"
              to="/requests"
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
