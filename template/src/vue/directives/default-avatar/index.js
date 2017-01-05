let defaultAvatar = require('../../../assets/images/member/niwodai.jpg')

export let avatar = {
  deep: true,
  bind () {
  },
  update (avatar, oldVal) {
    let urlKey = this.arg || 'url'

    if (this.el.nodeName === 'IMG') {
      let imgUrl = avatar ? avatar[urlKey] : defaultAvatar
      this.el.setAttribute('src', imgUrl)
      this.el.onerror = () => {
        this.el.setAttribute('src', defaultAvatar)
      }
    } else {
      if (avatar) {
        this.el.setAttribute('style', `background-image: url(${avatar[urlKey]}), url(${defaultAvatar})`)
      } else {
        this.el.setAttribute('style', `background-image: url(${defaultAvatar})`)
      }
    }
  },
  unbind () {
  }
}
