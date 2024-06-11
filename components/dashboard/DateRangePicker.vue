<script setup lang="ts">
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
  today,
  createCalendar,
  toCalendar,
} from "@internationalized/date";

import { cn } from "@/lib/utils";

const df = new DateFormatter("ru-RU", {
  dateStyle: "long",
});

const value = ref(today(getLocalTimeZone())) as Ref<DateValue>;
function getNextWeek(date) {
  if (date) {
    const nextWeek = new Date(date);
    nextWeek.setDate(nextWeek.getDate() + 6);
    return nextWeek;
  }
  return null;
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'w-[325px] justify-center text-left font-normal',
            !value && 'text-muted-foreground'
          )
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4 -mt-1" />
        {{
          value ? df.format(value.toDate(getLocalTimeZone())) : "Выбрать дату"
        }}
        {{
          value
            ? " - " + df.format(getNextWeek(value.toDate(getLocalTimeZone())))
            : ""
        }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="flex w-auto flex-col gap-y-2 p-2">
      <Calendar v-model="value" />
    </PopoverContent>
  </Popover>
</template>
