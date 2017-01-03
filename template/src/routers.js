import Index from './views/Index.vue'

export default function Routers (router) {
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

