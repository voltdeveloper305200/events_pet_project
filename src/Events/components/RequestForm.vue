<template>
  <Modal id="request-form">
    <h1 class="text-20 font-500 text-basic">Записаться на мероприятие</h1>
    <form @submit.prevent="sendRequest" action="" class="mt-24">
      <div class="email">
        <div class="text-16 font-400 text-basic">Email</div>
        <input v-model="email" class="request-input mt-8" type="text" />
      </div>
      <div class="number mt-24">
        <div class="text-16 font-400 text-basic">Номер телефона</div>
        <input
          v-maska
          data-maska="+7(###)-###-##-##"
          v-model="number"
          class="request-input mt-8"
          type="text"
        />
      </div>
      <div class="btn mt-24">
        <button class="request-btn">Записаться</button>
      </div>
    </form>
  </Modal>
</template>

<script setup>
import { computed, ref } from "vue";
import Modal from "../../components/Modal.vue";
import { vMaska } from "maska";

const email = ref("");
const number = ref("");

const emit = defineEmits(["sendRequest"]);

const validateForm = computed(() => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
  return emailPattern.test(email.value) && phonePattern.test(number.value);
});

const resetForm = () => {
  email.value = "";
  number.value = "";
};

const sendRequest = () => {
  const data = {
    number: number.value,
    email: email.value,
  };
  if (validateForm.value) {
    emit("sendRequest", data);
    resetForm();
  } else {
    alert("error");
  }
};
</script>

<style lang="scss" scoped>
.request-input {
  width: 100%;
  height: 45px;
  border: 1px solid theme("colors.stroke");
  padding: 0 12px;
  border-radius: 6px;
  &:focus {
    outline: none;
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
