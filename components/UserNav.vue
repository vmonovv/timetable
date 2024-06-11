<script setup lang="ts"></script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="relative h-8 w-8 rounded-full">
        <Avatar class="h-10 w-10">
          <AvatarImage src="/avatars/03.png" alt="@shadcn" />
          <AvatarFallback>МС</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuLabel class="font-normal flex">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">Мария Сергеевна</p>
          <p class="text-xs leading-none text-muted-foreground">
            Врач, высшая категория к.м.н
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          Профиль
          <!-- <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> -->
        </DropdownMenuItem>
        <!-- <DropdownMenuItem>
          Billing
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem> -->
        <!-- <DropdownMenuItem>
          Settings
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem> -->
        <!-- <DropdownMenuItem>New Team</DropdownMenuItem> -->
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        Выйти
        <!-- <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> -->
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
