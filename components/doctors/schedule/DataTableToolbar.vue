<script setup lang="ts">
import type { Table } from "@tanstack/vue-table";
import type { Task } from "../data/schema";

import { types } from "@/data/data";

interface DataTableToolbarProps {
  table: Table<Task>;
}

const props = defineProps<DataTableToolbarProps>();

const isFiltered = computed(
  () => props.table.getState().columnFilters.length > 0
);
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <!-- <Input
        placeholder="Фильтр..."
        :model-value="(table.getColumn('title')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[150px] lg:w-[450px]"
        @input="table.getColumn('title')?.setFilterValue($event.target.value)"
      /> -->
      <!-- <DataTableFacetedFilter
        v-if="table.getColumn('status')"
        :column="table.getColumn('status')"
        title="Статус"
        :options="statuses"
      /> -->
      <DataTableFacetedFilter
        v-if="table.getColumn('type')"
        :column="table.getColumn('type')"
        title="Тип"
        :options="types"
      />

      <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="table.resetColumnFilters()"
      >
        Сбросить
        <Icon class="ml-2 h-4 w-4" name="material-symbols:close-rounded" />
      </Button>
    </div>
    <DataTableViewOptions :table="table" />
  </div>
</template>
