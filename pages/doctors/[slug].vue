<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import doctors from "@/data/doctors.json"; // Убедитесь, что путь правильный

import juneData from "@/data/schedule/june.json";
import julyData from "@/data/schedule/july.json";
import augustData from "@/data/schedule/august.json";

import DataTable from "../components/doctors//schedule/DataTable.vue";
import UserNav from "../components/UserNav.vue";
import { columns } from "../components/doctors/schedule/columns";

interface Doctor {
  id: string;
  name: string;
  gender: string;
  status: string;
  experience: string;
  phone: string;
  who: string;
  mainModality: string;
  additionalModality: string;
}

const route = useRoute();
const doctor = ref<Doctor | null>(null);
const slug = route.params.slug as string;
doctor.value = doctors.find((doc) => doc.id === slug) || null;

// const months = [
//   { name: 'Июнь 2024', data: juneData },
//   { name: 'Июль 2024', data: julyData },
//   { name: 'Август 2024', data: augustData }
// ];

// const currentMonthIndex = ref(0);

// const currentMonth = computed(() => months[currentMonthIndex.value].name);
// const days = computed(() => months[currentMonthIndex.value].data);

// const previousMonth = () => {
//   if (currentMonthIndex.value > 0) {
//     currentMonthIndex.value--;
//   }
// };

// const nextMonth = () => {
//   if (currentMonthIndex.value < months.length - 1) {
//     currentMonthIndex.value++;
//   }
// };
</script>

<template>
  <div v-if="doctor">
    <TheHeader />
    <div class="container">
      <div class="hidden h-full flex-1 flex-col pb-8 md:flex">
        <div class="hidden h-full flex-1 flex-col pt-8 md:flex pb-16">
          <div class="flex items-center justify-between space-y-2 pb-6">
            <div>
              <h2 class="text-2xl font-bold tracking-tight">
                {{ doctor.name }}
              </h2>
              <p class="text-muted-foreground">
                {{ doctor.who }}
              </p>
            </div>
          </div>
          <DataTable :data="julyData" :columns="columns" />
        </div>
      </div>
    </div>
  </div>
  <ErrorsNotFound v-else />
</template>
