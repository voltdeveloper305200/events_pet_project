<template>
  <div class="filter-cost">
    <div class="flex items-center">
      <div class="">
        <p>Цена от: {{ filtersStore.minPrice }}</p>
        <input
          class="mt-16"
          id="minPrice"
          type="range"
          :min="filtersStore.minCost"
          :max="filtersStore.maxCost"
          v-model="filtersStore.minPrice"
        />
      </div>
      <div class="ms-24">
        <p>Цена до: {{ filtersStore.maxPrice }}</p>
        <input
          class="mt-16"
          id="maxPrice"
          type="range"
          :min="filtersStore.minCost"
          :max="filtersStore.maxCost"
          v-model="filtersStore.maxPrice"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { useFiltersStore } from "../../stores/filters";

const filtersStore = useFiltersStore();

watch(filtersStore.minPrice, (newValue) => {
  if (newValue > filtersStore.maxPrice) {
    filtersStore.maxPrice = newValue;
  }
});

watch(filtersStore.maxPrice, (newValue) => {
  if (newValue < filtersStore.minPrice) {
    filtersStore.minPrice = newValue;
  }
});
</script>

<style></style>
