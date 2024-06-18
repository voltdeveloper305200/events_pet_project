<template>
  <div class="filter-direction">
    <p>По дате</p>
    <select
      v-model="filtersStore.selectedSortDate"
      class="filter-direction__select mt-8"
      name=""
      id=""
    >
      <option
        v-for="item in filtersStore.variantsSortDate"
        :key="item.id"
        :value="item"
      >
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { useFiltersStore } from "../../stores/filters";

const filtersStore = useFiltersStore();
</script>

<style lang="scss" scoped>
.filter-direction {
  &__select {
    padding: 2px 10px;
    border: 1px solid theme("colors.stroke");
  }
}
</style>
