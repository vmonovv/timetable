<script lang="ts" setup>
import { type HTMLAttributes, computed } from "vue";
import {
  CalendarRoot,
  type CalendarRootEmits,
  type CalendarRootProps,
  useForwardPropsEmits,
} from "radix-vue";
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNextButton,
  CalendarPrevButton,
} from ".";
import { cn } from "@/lib/utils";

const props = defineProps<
  CalendarRootProps & { class?: HTMLAttributes["class"] }
>();

const emits = defineEmits<CalendarRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
const locale = ref("ru-RU");

function formatRange(weekDates) {
  const start = weekDates[0].day;
  const end = weekDates[6].day;
  return `${start}-${end}`;
}
</script>

<template>
  <CalendarRoot
    v-slot="{ grid, weekDays }"
    :class="cn('p-3', props.class)"
    v-bind="forwarded"
    :locale="locale"
  >
    <CalendarHeader>
      <CalendarPrevButton />
      <CalendarHeading />
      <CalendarNextButton />
    </CalendarHeader>

    <div class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
      <CalendarGrid v-for="month in grid" :key="month.value.toString()">
        <!-- <CalendarGridHead>
          <CalendarGridRow>
            <CalendarHeadCell
              v-for="day in weekDays" :key="day"
            >
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead> -->
        <CalendarGridBody :as="'div'" class="flex flex-wrap max-w-[240px]">
          <CalendarGridRow
            :as="'div'"
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            class="mt-2 w-auto mx-1"
          >
            <CalendarCellTrigger class="px-7 pt-[3px]" :day="weekDates[0]" :month="month.value">
              {{ formatRange(weekDates) }}
            </CalendarCellTrigger>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>
