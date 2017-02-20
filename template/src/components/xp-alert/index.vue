<template>
  <div class="vux-alert">
    <x-dialog
    class="weui_dialog_alert"
    :show="show"
    :mask-transition="maskTransition"
    :dialog-transition="dialogTransition"
    @on-hide="$emit('on-hide')"
    @on-show="$emit('on-show')">
      <div class="weui_dialog_hd">
        <i class="iconfont" :class="fullIconName" :style="iconStyle"></i> <strong class="weui_dialog_title">{{title}}</strong>
      </div>
      <div class="weui_dialog_bd"><slot></slot></div>
      <div class="weui_dialog_ft">
        <a href="javascript:;" class="weui_btn_dialog primary" @click="onHide">{{buttonText}}</a>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import {XDialog} from 'vux'

export default {
  components: {
    XDialog
  },
  props: {
    show: Boolean,
    title: String,
    iconName: String,
    iconStyle: Object,
    buttonText: {
      type: String,
      default: 'OK'
    },
    maskTransition: {
      type: String,
      default: 'vux-fade'
    },
    dialogTransition: {
      type: String,
      default: 'vux-dialog'
    }
  },
  computed: {
    fullIconName () {
      return 'icon' + this.iconName
    }
  },
  methods: {
    onHide () {
      this.show = false
    }
  }
}
</script>

<style lang="less">
@import '../../../node_modules/vux/src/styles/transition.less';
@import '../../../node_modules/vux/src/styles/weui/widget/weui_tips/weui_mask';
@import '../../../node_modules/vux/src/styles/weui/widget/weui_tips/weui_dialog';
</style>
