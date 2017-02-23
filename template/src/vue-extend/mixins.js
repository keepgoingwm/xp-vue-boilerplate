// import global from './mixins/global'
import apiUtils from '../utils/_self/apiUtils'
import appUtils from '../utils/_self/appUtils'
// import data from './mixins/data'
// import throttledExec from './mixins/throttedExec'

export default {
  // data,
  // throttledExec,
  base: {
    data () {
      return {
        htmlFontSize: window.htmlFontSize
      }
    },
    computed: {
      setting () {
        return this.$store.state.setting
      },
      global () {
        return this.$store.state.setting.base
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

