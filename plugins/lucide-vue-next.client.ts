import { Calendar as CalendarIcon } from "lucide-vue-next"; // Импортируем иконку Calendar из lucide-vue-next
export default defineNuxtPlugin((nuxtApp) => {
  // Используем иконку Calendar в качестве компонента
  nuxtApp.vueApp.component("CalendarIcon", CalendarIcon);
});
