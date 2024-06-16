<script setup lang="ts">
import { defineProps } from "vue";

const authStore = useAuthStore();
const doctorsListStore = useDoctorsList();
const roleStore = useRoleStore();
const tokenRef = ref<string>("");
const props = defineProps({
  doctor: Object,
});

onMounted(async () => {
  await authStore.initialize(); // Предполагая, что это асинхронная операция
  tokenRef.value = authStore.user.access_token;
  await doctorsListStore.fetchUserData();
});

const del = async () => {
  await roleStore.fetchUserData();
  if (roleStore.role == "manager") {
    const response = await $fetch(
      `http://176.109.104.88:80/manager/doctor/${props.doctor.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenRef.value}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (
      response.message ===
      " Doctor deleted successfully and deletion ticket generated"
    ) {
      alert("Доктор удалён");
    } else {
      alert("Доктор удалён");
    }

    await doctorsListStore.fetchUserData();
  } else if (roleStore.role == "hr") {
    const response = await $fetch(
      `http://176.109.104.88:80/hr/doctor/${props.doctor.id}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenRef.value}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (
      response.message ===
      " Doctor deleted successfully and deletion ticket generated"
    ) {
      alert("Запрос на удаление доктора отправлен");
    } else {
      alert("Запрос на удаление доктора отправлен");
    }
  }
};
</script>
<template>
  <AlertDialog>
    <AlertDialogTrigger class="text-[14px] pl-2">Удалить</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle
          >Вы уверены, что хотите удалить пользователя?</AlertDialogTitle
        >
        <AlertDialogDescription>
          После удаления, он будет очищен из базы данных без возможности
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
