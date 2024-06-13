import { defineStore } from "pinia";
import { useAuthStore } from "~/stores/auth.store";

interface Doctor {
  additional_modalities: string[];
  email: string;
  experience: string;
  full_name: string;
  gender: string;
  id: string;
  main_modality: string;
  phone: string;
  rate: number;
  status: string;
}

export const useDoctorsList = defineStore({
  id: "doctorsList",
  state: () => ({
    doctors_list: [] as Doctor[],
  }),
  actions: {
    async fetchUserData() {
      try {
        const authStore = useAuthStore();
        authStore.initialize();
        const token = authStore.user.access_token;
        const doctorsListResponse = await $fetch<Doctor[]>(
          "http://176.109.104.88:80/manager/doctors",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (doctorsListResponse && Array.isArray(doctorsListResponse)) {
          this.doctors_list = doctorsListResponse;
        } else {
          console.error("Unexpected response structure:", doctorsListResponse);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    },
  },
});
