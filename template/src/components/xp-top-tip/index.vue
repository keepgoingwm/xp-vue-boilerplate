<template>
  <div class="xp_top_tip">
    <toast :show.sync="show" type="text" width="4.5rem" :time="time">
      <slot></slot>
    </toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import Toast from 'vux-src-components/toast'

  export default {
    components: {
      Toast
    },
    props: {
      show: {
        type: Boolean,
        require: true
      },
      time: {
        type: Number,
        default: 1000
      }
    }
  }
</script>

<style lang="scss">
  .xp_top_tip {
    .weui_toast {
      top: 0;
      width: 4.4rem !important;
    }
    .weui_toast_text {
      margin-top: 0;
    }
    .weui_toast_content {
      padding-top: 5px;
      padding-bottom: 5px;
      font-size: 10px;
      line-height: 1.5;
    }
  }
</style>
