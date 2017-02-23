export default class Auth {

  static login (type = 'base') {
    var currentUrl = window.location.href
    window.location.href = '/api/oauth/authorize?redirectUri=' + encodeURIComponent(currentUrl) + '&scope=snsapi_' + type
  }
  // static login (type = 'base') {
  //   var currentUrl = window.location.href
  //   console.log('/api/auth?redirectUri=' + encodeURIComponent(currentUrl) + '&scope=snsapi_' + type)
  //   window.location.href = '/api/auth?redirectUri=' + encodeURIComponent(currentUrl) + '&scope=snsapi_' + type
  // }
}
