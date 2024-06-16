<template>
  <div class="main-content">
    <div class="main-container">
      <Menu />
      <div class="content-app mt-50">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Menu from "./components/Menu.vue";
</script>
