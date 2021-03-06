import Filters from './filters'
import Directives from './directives'
import Mixins from './mixins'

let installVueGlobalApi = (Vue) => {
  Object.keys(Filters).forEach(k => {
    Vue.filter(k, Filters[k])
  })
  Object.keys(Directives).forEach(k => {
    Vue.directive(k, Directives[k])
  })
  Object.keys(Mixins).forEach(k => {
    Vue.mixin(Mixins[k])
  })
}

export default installVueGlobalApi
