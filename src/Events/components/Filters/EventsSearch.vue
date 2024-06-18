<template>
  <div class="events-search">
    <h3 class="title">Поиск</h3>
    <input
      v-model="filtersStore.searchQuery"
      placeholder="Frontend"
      class="events-search__input mt-12"
      type="text"
    />
  </div>
</template>

<script setup>
import { useFiltersStore } from "../../stores/filters";

const filtersStore = useFiltersStore();
</script>

<style lang="scss" scoped>
.events-search {
  &__input {
    width: 100%;
    height: 40px;
    border: 1px solid theme("colors.stroke");
    border-radius: 6px;
    outline: none;
    padding: 0 12px;
  }
}
</style>
