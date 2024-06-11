<script setup lang="ts">
import Overview from "@/components/dashboard/Overview.vue";
import DateRangePicker from "~/components/dashboard/DateRangePicker.vue";
import RecentSales from "@/components/dashboard/RecentSales.vue";
import Search from "@/components/dashboard/Search.vue";
import analyticsType from "@/data/analytics/type.json";
import analyticsQuantity from "@/data/analytics/quantity.json";

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
// "isEnough": false,
//     "isFixable": true,
// analytics.forEach((item) => {
//   console.log(`Progress for ${item.type}: ${calculateProgress(item)}%`);
// });

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
</script>

<template>
  <TheHeader />

  <div class="container">
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
            <!-- <Pagination
             v-slot="{ page }"
              :total="100"
              :sibling-count="1"
              show-edges
              :default-page="2"
            >
           
              <PaginationList
                v-slot="{ items }"
                class="flex items-center gap-1"
              >
                <PaginationFirst />
                <PaginationPrev />

                <template v-for="(item, index) in items">
                  <PaginationListItem
                    v-if="item.type === 'page'"
                    :key="index"
                    :value="item.value"
                    as-child
                  >
                    <Button
                      class="w-9 h-9 p-0"
                      :variant="item.value === page ? 'default' : 'outline'"
                    >
                      {{ item.value }}
                    </Button>
                  </PaginationListItem>
                  <PaginationEllipsis v-else :key="item.type" :index="index" />
                </template>

                <PaginationNext />
                <PaginationLast />
              </PaginationList>
            </Pagination> -->

            <!-- :table="table" -->
            <DateRangePicker />
            <!-- <Cal/> -->
            <Button>Экспорт</Button>
          </div>
        </div>
        <Tabs default-value="overview" class="space-y-4">
          <!-- <TabsList>
            <TabsTrigger value="overview"> Overview </TabsTrigger>
            <TabsTrigger value="analytics" disabled> Analytics </TabsTrigger>
            <TabsTrigger value="reports" disabled> Reports </TabsTrigger>
            <TabsTrigger value="notifications" disabled>
              Notifications
            </TabsTrigger>
          </TabsList> -->
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
              <Card
                v-for="item in analyticsQuantity"
                :key="item.id"
                class="col-span-3"
              >
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
                    :data="data"
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
                    :data="data1"
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
              <!-- <Card class="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card> -->
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
