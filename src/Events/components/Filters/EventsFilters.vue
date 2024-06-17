<template>
  <div class="events-filters">
    <div
      class="events-filters__header flex justify-center w-full cursor-pointer"
      @click="visibleFiltersToggle"
    >
      <p class="text-16 text-basic">Фильтры</p>
      <i
        class="arrow-icon fa-solid fa-sort-down ms-6 text-basic"
        :class="{ active: isVisibleFilters }"
      ></i>
    </div>
    <Collapse :when="isVisibleFilters">
      <div class="grid grid-cols-12 gap-24">
        <div class="col-span-8">
          <div class="events-filters__filters">
            <div class="grid grid-cols-12 items-center">
              <div class="col-span-6">
                <FilterCost />
              </div>
              <div class="col-span-6">
                <FilterDate />
              </div>
              <div class="col-span-12 mt-16">
                <div class="grid grid-cols-12">
                  <div class="col-span-4">
                    <FilterDirection />
                  </div>
                  <div class="col-span-4">
                    <FilterCity />
                  </div>
                  <!-- <div class="col-span-4 flex justify-end">
                    
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-4">
          <div class="events-filters__filters">
            <div class="grid grid-cols-12 items-center">
              <div class="col-span-12">
                <EventsSearch/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Collapse>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Collapse } from "vue-collapsed";
import EventsSearch from "./EventsSearch.vue";
import FilterCity from "./FilterCity.vue";
import FilterCost from "./FilterCost.vue";
import FilterDate from "./FilterDate.vue";
import FilterDirection from "./FilterDirection.vue";
import FilterVisible from "./FilterVisible.vue";

const isVisibleFilters = ref(true);

const visibleFiltersToggle = () => {
  isVisibleFilters.value = !isVisibleFilters.value;
};
</script>

<style lang="scss" scoped>
.events-filters {
  &__header {
    .arrow-icon {
      transition: 0.2s ease-in;
      &.active {
        transform: rotate(180deg);
      }
    }
  }
  &__filters {
    margin-top: 16px;
    padding: 24px;
    background: theme("colors.white");
    border-radius: 8px;
    border: 1px solid theme("colors.stroke");
  }
}
</style>
