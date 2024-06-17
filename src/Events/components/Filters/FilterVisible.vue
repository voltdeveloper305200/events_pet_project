<template>
  <div class="filter-visible">
    <h3>Отображение</h3>
    <div class="filter-visible__items flex items-center">
      <div
        v-for="item in filtersStore.variantsVisible"
        :key="item.id"
        class="filter-visible__item"
        @click="selectVariantVisible(item)"
        :class="{ active: item.id === filtersStore.selectedVariantVisible.id }"
      >
        <i class="fa-solid item-icon" :class="`fa-${item.value}`"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFiltersStore } from "../../stores/filters";

const filtersStore = useFiltersStore();

const selectVariantVisible = (variant) => {
  filtersStore.selectedVariantVisible = variant;
};
</script>

<style lang="scss" scoped>
.filter-visible {
  &__item {
    margin-left: 16px;
    cursor: pointer;
    font-size: 26px;
    &:first-child {
      margin-left: 0;
    }
    &.active {
      color: theme("colors.accent");
    }
  }
}
</style>
