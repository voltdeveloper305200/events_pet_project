<template>
  <div class="filter-city">
    <p>По городу</p>
    <select v-model="filtersStore.selectedCity" class="filter-city__select mt-8" name="" id="">
      <option v-for="(item, index) in cities" :key="index" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useEventsStore } from "../../stores/events";
import { useFiltersStore } from "../../stores/filters";

const eventsStore = useEventsStore();
const filtersStore = useFiltersStore();

const cities = computed(() => {
  const uniqueCities = new Set(
    eventsStore.eventsList.map((event) => event.city)
  );
  return Array.from(uniqueCities);
});

</script>

<style lang="scss" scoped>
.filter-city {
  &__select {
    padding: 2px 10px;
    border: 1px solid theme("colors.stroke");
  }
}
</style>
