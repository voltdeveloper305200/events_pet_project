<template>
  <div class="filter-direction">
    <p>По направлению</p>
    <select
      v-model="filtersStore.selectedDirection"
      class="filter-direction__select mt-8"
      name=""
      id=""
    >
      <option v-for="(item, index) in directions" :key="index" :value="item">
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

const directions = computed(() => {
  const uniqueDirections = new Set(
    eventsStore.eventsList.map((event) => event.direction)
  );
  return Array.from(uniqueDirections);
});

</script>

<style lang="scss" scoped>
.filter-direction {
  &__select {
    padding: 2px 10px;
    border: 1px solid theme("colors.stroke");
  }
}
</style>
