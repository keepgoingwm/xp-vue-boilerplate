const UPLOAD_OUR_SERVER = function () {}

export const jsSdkApiList = {
  normal: [
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'onMenuShareQZone',
    'chooseImage',
    'uploadImage',
    'getLocalImgData',
    'previewImage',
    'startRecord',
    'stopRecord',
    'onVoiceRecordEnd',
    'playVoice',
    'pauseVoice',
    'stopVoice',
    'onVoicePlayEnd',
    'uploadVoice',
    'downloadVoice',
    'translateVoice',
    'openLocation',
    'getLocation',
    'hideOptionMenu',
    'showOptionMenu',
    'closeWindow',
    'hideMenuItems',
    'showMenuItems',
    'hideAllNonBaseMenuItem',
    'showAllNonBaseMenuItem',
    'scanQRCode',
    'chooseCard',
    'addCard',
    'openCard'
  ],
  enterprise: [
    'openEnterpriseChat',
    'openEnterpriseContact',
    'sendEnterpriseChat',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'onMenuShareQZone',
    'chooseImage',
    'uploadImage',
    'getLocalImgData',
    'previewImage',
    'startRecord',
    'stopRecord',
    'onVoiceRecordEnd',
    'playVoice',
    'pauseVoice',
    'stopVoice',
    'onVoicePlayEnd',
    'uploadVoice',
    'downloadVoice',
    'translateVoice',
    'openLocation',
    'getLocation',
    'hideOptionMenu',
    'showOptionMenu',
    'closeWindow',
    'hideMenuItems',
    'showMenuItems',
    'hideAllNonBaseMenuItem',
    'showAllNonBaseMenuItem',
    'scanQRCode',
    'chooseCard',
    'addCard',
    'openCard'
  ]
}

export let wxShareConfig = (shareTitle, shareUrl, sharePic, shareDesc, cb, failCb, cancelCb) => {
  /* eslint-disable */
  wx.onMenuShareAppMessage({
    title: shareTitle, // 分享标题
    link: shareUrl, // 分享链接
    imgUrl: sharePic, // 分享图标
    desc: shareDesc,
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: cb,
    fail: failCb,
    cancel: cancelCb
  })
  wx.onMenuShareTimeline({
    title: shareTitle, // 分享标题
    link: shareUrl, // 分享链接
    imgUrl: sharePic, // 分享图标
    desc: shareDesc,
    success: cb,
    fail: failCb,
    cancel: cancelCb
  })
  wx.onMenuShareQQ({
    title: shareTitle, // 分享标题
    link: shareUrl, // 分享链接
    imgUrl: sharePic, // 分享图标
    desc: shareDesc,
    success: cb,
    fail: failCb,
    cancel: cancelCb
  })
  wx.onMenuShareWeibo({
    title: shareTitle, // 分享标题
    link: shareUrl, // 分享链接
    imgUrl: sharePic, // 分享图标
    desc: shareDesc,
    success: cb,
    fail: failCb,
    cancel: cancelCb
  })
  wx.onMenuShareQZone({
    title: shareTitle, // 分享标题
    link: shareUrl, // 分享链接
    imgUrl: sharePic, // 分享图标
    desc: shareDesc,
    success: cb,
    fail: failCb,
    cancel: cancelCb
  })
  /* eslint-enable */
}

export let wxOpenLocation = ({ latitude, longitude, name, address, scale = 13, infoUrl = '#' }) => {
  /* eslint-disable */
  wx.openLocation({
    latitude,
    longitude,
    name,
    address,
    scale,
    infoUrl
  })
  /* eslint-enable */
}

export let uploadImage = (localIds, uploadProgress = {}) => {
  uploadProgress.total = localIds.length
  uploadProgress.now = 0
  // http://qydev.weixin.qq.com/wiki/index.php?title=%E5%BE%AE%E4%BF%A1JS-SDK%E6%8E%A5%E5%8F%A3#.E9.99.84.E5.BD.956-.E5.B8.B8.E8.A7.81.E9.94.99.E8.AF.AF.E5.8F.8A.E8.A7.A3.E5.86.B3.E6.96.B9.E6.B3.95
  // 9.uploadImage怎么传多图：目前只支持一次上传一张，多张图片需等前一张图片上传之后再调用该接口。
  let results = []
  let makePromise = (cb, localId) => {
    return function () {
      return new Promise((resolve, reject) => {
        cb(localId, resolve, reject)
      })
    }
  }

  let wxUploadImage = (localId, resolve, reject) => {
    wx.uploadImage({
      localId: localId,
      isShowProgressTips: 0,
      success: (res) => {
        let mediaId = res.serverId
        UPLOAD_OUR_SERVER({ mediaId }).then(response => {
          uploadProgress.now += 1
          results.push(response.data)
          resolve(response.data)
        }).catch((response) => {
          results.push(response)
          resolve(response)
        })
      },
      fail: (err) => {
        reject(err)
      }
    })
  }

  let promiseQueue = localIds.map((localId) => {
    return makePromise(wxUploadImage, localId)
  })

  return promiseQueue.reduce(function (cur, next) {
    return cur.then(next)
  }, Promise.resolve()).then(function () {
    return new Promise((resolve) => {
      resolve(results)
    })
  })
}

export let chooseImage = ({ count = 9, sizeType = ['original', 'compressed'], sourceType = ['album', 'camera'] }) => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count,
      sizeType,
      sourceType,
      success: (res) => {
        // 19.uploadImage在chooseImage的回调中有时候Android会不执行，Android6.2会解决此问题，若需支持低版本可以把调用uploadImage放在setTimeout中延迟100ms解决。
        setTimeout(() => {
          resolve(_.cloneDeep(res.localIds))
        }, 100)
      },
      fail: (res) => {
        reject(res)
      },
      cancel: () => {
        reject('cancel')
      }
    })
  })
}

export let wxPreviewImage = ({ current, urls = [] }) => {
  wx.previewImage({
    current: current, // 当前显示图片的http链接
    urls: urls // 需要预览的图片http链接列表
  })
}

export let wxOpenEnterpriseChat = ({ userIds, groupName = '', cb = _.noop, errCb = _.noop }) => {
  wx.openEnterpriseChat({
    userIds: userIds,    // 必填，参与会话的成员列表。格式为userid1;userid2;...，用分号隔开，最大限制为1000个。userid单个时为单聊，多个时为群聊。
    groupName: groupName,  // 必填，会话名称。单聊时该参数传入空字符串""即可。
    success: function (res) {
      cb(res)
    },
    fail: function (res) {
      console.log('wxOpenEnterpriseChat', res)
      if (res.errMsg.indexOf('function not exist') > -1) {
        alert('您的微信版本需要升级')
      }
      errCb(res)
    }
  })
}

export let wxCloseWindow = () => {
  wx.closeWindow()
}
