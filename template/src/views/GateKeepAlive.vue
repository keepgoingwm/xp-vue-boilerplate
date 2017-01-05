<template>
  <router-view class="view" keep-alive transition="fade" transition-mode="out-in"></router-view>
</template>

<style lang="scss">
  .fade-transition {
    /*background-color: white;*/
    transition: opacity 0.2s ease;
  }
  .fade-enter, .fade-leave {
    opacity: 0;
  }
</style>