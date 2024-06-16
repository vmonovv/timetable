<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import DataTable from "../components/doctors/schedule/DataTable.vue";
import UserNav from "../components/UserNav.vue";
import { columns } from "../components/doctors/schedule/columns";

interface Doctor {
  id: string | null;
  full_name: string | null;
  experience: string | null;
  main_modality: string | null;
  additional_modalities: string[] | null;
}

const authStore = useAuthStore();

const tokenRef = ref<string>("");
const route = useRoute();
const router = useRouter();
const scheduleRef = ref<any[]>([]);
const scheduleAllRef = ref<any[]>([]);

const slug = route.params.slug as string;

const currentMonth = ref<number>(new Date().getMonth() + 1);
const currentYear = ref<number>(new Date().getFullYear());




const fetchSchedule = async (year: number, month: number) => {


  try {
    const response = await $fetch(
      `http://176.109.104.88:80/doctor/schedule?year=${year}&month=${month}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenRef.value}`,
        },
      }
    );
    const schedule = response.schedule;
    // Функция для получения количества дней в месяце
    function daysInMonth(year, month) {
      return new Date(year, month, 0).getDate();
    }

    // Получаем количество дней в текущем месяце
    const totalDays = daysInMonth(year, month);
    const monthStr = month < 10 ? `0${month}` : month;

    // Создаем объект для быстрого поиска дат в расписании
    const scheduleMap = schedule.reduce((map, entry) => {
      map[entry.date] = entry;
      return map;
    }, {});

    // Заполняем отсутствующие даты
    for (let day = 1; day <= totalDays; day++) {
      const dayStr = day < 10 ? `0${day}` : day;
      const dateStr = `${year}-${monthStr}-${dayStr}`;

      if (!scheduleMap[dateStr]) {
        schedule.push({
          date: dateStr,
          start_time: "",
          day_type: "Выходной",
          break_minutes: 0,
          end_time: "",
          hours_worked: 0,
        });
      }
    }
    // Сортировка расписания по дате
    schedule.sort((a, b) => new Date(a.date) - new Date(b.date));

    console.log(schedule);
    if (response) {
      scheduleAllRef.value = response;
    }
    if (response && response.schedule) {
      scheduleRef.value = response.schedule;
    } else {
      console.error("Неправильный формат ответа от сервера");
      scheduleRef.value = [];
    }
  } catch (error) {
    console.error("пусто:", error);
    scheduleRef.value = [];
  }
};

const updateMonthAndYear = (newMonth: number) => {
  if (newMonth > 12) {
    currentYear.value += Math.floor((newMonth - 1) / 12);
    currentMonth.value = ((newMonth - 1) % 12) + 1;
  } else if (newMonth < 1) {
    currentYear.value += Math.ceil((newMonth - 1) / 12) - 1;
    currentMonth.value = 12 + ((newMonth - 1) % 12);
  } else {
    currentMonth.value = newMonth;
  }
  console.log(`Year: ${currentYear.value}, Month: ${currentMonth.value}`);
};

const monthName = computed(() => {
  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  return monthNames[currentMonth.value - 1];
});

watch(
  [currentMonth, currentYear],
  async ([newMonth, newYear], [oldMonth, oldYear]) => {
    if (newMonth !== oldMonth || newYear !== oldYear) {
      await fetchSchedule(newYear, newMonth);
    }
  }
);

onMounted(async () => {
  await authStore.initialize();
  tokenRef.value = authStore.user.access_token;


  //   if (!doctorRef.value) {
  //     router.push("/404");
  //     return;
  //   }

  await fetchSchedule(currentYear.value, currentMonth.value);
});
</script>
<template>
  <div >
    <TheHeader />
    <div class="container">
      <div class="hidden h-full flex-1 flex-col pb-8 md:flex">
        <div class="hidden h-full flex-1 flex-col pt-8 md:flex pb-16">
          <div class="flex items-center justify-between space-y-2 pb-6">
            <div>
              <h2 class="text-2xl font-bold tracking-tight text-[#2463EB]">
                {{ doctorRef?.full_name }}
                <span class="inline-block relative -top-1 ml-2">
                  <Badge
                    v-if="doctorRef?.status == 'Активный'"
                    class="text-xs font-normal bg-[#ECFDF3] text-[#037847] border-0 px-3 py-2"
                    variant="outline"
                  >
                    {{ doctorRef.status }}
                  </Badge>
                  <Badge
                    v-else-if="doctorRef?.status == 'В отпуске'"
                    class="text-xs bg-[#FFEFC7] text-[#F4B003] border-0 font-normal order-0 px-3 py-2"
                    variant="outline"
                  >
                    {{ doctorRef.status }}
                  </Badge>
                </span>
              </h2>
              <div class="text-muted-foreground">
                <div class="font-normal text-[#636363]">
                  <div class="">
                    <div class="mt-1">Стаж: {{ doctorRef?.experience }}</div>
                  </div>
                  <div class="mt-2">
                    <div class="mr-4 flex">
                      <div class="text-[#636363]">Основная Модальность:</div>
                      <span class="pl-1 text-black">{{
                        doctorRef?.main_modality
                      }}</span>
                    </div>
                    <div class="flex">
                      <div class="text-[#636363]">
                        Дополнительная модальность:
                      </div>
                      <div class="flex">
                        <div
                          class="mr-2"
                          v-for="modal in doctorRef?.additional_modalities"
                          :key="modal"
                        >
                          <span class="pl-1 text-black">{{ modal }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
             
            </div>
          </div>
          <DataTable :data="scheduleRef" :columns="columns" />
        </div>
        <div
          class="fixed container bg-white pb-[40px] pt-[20px] w-full flex items-center justify-between bottom-0 right-6"
        >
          <div class="text-[15px] text-[#636363] font-normal">
            Отработка за пол месяца:
            <span class="font-medium text-black"
              >{{ scheduleAllRef.half_month_hours }}ч</span
            >
          </div>

          <div class="text-[#636363] text-[15px] font-normal">
            Отработка за месяц:
            <span class="font-medium text-black"
              >{{ scheduleAllRef.total_month_hours }}ч</span
            >
          </div>

          <div class="flex items-center">
            <div class="mr-5 font-medium">
              {{ monthName }} {{ currentYear }}
            </div>
            <Pagination
              v-slot="{ page }"
              :default-page="currentMonth"
              @update:page="(page) => updateMonthAndYear(page)"
            >
              <PaginationList
                v-slot="{ items }"
                class="flex items-center gap-1"
              >
                <PaginationPrev />

                <PaginationNext />
              </PaginationList>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
