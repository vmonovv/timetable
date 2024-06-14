<script setup lang="ts">
import type { Row } from "@tanstack/vue-table";
import { types } from "@/data/data";
import { taskSchema } from "@/data/schema";
import type { Task } from "@/data/schema";
const props = defineProps<DataTableRowActionsProps>();
interface DataTableRowActionsProps {
  row: Row<Task>;
}
const tokenRef = ref<string>("");

const alertRef = ref(false);
const alertRefY = ref(false);
const mainModalityRef = ref<string>("");
const modalityMain = [
  { value: "Рабочий день" },
  { value: "Выходной" },
  { value: "Форс мажор" },
  { value: "Отпуск" },
];

const startTimeRef = ref<string>("");
const endTimeRef = ref<string>("");
const break_minutesRef = ref<number>(0);
const hours_workedRef = ref<string>("");
const day_typeRef = ref<string[]>([]);

const initializeRefs = () => {};

const isLoadingStore = useIsLoadingStore();
console.log(props.row.original);
async function onSubmit(event: Event) {
  event.preventDefault();
  isLoadingStore.set(true);

  try {
    const response = await $fetch(
      `http://176.109.104.88:80/manager/doctor/schedule`,
      {
        method: "PUT",
        body: {
          start_time: props.row.original.start_time,
          end_time: props.row.original.end_time,
          break_minutes: props.row.original.break_minutes,
          hours_worked: props.row.original.hours_worked,
          day_type: props.row.original.day_type,
        },
        headers: {
          Authorization: `Bearer ${tokenRef.value}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (
      response.message ===
      "Doctor created successfully and approval ticket generated"
    ) {
      alertRef.value = true;
      clearFields();
      setTimeout(() => {
        alertRef.value = false;
      }, 5000);
    } else {
      alertRefY.value = true;
      setTimeout(() => {
        alertRefY.value = false;
      }, 5000);
    }
  } catch (error) {
    alertRefY.value = true;
    setTimeout(() => {
      alertRefY.value = false;
    }, 5000);
    console.error("Ошибка при отправке данных:", error);
  } finally {
    isLoadingStore.set(false);
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
      >
        <Icon class="h-4 w-4" name="mdi:dots-horizontal" />

        <span class="sr-only">Открыть меню</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="">
      <div>
        <div class="flex justify-center">
          <!-- <Alert
            v-if="alertRef"
            class="fixed right-4 bottom-4 z-[999] max-w-[300px]"
            variant="done"
          >
            <Icon name="ic:outline-done" class="w-4 h-4" />
            <AlertTitle class="">Успешно</AlertTitle>
            <AlertDescription> Врач {{ fullNameRef }} создан </AlertDescription>
          </Alert>
          <Alert
            v-if="alertRefY"
            class="fixed right-4 bottom-4 z-[999] max-w-[300px]"
            variant="destructive"
          >
            <Icon name="ic:round-report-gmailerrorred" class="w-4 h-4" />
            <AlertTitle class="">Ошибка</AlertTitle>
            <AlertDescription>
              Врач {{ fullNameRef }} был создан ранее
            </AlertDescription>
          </Alert> -->
          <Sheet>
            <SheetTrigger>
              <div class="text-[14px] pl-2">Изменить</div>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle
                  >Изменение расписания {{ props.row.original.date }}
                </SheetTitle>
                <SheetDescription>
                  Нажмите изменить, когда вы закончите.
                </SheetDescription>
              </SheetHeader>
              <form @submit="onSubmit">
                <div class="grid gap-4 py-4">
                  <div class="items-center gap-4">
                    <Label for="name" class="text-right"
                      >Начало рабочего дня</Label
                    >

                    <Input
                      type="text"
                      required
                      v-model="props.row.original.start_time"
                      id="name"
                      class="col-span-2"
                    />
                  </div>
                  <div class="items-center gap-4">
                    <Label for="name" class="text-right"
                      >Окончание рабочего дня</Label
                    >

                    <Input
                      type="text"
                      required
                      v-model="props.row.original.end_time"
                      id="name"
                      class="col-span-2"
                    />
                  </div>
                  <div class="items-center gap-4">
                    <Label for="name" class="text-right"
                      >Окончание рабочего дня</Label
                    >

                    <Input
                      type="text"
                      required
                      v-model="props.row.original.hours_worked"
                      id="name"
                      class="col-span-2"
                    />
                  </div>
                  <div class="items-center gap-4">
                    <Label for="mainModalityRef" class="text-right">
                      Тип
                    </Label>
                    <Select v-model="mainModalityRef">
                      <SelectTrigger class="w-full">
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            v-for="item in modalityMain"
                            :key="item.value"
                            :value="item.value"
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
                    Изменить
                  </Button>
                </div>
              </form>

              <SheetFooter></SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
