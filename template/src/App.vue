<template>
  <div class="app">
    <router-view class="view" keep-alive transition-mode="out-in"></router-view>
    <!-- hack在微信等webview中无法修改document.title的情况 -->
    <iframe id="iframe" style="display: none" src="/assets/static/iframe.html"></iframe>
    <loading :show="loading.show" :text="loading.text" v-if="loading.show"></loading>
    <loading :show="routeLoading.show" :text="routeLoading.text" v-if="routeLoading.show"></loading>
    <toast :show.sync="toast.show"
           :type="toast.type"
           :time="toast.time"
           mask-transition=""
           dialog-transition=""
           :width="toast.text.length > 7 ? '18em' : null">
      {{ toast.text }}
    </toast>
    <xp-top-tip :show.sync="topTip.show"
                :time="topTip.time"
                v-if="topTip.show">{{{ topTip.text }}}</xp-top-tip>
    <alert :show.sync="alert.show"
           :icon-name="alert.iconName"
           :icon-style="alert.iconStyle"
           :title="alert.title"
           :button-text="alert.buttonText"
           mask-transition=""
           dialog-transition=""
           @on-show="alert.onShow"
           @on-hide="alert.onHide">
      {{{ alert.text }}}
    </alert>
    <confirm :show.sync="confirm.show"
             :title="confirm.title"
             :confirm-text="confirm.confirmText"
             :cancel-text="confirm.cancelText"
             @on-confirm="confirm.onConfirm"
             @on-cancel="confirm.onCancel"
             @on-show="confirm.onShow"
             @on-hide="confirm.onHide" v-if="confirm.show">
      {{{ confirm.text }}}
    </confirm>
  </div>
</template>

<script type = "text/ecmascript-6">
  import store from './vuex/store'
  import Loading from 'vux-src-components/loading'
  import Toast from 'vux-src-components/toast'
  import Alert from './components/xp-alert/index.vue'
  import Confirm from 'vux-src-components/confirm'
  import XpTopTip from './components/XpTopTip.vue'

  let emptyFunc = () => {}

  export default {
    store,
    components: { Loading, Toast, Alert, Confirm, XpTopTip },
    data () {
      return {
        loading: {
          show: false,
          text: ''
        },
        routeLoading: {
          show: false,
          text: ''
        },
        toast: {
          show: false,
          type: 'text',
          time: null,
          text: '',
          callback: emptyFunc
        },
        topTip: {
          show: false,
          text: '',
          time: null
        },
        alert: {
          show: false,
          iconName: '',
          iconStyle: null,
          title: '',
          text: '',
          buttonText: '确定',
          onShow: emptyFunc,
          onHide: emptyFunc
        },
        confirm: {
          show: false,
          title: '',
          text: '',
          confirmText: '确定',
          cancelText: '取消',
          onConfirm: emptyFunc,
          onCancel: emptyFunc,
          onShow: emptyFunc,
          onHide: emptyFunc
        }
      }
    },
    watch: {
      'toast.show' (val, oldVal) {
        if (val === false && oldVal === true) {
          this.toast.callback()
        }
      }
    },
    events: {
      loading ({ show = true, text = '加载中...' }) {
        this.loading = {show, text}
      },
      toast ({ show = true, type = 'text', time = 2000, text = '', callback = emptyFunc }) {
        this.toast = { show, type, time, text, callback }
      },
      topTip ({ show = true, text = 'text', time = 2000 }) {
        this.topTip = { show, text, time }
      },
      alert ({show = true, title = '', iconName = '', iconStyle = null, text = '', buttonText = '确定', onShow = emptyFunc, onHide = emptyFunc}) {
        this.alert = { show, title, iconName, iconStyle, text, buttonText, onShow, onHide }
      },
      confirm ({
              show = true,
              title = '',
              text = '',
              confirmText = '确定',
              cancelText = '取消',
              onConfirm = emptyFunc,
              onCancel = emptyFunc,
              onShow = emptyFunc,
              onHide = emptyFunc
      }) {
        this.confirm = { show, title, text, confirmText, cancelText, onConfirm, onCancel, onShow, onHide }
      }
    }
  }
</script>

<style lang="scss">
@import '~sass-sandal/core';
  [v-cloak] {
    display: none;
  }
  .view {
    transition: all .2s ease;
  }
  .fade-enter, .fade-leave {
    opacity: 0;
  }
  .app {
    font-size: 16px;
	  .weui_toast {
      min-height: 2.4rem;
    }
    .vux-alert {
      .weui_dialog {
        top: 45%;
      }
    }
    .weui_dialog_alert.weui_dialog_confirm {
      .weui_dialog {
        top: 45%;
      }
    }
  }
  * {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
</style>
