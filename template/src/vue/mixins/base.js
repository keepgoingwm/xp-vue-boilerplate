export default {
  methods: {
    setHeadTitle (title) {
      document.title = title
      // hack在微信等webview中无法修改document.title的情况
      document.getElementById('iframe').contentWindow.location.reload()
    },
    handleApiErr (response, cb = () => {}) {
      console.log(response)
      if (response.msg) {
        alert(response.msg)
      } else {
        alert(response.data)
      }
      cb(response)
    }
  }
}
