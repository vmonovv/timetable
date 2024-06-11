<script setup>
import doctors from "@/data/doctors.json";
// import {
//   CircleUser,
//   File,
//   Home,
//   LineChart,
//   ListFilter,
//   MoreHorizontal,
//   Package,
//   Package2,
//   PanelLeft,
//   PlusCircle,
//   Search,
//   Settings,
//   ShoppingCart,
//   Users2,
// } from "lucide-vue-next";
</script>

<template>
  <TheHeader />
  <div class="">
    <div class="container">
      <div class="flex min-h-screen w-full flex-col">
        <!-- <aside
        class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex"
      >
        <nav class="flex flex-col items-center gap-4 px-2 py-4">
          <a
            href="#"
            class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 class="h-4 w-4 transition-all group-hover:scale-110" />
            <span class="sr-only">Acme Inc</span>
          </a>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <a
                  href="#"
                  class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home class="h-5 w-5" />
                  <span class="sr-only">Dashboard</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right"> Dashboard </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <a
                  href="#"
                  class="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <ShoppingCart class="h-5 w-5" />
                  <span class="sr-only">Orders</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right"> Orders </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <a
                  href="#"
                  class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Package class="h-5 w-5" />
                  <span class="sr-only">Products</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right"> Products </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <a
                  href="#"
                  class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Users2 class="h-5 w-5" />
                  <span class="sr-only">Customers</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right"> Customers </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <a
                  href="#"
                  class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LineChart class="h-5 w-5" />
                  <span class="sr-only">Analytics</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right"> Analytics </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav class="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <a
                  href="#"
                  class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings class="h-5 w-5" />
                  <span class="sr-only">Settings</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right"> Settings </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside> -->
        <div class="flex flex-col sm:gap-4 sm:py-4">
          <!-- <header
            class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
          >
            <Sheet>
              <SheetTrigger as-child>
                <Button size="icon" variant="outline" class="sm:hidden">
                  <PanelLeft class="h-5 w-5" />
                  <span class="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" class="sm:max-w-xs">
                <nav class="grid gap-6 text-lg font-medium">
                  <a
                    href="#"
                    class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <Package2
                      class="h-5 w-5 transition-all group-hover:scale-110"
                    />
                    <span class="sr-only">Acme Inc</span>
                  </a>
                  <a
                    href="#"
                    class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Home class="h-5 w-5" />
                    Dashboard
                  </a>
                  <a
                    href="#"
                    class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <ShoppingCart class="h-5 w-5" />
                    Orders
                  </a>
                  <a
                    href="#"
                    class="flex items-center gap-4 px-2.5 text-foreground"
                  >
                    <Package class="h-5 w-5" />
                    Products
                  </a>
                  <a
                    href="#"
                    class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Users2 class="h-5 w-5" />
                    Customers
                  </a>
                  <a
                    href="#"
                    class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <LineChart class="h-5 w-5" />
                    Settings
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
            <Breadcrumb class="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink as-child>
                    <a href="#">Dashboard</a>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink as-child>
                    <a href="#">Products</a>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>All Products</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div class="relative ml-auto flex-1 md:grow-0">
              <Search
                class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              />
              <Input
                type="search"
                placeholder="Search..."
                class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="secondary" size="icon" class="rounded-full">
                  <CircleUser class="h-5 w-5" />
                  <span class="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header> -->
          <main class="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
            <Tabs default-value="all">
              <div class="flex items-center">
                <!-- <TabsList>
                <TabsTrigger value="all"> All </TabsTrigger>
                <TabsTrigger value="active"> Active </TabsTrigger>
                <TabsTrigger value="draft"> Draft </TabsTrigger>
                <TabsTrigger value="archived" class="hidden sm:flex">
                  Archived
                </TabsTrigger>
              </TabsList> -->
                <div class="ml-auto flex items-center gap-2 mb-5">
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button variant="outline" size="sm" class="h-7 gap-1">
                        <Icon class="h-4 w-4" name="mdi:filter-variant" />
                        <span
                          class="sr-only sm:not-sr-only sm:whitespace-nowrap"
                        >
                          Фильтр
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Фильтровать по</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem checked> Active </DropdownMenuItem>
                      <DropdownMenuItem>Draft</DropdownMenuItem>
                      <DropdownMenuItem> Archived </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button size="sm" variant="outline" class="h-7 gap-1">
                    <Icon class="h-4 w-4" name="mdi:file-outline" />
                    <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Экспорт
                    </span>
                  </Button>
                  <!-- <Button size="sm" class="h-7 gap-1 ">
                  
                    <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Добавить врача
                    </span>
                  </Button> -->
                  <Sheet>
                    <SheetTrigger>
                      <Button size="sm" class="h-7 gap-1">
                        <Icon
                          class="h-4 w-4"
                          name="ic:round-add-circle-outline"
                        />
                        <span
                          class="sr-only sm:not-sr-only sm:whitespace-nowrap"
                        >
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
                      <div class="grid gap-4 py-4">
                        <div class="grid grid-cols-4 items-center gap-4">
                          <Label for="name" class="text-right"> ФИО </Label>
                          <Input id="name" class="col-span-3" />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                          <Label for="username" class="text-right">
                            Возраст
                          </Label>
                          <Input id="username" class="col-span-3" />
                        </div>
                      </div>
                      <SheetFooter>
                        <SheetClose as-child>
                          <Button size="sm" class="h-7 gap-1" type="submit">
                            Добавить
                          </Button>
                        </SheetClose>
                      </SheetFooter>
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
                          <TableHead
                            class="hidden w-[100px] sm:table-cell pt-5"
                          >
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
                        <TableRow v-for="item in doctors" :key="item.id">
                          <TableCell class="hidden sm:table-cell">
                            <img
                              v-if="item.gender == 'w'"
                              alt="Product image"
                              class="aspect-square rounded-md object-cover h-[169px] min-w-[169px]"
                              src="/img/placeholder.svg"
                            />
                            <img
                              v-if="item.gender == 'm'"
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
                              {{ item.name }}
                            </NuxtLink>
                            <div class="font-normal text-[#000000]"> 
                              <div class="">
                                <div class="mt-1">Стаж {{item.experience}} лет</div>
                                <div class="text-[#636363]">{{item.who}}</div>
                              </div>
                              <div class="flex mt-2">
                                <div class="mr-4">
                                  <div class="text-[#636363]">Модальность</div>
                                  <div>{{ item.mainModality }}</div>
                                </div>
                                <div>
                                  <div class="text-[#636363]">Дополнительно</div>
                                  <div>{{ item.additionalModality }}</div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge class="pt-1 text-[16px]" variant="outline">
                              {{ item.bet }}
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
                            <a
                              class="text-[#4b4b4b]"
                              :href="`tel:${item.phone}`"
                            >
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
  </div>
</template>

<style lang="scss" scoped></style>
