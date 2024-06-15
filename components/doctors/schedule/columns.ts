import type { ColumnDef } from "@tanstack/vue-table";
import { types, workTime } from "@/data/data";
import type { Task } from "@/data/schema";
import DataTableColumnHeader from "./DataTableColumnHeader.vue";
import DataTableRowActions from "./DataTableRowActions.vue";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        checked:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate"),
        "onUpdate:checked": (value) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: "Select all",
        class: "translate-y-0.5",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        "onUpdate:checked": (value) => row.toggleSelected(!!value),
        ariaLabel: "Select row",
        class: "translate-y-0.5",
      }),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "date",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Дата" }),
    cell: ({ row }) => {
      const date: string = row.getValue("date"); // Получаем дату из строки
      const dateParts = date.split("-"); // Разделяем дату на части по разделителю "-"
      const dayOfMonth = dateParts[2]; // Получаем день месяца из даты
      return h("div", { class: "flex space-x-2" }, [
        h(
          "span",
          { class: "max-w-[500px] truncate font-normal text-muted-foreground" },
          dayOfMonth
        ),
      ]);
    },
    // enableSorting: false,
    // enableHiding: false,
  },

  {
    accessorKey: "end_time",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Рабочее время" }),
    cell: ({ row }) => {
      const startTime = row.getValue("start_time");
      const endTime = row.getValue("end_time");
      return h("div", { class: "flex space-x-2" }, [
        h(
          "span",
          { class: "max-w-[500px] truncate font-normal text-black" },
          `${startTime} - ${endTime}`
        ),
      ]);
    },
    // enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: "start_time",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "" }),
    cell: ({ row }) =>
      h("span", {
        class: "hidden",
      }),
  },

  {
    accessorKey: "hours_worked",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Отработка" }),
    cell: ({ row }) =>
      h(
        "span",
        { class: "max-w-[500px] truncate font-normal text-muted-foreground" },
        `${row.getValue("hours_worked")}ч`
      ),
    // enableSorting: false,
    // enableHiding: false,
  },

  {
    accessorKey: "day_type",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Тип " }),
    cell: ({ row }) => {
      const value = row.getValue("day_type") || "Выходной";
      return h("div", { class: "flex items-center" }, [
        h(Badge, { variant: "outline" }, () => value),
      ]);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
];
