<template>
  <Modal id="filters" class="events-filters">
    <div>
      <h1 class="text-20 font-500 text-basic">Фильтры</h1>
      <div class="grid grid-cols-12 gap-24">
        <div class="col-span-12">
          <div class="events-filters__filters">
            <div class="grid grid-cols-12 items-center">
              <div class="col-span-7">
                <FilterCost />
              </div>
              <div class="col-span-5">
                <FilterDate />
              </div>
              <div class="col-span-12 mt-20">
                <div class="grid grid-cols-12">
                  <div class="col-span-6">
                    <FilterDirection />
                  </div>
                  <div class="col-span-6">
                    <FilterCity />
                  </div>
                </div>
              </div>
              <div class="col-span-12 mt-20">
                <div class="grid grid-cols-12">
                  <div class="col-span-6">
                    <SortCost />
                  </div>
                  <div class="col-span-6">
                    <SortDate />
                  </div>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-12 gap-24 mt-32">
              <div class="col-span-6">
                <button class="btn-clear">Сбросить</button>
              </div>
              <div class="col-span-6">
                <button class="btn-apply">Применить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref } from "vue";
import FilterCity from "./FilterCity.vue";
import FilterCost from "./FilterCost.vue";
import FilterDate from "./FilterDate.vue";
import FilterDirection from "./FilterDirection.vue";
import SortCost from "./SortCost.vue";
import SortDate from "./SortDate.vue";
import Modal from "@/components/Modal.vue";
</script>

<style lang="scss" scoped>
.btn-clear {
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: theme("colors.error");
  border-radius: 6px;
  font-size: 16px;
  font-weight: 400;
  color: theme("colors.white");
}
.btn-apply {
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: theme("colors.success");
  border-radius: 6px;
  font-size: 16px;
  font-weight: 400;
  color: theme("colors.white");
}
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
