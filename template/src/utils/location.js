import Vue from 'vue'
export const qqMapKey = 'QMCBZ-3R33V-CKYPM-UITRH-5CRGH-2UBI3'
export const mapPickerUrl = `http://apis.map.qq.com/tools/locpicker?search=1&type=1&policy=1&key=${qqMapKey}&referer=niwodai`
export const locatorUrl = `http://apis.map.qq.com/tools/geolocation?key=${qqMapKey}&referer=niwodai`

// 普通定位
let geolocation = null
export let getLocation = () => {
  if (!geolocation) {
    geolocation = new qq.maps.Geolocation(qqMapKey, 'niwodai')
  }
  return new Promise((resolve, reject) => {
    geolocation.getLocation(position => {
      if (position.adcode && position.city && position.lat && position.lng) {
        resolve(position)
      } else {
        reject('定位失败')
      }
    }, () => {
      reject('定位失败')
    })
  })
}
// ip定位
export let getIpLocation = () => {
  if (!geolocation) {
    geolocation = new qq.maps.Geolocation(qqMapKey, 'niwodai')
  }
  return new Promise((resolve, reject) => {
    geolocation.getIpLocation(position => {
      if (position.adcode && position.city && position.lat && position.lng) {
        resolve(position)
      } else {
        reject('定位失败')
      }
    }, () => {
      reject('定位失败')
    })
  })
}
// 根据gps定位如果未获取到则用ip定位
export let location = (canIp = false) => {
  return new Promise((resolve, reject) => {
    getLocation().then(position => {
      resolve(position)
    }).catch((err) => {
      if (canIp) {
        getIpLocation().then(position => {
          resolve(position)
        }).catch(data => {
          reject(data)
        })
      } else {
        reject(err)
      }
    })
  })
}
// 监听位置信息的改变
let watcher = null
export let watchPosition = (interTime, cb, errCb) => {
  wx.getLocation({
    type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    complete: function (location) {
      if (location.errMsg === 'getLocation:ok') {
        location.lng = location.longitude
        location.lat = location.latitude
        cb(location)
        watcher = window.setInterval(function () {
          wx.getLocation({
            type: 'gcj02',
            complete: function (location) {
              if (location.errMsg === 'getLocation:ok') {
                location.lng = location.longitude
                location.lat = location.latitude
                cb(location)
              } else {
                errCb(location)
              }
            }
          })
        }, interTime)
      } else {
        errCb(location)
      }
    }
  })
}
// 停止监听位置信息的改变
export let clearWatch = () => {
  if (watcher) {
    window.clearInterval(watcher)
    watcher = null
  }
}
// 逆地址解析
export let getGeocoder = (lat, lng) => {
  return new Promise((resolve, reject) => {
    Vue.http.jsonp(`http://apis.map.qq.com/ws/geocoder/v1/?location=${lat},${lng}&output=jsonp&key=${qqMapKey}`).then(response => {
      resolve(response)
    }).catch(data => {
      reject(data)
    })
  })
}
// 地图距离
export let getDistance = (from, to, mode = 'walking') => {
  return new Promise((resolve, reject) => {
    Vue.http.jsonp(`http://apis.map.qq.com/ws/distance/v1/?mode=${mode}&from=${from}&to=${to}&output=jsonp&key=${qqMapKey}`).then(response => {
      resolve(response)
    }).catch(data => {
      reject(data)
    })
  })
}
// 直线距离计算
export let computeDistanceBetween = (from, to) => {
  var a = new qq.maps.LatLng(from.lat, from.lng)
  var b = new qq.maps.LatLng(to.lat, to.lng)
  return qq.maps.geometry.spherical.computeDistanceBetween(a, b)
}
