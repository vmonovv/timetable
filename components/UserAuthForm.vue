<script setup lang="ts">
import { ref } from "vue";
// import LucideSpinner from "~icons/lucide/loader-2";
// import GitHubLogo from "~icons/radix-icons/github-logo";

import { cn } from "@/lib/utils";

const isLoading = ref(false);
async function onSubmit(event: Event) {
  event.preventDefault();
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email"> Email </Label>
          <Input
            id="email"
            placeholder="Email"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
          />
          <Input
            id="password"
            placeholder="Пароль"
            type="password"
            auto-capitalize="none"
            auto-complete="email"
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