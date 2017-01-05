import { wxPreviewImage } from '../../mixins/wxJssdk'

const DEFAULT_IMAGE_URL = require('../../../assets/images/member/imgOnError1.jpg')
// const DEFAULT_LOADING_URL = 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXs7Oxc9QatAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg=='
// const lazyLoadListeners = []
//
// const lazyLoadInit = {
//   error: options.error ? options.error : DEFAULT_IMAGE_URL,
//   loading: options.loading ? options.loading : DEFAULT_LOADING_URL,
//   hasbind: false,
//   isInChild: false,
//   childEl: null,
//   try: options.try ? options.try : 1
// }
//
// const debounce = function (action, idle) {
//   let last
//   return function () {
//     let args = arguments
//     clearTimeout(last)
//     last = setTimeout(() => {
//       action.apply(this, args)
//     }, idle)
//   }
// }
//
// const lazyLoadHandler = debounce(() => {
//   for (let i = 0; i < lazyLoadListeners.length; ++i) {
//     const listener = lazyLoadListeners[i]
//     checkCanShow(listener)
//   }
// }, 300)
//
// const checkCanShow = function (listener) {
//   let winH
//   let top
//   if (listener.parentEl) {
//     winH = listener.parentEl.offsetHeight
//     top = listener.parentEl.scrollTop
//   } else {
//     winH = window.screen.availHeight
//     top = document.documentElement.scrollTop || document.body.scrollTop
//   }
//
//   let height = (top + winH) * window.devicePixelRatio * 1.3
//   if (listener.y < height) {
//     render(listener)
//   }
// }
//
// const render = function (item) {
//   if (item.try >= lazyLoadInit.try) {
//     return false
//   }
//
//   item.try++
//
//   loadImageAsync(item).then((url) => {
//     let index = lazyLoadListeners.indexOf(item)
//     if (index !== -1) {
//       lazyLoadListeners.splice(index, 1)
//     }
//     if (!item.bindType) {
//       item.el.setAttribute('src', item.src)
//     } else {
//       item.el.setAttribute('style', item.bindType + ': url(' + item.src + ')')
//     }
//     item.el.setAttribute('lazy', 'loaded')
//   }).catch(() => {
//     if (!item.bindType) {
//       item.el.setAttribute('src', lazyLoadInit.error)
//     } else {
//       item.el.setAttribute('style', item.bindType + ': url(' + lazyLoadInit.error + ')')
//     }
//     item.el.setAttribute('lazy', 'error')
//   })
// }
//
// const loadImageAsync = function (item) {
//   if (!item.bindType) {
//     item.el.setAttribute('src', lazyLoadInit.loading)
//   } else {
//     item.el.setAttribute('style', item.bindType + ': url(' + lazyLoadInit.loading + ')')
//   }
//
//   return new Promise(function (resolve, reject) {
//     let image = new Image()
//     image.src = item.src
//
//     image.onload = function () {
//       resolve(item.src)
//     }
//
//     image.onerror = function () {
//       reject()
//     }
//   })
// }
//
// const componentWillUnmount = function (el) {
//   let i
//   let len = lazyLoadListeners.length
//   for (i = 0; i < len; i++) {
//     if (lazyLoadListeners[i] && lazyLoadListeners[i].el === el) {
//       lazyLoadListeners.splice(i, 1)
//     }
//   }
//
//   if (lazyLoadListeners.length === 0) {
//     lazyLoadInit.hasbind = false
//     window.removeEventListener('scroll', lazyLoadHandler)
//     window.removeEventListener('wheel', lazyLoadHandler)
//     window.removeEventListener('mousewheel', lazyLoadHandler)
//     window.removeEventListener('resize', lazyLoadHandler)
//   }
// }
//
// const getPosition = function (el) {
//   let t = el.offsetTop
//   let elHeight = el.offsetHeight
//   for (t; el = el.offsetParent;) {
//     t += el.offsetTop
//   }
//   return {
//     y: (t + elHeight) * window.devicePixelRatio
//   }
// }

const handleNoHostUrl = (url) => {
  if (/\/\//.test(url)) {
    return url
  } else {
    return location.origin + url
  }
}

const extendStyle = (origin, val) => {
  if (origin && val) {
    return origin + ';' + val
  } else if (!origin) {
    return val
  } else if (!val) {
    return origin
  } else {
    return null
  }
}

const getImageUrl = (url, imageViewMode, w, h) => {
  let wPath = w ? '/w/' + w : ''
  let hPath = h ? '/h/' + h : ''
  if (w || h) {
    return url + `?imageView2/${imageViewMode}${wPath}${hPath}`
  } else {
    return url
  }
}

let options = {
  defaultImageUrl: DEFAULT_IMAGE_URL,
  defaultBackgroundColor: '#F6F6F6'
  // lazyLoadError: DEFAULT_IMAGE_URL,
  // lazyLoadLoading: DEFAULT_LOADING_URL,
  // lazyLoadTry: 3
}

export let xpImage = {
  params: ['preview', 'defaultImage', 'lazyLoad'],
  deep: true,
  previewCurrent: null,
  previewUrls: [],
  previewListener: null,
  lazyLoadInit: null,
  setCssStyle (val) {
    let originWidth = val.originWidth
    let originHeight = val.originHeight
    let imageViewMode = val.imageViewMode
    let styleWidth = val.styleWidth
    let styleHeight = val.styleHeight
    let styleMaxWidth = val.styleMaxWidth
    let styleMaxHeight = val.styleMaxHeight

    if (originWidth && originHeight) {
      val.realStyleWidth = null
      val.realStyleHeight = null
      if (styleMaxWidth || styleMaxHeight) {
        let wRatio = styleMaxWidth ? originWidth / styleMaxWidth : 0
        let hRatio = styleMaxHeight ? originHeight / styleMaxHeight : 0

        if (wRatio < 1 && hRatio < 1) {
          val.realStyleWidth = originWidth
          val.realStyleHeight = originHeight
        } else {
          switch (imageViewMode) {
            // 规定最大值，等比缩放，不裁剪
            case 0:
              if (wRatio > hRatio) {
                val.realStyleWidth = styleMaxWidth
                val.realStyleHeight = originHeight * (styleMaxWidth / originWidth)
              } else {
                val.realStyleHeight = styleMaxHeight
                val.realStyleWidth = originWidth * (styleMaxHeight / originHeight)
              }
              break
            // 规定最小值，等比缩放，居中裁剪
            case 1:
              if (wRatio > 0 && hRatio > 0) {
                val.realStyleWidth = styleMaxWidth
                val.realStyleHeight = styleMaxHeight
              } else {
                if (wRatio > 0) {
                  val.realStyleWidth = styleMaxWidth
                  val.realStyleHeight = styleMaxWidth
                } else {
                  val.realStyleWidth = styleMaxHeight
                  val.realStyleHeight = styleMaxHeight
                }
              }
              break
            default:
              if (wRatio > hRatio) {
                val.realStyleWidth = styleMaxWidth
                val.realStyleHeight = originHeight * (styleMaxWidth / originWidth)
              } else {
                val.realStyleHeight = styleMaxHeight
                val.realStyleWidth = originWidth * (styleMaxHeight / originHeight)
              }
          }
        }
      } else {
        val.realStyleWidth = originWidth
        val.realStyleHeight = originHeight
      }

      if (!styleWidth) {
        this.el.setAttribute('style', extendStyle(this.el.getAttribute('style'), `width: ${val.realStyleWidth}px`))
      }
      if (!styleHeight) {
        this.el.setAttribute('style', extendStyle(this.el.getAttribute('style'), `height: ${val.realStyleHeight}px`))
      }
    }

    if (styleMaxWidth) {
      this.el.setAttribute('style', extendStyle(this.el.getAttribute('style'), `max-width: ${styleMaxWidth}px`))
    }
    if (styleMaxHeight) {
      this.el.setAttribute('style', extendStyle(this.el.getAttribute('style'), `max-height: ${styleMaxHeight}px`))
    }

    if (styleWidth) {
      this.el.setAttribute('style', extendStyle(this.el.getAttribute('style'), `width: ${styleWidth}px`))
    }
    if (styleHeight) {
      this.el.setAttribute('style', extendStyle(this.el.getAttribute('style'), `height: ${styleHeight}px`))
    }
  },
  setUrl (val) {
    let imageViewMode = val.imageViewMode
    let imageMaxWidth = Math.floor(val.imageMaxWidth)
    let imageMaxHeight = Math.floor(val.imageMaxHeight)
    let format = val.format
    let interlace = val.interlace

    switch (imageViewMode) {
      case 0:
        val.url = getImageUrl(val.url, 0, imageMaxWidth, imageMaxHeight)
        break
      case 1:
        val.url = getImageUrl(val.url, 1, imageMaxWidth, imageMaxHeight)
        break
      case 11:
        val.url = getImageUrl(val.url, 1, imageMaxWidth, imageMaxHeight)
        break
      default:
        val.url = getImageUrl(val.url, 0, imageMaxWidth, imageMaxHeight)
    }
    if (format) {
      let formatRegEx = new RegExp(format)
      if (!formatRegEx.test(val.url)) {
        val.url = val.url + `|imageMogr2/format/${format}`
      }
    }
    if (interlace) {
      if (/jpg/.test(val.url)) {
        val.url = val.url + `|imageMogr2/interlace/1`
      }
    }
  },
  showImage (val) {
    let url = val.url

    if (this.el.nodeName === 'IMG') {
      if (url) {
        this.el.setAttribute('src', url)
      }
    } else {
      this.el.setAttribute('style', extendStyle(this.el.getAttribute('style'), `background-image: url(${url})`))
    }
  },
  configPreview (val) {
    if (!val || !val.url) {
      this.previewCurrent = null
      return
    }

    let current = val.previewList[val.previewIndex]

    this.previewCurrent = handleNoHostUrl(current)
    this.previewUrls = val.previewList.map((ele) => {
      return handleNoHostUrl(ele)
    })
  },
  configDefaultImage (val) {
    let url = val.url
    let defaultImage = val.defaultImage
    if (url) {
      if (this.el.nodeName === 'IMG') {
        this.el.onerror = () => {
          this.el.onerror = null
          this.el.setAttribute('src', defaultImage || options.defaultImageUrl)
          if (this.params.preview) {
            this.el.removeEventListener('click', this.previewListener, false)
          }
        }
      } else {
        this.el.setAttribute('style', extendStyle(
          this.el.getAttribute('style'),
          `background-image: ${(val.url ? 'url(' + val.url + '), ' : '')}url(${defaultImage || options.defaultImageUrl})`)
        )
      }
    } else {
      if (this.el.nodeName === 'IMG') {
        this.el.setAttribute('src', defaultImage || options.defaultImageUrl)
      } else {
        this.el.setAttribute('style', extendStyle(
            this.el.getAttribute('style'),
            `background-image: url(${defaultImage || options.defaultImageUrl})`
          )
        )
      }
    }
  },
  bind (val) {
    if (this.params.preview) {
      this.previewListener = () => {
        if (this.previewCurrent) {
          wxPreviewImage({current: this.previewCurrent, urls: this.previewUrls})
        }
      }
      this.el.addEventListener('click', this.previewListener, false)
    }
  },
  update (val, oldVal) {
    let imageViewMode = val.imageViewMode
    let positionColor = val.positionColor
    let loadingImage = val.loadingImage
    // imageViewMode大于等于10时，不设置css样式，图片处理同imageViewMode - 10的模式
    if (imageViewMode < 10) {
      this.setCssStyle(val)
    }

    if (positionColor) {
      this.el.setAttribute('style', extendStyle(this.el.getAttribute('style'), `background-color: ${positionColor}`))
    } else {
      this.el.setAttribute('style', extendStyle(this.el.getAttribute('style'), `background-color: ${options.defaultBackgroundColor}`))
    }

    if (loadingImage) {
      this.el.setAttribute('style', extendStyle(this.el.getAttribute('style'), `background-image: url(${loadingImage})`))
    }

    if (val.url) {
      this.setUrl(val)
      this.showImage(val)

      if (this.params.preview) {
        this.configPreview(val)
      }
    } else {

    }

    if (this.params.defaultImage) {
      this.configDefaultImage(val)
    }
  },
  unbind () {
    if (this.params.preview) {
      this.el.removeEventListener('click', this.previewListener, false)
    }
  }
}
