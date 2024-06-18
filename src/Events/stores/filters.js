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

  const variantsSortCost = [
    { id: 1, name: "Сначала дешевые", value: "low" },
    { id: 2, name: "Сначала дорогие", value: "high" },
  ];

  const variantsSortDate = [
    { id: 1, name: "Сначала старые", value: "old" },
    { id: 2, name: "Сначала новые", value: "new" },
  ];

  const selectedSortCost = ref({ id: 1, name: "Сначала дешевые", value: "low" });
  const selectedSortDate = ref({ id: 1, name: "Сначала старые", value: "old" });

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
    selectedDateRange,
    variantsSortCost,
    variantsSortDate,
    selectedSortCost,
    selectedSortDate,
  };
});
