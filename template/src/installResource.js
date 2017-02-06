import VueResource from 'vue-resource'

export default function (Vue) {
  Vue.use(VueResource)

  // var Auth = require('./libs/_self/auth')
  // Vue.http.interceptors.push((request, next) => {
  //   next((response) => {
  //     if (response.status === 401) {
  //       Auth.login()
  //       return
  //     }
  //   })
  // })
}
