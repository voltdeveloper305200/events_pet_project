<template>
  <div class="event-row">
    <div class="grid grid-cols-12 items-center w-full">
      <div class="col-span-5">
        <div class="flex items-center">
          <h2 class="title">{{ props.title }}</h2>
        </div>
      </div>
      <div class="col-span-3">
        <div class="flex items-center">
          <div class="flex items-center">
            <i class="fa-solid fa-book text-accent"></i>
            <p class="direction ms-4">{{ props.direction }}</p>
          </div>
          <div class="flex items-center ms-12">
            <i class="fa-solid fa-location-dot text-accent"></i>
            <p class="location ms-4">{{ props.location }}</p>
          </div>
        </div>
      </div>
      <div class="col-span-4">
        <div class="grid grid-cols-12 items-center">
          <div class="col-span-4">
            <div class="flex items-center">
              <i class="fa-solid fa-calendar-day text-accent"></i>
              <p class="date ms-4">{{ formattedDate }}</p>
            </div>
          </div>
          <div class="col-span-8">
            <div class="grid grid-cols-12 items-center">
              <div class="col-span-5">
                <p class="cost">$ {{ props.cost }}</p>
              </div>
              <div @click="clickBtn" class="col-span-7">
                <button class="btn-request">Записаться</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { computed } from "vue";

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  direction: String,
  date: String,
  location: String,
  cost: Number,
  id: Number,
  title: String,
});

const formattedDate = computed(() => {
  return moment(props.date).format("DD.MM.YYYY");
});

const emit = defineEmits(["clickBtn"]);

const clickBtn = () => {
  emit("clickBtn");
};
</script>

<style lang="scss" scoped>
.event-row {
  cursor: pointer;
  width: 100%;
  height: 50px;
  padding: 0 12px;
  background: theme("colors.white");
  border: 1px solid theme("colors.stroke");
  border-radius: 10px;
  display: flex;
  align-items: center;
  .direction {
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0.24px;
  }
  .date {
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0.24px;
  }
  .cost {
    font-size: 18px;
    font-weight: 600;
    line-height: 16px;
    color: theme("colors.accent");
  }
  .title {
    font-size: 18px;
    font-weight: 500;
    line-height: 16px;
  }
  .location {
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0.24px;
  }
  .btn-request {
    width: 100%;
    height: 38px;
    border-radius: 33px;
    border: 1px solid theme("colors.white");
    background: theme("colors.accent");
    color: theme("colors.white");
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    transition: 0.2s ease-in;
    &:hover {
      color: theme("colors.accent");
      background: none;
      border: 1px solid theme("colors.accent");
    }
  }
}
</style>
