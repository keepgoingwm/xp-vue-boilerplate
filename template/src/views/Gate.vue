<template>
  <div>
    <router-view class="view" transition="fade" transition-mode="out-in" v-if="!noTransition"></router-view>
    <router-view class="view" v-else></router-view>
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
