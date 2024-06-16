<script setup lang="ts">
import Overview from "@/components/dashboard/Overview.vue";
import DateRangePicker from "~/components/dashboard/DateRangePicker.vue";
import RecentSales from "@/components/dashboard/RecentSales.vue";
import Search from "@/components/dashboard/Search.vue";
import analyticsType from "@/data/analytics/type.json";
import analyticsQuantity from "@/data/analytics/quantity.json";
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
  today,
  createCalendar,
  toCalendar,
} from "@internationalized/date";

import { cn } from "@/lib/utils";

const roleStore = useRoleStore();
const df = new DateFormatter("ru-RU", {
  dateStyle: "long",
});
const router = useRouter();
const value = ref(today(getLocalTimeZone())) as Ref<DateValue>;
function getNextWeek(date) {
  if (date) {
    const nextWeek = new Date(date);
    nextWeek.setDate(nextWeek.getDate() + 6);
    return nextWeek;
  }
  return null;
}

const isLoadingStore = useIsLoadingStore();

interface AnalyticsItem {
  type: string;
  quantity: number;
  isEnough: boolean;
  isFixable: boolean;
  lack: number;
}
const calculateProgress = (item: AnalyticsItem): number => {
  const total = item.quantity + item.lack;
  if (total === 0) {
    return 0;
  }
  return (item.quantity / total) * 100;
};

const colorProgress = (item: AnalyticsItem): string => {
  let color = "isEnough";
  if (item.isEnough) {
    color = "isEnough";
  } else if (item.isFixable) {
    color = "isFixable";
  } else {
    color = "isDanger";
  }
  return color;
};

const data = [
  {
    name: "Денс",
    Количество: 1970,
  },
  {
    name: "КТ",
    Количество: 4437,
    "С КУ 1 Зона": 508,
    "С КУ 2 и более зон": 541,
  },
  {
    name: "МРТ",
    Количество: 1675,
    "С КУ 1 Зона": 817,
    "С КУ 2 и более зон": 14,
  },
];
const data1 = [
  {
    name: "ММГ",
    Количество: 19061,
  },
  {
    name: "РГ",
    Количество: 67021,
  },
  {
    name: "ФЛГ",
    Количество: 40364,
  },
];

const authStore = useAuthStore();
const tokenRef = ref("");
const counts = ref<any>("");
const transformedData = ref<ExportData | null>(null);
const transformedDataTwo = ref<ExportData | null>(null);
onMounted(async () => {
  await roleStore.fetchUserData();
  if (!(roleStore.role == "manager")) {
    router.push("/doctors");
  }
  await authStore.initialize(); // Предполагая, что это асинхронная операция
  tokenRef.value = authStore.user.access_token;

  const response = await $fetch(
    `http://176.109.104.88:80/manager/study_counts?year=${value.value.year}&week_number=10`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenRef.value}`,
      },
    }
  );

  const transformData = (response: any): any[] => {
    return [
      {
        name: "Денс",
        Количество: Math.round(response.densitometry),
      },
      {
        name: "КТ",
        Количество: Math.round(response.ct),
        "С КУ 1 Зона": Math.round(response.ct_with_cu_1_zone),
        "С КУ 2 и более зон": Math.round(response.ct_with_cu_2_or_more_zones),
      },
      {
        name: "МРТ",
        Количество: Math.round(response.mrt),
        "С КУ 1 Зона": Math.round(response.mrt_with_cu_1_zone),
        "С КУ 2 и более зон": Math.round(response.mrt_with_cu_2_or_more_zones),
      },
    ];
  };
  const transformDataTwo = (response: any): any[] => {
    return [
      {
        name: "ММГ",
        Количество: Math.round(response.mmg),
      },
      {
        name: "РГ",
        Количество: Math.round(response.rg),
      },
      {
        name: "ФЛГ",
        Количество: Math.round(response.fluorography),
      },
    ];
  };
  transformedData.value = transformData(response);
  transformedDataTwo.value = transformDataTwo(response);
});

watch(value, (newValue, oldValue) => {
  // console.log("Выбранная дата изменилась:", newValue);
  // const response = await $fetch(
  //   `http://176.109.104.88:80/manager/study_counts?year=${value.value.year}&week_number=10`,
  //   {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${tokenRef.value}`,
  //     },
  //   }
  // );
});
</script>

<template>
  <TheHeader />

  <div v-if="tokenRef && roleStore.role == 'manager'" class="container">
    <div class="hidden flex-col md:flex">
      <div class="flex-1 space-y-4 pb-6 pt-6">
        <div class="flex items-center justify-between space-y-2 pb-6">
          <div>
            <h2 class="text-2xl font-bold tracking-tight">Аналитика</h2>
            <p class="text-muted-foreground">
              Обзор аналитических отчетов и прогнозов по врачам
            </p>
          </div>
          <div class="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger as-child>
                <Button
                  variant="outline"
                  :class="
                    cn(
                      'w-[325px] justify-center text-left font-normal',
                      !value && 'text-muted-foreground'
                    )
                  "
                >
                  <CalendarIcon class="mr-2 h-4 w-4 -mt-1" />
                  {{
                    value
                      ? df.format(value.toDate(getLocalTimeZone()))
                      : "Выбрать дату"
                  }}
                  {{
                    value
                      ? " - " +
                        df.format(getNextWeek(value.toDate(getLocalTimeZone())))
                      : ""
                  }}
                </Button>
              </PopoverTrigger>
              <PopoverContent class="flex w-auto flex-col gap-y-2 p-2">
                <Calendar v-model="value" />
              </PopoverContent>
            </Popover>

            <Button>Экспорт</Button>
          </div>
        </div>
        <Tabs default-value="overview" class="space-y-4">
          <TabsContent value="overview" class="space-y-4">
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card
                :class="{
                  'bg-[#FFE3E3]': !item.isEnough && !item.isFixable,
                }"
                v-for="item in analyticsType"
                :key="item.id"
              >
                <CardHeader class="pb-2">
                  <CardTitle class="text-sm font-medium">
                    {{ item.type }}
                  </CardTitle>
                  <CardTitle class="text-4xl flex items-center ml-0">
                    {{ item.quantity }}
                    <CardContent class="p-0 flex items-center">
                      <div
                        class="text-xs text-muted-foreground font-normal pl-2 -mb-2 tracking-[0.5px]"
                      >
                        врача(ей)
                      </div>
                    </CardContent></CardTitle
                  >
                </CardHeader>
                <CardFooter>
                  <Progress
                    :model-value="calculateProgress(item)"
                    :class="colorProgress(item)"
                    aria-label="15% increase"
                  />
                </CardFooter>
                <CardContent v-if="item.isEnough">
                  <div class="text-xs text-muted-foreground -mt-2">
                    Количество в норме
                  </div>
                </CardContent>
                <CardContent v-else-if="item.isFixable">
                  <div class="text-xs text-muted-foreground -mt-2">
                    Система сможет покрыть нехватку в {{ item.lack }}
                  </div>
                </CardContent>
                <CardContent v-else>
                  <div class="text-xs text-muted-foreground -mt-2">
                    Срочно! Ожидается нехватка в {{ item.lack }}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
              <Card class="col-span-3">
                <CardHeader>
                  <CardTitle>
                    <span class="text-[#787878] font-normal">
                      Предполагаемое количество исследований:</span
                    >
                    Денс, КТ, МРТ
                  </CardTitle>
                </CardHeader>
                <CardContent class="pl-6">
                  <BarChart
                    class="text-black fill-black"
                    :data="transformedData"
                    :categories="[
                      'Количество',
                      'С КУ 1 Зона',
                      'С КУ 2 и более зон',
                    ]"
                    :index="'name'"
                    :rounded-corners="4"
                    :y-formatter="
                      (tick, i) => {
                        return typeof tick === 'number'
                          ? `${new Intl.NumberFormat().format(tick).toString()}`
                          : '';
                      }
                    "
                  />
                </CardContent>
              </Card>
              <Card class="col-span-3">
                <CardHeader>
                  <CardTitle>
                    <span class="text-[#787878] font-normal"
                      >Предполагаемое количество исследований:
                    </span>
                    ММГ, ФЛГ, РТ
                  </CardTitle>
                </CardHeader>
                <CardContent class="pl-2">
                  <BarChart
                    class="text-black fill-black"
                    :data="transformedDataTwo"
                    :categories="['Количество']"
                    :index="'name'"
                    :rounded-corners="4"
                    :y-formatter="
                      (tick, i) => {
                        return typeof tick === 'number'
                          ? `${new Intl.NumberFormat().format(tick).toString()}`
                          : '';
                      }
                    "
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<style>
.isFixable .indicator {
  background: #2463eb;
}

.isFixable .indicator {
  background: #eb7824;
}
.isDanger .indicator {
  background: #eb2424;
}
.css-1w4dk9t-tick text {
  fill: #828080 !important;
}
</style>
