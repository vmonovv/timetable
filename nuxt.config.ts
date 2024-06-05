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
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/",
    },
  },
});
