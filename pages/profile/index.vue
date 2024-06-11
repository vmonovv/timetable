<template>
  <TheHeader />
  <div class="container">
    <div class="flex justify-center items-center h-[100vh] flex-col">
      <h1 class="mt-5 t">Мария Сергеевна, добро пожаловать</h1>
      <p class="s mt-4 text-[#676767] ">Вы авторизировались, как врач</p>
      <div>
        <NuxtLink
          class="s mt-5 inline-block px-4 py-2 border-2 border-[#0070FF] text-[#0070FF] hover:bg-[#0070FF] hover:text-white font-medium transition duration-300 ease-in-out rounded-lg"
          to="#"
          >в личный кабинет</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
