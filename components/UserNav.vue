<script setup lang="ts">
const router = useRouter();
const authStore = useAuthStore();
const roleTranslations = {
  manager: "Руководитель референс-центра",
  hr: "Сотрудник кадровой службы",
  doctor: "Врач",
};
const logout = async () => {
  try {
    await authStore.initialize(); // Предполагая, что это асинхронная операция
    const token = authStore.user.access_token;

    // Отправка запроса на выход из системы
    const response = await $fetch("http://176.109.104.88:80/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Очистка данных аутентификации
    await authStore.clear();

    // Переход на страницу входа
    await router.push("/login");
  } catch (error) {
    console.error("Ошибка ", error);
  }
};
const userName = useNameStore();
const roleStore = useRoleStore();
onMounted(async () => {
  try {
    await roleStore.fetchUserData();
    await userName.fetchUserData();
  } catch (error) {
    console.error("Ошибка при получении данных о пользователе:", error);
    // Дополнительная обработка ошибок, если нужно
  }
});
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="relative h-8 w-8 rounded-full">
        <Avatar class="h-10 w-10">
          <AvatarImage src="/avatars/03.png" alt="@shadcn" />
          <AvatarFallback>МС</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuLabel class="font-normal flex">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">
            {{ userName.first_name }} {{ userName.father_name }}
          </p>
          <p class="text-xs leading-none text-muted-foreground">
            {{ roleTranslations[roleStore.role] }}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <NuxtLink to="/profile">Профиль</NuxtLink>
          <!-- <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> -->
        </DropdownMenuItem>
        <!-- <DropdownMenuItem>
          Billing
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem> -->
        <!-- <DropdownMenuItem>
          Settings
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem> -->
        <!-- <DropdownMenuItem>New Team</DropdownMenuItem> -->
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="cursor-pointer" @click="logout">
        Выйти
        <!-- <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> -->
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
