<script setup lang="ts">
const authStore = useAuthStore();
const doctorsListStore = useDoctorsList();
const tokenRef = ref<string>("");
const roleStore = useRoleStore();
const router = useRouter();
onMounted(async () => {
  await authStore.initialize();
  tokenRef.value = authStore.user.access_token;
  await doctorsListStore.fetchUserData();
  await roleStore.fetchUserData();
  if (roleStore.role == "doctor") {
    router.push("/profile");
  }
});

const expor = () => {
  alert("Не успели реализовать");
};
</script>
<template>
  <TheHeader />
  <div v-if="tokenRef" class="container relative">
    <div class="flex min-h-screen w-full flex-col">
      <div class="flex flex-col sm:py-4">
        <main class="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
          <Tabs default-value="all">
            <div class="flex items-center">
              <div class="ml-auto flex items-center gap-2 mb-5">
                <Button size="sm" variant="outline" class="h-7 gap-1">
                  <Icon class="h-4 w-4" name="mdi:file-outline" />
                  <span
                    @click="expor"
                    class="sr-only sm:not-sr-only sm:whitespace-nowrap"
                  >
                    Экспорт
                  </span>
                </Button>
                <DoctorsCreateDoctor />
              </div>
            </div>
            <TabsContent value="all">
              <Card>
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
                            v-else-if="item.status == 'Ожидает подтверждения'"
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
                              <div>
                                <DoctorsEditDoctor
                                  @updateAlert="handleUpdateAlert"
                                  @updateAlertError="handleUpdateAlertError"
                                  :doctor="item"
                                />
                              </div>
                              <div>
                                <DoctorsDeleteDoctor :doctor="item" />
                              </div>
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
    <Alert
      v-if="updateAlert"
      class="fixed right-4 bottom-4 z-[999] max-w-[300px]"
      variant="done"
    >
      <Icon name="ic:outline-done" class="w-4 h-4" />
      <AlertTitle class="">Успешно</AlertTitle>
      <AlertDescription> Врач {{ fullNameRef }} изменён </AlertDescription>
    </Alert>
    <Alert
      v-if="updateAlertError"
      class="fixed right-4 bottom-4 z-[999] max-w-[300px]"
      variant="destructive"
    >
      <Icon name="ic:round-report-gmailerrorred" class="w-4 h-4" />
      <AlertTitle class="">Ошибка</AlertTitle>
      <AlertDescription>Ошибка при измении пользователя</AlertDescription>
    </Alert>
  </div>

  <LayoutsLoader v-else />
</template>

<style lang="scss" scoped></style>
