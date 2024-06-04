<script setup lang="ts">
// import UserAuthForm from "./components/UserAuthForm.vue";
// import { cn } from "@/lib/utils";
</script>

<template>
  <div>
    <div
      class="container relative h-[100vh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0"
    >
      <Button
        href="#"
        class="absolute right-4 top-4 md:right-8 md:top-8"
        variant="ghost"
      >
        Регистрация
      </Button>
      <div
        class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
      >
        <div class="absolute inset-0 bg-[#0070FF]" />
        <div class="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            class="mr-2 h-6 w-6"
          >
            <path
              d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
            />
          </svg>
          SUCH Расписание
        </div>
        <div class="relative z-20 mt-auto">
          <blockquote class="space-y-2">
            <p class="text-lg max-w-[500px]">
              &ldquo;Сервис автоматизации составления графика работы
              врачей-рентгенологов&rdquo;
            </p>
            <footer class="text-sm">
              <a target="_blank" href="https://such.ae">such.ae</a>
            </footer>
          </blockquote>
        </div>
      </div>
      <div class="lg:p-8">
        <div
          class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
        >
          <div class="flex flex-col space-y-2 text-center">
            <h1 class="text-2xl font-semibold tracking-tight">
              Войти в аккаунт
            </h1>
            <p class="text-sm text-muted-foreground">
              Введите свой адрес электронной почты и пароль ниже, чтобы войти в
              свою учетную запись
            </p>
          </div>
          <UserAuthForm />
          <p class="px-8 text-center text-sm text-muted-foreground">
            Нажав продолжить, вы соглашаетесь с нашими условиями.
            <a href="#" class="underline underline-offset-4 hover:text-primary">
              Политика&nbsp;конфиденциальности
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
