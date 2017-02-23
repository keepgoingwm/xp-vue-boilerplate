<template>
  <div id="app">
    <router-view></router-view>
    <!-- hack在微信等webview中无法修改document.title的情况 -->
    <iframe id="iframe" style="display: none" src="/assets/static/iframe.html"></iframe>
    <loading :show="loading.show" :text="loading.text" v-if="loading.show"></loading>
    <toast :show.sync="toast.show"
           :type="toast.type"
           :time="toast.time"
           mask-transition=""
           dialog-transition=""
           :width="toast.text.length > 7 ? '18em' : null"><div v-html="toast.text"></div></toast>
    <xp-top-tip :show.sync="topTip.show"
                :time="topTip.time"
                v-if="topTip.show"><div v-html="topTip.text"></div></xp-top-tip>
    <alert :show.sync="alert.show"
           :icon-name="alert.iconName"
           :icon-style="alert.iconStyle"
           :title="alert.title"
           :button-text="alert.buttonText"
           mask-transition=""
           dialog-transition=""
           @on-show="alert.onShow"
           @on-hide="alert.onHide"><div v-html="alert.text"></div></alert>
    <confirm :show.sync="confirm.show"
             :title="confirm.title"
             :confirm-text="confirm.confirmText"
             :cancel-text="confirm.cancelText"
             @on-confirm="confirm.onConfirm"
             @on-cancel="confirm.onCancel"
             @on-show="confirm.onShow"
             @on-hide="confirm.onHide" v-if="confirm.show"><div v-html="confirm.text"></div></confirm>
  </div>
</template>

<script type="text/ecmascript-6">
import store from './store'
import {Loading, Toast, Confirm} from 'vux'
import Alert from './components/xp-alert/index.vue'
import XpTopTip from './components/xp-top-tip/index.vue'
export default {
  name: 'app',
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
        callback: _.noop
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
        onShow: _.noop,
        onHide: _.noop
      },
      confirm: {
        show: false,
        title: '',
        text: '',
        confirmText: '确定',
        cancelText: '取消',
        onConfirm: _.noop,
        onCancel: _.noop,
        onShow: _.noop,
        onHide: _.noop
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
    toast ({ show = true, type = 'text', time = 2000, text = '', callback = _.noop }) {
      this.toast = { show, type, time, text, callback }
    },
    topTip ({ show = true, text = 'text', time = 2000 }) {
      this.topTip = { show, text, time }
    },
    alert ({show = true, title = '', iconName = '', iconStyle = null, text = '', buttonText = '确定', onShow = _.noop, onHide = _.noop}) {
      this.alert = { show, title, iconName, iconStyle, text, buttonText, onShow, onHide }
    },
    confirm ({
            show = true,
            title = '',
            text = '',
            confirmText = '确定',
            cancelText = '取消',
            onConfirm = _.noop,
            onCancel = _.noop,
            onShow = _.noop,
            onHide = _.noop
    }) {
      this.confirm = { show, title, text, confirmText, cancelText, onConfirm, onCancel, onShow, onHide }
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .app {
    font-size: 16px;
    .view {
      transition: all .2s ease;
    }
    .weui_toast {
      z-index: 99999;
      min-height: 2.4rem;
    }
    .vux-alert {
      z-index: 99999;
      .weui_dialog {
        top: 45%;
      }
    }
    .weui_dialog_alert, .weui_dialog_confirm {
      z-index: 99999;
      .weui_mask {
        z-index: 99999;
      }
      .weui_dialog {
        z-index: 99999;
        top: 45%;
      }
    }
  }
  * {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
</style>
