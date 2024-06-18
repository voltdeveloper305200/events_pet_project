<template>
  <div class="events-list">
    <div
      class="cards"
      v-if="filtersStore.selectedVariantVisible.code === 'cards'"
    >
      <div
        class="grid grid-cols-12 gap-24"
        v-if="!eventsStore.isLoading && eventsStore.visibleEvents.length"
      >
        <div
          class="col-span-12 md:col-span-6 lg:col-span-4"
          v-for="(event, index) in eventsStore.visibleEvents"
          :key="event.id"
          :ref="(el) => setObserver(el, index)"
        >
          <EventCard
            class="h-full"
            @clickBtn="openRequestForm(event)"
            :direction="event.direction"
            :date="event.date"
            :location="event.city"
            :cost="event.cost"
            :title="event.title"
          />
        </div>
      </div>
      <div
        v-else-if="!eventsStore.isLoading && !eventsStore.visibleEvents.length"
      >
        <p class="text-24 font-400 text-basic text-center">Событий нет</p>
      </div>
      <div class="grid grid-cols-12 gap-24" v-else>
        <div class="col-span-4" v-for="index in 9" :key="index">
          <EventCard class="h-full" :isLoading="true" />
        </div>
      </div>
    </div>
    <div
      class="list hidden lg:block"
      v-if="filtersStore.selectedVariantVisible.code === 'list'"
    >
      <div
        class="grid grid-cols-12 gap-24"
        v-if="!eventsStore.isLoading && eventsStore.visibleEvents.length"
      >
        <div
          class="col-span-12"
          v-for="(event, index) in eventsStore.visibleEvents"
          :key="event.id"
          :ref="(el) => setObserver(el, index)"
        >
          <EventRow
            @clickBtn="openRequestForm(event)"
            :id="event.id"
            :direction="event.direction"
            :date="event.date"
            :location="event.city"
            :cost="event.cost"
            :title="event.title"
          />
        </div>
      </div>
      <div
        v-else-if="!eventsStore.isLoading && !eventsStore.visibleEvents.length"
      >
        <p class="text-24 font-400 text-basic text-center">Событий нет</p>
      </div>
    </div>
    <RequestForm @sendRequest="sendRequest" />
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useEventsStore } from "../stores/events";
import { useFiltersStore } from "../stores/filters";
import EventCard from "./EventCard.vue";
import EventRow from "./EventRow.vue";
import RequestForm from "./RequestForm.vue";

const eventsStore = useEventsStore();
const filtersStore = useFiltersStore();

const observer = ref(null);

const selectedEvent = ref(null);

const setObserver = (el, index) => {
  if (el && index === eventsStore.visibleEvents.length - 1) {
    if (observer.value != null) {
      observer.value.observe(el);
    }
  }
};

const openRequestForm = (event) => {
  selectedEvent.value = event;
  window.dispatchEvent(new CustomEvent(`show-request-form`));
};

const sendRequest = (data) => {
  const events = JSON.parse(sessionStorage.getItem("myEvents")) || [];
  const requests = JSON.parse(sessionStorage.getItem("requests")) || [];

  const eventExists = events.some(
    (event) => event.id === selectedEvent.value.id
  );
  const requestsExists = requests.some(
    (request) => request.email === data.email
  );

  if (!eventExists) {
    events.push({ ...selectedEvent.value });
    sessionStorage.setItem("myEvents", JSON.stringify(events));
  }
  if (!requestsExists) {
    requests.push({ ...data });
    sessionStorage.setItem("requests", JSON.stringify(requests));
  }
};

onMounted(async () => {
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

watch(
  () => filtersStore.applyFilters,
  () => {
    console.log(1);
    eventsStore.resetVisibleEvents();
  }
);

// Обновление видимых событий при изменении сортировки или поискового запроса
watch(
  () => [
    filtersStore.selectedSortCost,
    filtersStore.selectedSortDate,
    filtersStore.searchQuery,
  ],
  () => {
    eventsStore.resetVisibleEvents();
  }
);
</script>

<style></style>
