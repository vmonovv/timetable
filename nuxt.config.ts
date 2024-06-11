
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/fonts.css", "~/assets/css/style.css"],
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-swiper",
    "@pinia/nuxt",
    "shadcn-nuxt",
    // "@nuxtjs/supabase",
  ],
});
