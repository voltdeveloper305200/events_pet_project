<template>
  <header class="menu">
    <div class="menu-content">
      <div class="menu-content__logo">EventsBoard</div>
      <div class="menu-content__nav">
        <router-link class="nav-item" to="/">
          <i class="fa-solid fa-house"></i>
          <span class="ml-6">Главная</span>
        </router-link>
        <router-link class="nav-item ml-24" to="/my-events">
          <i class="fa-solid fa-user"></i>
          <span class="ml-6">Мои события</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.menu {
  padding: theme("spacing.24");
  border-radius: 0px 0px 24px 24px;
  background: theme("colors.white");
  box-shadow: theme("boxShadow.menu");
  border: 1px solid theme("colors.stroke");
  @media (max-width: 576px) {
    padding: 10px;
  }
  .menu-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 576px) {
      flex-direction: column;
    }
    &__logo {
      font-size: 20px;
      font-weight: 600;
      line-height: 22px;
      color: theme("colors.heading");
      @media (max-width: 576px) {
        font-size: 14px;
      }
    }
    &__nav {
      @media (max-width: 576px) {
        margin-top: 8px;
      }
      .nav-item {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        color: theme("colors.basic");
        &.router-link-active.router-link-exact-active {
          color: theme("colors.accent");
        }
        @media (max-width: 576px) {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
