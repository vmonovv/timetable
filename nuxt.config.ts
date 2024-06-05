import dotenv from "dotenv";
dotenv.config();

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-swiper",
    "@pinia/nuxt",
    "shadcn-nuxt",
    "@nuxtjs/supabase",
  ],
});