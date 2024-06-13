<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { useIsLoadingStore } from "~/stores/loading.store";
import { useDoctorsList } from "~/stores/doctorsList.store";

const authStore = useAuthStore();
const isLoadingStore = useIsLoadingStore();
const doctorsListStore = useDoctorsList();
const tokenRef = ref<string>("");

const fullNameRef = ref<string>("");
const emailRef = ref<string>("");
const experienceRef = ref<string>("");
const mainModalityRef = ref<string>("");
const additionalModalityRef = ref<string>("");
const rateRef = ref<number>(0);
const phoneRef = ref<string>("");
const genderRef = ref<string>("");

const doctorsList = ref([]);

// {
// 	"full_name": "Валерия Уткина Дмитриевна",
// 	"email": "valeria@gmail.com",
// 	"experience": "13 лет",
// 	"main_modality": "МРТ",
// 	"additional_modality": ["КТ"],
// 	"rate": 0.75,
// 	"phone": "+7 777 777 72 77",
// 	"gender": "женский"
// }

onMounted(async () => {
  await authStore.initialize(); // Предполагая, что это асинхронная операция
  tokenRef.value = authStore.user.access_token;
  await doctorsListStore.fetchUserData();
});

async function onSubmit(event: Event) {
  event.preventDefault();
  isLoadingStore.set(true);

  try {
    const response = await $fetch(
      "http://176.109.104.88:80/manager/create_doctor",
      {
        method: "POST",
        body: {
          full_name: fullNameRef.value,
          email: emailRef.value,
          experience: experienceRef.value,
          main_modality: mainModalityRef.value,
          additional_modalities: [additionalModalityRef.value], // Предполагая, что это массив
          rate: rateRef.value,
          phone: phoneRef.value,
          gender: genderRef.value,
        },
        headers: {
          Authorization: `Bearer ${tokenRef.value}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    if (response.message === "User with this email already exists") {
      alert("Доктор успешно создан!");
    } else {
      console.error("Ошибка при создании доктора:"); // Вывод ошибки из ответа сервера
      alert(`Ошибка:`);
    }
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    isLoadingStore.set(false);
  }
}
</script>
<template>
  <TheHeader />
  <div v-if="tokenRef" class="container relative">
    <!-- <Alert class="fixed right-4 bottom-4 z-[999] max-w-[300px]" variant="done">
      <Icon name="ic:outline-done" class="w-4 h-4" />
      <AlertTitle class="">Успешно</AlertTitle>
      <AlertDescription> Врач {{ fullNameRef }} создан </AlertDescription>
    </Alert> -->

    <div class="flex min-h-screen w-full flex-col">
      <div class="flex flex-col sm:py-4">
        <main class="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
          <Tabs default-value="all">
            <div class="flex items-center">
              <div class="ml-auto flex items-center gap-2 mb-5">
                <Button size="sm" variant="outline" class="h-7 gap-1">
                  <Icon class="h-4 w-4" name="mdi:file-outline" />
                  <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Экспорт
                  </span>
                </Button>
                <Sheet>
                  <SheetTrigger>
                    <Button size="sm" class="h-7 gap-1">
                      <Icon
                        class="h-4 w-4"
                        name="ic:round-add-circle-outline"
                      />
                      <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Добавить врача
                      </span>
                    </Button></SheetTrigger
                  >

                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Добавление нового врача</SheetTitle>
                      <SheetDescription>
                        Нажмите добавить, когда вы закончите.
                      </SheetDescription>
                    </SheetHeader>
                    <form @submit="onSubmit">
                      <div class="grid gap-4 py-4">
                        <div class="grid grid-cols-3 items-center gap-4">
                          <Label for="name" class="text-right"> ФИО </Label>
                          <Input
                            required
                            v-model="fullNameRef"
                            id="name"
                            class="col-span-2"
                          />
                        </div>
                        <div class="grid grid-cols-3 items-center gap-4">
                          <Label for="email" class="text-right"> Email </Label>
                          <Input
                            required
                            v-model="emailRef"
                            id="email"
                            class="col-span-2"
                          />
                        </div>
                        <div class="grid grid-cols-3 items-center gap-4">
                          <Label for="experience" class="text-right">
                            Опыт работы
                          </Label>
                          <Input
                            required
                            v-model="experienceRef"
                            id="experience"
                            class="col-span-2"
                          />
                        </div>
                        <div class="grid grid-cols-3 items-center gap-4">
                          <Label for="mainModalityRef" class="text-right">
                            Основная модальность
                          </Label>
                          <Input
                            required
                            v-model="mainModalityRef"
                            id="mainModalityRef"
                            class="col-span-2"
                          />
                        </div>
                        <div class="grid grid-cols-3 items-center gap-4">
                          <Label for="additionalModalityRef" class="text-right">
                            Дополнительные модальности
                          </Label>
                          <Input
                            required
                            v-model="additionalModalityRef"
                            id="additionalModalityRef"
                            class="col-span-2"
                          />
                        </div>
                        <div class="grid grid-cols-3 items-center gap-4">
                          <Label for="rateRef " class="text-right">
                            Ставка
                          </Label>
                          <Input
                            required
                            v-model="rateRef"
                            id="rateRef"
                            class="col-span-2"
                          />
                        </div>
                        <div class="grid grid-cols-3 items-center gap-4">
                          <Label for="phoneRef " class="text-right">
                            Телефон
                          </Label>
                          <Input
                            required
                            v-model="phoneRef"
                            id="phoneRef"
                            class="col-span-2"
                          />
                        </div>
                        <div class="grid grid-cols-3 items-center gap-4">
                          <Label for="genderRef " class="text-right">
                            Пол
                          </Label>
                          <Input
                            required
                            v-model="genderRef"
                            id="genderRef"
                            class="col-span-2"
                          />
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
                      <!-- <SheetClose as-child>
                        </SheetClose> -->
                    </form>
                    <SheetFooter> </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            <TabsContent value="all">
              <Card>
                <!-- <CardHeader>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>
                      Manage your products and view their sales performance.
                    </CardDescription>
                  </CardHeader> -->
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow class="h-12">
                        <TableHead class="hidden w-[100px] sm:table-cell pt-5">
                          <span class="sr-only">img</span>
                        </TableHead>
                        <TableHead>Врач</TableHead>
                        <TableHead>Ставка</TableHead>
                        <TableHead class="hidden md:table-cell">
                          Статус
                        </TableHead>
                        <TableHead class="hidden md:table-cell">
                          Телефон для связи
                        </TableHead>
                        <TableHead class="hidden md:table-cell">
                          Редактировать
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow
                        v-for="item in doctorsListStore.doctors_list"
                        :key="item.id"
                      >
                        <TableCell class="hidden sm:table-cell">
                          <img
                            v-if="item.gender == 'женский'"
                            alt="Product image"
                            class="aspect-square rounded-md object-cover h-[169px] min-w-[169px]"
                            src="/img/placeholder.svg"
                          />
                          <img
                            v-if="item.gender == 'мужской'"
                            alt="Product image"
                            class="aspect-square rounded-md object-cover h-[169px] min-w-[169px]"
                            src="/img/placeholder_m.svg"
                          />
                        </TableCell>
                        <TableCell class="font-medium">
                          <NuxtLink
                            class="text-[#2463EB] text-[18px]"
                            :to="`/doctors/${item.id}`"
                          >
                            {{ item.full_name }}
                          </NuxtLink>
                          <div class="font-normal text-[#000000]">
                            <div class="">
                              <div class="mt-1">Стаж {{ item.experience }}</div>
                            </div>
                            <div class="flex mt-2">
                              <div class="mr-4">
                                <div class="text-[#636363]">Модальность</div>
                                <div>{{ item.main_modality }}</div>
                              </div>
                              <div>
                                <div class="text-[#636363]">Дополнительно</div>
                                <div class="flex">
                                  <div
                                    class="mr-3"
                                    v-for="item in item.additional_modalities"
                                    :key="item.id"
                                  >
                                    {{ item }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge class="pt-1 text-[16px]" variant="outline">
                            {{ item.rate }}
                          </Badge>
                        </TableCell>
                        <TableCell class="hidden md:table-cell">
                          <Badge
                            v-if="item.status == 'Активный'"
                            class="text-xs font-normal bg-[#ECFDF3] text-[#037847] border-0 px-3 py-2"
                            variant="outline"
                          >
                            {{ item.status }}
                          </Badge>
                          <Badge
                            v-else-if="item.status == 'В отпуске'"
                            class="text-xs bg-[#FFEFC7] text-[#F4B003] border-0 font-normal order-0 px-3 py-2"
                            variant="outline"
                          >
                            {{ item.status }}
                          </Badge>
                        </TableCell>
                        <TableCell class="hidden font-medium md:table-cell">
                          <Icon
                            class="text-[20px] inline-block mr-1 text-[#2463EB]"
                            name="mdi:phone-settings"
                          />
                          <a class="text-[#4b4b4b]" :href="`tel:${item.phone}`">
                            {{ item.phone }}</a
                          >
                        </TableCell>

                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <Icon
                                  class="h-4 w-4"
                                  name="radix-icons:mixer-horizontal"
                                />
                                <span class="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Действия</DropdownMenuLabel>
                              <DropdownMenuItem>Изменить</DropdownMenuItem>
                              <DropdownMenuItem>Удалить</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <!-- <CardFooter>
                    <div class="text-xs text-muted-foreground">
                      Showing <strong>1-10</strong> of <strong>32</strong>
                      products
                    </div>
                  </CardFooter> -->
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  </div>

  <LayoutsLoader v-else />
</template>

<style lang="scss" scoped></style>
