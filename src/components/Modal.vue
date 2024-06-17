<template>
  <div :id="id" class="modal" :class="classes" @click="bus.emit(`close:${id}`)">
    <div class="modal__card" @click.stop>
      <div class="header">
        <div class="row">
          <slot name="icon" />
          <div class="header__title">
            <slot name="title" />
          </div>
        </div>
        <div
          v-if="slots.close"
          class="header__close"
          @click="bus.emit(`close:${id}`)"
        >
          <slot name="close" />
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, useSlots, onMounted, computed } from "vue";
import bus from "vue3-eventbus";

const slots = useSlots();

const props = defineProps({
  id: {
    type: String,
    default: "main-modal",
  },
  type: {
    type: String,
  },
});

const classes = computed(() => {
  const classes = [];
  if (props.type === "clear") {
    classes.push("clear");
  }
  return classes;
});

const defaultState = ref(false);

const timeout = ref(null);

const appScrollOff = () => {
  const app = document.querySelector("html, body");
  app.classList.add("scroll_off");
};

const appScrollOn = () => {
  const app = document.querySelector("html, body");
  app.classList.remove("scroll_off");
};

const openModal = ($modal) => {
  $modal.style.display = "flex";
  $modal.classList.add("open");
  defaultState.value = true;
  appScrollOff();
};

const closeModal = ($modal) => {
  appScrollOn();
  $modal.classList.remove("active");
  $modal.classList.add("close");
  timeout.value = setTimeout(() => {
    $modal.style.display = "none";
    $modal.classList.remove("close");
  }, 200);
};

bus.on(`toggle:${props.id}`, (open) => {
  const $modal = document.querySelector(`#${props.id}`);
  defaultState.value = false;

  if (open) {
    openModal($modal);
    return;
  }

  if (!open) {
    closeModal($modal);
    return;
  }
});

onMounted(() => {
  const $modal = document.querySelector(`#${props.id}`);
  if (!defaultState.value) {
    $modal.style.display = "none";
    return;
  }
  openModal($modal);
});
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  overflow: auto;
  opacity: 0;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(23, 18, 81, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  &__card {
    margin-top: 80px;
    background: white;
    padding: 24px;
    border-radius: 12px;
  }
  .header {
    width: 100%;
    display: flex;
    align-items: center;
    .row {
      display: inherit;
      align-items: inherit;
    }
    &__title {
      margin-left: 12px;
      font-size: 24px;
      font-weight: 400;
      color: theme("colors.heading");
    }
    &__close {
      margin-left: auto;
      cursor: pointer;
      transition: opacity 0.25s ease;
      &:active {
        transform: scale(0.9);
      }
      &:hover {
        opacity: 0.85;
      }
    }
  }
}
.modal.open {
  animation: open 0.3s ease-out forwards;
  @keyframes open {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
.modal.close {
  animation: close 0.2s ease-out forwards;
  @keyframes close {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}

.modal.clear {
  .modal__card {
    background: transparent;
    padding: 0;
    border-radius: 0;
  }
}
</style>
