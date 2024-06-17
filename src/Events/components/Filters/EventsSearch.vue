<template>
  <div class="events-search">
    <h3 class="title">Поиск</h3>
    <input class="events-search__input mt-12" type="text" />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.events-search {
  &__input {
    width: 100%;
    height: 40px;
    border: 1px solid theme("colors.stroke");
  }
}
</style>
