<script setup lang="ts">
import { defineProps, ref, watch, onMounted, defineEmits } from "vue";

const props = defineProps({
  doctor: Object,
});
const emit = defineEmits(["updateAlert", "updateAlertError"]);

const authStore = useAuthStore();
const isLoadingStore = useIsLoadingStore();

const fullNameRef = ref<string>("");
const emailRef = ref<string>("");
const experienceRef = ref<number>(0);
const mainModalityRef = ref<string>("");
const additionalModalitiesRef = ref<string[]>([]);
const rateRef = ref<number>(0);
const phoneRef = ref<string>("");
const genderRef = ref<string>("");
const tokenRef = ref<string>("");
const idRef = ref<string>("");
const statusRef = ref("Активный");

const extractNumber = (str: string): number => {
  const match = str.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

const initializeRefs = () => {
  if (props.doctor) {
    fullNameRef.value = props.doctor.full_name || "";
    emailRef.value = props.doctor.email || "";
    experienceRef.value = extractNumber(props.doctor.experience || "0");
    mainModalityRef.value = props.doctor.main_modality || "";
    additionalModalitiesRef.value = props.doctor.additional_modalities || [];
    rateRef.value = props.doctor.rate || 0;
    phoneRef.value = props.doctor.phone || "";
    genderRef.value = props.doctor.gender || "";
    idRef.value = props.doctor.id || "";
    tokenRef.value = authStore.user.access_token || props.doctor.token || "";
  }
};

onMounted(async () => {
  await authStore.initialize();
  if (authStore.user && authStore.user.access_token) {
    tokenRef.value = authStore.user.access_token;
  }
  initializeRefs();
});

// Initialize the refs when the component is mounted or props change
watch(() => props.doctor, initializeRefs, { immediate: true });

const alertRef = ref(false);
const alertRefY = ref(false);
const doctorsList = ref([]);
const modalityMain = [
  { value: "Денс" },
  { value: "МРТ" },
  { value: "КТ" },
  { value: "РГ" },
  { value: "ФЛГ" },
];
const modality = [
  { value: "Денс" },
  { value: "МРТ" },
  { value: "КТ" },
  { value: "РГ" },
  { value: "ФЛГ" },
  { value: "НДКТ" },
  { value: "ПЭТ/КТ" },
  { value: "РХ" },
];

async function onSubmit(event: Event) {
  event.preventDefault();
  isLoadingStore.set(true);

  try {
    if (!tokenRef.value) {
      throw new Error("Token is missing");
    }

    const response = await $fetch(
      `http://176.109.104.88:80/manager/doctor/${idRef.value}`,
      {
        method: "PUT",
        body: {
          full_name: fullNameRef.value,
          experience: `${experienceRef.value} лет`,
          main_modality: mainModalityRef.value,
          additional_modalities: additionalModalitiesRef.value,
          rate: rateRef.value,
          status: statusRef.value,
          phone: phoneRef.value,
          gender: genderRef.value,
        },
        headers: {
          Authorization: `Bearer ${tokenRef.value}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.message === "Doctor updated successfully") {
      alert("Информация о враче успешно изменена, перезагрузите страницу, чтобы увидеть изменения, правильно сделать не успели, спасибо за понимание");
      clearFields();
      setTimeout(() => emit("updateAlert", false), 5000);
    } else {
      alert("Информация о враче успешно изменена, перезагрузите страницу, чтобы увидеть изменения, правильно сделать не успели, спасибо за понимание");
      setTimeout(() => emit("updateAlertError", false), 5000);
    }
  } catch (error) {
    alert("Ошибка при изменении информации, попытайтесь позже");
    setTimeout(() => emit("updateAlertError", false), 5000);
    console.error("Ошибка при отправке данных:", error);
  } finally {
    isLoadingStore.set(false);
  }
}

function clearFields() {
  fullNameRef.value = "";
  emailRef.value = "";
  experienceRef.value = 0;
  mainModalityRef.value = "";
  additionalModalitiesRef.value = [];
  rateRef.value = 0;
  phoneRef.value = "";
  genderRef.value = "";
}
</script>

<template>
  <div>
    <Sheet>
      <SheetTrigger>
        <div class="text-[14px] pl-2">Изменить</div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Редактирование пользователя </SheetTitle>
          <SheetDescription>
            Нажмите изменить, когда вы закончите.
          </SheetDescription>
        </SheetHeader>
        <form @submit="onSubmit">
          <div class="grid gap-4 py-4">
            <div class="items-center gap-4">
              <Label for="name" class="text-right">ФИО</Label>
              <Input
                type="text"
                required
                v-model="fullNameRef"
                id="name"
                class="col-span-2"
              />
            </div>

            <div class="items-center gap-4">
              <Label for="experience" class="text-right"
                >Опыт работы (лет)</Label
              >
              <NumberField
                id="experience"
                v-model="experienceRef"
                :default-value="0"
                :min="0"
              >
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
            </div>
            <div class="items-center gap-4">
              <Label for="mainModalityRef" class="text-right">
                Основная модальность
              </Label>
              <Select v-model="mainModalityRef">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Выберите модальность" />
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
            <div class="items-center gap-4">
              <Label for="additionalModalitiesRef" class="text-right">
                Дополнительные модальности
              </Label>
              <div class="flex flex-wrap items-center">
                <div
                  v-for="item in modality"
                  :key="item.value"
                  class="flex items-center space-x-1 space-y-0"
                >
                  <input
                    :value="item.value"
                    :id="item.value"
                    type="checkbox"
                    v-model="additionalModalitiesRef"
                  />
                  <FormLabel class="font-light pr-4 text-[14px]">
                    {{ item.value }}
                  </FormLabel>
                </div>
              </div>
            </div>
            <div class="items-center gap-4">
              <Label for="rateRef" class="text-right">Ставка</Label>
              <Input
                min="0"
                step="0.05"
                type="number"
                required
                v-model="rateRef"
                id="rateRef"
                class="col-span-2"
              />
            </div>
            <div class="items-center gap-4">
              <Label for="phoneRef" class="text-right">Телефон</Label>
              <Input
                required
                v-model="phoneRef"
                id="phoneRef"
                class="col-span-2"
              />
            </div>
            <div class="items-center gap-4">
              <Label class="text-right">Пол</Label>
              <RadioGroup v-model="genderRef" class="flex flex-row space-x-2">
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="r1" value="мужской" />
                  <Label class="font-light" for="r1">Мужской</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="r2" value="женский" />
                  <Label class="font-light" for="r2">Женский</Label>
                </div>
              </RadioGroup>
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
</template>
