<script setup lang="ts">
import type { Row } from "@tanstack/vue-table";
import { types } from "@/data/data";
import { taskSchema } from "@/data/schema";
import type { Task } from "@/data/schema";
const props = defineProps<DataTableRowActionsProps>();
interface DataTableRowActionsProps {
  row: Row<Task>;
}
const roleStore = useRoleStore();
const authStore = useAuthStore();
const tokenRef = ref<string>("");
const route = useRoute();
const router = useRouter();
const id = route.params.slug as string;
const alertRef = ref(false);
const alertRefY = ref(false);
const mainModalityRef = ref<string>("");
const modalityMain = [
  { type: "EMERGENCY", value: "Непредвиденная ситуация" },
  { type: "WORKING_DAY", value: "Рабочий день" },
  { type: "VACATION", value: "Отпуск" },
];

const startTimeRef = ref<string>("");
const endTimeRef = ref<string>("");
const break_minutesRef = ref<number>(0);
const hours_workedRef = ref<string>("");
const day_typeRef = ref<string[]>([]);

const initializeRefs = () => {};

const isLoadingStore = useIsLoadingStore();

// onMounted(async () => {
//   await roleStore.fetchUserData();
// });

async function onSubmit(event: Event) {
  event.preventDefault();
  isLoadingStore.set(true);
  await authStore.initialize();
  tokenRef.value = authStore.user.access_token;

  try {
    const response = await $fetch(
      `http://176.109.104.88:80/manager/doctor/${id}/schedule`,
      {
        method: "PUT",
        body: JSON.stringify({
          date: props.row.original.date,
          start_time: props.row.original.start_time,
          end_time: props.row.original.end_time,
          break_minutes: props.row.original.break_minutes,
          hours_worked: props.row.original.hours_worked,
          day_type: props.row.original.day_type,
        }),
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
      alert("Расписание изменено");
      clearFields();
      setTimeout(() => {
        // alertRef.value = false;
      }, 5000);
    } else {
      alert(
        "Расписание обновлено, перезагрузите страницу, чтобы увидеть изменения"
      );
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

const del = async () => {
  try {
    await authStore.initialize();
    tokenRef.value = authStore.user.access_token;
    const response = await $fetch(
      `http://176.109.104.88:80/manager/doctor/${id}/schedule/${props.row.original.date}`,
      {
        method: "DELETE",
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
      alert(
        "Расписание удалено, перезагрузите страницу, чтобы увидеть изменения"
      );

      setTimeout(() => {
        // alertRef.value = false;
      }, 5000);
    } else {
      alert(
        "Расписание удалено, перезагрузите страницу, чтобы увидеть изменения"
      );

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
};
const weekend = ref(props.row.original.day_type);
const openMenu = async () => {
  await roleStore.fetchUserData();
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        @click="openMenu"
        variant="ghost"
        class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
      >
        <Icon class="h-4 w-4" name="mdi:dots-horizontal" />

        <span class="sr-only">Открыть меню</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="">
      <div>
        <div class="flex flex-col">
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
            <SheetTrigger v-if="!(weekend == 'Выходной') && roleStore.role == 'manager'">
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
                    <div class="items-center gap-4">
                      <Label for="start_time" class="text-right"
                        >Начало рабочего дня</Label
                      >
                      <Input
                        type="time"
                        required
                        v-model="props.row.original.start_time"
                        id="start_time"
                        class="col-span-2"
                      />
                    </div>
                  </div>
                  <div class="items-center gap-4">
                    <Label for="end_time" class="text-right"
                      >Окончание рабочего дня</Label
                    >
                    <Input
                      type="time"
                      required
                      v-model="props.row.original.end_time"
                      id="end_time"
                      class="col-span-2"
                    />
                  </div>
                  <div class="items-center gap-4">
                    <div class="items-center gap-4">
                      <Label for="hours_worked" class="text-right"
                        >Отработка</Label
                      >
                      <Input
                        type="number"
                        min="0"
                        step="0.05"
                        required
                        v-model="props.row.original.hours_worked"
                        id="hours_worked"
                        class="col-span-2"
                      />
                    </div>
                  </div>
                  <div class="items-center gap-4">
                    <Label for="mainModalityRef" class="text-right">
                      Тип
                    </Label>
                    <Select v-model="props.row.original.day_type">
                      <SelectTrigger class="w-full">
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            v-for="item in modalityMain"
                            :key="item.value"
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
                    Изменить
                  </Button>
                </div>
              </form>

              <SheetFooter></SheetFooter>
            </SheetContent>
          </Sheet>
          <Sheet v-if="!(weekend == 'Выходной') && roleStore.role == 'manager'">
            <AlertDialog>
              <AlertDialogTrigger class="text-[14px] pl-2"
                >Удалить</AlertDialogTrigger
              >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle
                    >Вы уверены, что хотите удалить
                    расписание?</AlertDialogTitle
                  >
                  <AlertDialogDescription>
                    После удаления, оно будет очищено из базы данных без
                    возможности восстановления
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                  <AlertDialogAction @click="del(item)"
                    >Удалить</AlertDialogAction
                  >
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Sheet>
        </div>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
