<template>
  <div class="filter-date">
    <h3 class="title">По дате</h3>
    <VDatePicker
      v-model.range="selectedDateRange"
      :popover="{
        placement: 'bottom-start',
      }"
      @change="updateFormattedDate"
    >
      <template #default="{ togglePopover }">
        <input
          v-model="formattedDate"
          class="filter-date__input mt-12"
          @focus="togglePopover"
          type="text"
        />
      </template>
    </VDatePicker>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import moment from "moment";
import { useFiltersStore } from "../../stores/filters";

const filtersStore = useFiltersStore();

const selectedDateRange = ref({ start: null, end: null });

const formattedDate = ref("");

const updateFormattedDate = () => {
  if (selectedDateRange.value.start && selectedDateRange.value.end) {
    formattedDate.value = `${moment(selectedDateRange.value.start).format(
      "DD.MM.YYYY"
    )} - ${moment(selectedDateRange.value.end).format("DD.MM.YYYY")}`;
    filtersStore.selectedDateRange.start = moment(
      selectedDateRange.value.start
    ).format("DD.MM.YYYY");
    filtersStore.selectedDateRange.end = moment(
      selectedDateRange.value.end
    ).format("DD.MM.YYYY");
  } else if (selectedDateRange.value.start) {
    formattedDate.value = moment(selectedDateRange.value.start).format(
      "DD.MM.YYYY"
    );
  } else {
    formattedDate.value = "";
  }
};

// Синхронизация изменений формата даты и выбранной даты
watch(selectedDateRange, updateFormattedDate);
</script>

<style lang="scss" scoped>
.date-picker {
  position: absolute;
}

.filter-date__input {
  border: 1px solid theme("colors.stroke");
  height: 40px;
  padding-left: 12px;
  &:focus {
    outline: none;
  }
}
</style>
