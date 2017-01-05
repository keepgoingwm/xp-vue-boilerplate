let DEFAULT_IMAGE = require('../../../assets/images/member/imgOnError1.jpg')
let DEFAULT_AVATAR = require('../../../assets/images/member/niwodai.jpg')
let DEFAULT_LINK_IMAGE = require('../../../assets/images/member/imgOnError.jpg')
import Vue from 'vue'

export let defaultImg = {
  deep: true,
  bind () {
  },
  update (url, oldVal) {
    let defaultImg

    switch (url) {
      case 'normal':
        defaultImg = DEFAULT_IMAGE
        break
      case 'link':
        defaultImg = DEFAULT_LINK_IMAGE
        break
      case 'avatar':
        defaultImg = DEFAULT_AVATAR
        break
      default:
        defaultImg = url || DEFAULT_IMAGE
    }

    if (this.el.nodeName === 'IMG') {
      Vue.nextTick(() => {
        if (!this.el.getAttribute('src')) {
          this.el.setAttribute('src', defaultImg)
        }
      })
      this.el.onerror = () => {
        this.el.setAttribute('src', defaultImg)
        this.el.onerror = null
      }
    } else {
      let src = this.el.getAttribute('src')
      this.el.setAttribute('style', `background-image: ${(src ? 'url(' + src + '), ' : '')}url(${defaultImg})`)
    }
  },
  unbind () {
  }
}
