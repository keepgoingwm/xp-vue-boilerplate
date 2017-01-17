<template>
  <div class="">
    生命周期顺序
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    init () {
      console.log('init')
    },
    beforeCompile () {
      console.log('beforeCompile')
    },
    compiled () {
      console.log('compiled')
    },
    created () {
      console.log('created')
    },
    attached () {
      console.log('attached')
    },
    ready () {
      console.log('ready')
    },
    beforeDestroy () {
      console.log('beforeDestroy')
    },
    destroyed () {
      console.log('destroyed')
    },
    route: {
      canReuse () {
        console.log('route-canReuse')
        return true
      },
      canActivate () {
        console.log('route-canActivate')
        return true
      },
      canDeactivate () {
        console.log('route-canDeactivate')
        return true
      },
      activate ({to, next}) {
        // for (let j = 1000000 - 1; j >= 0; j--) {
        //   j = j + 1 - 1
        // }
        // setTimeout(() => {
        //   console.log('route-activate')
        //   next()
        // }, 10000)
        console.log('route-activate')
        next()
      },
      deactivate ({to, next}) {
        console.log('route-deactivate')
        next()
      },
      data ({to, next}) {
        console.log('route-data')
        next()
      }
    }
  }
</script>

<style lang="scss">
</style>
