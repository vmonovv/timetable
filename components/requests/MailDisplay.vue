<script lang="ts" setup>
import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
} from "lucide-vue-next";
import addDays from "date-fns/addDays";
import addHours from "date-fns/addHours";
import format from "date-fns";
import nextSaturday from "date-fns/nextSaturday";
import type { Mail } from "@/data/mails";

interface MailDisplayProps {
  mail: Mail | undefined;
}

const props = defineProps<MailDisplayProps>();

const mailFallbackName = computed(() => {
  return props.mail?.name
    .split(" ")
    .map((chunk) => chunk[0])
    .join("");
});

const today = new Date();

const approveMail = async () => {
  try {
    const authStore = useAuthStore();
    const token = authStore.user.access_token;

    const response = await fetch(
      `http://176.109.104.88:80/manager/approve/${props.mail?.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to approve mail");
    }

    // Handle success as needed
    console.log("Mail approved successfully");
  } catch (error) {
    console.error("Error approving mail:", error);
  }
};
</script>

<template>
  <div class="flex h-full flex-col">
    <Separator />
    <div v-if="mail" class="flex flex-1 flex-col">
      <div class="flex items-start p-4">
        <div class="flex items-start gap-4 text-sm">
          <Avatar>
            <AvatarFallback>
              {{ mailFallbackName }}
            </AvatarFallback>
          </Avatar>
          <div class="grid gap-1">
            <div class="font-semibold">
              {{ mail.name }}
            </div>
            <div class="line-clamp-1 text-xs">
              {{ mail.subject }}
            </div>
          </div>
        </div>
        <div
          v-if="mail.date"
          class="ml-auto text-xs text-muted-foreground flex"
        >
          {{ format(new Date(mail.date), "PPpp") }}
        </div>
      </div>
      <Separator />
      <div class="p-4 text-sm">
        {{ mail.text }}
      </div>
      <div class="flex flex-row justify-end">
        <Button type="button" size="sm" class="ml-0" @click="approveMail">
          Одобрить
        </Button>
        <Button
          type="button"
          size="sm"
          class="ml-[2rem] bg-red-600 hover:bg-red-500"
        >
          Отклонить
        </Button>
      </div>
      <Separator class="mt-auto" />
    </div>
    <div v-else class="p-8 text-center text-muted-foreground">
      Заявка не была выбрана...
    </div>
  </div>
</template>
