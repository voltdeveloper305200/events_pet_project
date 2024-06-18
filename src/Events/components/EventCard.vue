<template>
  <div class="event-card" v-if="!isLoading">
    <div class="event-card__header flex items-center justify-between">
      <div class="flex items-center">
        <i class="fa-solid fa-book text-accent"></i>
        <p class="direction ms-4">{{ props.direction }}</p>
      </div>
      <div class="flex items-center">
        <i class="fa-solid fa-calendar-day text-accent"></i>
        <p class="date ms-6">{{ formattedDate }}</p>
      </div>
    </div>
    <div class="flex flex-col justify-between h-full pb-16">
      <div class="event-card__content mt-20">
        <div class="flex items-center">
          <i class="fa-solid fa-location-dot text-accent"></i>
          <p class="content-location ms-6">{{ props.location }}</p>
        </div>
        <p class="content-cost mt-16">$ {{ props.cost }}</p>
        <h2 class="content-title mt-12">{{ props.title }}</h2>
      </div>
      <button v-if="!isMyEvent" @click="clickBtn" class="request-btn mt-20">
        Записаться
      </button>
    </div>
  </div>
  <Skeletor v-else width="100%" height="291px" />
</template>

<script setup>
import moment from "moment";
import { computed } from "vue";

const props = defineProps({
  isMyEvent: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  direction: String,
  date: String,
  location: String,
  cost: Number,
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
.event-card {
  cursor: pointer;
  padding: 16px;
  border-radius: 8px;
  background: theme("colors.white");
  border: 1px solid theme("colors.stroke");
  color: theme("colors.basic");
  .direction {
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.24px;
  }
  .date {
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
  }
  .content-cost {
    font-size: 24px;
    font-weight: 600;
    line-height: 24px;
    color: theme("colors.accent");
    @media (max-width: 576px) {
      font-size: 18px;
      line-height: 24px;
    }
  }
  .content-title {
    font-size: 26px;
    font-weight: 500;
    line-height: 32px;
    @media (max-width: 576px) {
      font-size: 18px;
      line-height: 24px;
    }
  }
  .content-location {
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
  }
}
.request-btn {
  width: 100%;
  height: 45px;
  border-radius: 33px;
  border: 1px solid theme("colors.white");
  background: theme("colors.accent");
  color: theme("colors.white");
  font-size: 16px;
  font-weight: 500;
  line-height: 18px;
  transition: 0.2s ease-in;
  &:hover {
    color: theme("colors.accent");
    background: none;
    border: 1px solid theme("colors.accent");
  }
}
</style>
