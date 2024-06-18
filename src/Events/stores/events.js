import { defineStore } from "pinia";
import { computed, watch } from "vue";
import { ref } from "vue";
import Requests from "../api/requests";
import { useFiltersStore } from "./filters";

const requests = new Requests();

export const useEventsStore = defineStore("useEventsStore", () => {
  const filtersStore = useFiltersStore();

  const eventsList = ref([]);

  const isLoading = ref(false);

  const itemsPerPage = 9;

  const currentPage = ref(1);

  const visibleEvents = ref([]);

  const sortedEvents = ref([]);

  const fetchEvents = async () => {
    isLoading.value = true;
    try {
      const response = await requests.getEvents();
      eventsList.value = response;
      sortedEvents.value = [...eventsList.value].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      resetVisibleEvents();
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  const loadMoreEvents = () => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = currentPage.value * itemsPerPage;
    const newEvents = filteredEvents.value.slice(start, end);
    visibleEvents.value = visibleEvents.value.concat(newEvents);
    if (newEvents.length > 0) {
      currentPage.value += 1;
    }
  };

  const resetVisibleEvents = () => {
    visibleEvents.value = [];
    currentPage.value = 1;
    loadMoreEvents();
  };

  const filteredEvents = computed(() => {
    let filtered = sortedEvents.value;

    // Поиск по всем полям
    if (filtersStore.searchQuery) {
      const query = filtersStore.searchQuery.toLowerCase();
      filtered = filtered.filter((event) =>
        Object.keys(event).some((key) =>
          String(event[key]).toLowerCase().includes(query)
        )
      );
    }

    // Фильтры
    // Фильтр по стоимости
    filtered = filtered.filter((event) => {
      return (
        event.cost >= filtersStore.minPrice &&
        event.cost <= filtersStore.maxPrice
      );
    });

    // Фильтр по дате
    if (
      filtersStore.selectedDateRange.start &&
      filtersStore.selectedDateRange.end
    ) {
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.date);
        const startDate = new Date(filtersStore.selectedDateRange.start);
        const endDate = new Date(filtersStore.selectedDateRange.end);
        return eventDate >= startDate && eventDate <= endDate;
      });
    }

    // Фильтр по направлению
    if (filtersStore.selectedDirection) {
      filtered = filtered.filter(
        (event) => event.direction === filtersStore.selectedDirection
      );
    }

    // Фильтр по городу
    if (filtersStore.selectedCity) {
      filtered = filtered.filter(
        (event) => event.city === filtersStore.selectedCity
      );
    }

    // Сортировка по стоимости
    if (filtersStore.selectedSortCost.value === "low") {
      filtered = filtered.sort((a, b) => parseInt(a.cost) - parseInt(b.cost));
    } else if (filtersStore.selectedSortCost.value === "high") {
      filtered = filtered.sort((a, b) => parseInt(b.cost) - parseInt(a.cost));
    }

    // Сортировка по дате
    if (filtersStore.selectedSortDate.value === "old") {
      filtered = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (filtersStore.selectedSortDate.value === "new") {
      filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return filtered;
  });

  watch(
    () => [
      filtersStore.selectedSortCost,
      filtersStore.selectedSortDate,
      filtersStore.searchQuery,
    ],
    () => {
      resetVisibleEvents();
      console.log(filtersStore.selectedSortCost.value);
    }
  );

  watch(
    () => filtersStore.applyFilters,
    (newVal) => {
      if (newVal) {
        resetVisibleEvents();
        filtersStore.applyFilters = false; // сброс флага после применения фильтров
      }
    }
  );

  return {
    eventsList,
    isLoading,
    itemsPerPage,
    currentPage,
    visibleEvents,
    fetchEvents,
    loadMoreEvents,
    resetVisibleEvents,
    filteredEvents,
  };
});
