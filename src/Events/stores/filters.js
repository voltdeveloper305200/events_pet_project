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
  const selectedDateString = ref('')

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

  const selectedSortCost = reactive({
    id: 1,
    name: "Сначала дешевые",
    value: "low",
  });
  const selectedSortDate = reactive({ id: 1, name: "Сначала старые", value: "old" });

  const searchQuery = ref("");

  const applyFilters = ref(false);

  const applyFilterChanges = () => {
    applyFilters.value = true;
  };

  const resetFilters = () => {
    minPrice.value = minCost;
    maxPrice.value = maxCost;
    selectedDateRange.start = "";
    selectedDateRange.end = "";
    selectedDateString.value = "";
    selectedDirection.value = "";
    selectedCity.value = "";
    applyFilters.value = true;
  };

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
    selectedDateString,
    variantsSortCost,
    variantsSortDate,
    selectedSortCost,
    selectedSortDate,
    searchQuery,
    applyFilters,
    applyFilterChanges,
    resetFilters,
  };
});
