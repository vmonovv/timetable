export const useIsLoadingStore = defineStore('isLoading', {
	state: () => ({
		isLoading: false,
	}),
	actions: {
		set(data: boolean) {
			this.$patch({ isLoading: data })
		},
	},
})