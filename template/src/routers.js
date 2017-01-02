import Index from './views/Index.vue'

export default function Routers (router) {
  router.map({
    'unauthorized': {
      name: 'unauthorized',
      component: Unauthorized,
      title: '鉴权失败',
      noNeedWxAuth: true
    }
  })

  if (process.env.NODE_ENV !== 'production') {
    router.map({
      '/': {
        name: 'index',
        component: Index,
        title: '首页',
        noNeedWxAuth: true,   // 不需要微信登录
        noNeedWxJsSdK: true         // 不需要配置jsSdk
      }
    })
  }

  router.redirect({
    '*': '/404'
  })

  // 检查域名路径path是否为空
  if (process.env.NODE_ENV !== 'production') {
    if (window.location.pathname !== '/' || window.location.search) {
      alert('请求接口出现错误（路径、网络、代理）' + '\n' + '本提示仅开发环境可见')
    }
  }

  router.beforeEach(({ to, next }) => {
    if (process.env.NODE_ENV !== 'production') {
      console.time('routerBefore')
    }
    router.app.$dispatch('loading', {show: false})
    router.app.$dispatch('alert', {show: false})
    router.app.$dispatch('toast', {show: false})
    router.app.$dispatch('confirm', {show: false})
    next()
  })

  // 登录是前提，要在最前面
  router.beforeEach(({ from, to, next }) => {
    if (to.noNeedWxAuth) {
      next()
    } else {
      if (!to.router.app.loading.show) {
        router.app.$dispatch('loading', { show: true, text: to.loadingText || '加载中...' })
      }
      let sync = !window.userValue.back && to.syncUser
      UserApi.login(sync).then((userInfo) => {
        window.user = userInfo

        let authorized = function (user) {
          /* eslint-disable */
          return (user && (user.status == 1 || user.status == 2 || user.status == 3))
          /* eslint-enable */
        }

        if (!authorized(window.user)) {
          router.go({ name: 'unauthorized' })
        }

        next()
      }).catch((response) => {
        router.app.$dispatch('loading', {show: false})
        if (response === 401) {
          console.log(response)
        } else {
          alertErr(response, 'login wx error: ')
        }
      })
    }
  })

  router.beforeEach(({to, next}) => {
    if (window.userValue.jsSdkReady === true || to.noNeedWxAuth || to.noNeedWxJsSdK) {
      next()
    } else {
      var jsApiList = [
        'openEnterpriseChat',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'chooseImage',
        'uploadImage',
        'previewImage',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'onVoicePlayEnd',
        'uploadVoice',
        'downloadVoice',
        'translateVoice',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'scanQRCode',
        'chooseCard',
        'addCard',
        'openCard'
      ]
      if (!to.router.app.loading.show) {
        router.app.$dispatch('loading', { show: true, text: to.loadingText || '加载中...' })
      }

      let isWeixinBrowser = function () {
        return /micromessenger/.test(navigator.userAgent.toLowerCase())
      }

      if (isWeixinBrowser()) {
        jsSdkApi.jsSdk(jsApiList).then(() => {
          wx.ready(() => {
            window.userValue.jsSdkReady = true
            next()
          })
          setTimeout(() => {
            if (!window.userValue.jsSdkReady) {
              window.userValue.jsSdkReady = true
              console.log('微信jssdk没有成功配置')
              next()
            }
          }, 10000)
        }).catch((response) => {
          router.app.$dispatch('loading', {show: false})
          alertErr(response, 'jssdk error: ')
        })
      } else {
        console.log('非微信浏览器， 不配置jssdk')
        next()
      }
    }
  })

  router.beforeEach(({to, next}) => {
    if (to.noNeedWxAuth) {
      router.app.$dispatch('loading', {show: false})
      next()
    } else {
      if (!to.router.app.loading.show) {
        router.app.$dispatch('loading', { show: true, text: to.loadingText || '加载中...' })
      }
      getSetting(store, to.settingWithSignInAgreement || 0).then(({ data }) => {
        router.app.$dispatch('loading', {show: false})
        next()
      }).catch((response) => {
        router.app.$dispatch('loading', {show: false})
        alertErr(response, 'get setting error: ')
      })
    }
  })

  router.afterEach(({ to }) => {
    if (to.title === '') {
    } else if (typeof to.title === 'function') {
      document.title = to.title()
    } else {
      document.title = to.title || '你我贷'
    }
    document.body.style.backgroundColor = to.bgColor || '#f2f2f2'
    // hack在微信等webview中无法修改document.title的情况
    document.getElementById('iframe').contentWindow.location.reload()
    if (process.env.NODE_ENV !== 'production') {
      console.timeEnd('routerBefore')
    }
  })
}

