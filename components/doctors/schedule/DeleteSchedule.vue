<script setup lang="ts">
import { defineProps } from "vue";

const authStore = useAuthStore();
const doctorsListStore = useDoctorsList();
const tokenRef = ref<string>("");
const props = defineProps({
  doctor: Object,
});
const route = useRoute();

const id = route.params.slug as string;
onMounted(async () => {
  await authStore.initialize(); // Предполагая, что это асинхронная операция
  tokenRef.value = authStore.user.access_token;
  await doctorsListStore.fetchUserData();
});

const del = async () => {
  const response = await $fetch(
    `http://176.109.104.88:80/manager/doctor/${id}/schedule/2024-06-29`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokenRef.value}`,
        "Content-Type": "application/json",
      },
    }
  );
  await doctorsListStore.fetchUserData();
};
</script>
<template>
  <AlertDialog>
    <AlertDialogTrigger class="text-[14px] pl-2">Удалить</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle
          >Вы уверены, что хотите удалить расписание?</AlertDialogTitle
        >
        <AlertDialogDescription>
          После удаления, оно будет очищено из базы данных без возможности
          восстановления
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Отмена</AlertDialogCancel>
        <AlertDialogAction @click="del(item)">Удалить</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<style lang="scss" scoped></style>
