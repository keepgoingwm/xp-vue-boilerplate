<template>
  <div id="app">
    <router-view></router-view>
    <!-- hack在微信等webview中无法修改document.title的情况 -->
    <iframe id="iframe" style="display: none" src="/assets/static/iframe.html"></iframe>
  </div>
</template>

<script>
export default {
  name: 'app'
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
