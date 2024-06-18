<template>
  <div v-if="isVisible" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <slot></slot>
      <button class="modal-close text-20" @click="close">
        <i class="fa-solid fa-circle-xmark text-accent"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  id: String,
});

const isVisible = ref(false);

const show = () => {
  isVisible.value = true;
};

const close = () => {
  isVisible.value = false;
};

onMounted(() => {
  window.addEventListener(`show-${props.id}`, show);
  window.addEventListener(`close-${props.id}`, close);
});

onUnmounted(() => {
  window.removeEventListener(`show-${props.id}`, show);
  window.removeEventListener(`close-${props.id}`, close);
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  min-width: 500px;
  background: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  cursor: pointer;
}
</style>
