<script setup lang="ts">
const supabase = useSupabaseClient();
import { cn } from "@/lib/utils";

const isLoading = ref(false);
const email = ref("");
const password = ref("");
const error = ref("");

async function onSubmit(event: Event) {
  event.preventDefault();
  isLoading.value = true;
  error.value = "";

  const { data, error: loginError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (loginError) {
    error.value = loginError.message;
  } else {
    
    console.log("Logged in successfully:", data.user);
  }

  isLoading.value = false;
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email">Email</Label>
          <Input
            v-model="email"
            id="email"
            placeholder="Email"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
          />
          <Input
            v-model="password"
            id="password"
            placeholder="Пароль"
            type="password"
            auto-capitalize="none"
            auto-complete="current-password"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>
        <Button :disabled="isLoading">
          <Icon
            v-if="isLoading"
            class="mr-2 h-4 w-4 animate-spin"
            name="svg-spinners:90-ring-with-bg"
            color="black"
          />
          Войти
        </Button>
        <div v-if="error" class="text-red-500">{{ error }}</div>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          Или продолжить с
        </span>
      </div>
    </div>
    <Button variant="outline" type="button" :disabled="isLoading">
      <Icon
        v-if="isLoading"
        class="mr-2 h-4 w-4 animate-spin"
        name="svg-spinners:90-ring-with-bg"
        color="black"
      />
      <Icon
        v-else
        class="mr-2 h-4 w-4 text-[#FF0000]"
        name="fa6-brands:yandex"
      />
      Яндекс ID
    </Button>
  </div>
</template>
