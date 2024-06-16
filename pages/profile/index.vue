<script setup lang="ts">
import { cn } from "@/lib/utils";

const roleStore = useRoleStore();
const userName = useNameStore();
const roleTranslations = {
  manager: "Руководитель референс-центра",
  hr: "Сотрудник кадровой службы",
  doctor: "Врач",
};
const tokenRef = ref("");
const authStore = useAuthStore();
onMounted(async () => {
  try {
    await roleStore.fetchUserData();
    await userName.fetchUserData();

    await authStore.initialize(); // Предполагая, что это асинхронная операция
    tokenRef.value = authStore.user.access_token;
  } catch (error) {
    console.error("Ошибка при получении данных о пользователе:", error);
    // Дополнительная обработка ошибок, если нужно
  }
});
</script>

<template>
  <TheHeader />
  <div v-if="tokenRef" class="container">
    <div class="flex justify-center items-center h-[100vh] flex-col">
      <h1 class="mt-5 t">
        {{ userName.first_name }} {{ userName.father_name }}, добро пожаловать
      </h1>
      <p class="s mt-4 text-[#676767]">
        Вы авторизировались, как
        <span class="font-medium">{{ roleTranslations[roleStore.role] }}</span>
      </p>
      <div v-if="roleStore.role == 'manager'">
        <NuxtLink
          class="s mt-5 inline-block px-4 py-2 border-2 border-[#0070FF] text-[#0070FF] hover:bg-[#0070FF] hover:text-white font-medium transition duration-300 ease-in-out rounded-lg"
          to="/"
          >в личный кабинет</NuxtLink
        >
      </div>
      <div v-else-if="roleStore.role == 'hr'">
        <NuxtLink
          class="s mt-5 inline-block px-4 py-2 border-2 border-[#0070FF] text-[#0070FF] hover:bg-[#0070FF] hover:text-white font-medium transition duration-300 ease-in-out rounded-lg"
          to="/doctors"
          >в личный кабинет</NuxtLink
        >
      </div>
      <div v-else-if="roleStore.role == 'doctor'">
        <NuxtLink
          class="s mt-5 inline-block px-4 py-2 border-2 border-[#0070FF] text-[#0070FF] hover:bg-[#0070FF] hover:text-white font-medium transition duration-300 ease-in-out rounded-lg"
          to="/doctorSchedule"
          >в личный кабинет</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
