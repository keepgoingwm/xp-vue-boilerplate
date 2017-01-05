import { wxPreviewImage } from '../../mixins/wxJssdk'

var lisentner
var handleNoHostUrl = (url) => {
  if (/\/\//.test(url)) {
    return url
  } else {
    return location.origin + url
  }
}

export let preview = {
  deep: true,
  current: null,
  urls: [],
  bind () {
    lisentner = function () {
      if (this.current) {
        wxPreviewImage({current: this.current, urls: this.urls})
      }
    }.bind(this)
    this.el.addEventListener('click', lisentner, false)
  },
  update (val, oldVal) {
    if (!val) {
      this.current = null
      return
    }
    let cur = val.list[val.index]

    if (this.el.nodeName === 'IMG') {
      if (cur) {
        this.el.setAttribute('src', cur)
      }
    } else {
      this.el.setAttribute('style', `background-image: url(${cur})`)
    }

    if (this.arg) {
      cur = val.list[this.arg]
    }

    this.current = handleNoHostUrl(cur)
    this.urls = val.list.map((ele) => {
      return handleNoHostUrl(ele)
    })
  },
  unbind () {
    this.el.removeEventListener('click', lisentner, false)
  }
}
