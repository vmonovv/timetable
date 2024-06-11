<script setup lang="ts">
import type { Row } from "@tanstack/vue-table";
import { types } from "@/data/data";
import { taskSchema } from "@/data/schema";
import type { Task } from "@/data/schema";

interface DataTableRowActionsProps {
  row: Row<Task>;
}
const props = defineProps<DataTableRowActionsProps>();

const task = computed(() => taskSchema.parse(props.row.original));
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
      >
        <Icon class="h-4 w-4" name="mdi:dots-horizontal" />

        <span class="sr-only">Открыть меню</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[160px]">
      <DropdownMenuItem>Редактировать</DropdownMenuItem>
      <DropdownMenuItem>Сделать копию</DropdownMenuItem>
      <DropdownMenuItem>В избранное</DropdownMenuItem>
      <!-- <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup :value="task.label">
            <DropdownMenuRadioItem
              v-for="label in labels"
              :key="label.value"
              :value="label.value"
            >
              {{ label.label }}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator /> -->
      <!-- <DropdownMenuItem>
        Удалить
        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
      </DropdownMenuItem> -->
    </DropdownMenuContent>
  </DropdownMenu>
</template>
