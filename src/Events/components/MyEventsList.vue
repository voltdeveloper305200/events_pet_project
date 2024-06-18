<template>
  <div class="my-events">
   <div class="p-12 sm:p-24 bg-white rounded-6 flex justify-between items-center">
    <h1 class="text-18 sm:text-24 font-500 text-basic">Мои События</h1>
    <FilterVisible class="hidden lg:block"/>
   </div>
    <div class="mt-24" v-if="myEvents.length">
      <div
        class="cards"
        v-if="filtersStore.selectedVariantVisible.code === 'cards'"
      >
        <div class="grid grid-cols-12 gap-24">
          <div
            class="col-span-12 md:col-span-6 lg:col-span-4"
            v-for="event in myEvents"
            :key="event.id"
          >
            <EventCard
              class="h-full"
              :isMyEvent="true"
              :direction="event.direction"
              :date="event.date"
              :location="event.city"
              :cost="event.cost"
              :title="event.title"
            />
          </div>
        </div>
      </div>
      <div
        class="list hidden lg:block"
        v-if="filtersStore.selectedVariantVisible.code === 'list'"
      >
        <div class="grid grid-cols-12 gap-24">
          <div class="col-span-12" v-for="event in myEvents" :key="event.id">
            <EventRow
              :id="event.id"
              :direction="event.direction"
              :date="event.date"
              :location="event.city"
              :cost="event.cost"
              :title="event.title"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-14 sm:text-18 font-400 text-basic text-center mt-24">
        События пока не добавлены
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useFiltersStore } from "../stores/filters";
import EventCard from "./EventCard.vue";
import EventRow from "./EventRow.vue";
import FilterVisible from "./Filters/FilterVisible.vue";

const filtersStore = useFiltersStore();

const isLoading = ref(true);

const myEvents = ref([]);

onMounted(() => {
  const storedEvents = JSON.parse(sessionStorage.getItem("myEvents")) || [];
  myEvents.value = storedEvents;
  isLoading.value = false;
});
</script>

<style></style>
