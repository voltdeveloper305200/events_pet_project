<template>
  <div class="home-page">
    <EventsFilters v-if="!eventsStore.isLoading" />
    <div class="grid grid-cols-12 sm:gap-32">
      <div class="col-span-12 md:col-span-6 lg:col-span-4">
        <EventsSearch />
        <FilterVisible class="mt-12 hidden lg:block" />
      </div>
      <div class="col-span-12 md:col-span-6 md:col-start-9 mt-12 sm:mt-0">
        <div class="flex flex-col sm:flex-row sm:items-center md:justify-end">
          <SortCost />
          <SortDate class="mt-16 sm:mt-0 sm:ms-16" />
        </div>
        <div class="flex md:justify-end mt-12 sm:mt-0">
          <button @click="openFilters" class="btn-filters mt-12">
            Фильтры
          </button>
        </div>
      </div>
    </div>
    <EventsList class="mt-32" />
  </div>
</template>

<script setup>
import EventsFilters from "../Events/components/Filters/EventsFilters.vue";
import EventsList from "../Events/components/EventsList.vue";
import { useEventsStore } from "../Events/stores/events";
import EventsSearch from "../Events/components/Filters/EventsSearch.vue";
import SortCost from "../Events/components/Filters/SortCost.vue";
import SortDate from "../Events/components/Filters/SortDate.vue";
import FilterVisible from "../Events/components/Filters/FilterVisible.vue";

const eventsStore = useEventsStore();

const openFilters = () => {
  window.dispatchEvent(new CustomEvent(`show-filters`));
};
</script>

<style></style>
