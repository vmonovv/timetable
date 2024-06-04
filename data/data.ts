// import CrossCircledIcon from '~icons/radix-icons/cross-circled'
// import QuestionMarkCircledIcon from '~icons/radix-icons/question-mark-circled'

import { Icon } from "#components";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: h(Icon, { name: "formkit:arrowdown" }),
  },
  {
    value: "todo",
    label: "Todo",
    icon: h(Icon, { name: "ph:circle" }),
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: h(Icon, { name: "solar:stopwatch-linear" }),
  },

  {
    value: "done",
    label: "Done",
    icon: h(Icon, { name: "solar:check-circle-outline" }),
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: h(Icon, { name: "solar:close-circle-outline" }),
  },
];
export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: h(Icon, { name: "ic:baseline-arrow-downward" }),
  },
  {
    label: "Medium",
    value: "medium",
    icon: h(Icon, { name: "ic:baseline-arrow-downward" }),
  },
  {
    label: "High",
    value: "high",
    icon: h(Icon, { name: "ic:outline-arrow-upward" }),
  },
];
