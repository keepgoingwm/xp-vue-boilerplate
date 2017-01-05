export default {
  imageMogr2 (val, parameter) {
    if (!val) { return }
    if (val.indexOf('wxLocalResource://') >= 0) {
      return val
    }
    if (typeof parameter === 'number') {
      return `${val}?imageMogr2/thumbnail/${parameter}x`
    }
    if (!parameter) {
      return `${val}?imageMogr2/thumbnail/600x`
    }
    if (parameter === 'avatar') {
      return `${val}?imageMogr2/thumbnail/200x`
    }
    return val
  },
  // 钱以分转元
  price (val, parameter = 2) {
    return (val / 100).toFixed(parameter)
  },
  // 数字格式
  unitConvert (value, bit) {
    bit = bit || 0
    return (value * (Math.pow(10, bit)))
  },
  floor (value) {
    return Math.floor(value)
  },
  round (num, digits) {
    return _.round(num, digits)
  },
  // 名字格式
  shortName (name, length) {
    if (!name) {
      return null
    }
    return name.length <= length ? name : (name.slice(0, length) + '**')
  },
  // 拼接地址extra
  joinAddress (val, extra) {
    return extra ? val + extra : val
  },
  // 时间格式
  formatTime (time, format) {
    format = format || 'YYYY-MM-DD HH:mm:ss'
    // moment会提示，但是目前没有好的实现途径
    if (!Moment(time).isValid()) {
      return time
    }
    return Moment(time).format(format)
  },
  formatTimeDiff (time, offset = 0) {
    var timeObj = Moment(time).subtract(offset, 'milliseconds')
    var secondsDiff = Moment().diff(timeObj)
    var secondsDiffNum = parseInt(secondsDiff / 1000)
    var minutesDiff = Moment().diff(Moment(time, 'YYYY-MM-DD HH:mm'), 'minutes')
    var hoursDiff = Moment().diff(Moment(time, 'YYYY-MM-DD HH'), 'hours')
    var daysDiff = Moment().diff(Moment(time, 'YYYY-MM-DD'), 'days')

    if (secondsDiffNum <= 0) {
      return '刚刚'
    } else if (secondsDiffNum <= 59) {
      return secondsDiffNum + '秒前'
    } else if (minutesDiff <= 59) {
      return (minutesDiff) + '分钟前'
    } else if (hoursDiff <= 23) {
      return (hoursDiff) + '小时前'
    } else if (Moment().subtract(1, 'day').format('YYYY-MM-DD') === timeObj.format('YYYY-MM-DD')) {
      return '昨天'
    } else if (Moment().format('YYYY') === timeObj.format('YYYY')) {
      return daysDiff + '天前'
    } else {
      // return timeObj.format('YYYY年M月D日 HH:mm')
      return timeObj.format('YYYY年M月D日')
    }
  },
  friendlyText (val, defaultText, ...params) {
    defaultText = defaultText || '无'

    if (!val) {
      return defaultText
    }

    if (params.length === 0) {
      if (val.length === 0) {
        return defaultText
      } else {
        return val
      }
    } else {
      var res = ''
      params.forEach((key) => {
        res += (' ' + val[key])
      })

      if (res.trim().length === 0) {
        return defaultText
      } else {
        return res
      }
    }
  }
}
