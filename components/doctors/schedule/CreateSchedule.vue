<script setup lang="ts">
import type { Row } from "@tanstack/vue-table";
import { types } from "@/data/data";
import { taskSchema } from "@/data/schema";
import type { Task } from "@/data/schema";
import { ref, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";

const alertRef = ref(false);
const alertRefError = ref(false);
const tokenRef = ref<string>("");
const mainModalityRef = ref<string>("");
const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const props = defineProps({
  schedule: Object,
});
const route = useRoute();
const router = useRouter();
const id = route.params.slug as string;
const startTimeRef = ref<string>("");
const endTimeRef = ref<string>("");
const break_minutesRef = ref<number>(0);
const hours_workedRef = ref<number>(0);
const day_typeRef = ref<string>("");
const dateRef = ref<string>("");

dateRef.value = props.schedule.date;
startTimeRef.value = props.schedule.start_time || "";
endTimeRef.value = props.schedule.end_time || "";
break_minutesRef.value = props.schedule.break_minutes || 0;
hours_workedRef.value = props.schedule.hours_worked || 0;
day_typeRef.value = props.schedule.day_type || "";

const modalityMain = [
  { type: "EMERGENCY", value: "Непредвиденная ситуация" },
  { type: "WORKING_DAY", value: "Рабочий день" },
  { type: "VACATION", value: "Отпуск" },
];

async function onSubmit(event: Event) {
  event.preventDefault();
  isLoadingStore.set(true);
  await authStore.initialize(); // Предполагая, что это асинхронная операция
  tokenRef.value = authStore.user.access_token;

  try {
    const response = await $fetch(
      `http://176.109.104.88:80/manager/doctor/${id}/schedule`,
      {
        method: "PUT",
        body: JSON.stringify({
          date: dateRef.value,
          start_time: startTimeRef.value,
          end_time: endTimeRef.value,
          break_minutes: break_minutesRef.value,
          hours_worked: hours_workedRef.value,
          day_type: day_typeRef.value,
        }),
        headers: {
          Authorization: `Bearer ${tokenRef.value}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.message);
    if (response.message === "Schedule created successfully") {
      alertRef.value = true;
      clearFields();

      setTimeout(() => {
        alertRef.value = false;
      }, 5000);
    } else if (response.message === "Schedule updated successfully") {
      alertRef.value = true;
      clearFields();

      setTimeout(() => {
        alertRef.value = false;
      }, 5000);
    } else {
      alertRefError.value = true;

      setTimeout(() => {
        alertRefError.value = false;
      }, 5000);
    }
  } catch (error) {
    alertRefError.value = true;
    setTimeout(() => {
      alertRefError.value = false;
    }, 5000);

    console.error("Ошибка при отправке данных:", error);
  } finally {
    isLoadingStore.set(false);
  }
}
function clearFields() {
  dateRef.value = "";
  startTimeRef.value = "";
  endTimeRef.value = "";
  break_minutesRef.value = 0;
  hours_workedRef.value = 0;
  day_typeRef.value = "";
}
</script>

<template>
  <div>
    <Alert
      v-if="alertRef"
      class="fixed right-4 bottom-4 z-[999] max-w-[300px]"
      variant="done"
    >
      <Icon name="ic:outline-done" class="w-4 h-4" />
      <AlertTitle class="">Успешно</AlertTitle>
      <AlertDescription>
        Расписание добавлено, перезагрузите страницу, чтобы увидеть изменения
      </AlertDescription>
    </Alert>
    <Alert
      v-if="alertRefError"
      class="fixed right-4 bottom-4 z-[999] max-w-[300px]"
      variant="destructive"
    >
      <Icon name="ic:round-report-gmailerrorred" class="w-4 h-4" />
      <AlertTitle class="">Ошибка</AlertTitle>
      <AlertDescription> Расписание не было добавлено </AlertDescription>
    </Alert>
    <Sheet>
      <SheetTrigger>
        <Button size="sm" class="h-7 gap-1">
          <Icon class="h-4 w-4" name="ic:round-add-circle-outline" />
          <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Добавить расписание
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Добавление расписания </SheetTitle>
          <SheetDescription>
            Нажмите добавить, когда вы закончите.
          </SheetDescription>
        </SheetHeader>
        <form @submit="onSubmit">
          <div class="grid gap-4 py-4">
            <div class="items-center gap-4">
              <Label for="date" class="text-right">Дата</Label>
              <Input
                type="date"
                required
                v-model="dateRef"
                id="date"
                class="col-span-2"
              />
            </div>
            <div class="items-center gap-4">
              <Label for="start_time" class="text-right"
                >Начало рабочего дня</Label
              >
              <Input
                type="time"
                required
                v-model="startTimeRef"
                id="start_time"
                class="col-span-2"
              />
            </div>
            <div class="items-center gap-4">
              <Label for="end_time" class="text-right"
                >Окончание рабочего дня</Label
              >
              <Input
                type="time"
                required
                v-model="endTimeRef"
                id="end_time"
                class="col-span-2"
              />
            </div>
            <div class="items-center gap-4">
              <Label for="hours_worked" class="text-right">Отработка (ч)</Label>
              <Input
                type="number"
                min="0"
                step="0.05"
                required
                v-model="hours_workedRef"
                id="hours_worked"
                class="col-span-2"
              />
            </div>
            <div class="items-center gap-4">
              <Label for="break_minutes" class="text-right"
                >Перерыв (мин)</Label
              >
              <Input
                type="number"
                min="0"
                required
                v-model="break_minutesRef"
                id="break_minutes"
                class="col-span-2"
              />
            </div>
            <div class="items-center gap-4">
              <Label for="day_type" class="text-right">Тип</Label>
              <Select v-model="day_typeRef">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="item in modalityMain"
                      :key="item.type"
                      :value="item.type"
                    >
                      {{ item.value }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div class="flex justify-end">
            <Button
              size="sm"
              class="h-7 gap-1"
              :disabled="isLoadingStore.isLoading"
            >
              <Icon
                v-if="isLoadingStore.isLoading"
                class="mr-2 h-4 w-4 animate-spin"
                name="svg-spinners:90-ring-with-bg"
                color="black"
              />
              Добавить
            </Button>
          </div>
        </form>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
</template>
