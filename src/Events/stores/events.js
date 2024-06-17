import { defineStore } from "pinia";
import { ref } from "vue";
import Requests from "../api/requests";

const requests = new Requests();

export const useEventsStore = defineStore("useEventsStore", () => {
  const eventsList = ref([]);

  const isLoading = ref(false);

  const itemsPerPage = 9;

  const currentPage = ref(1);

  const visibleEvents = ref([]);

  const fetchEvents = async () => {
    isLoading.value = true;
    try {
      const response = await requests.getEvents();
      eventsList.value = response;
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  const loadMoreEvents = () => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = currentPage.value * itemsPerPage;
    const newEvents = eventsList.value.slice(start, end);
    visibleEvents.value = visibleEvents.value.concat(newEvents);
    if (newEvents.length > 0) {
      currentPage.value += 1;
    }
  };

  return {
    eventsList,
    isLoading,
    itemsPerPage,
    currentPage,
    visibleEvents,
    fetchEvents,
    loadMoreEvents,
  };
});
