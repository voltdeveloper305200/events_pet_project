import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useFiltersStore = defineStore("useFiltersStore", () => {
  const minCost = 0;
  const maxCost = 1000;
  const minPrice = ref(minCost);
  const maxPrice = ref(maxCost);

  const variantsVisible = ref([
    { id: 1, value: "border-all", code: "cards" },
    { id: 2, value: "list", code: "list" },
  ]);
  const selectedVariantVisible = reactive({
    id: 1,
    value: "border-all",
    code: "cards",
  });

  const selectedDateRange = reactive({
    start: "",
    end: "",
  });
  const selectedDirection = ref("");
  const selectedCity = ref("");

//   const filteredEvents = computed(() => {
//   })

  return {
    minCost,
    maxCost,
    minPrice,
    maxPrice,
    variantsVisible,
    selectedDirection,
    selectedCity,
    selectedVariantVisible,
    selectedDateRange
  };
});
