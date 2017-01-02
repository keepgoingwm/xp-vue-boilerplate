<template>
  <div>
    <router-view class="view" keep-alive transition="fade" transition-mode="out-in" v-if="!noTransition"></router-view>
    <router-view class="view" keep-alive v-else></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      transition: false
    }
  },

  route: {
    data ({ to, next }) {
      if (to.transition) {
        this.noTransition = false
      } else {
        this.noTransition = true
      }
      next()
    }
  }
}
</script>

<style lang="scss">
  .fade-transition {
    /*background-color: white;*/
    transition: opacity 0.2s ease;
  }
  .fade-enter, .fade-leave {
    opacity: 0;
  }
</style>