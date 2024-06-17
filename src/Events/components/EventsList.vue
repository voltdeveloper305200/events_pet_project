<template>
  <div class="events-list">
    <div
      class="cards"
      v-if="filtersStore.selectedVariantVisible.code === 'cards'"
    >
      <div class="grid grid-cols-12 gap-24" v-if="!eventsStore.isLoading">
        <div
          class="col-span-4"
          v-for="(event, index) in eventsStore.visibleEvents"
          :key="event.id"
          :ref="(el) => setObserver(el, index)"
        >
          <EventCard
            class="h-full"
            :direction="event.direction"
            :date="event.date"
            :location="event.city"
            :cost="event.cost"
            :title="event.title"
          />
        </div>
      </div>
      <div class="grid grid-cols-12 gap-24" v-else>
        <div class="col-span-4" v-for="index in 9" :key="index">
          <EventCard class="h-full" :isLoading="true" />
        </div>
      </div>
    </div>
    <div
      class="list"
      v-if="filtersStore.selectedVariantVisible.code === 'list'"
    >
      <div class="grid grid-cols-12 gap-24" v-if="!eventsStore.isLoading">
        <div
          class="col-span-12"
          v-for="(event, index) in eventsStore.visibleEvents"
          :key="event.id"
          :ref="(el) => setObserver(el, index)"
        >
          <EventRow
            :direction="event.direction"
            :date="event.date"
            :location="event.city"
            :cost="event.cost"
            :title="event.title"
          />
        </div>
      </div>
      <!-- <div class="grid grid-cols-12 gap-24" v-else>
        <div class="col-span-4" v-for="index in 9" :key="index">
          <EventCard class="h-full" :isLoading="true" />
        </div>
      </div> -->
    </div>
    <RequestForm />
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useEventsStore } from "../stores/events";
import { useFiltersStore } from "../stores/filters";
import EventCard from "./EventCard.vue";
import EventRow from "./EventRow.vue";
import RequestForm from "./RequestForm.vue";
import useModal from "../../hooks/useModal";

const eventsStore = useEventsStore();
const filtersStore = useFiltersStore();

const observer = ref(null);

const setObserver = (el, index) => {
  if (el && index === eventsStore.visibleEvents.length - 1) {
    observer.value.observe(el);
  }
};

onMounted(async () => {
  const modal = useModal();
  modal().toggle("request-form");
  await eventsStore.fetchEvents();
  eventsStore.loadMoreEvents();
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          setTimeout(() => {
            eventsStore.loadMoreEvents();
            observer.value.unobserve(entry.target);
          }, 500);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }
  );
});

onBeforeUnmount(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});
</script>

<style></style>
