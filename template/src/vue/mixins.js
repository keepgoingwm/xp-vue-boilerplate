// import global from './mixins/global'
import apiUtils from '../libs/_self/apiUtils'
import appUtils from '../libs/_self/appUtils'
// import data from './mixins/data'
// import throttledExec from './mixins/throttedExec'

import { global, setting } from 'src/vuex/getters'

export default {
  // data,
  // throttledExec,
  base: {
    vuex: {
      getters: {
        global,
        setting
      }
    },
    data () {
      return {
        htmlFontSize: window.htmlFontSize
      }
    },
    methods: Object.assign(
      {
        routerGo (name, params, query) {
          return router.go({ name: name, params: params, query: query })
        },
        routerReplace (name, params, query) {
          return router.replace({ name: name, params: params, query: query })
        },
        setHeadTitle (title) {
          document.title = title
          // hack在微信等webview中无法修改document.title的情况
          document.getElementById('iframe').contentWindow.location.reload()
        }
      },
      apiUtils,
      appUtils
    )
  }
}

