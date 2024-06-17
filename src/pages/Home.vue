<template>
  <div class="home-page">
    <EventsFilters v-if="!eventsStore.isLoading"/>
    <EventsList class="mt-32" />
  </div>
</template>

<script setup>
import EventsFilters from "../Events/components/Filters/EventsFilters.vue";
import EventsList from "../Events/components/EventsList.vue";
import { useEventsStore } from "../Events/stores/events";

const eventsStore = useEventsStore();
</script>

<style></style>
