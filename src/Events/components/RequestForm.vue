<template>
  <Modal id="request-form">
    <h1 v-if="step === 'form'" class="text-20 font-500 text-basic">
      Записаться на мероприятие
    </h1>
    <h1 v-else class="text-20 font-500 text-basic">Вы успешно записались</h1>
    <form
      v-if="step === 'form'"
      @submit.prevent="sendRequest"
      action=""
      class="mt-24"
    >
      <div class="email">
        <div class="text-16 font-400 text-basic">Email</div>
        <input
          placeholder="test@test.test"
          v-model="email"
          class="request-input mt-8"
          type="text"
        />
      </div>
      <div class="number mt-24">
        <div class="text-16 font-400 text-basic">Номер телефона</div>
        <input
          v-maska
          placeholder="+7(999)-999-99-99"
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
    <div class="mt-24" v-else>
      <div class="flex justify-center">
        <i class="fa-solid fa-check text-228 text-success"></i>
      </div>
      <router-link to="/my-events" @click="resetStep">
        <button class="request-btn mt-16">Мои события</button>
      </router-link>
    </div>
  </Modal>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import Modal from "../../components/Modal.vue";
import { vMaska } from "maska";

const email = ref("");
const number = ref("");

const step = ref("form");

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

const resetStep = () => {
  step.value = "form";
};

const sendRequest = () => {
  const data = {
    number: number.value,
    email: email.value,
  };
  if (validateForm.value) {
    emit("sendRequest", data);
    resetForm();
    step.value = "success";
  } else {
    alert("error");
  }
};

onMounted(() => {
  window.addEventListener("onClosed-request-form", resetStep);
});
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
