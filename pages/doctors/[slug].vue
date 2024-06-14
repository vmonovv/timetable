<script setup lang="ts">
import { onMounted, ref } from "vue";

import juneData from "@/data/schedule/june.json";
import julyData from "@/data/schedule/july.json";
import augustData from "@/data/schedule/august.json";

import DataTable from "../components/doctors/schedule/DataTable.vue";
import UserNav from "../components/UserNav.vue";
import { columns } from "../components/doctors/schedule/columns";

interface Doctor {
  id: string;
  full_name: string;
  experience: string;
  main_modality: string;
  additional_modalities: string[];
}

const authStore = useAuthStore();
const doctorsListStore = useDoctorsList();
const tokenRef = ref("");
const route = useRoute();
const schedule = ref();
const doctorRef = ref("");
const slug = route.params.slug as string;

onMounted(async () => {
  await authStore.initialize();
  tokenRef.value = authStore.user.access_token;
  await doctorsListStore.fetchUserData();
  doctorRef.value =
    doctorsListStore.doctors_list.find((doctor) => doctor.id === slug) || null;

  if (!doctorRef.value) {
    route.push("/404");
  }

  try {
    const response = await $fetch(
      `http://176.109.104.88:80/doctor/${doctorRef.value.id}/schedule?year=2024&month=7`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenRef.value}`,
        },
      }
    );
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
  } finally {
  }
});

// {
//     "half_month_hours": 14.0,
//     "schedule": [
//         {
//             "break_minutes": 60,
//             "date": "2024-07-01",
//             "end_time": "17:00",
//             "hours_worked": 7.0,
//             "start_time": "09:00"
//         },
//         {
//             "break_minutes": 60,
//             "date": "2024-07-02",
//             "end_time": "17:00",
//             "hours_worked": 7.0,
//             "start_time": "09:00"
//         }
//     ],
//     "total_month_hours": 14.0
// }
</script>

<template>
  <div v-if="tokenRef">
    <TheHeader />
    <div class="container">
      <div class="hidden h-full flex-1 flex-col pb-8 md:flex">
        <div class="hidden h-full flex-1 flex-col pt-8 md:flex pb-16">
          <div class="flex items-center justify-between space-y-2 pb-6">
            <div>
              <h2 class="text-2xl font-bold tracking-tight text-[#2463EB]">
                {{ doctorRef.full_name }}
                <span class="inline-block relative -top-1 ml-2">
                  <Badge
                    v-if="doctorRef.status == 'Активный'"
                    class="text-xs font-normal bg-[#ECFDF3] text-[#037847] border-0 px-3 py-2"
                    variant="outline"
                  >
                    {{ doctorRef.status }}
                  </Badge>
                  <Badge
                    v-else-if="doctorRef.status == 'В отпуске'"
                    class="text-xs bg-[#FFEFC7] text-[#F4B003] border-0 font-normal order-0 px-3 py-2"
                    variant="outline"
                  >
                    {{ item.status }}
                  </Badge>
                </span>
              </h2>
              <div class="text-muted-foreground">
                <div class="font-normal text-[#636363]">
                  <div class="">
                    <div class="mt-1">Стаж: {{ doctorRef.experience }}</div>
                  </div>
                  <div class="mt-2">
                    <div class="mr-4 flex">
                      <div class="text-[#636363]">Основная Модальность:</div>
                      <span class="pl-1 text-black">{{
                        doctorRef.main_modality
                      }}</span>
                    </div>
                    <div class="flex">
                      <div class="text-[#636363]">
                        Дополнительная модальность:
                      </div>
                      <div class="flex">
                        <div
                          class="mr-2"
                          v-for="modal in doctorRef.additional_modalities"
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
          </div>
          <DataTable :data="julyData" :columns="columns" />
        </div>
      </div>
    </div>
  </div>
  <LayoutsLoader v-else />
</template>
