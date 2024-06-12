<script setup lang="ts">
import { cn } from "@/lib/utils";
import { ref } from "vue"; // Import ref from vue

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const emailRef = ref("");
const passwordRef = ref("");
const error = ref(""); // Define a reactive variable for error message
const router = useRouter();

interface LoginResponse {
  access_token: string;
}

async function onSubmit(event: Event) {
  isLoadingStore.set(true);
  event.preventDefault();
  try {
    const response: LoginResponse = await $fetch(
      "http://176.109.104.88:80/login",
      {
        method: "POST",
        body: {
          email: emailRef.value,
          password: passwordRef.value,
        },
      }
    );
    if (response) {
      authStore.set({
        access_token: response.access_token,
        email: "",
        name: "",
        status: true,
      });
      await router.push("/");
    }
  } catch (error) {
    // console.error("Ошибка при входе:", error);
    // // Update the error message based on the error response from the server
    // if (error.response && error.response.status === 401) {
    //   error.value = "Неверный email или пароль"; // Display error message for incorrect email or password
    // } else {
    //   error.value = "Ошибка при входе. Пожалуйста, попробуйте еще раз.";
    // }
  } finally {
    emailRef.value = "";
    passwordRef.value = "";
    isLoadingStore.set(false);
  }
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email">Email</Label>
          <Input
            v-model="emailRef"
            id="email"
            placeholder="Email"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoadingStore.isLoading"
            required
          />
          <!-- <div v-if="error && errorField === 'email'" class="text-red-500">
            {{ errorMessage }}
          </div> -->

          <Input
            v-model="passwordRef"
            id="password"
            placeholder="Пароль"
            type="password"
            auto-capitalize="none"
            auto-complete="current-password"
            auto-correct="off"
            :disabled="isLoadingStore.isLoading"
            required
          />
          <!-- <div v-if="error && errorField === 'password'" class="text-red-500">
            {{ errorMessage }}
          </div> -->
        </div>
        <Button :disabled="isLoadingStore.isLoading">
          <Icon
            v-if="isLoadingStore.isLoading"
            class="mr-2 h-4 w-4 animate-spin"
            name="svg-spinners:90-ring-with-bg"
            color="black"
          />
          Войти
        </Button>
        <div v-if="error" class="text-red-500">{{ error }}</div>
        <!-- Display error message -->
      </div>
    </form>
    <!-- Rest of your template -->
  </div>
</template>
