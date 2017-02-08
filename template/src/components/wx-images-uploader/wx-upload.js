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
        jsSdkApi.postWechatImageGet({ mediaId }).then(response => {
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

export let getLocalImgData = (localIds, localDatas, uploadProgress = {}) => {
  uploadProgress.total = localIds.length
  uploadProgress.now = 0
  let results = []
  let makePromise = (cb, localId) => {
    return function () {
      return new Promise((resolve, reject) => {
        cb(localId, resolve, reject)
      })
    }
  }
  let wxGetLocalImgData = (localId, resolve, reject) => {
    wx.getLocalImgData({
      localId: localId,
      isShowProgressTips: 0,
      success: (response) => {
        results.push(response.localData)
        localDatas.push(response.localData)
        resolve(response.localData)
      },
      fail: (err) => {
        reject(err)
      }
    })
  }
  let promiseQueue = localIds.map((localId) => {
    return makePromise(wxGetLocalImgData, localId)
  })
  return promiseQueue.reduce(function (cur, next) {
    return cur.then(next)
  }, Promise.resolve()).then(function () {
    return new Promise((resolve) => {
      resolve(results)
    })
  })
}
