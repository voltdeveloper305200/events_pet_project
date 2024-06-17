import bus from "vue3-eventbus";
import { ref, watch } from "vue";

const useModal = () => {
  return (id = "main-modal") => {
    const isOpen = ref(false);

    watch(isOpen, (value) => {
      bus.emit(`toggle:${id}`, value);
    });

    bus.on(`close:${id}`, () => {
      isOpen.value = false;
    });

    const toggle = () => {
      isOpen.value = !isOpen.value;
    };

    const close = () => {
      isOpen.value = false;
    };

    return {
      isOpen,
      toggle,
      close,
    };
  };
};

export default useModal;
