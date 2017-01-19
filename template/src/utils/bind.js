import VueMixins from '../../vue/mixins'
import Api from '../../api/niwodai'

// 待优化： 刷新过程倒计时停止；刷新后倒计时依然显示

export default class Bind {

  constructor (interval = 60) {
    this.interval = interval
    this.timer = {}
  }

  static sms (telephone) {
    return Api.postAuthCode({ telephone })
  }

  static voice (telephone) {
    return Api.postAuthCode({ telephone, byVoice: true })
  }

  static getBindInfo () {
    let bindInfo = localStorage.getItem('bindInfo')
    if (bindInfo) {
      return JSON.parse(bindInfo)
    }
    return []
  }

  static setBindInfo (tel) {
    let bindInfo = this.getBindInfo()
    let index = bindInfo.findIndex(ele => {
      return ele.tel === tel
    })
    if (index === -1) {
      bindInfo.push({ tel, timestamp: Date.now() })
    } else {
      bindInfo[index].timestamp = Date.now()
    }
    localStorage.setItem('bindInfo', JSON.stringify(bindInfo))
  }

  static getDiffTimestamp (timestamp) {
    return parseInt((Date.now() - timestamp) / 1000)
  }

  static verifyTel (tel) {
    if (!tel) {
      VueMixins.base.methods.toast('请输入您的手机号')
      return false
    }
    if (!(/^1[0-9]{10}$/.test(tel))) {
      VueMixins.base.methods.toast('请输入正确的手机号')
      return false
    }
    return true
  }

  static delBindInfo (telephone) {
    let bindInfo = Bind.getBindInfo()
    let temporaryArr = []
    bindInfo.forEach(e => {
      if (e.tel !== telephone) {
        temporaryArr.push(e)
      }
    })
    localStorage.setItem('bindInfo', JSON.stringify(temporaryArr))
  }

  delOverdueBindInfo () {
    let bindInfo = Bind.getBindInfo()
    let temporaryArr = []
    bindInfo.forEach(e => {
      let diffTimestamp = Bind.getDiffTimestamp(e.timestamp)
      if (diffTimestamp > 0 && diffTimestamp < this.interval) {
        temporaryArr.push(e)
      }
    })
    localStorage.setItem('bindInfo', JSON.stringify(temporaryArr))
  }

  getSeconds (telephone) {
    let bindInfo = Bind.getBindInfo()
    let index = bindInfo.findIndex(ele => {
      return ele.tel === telephone
    })
    if (index !== -1) {
      let diffTimestamp = Bind.getDiffTimestamp(bindInfo[index].timestamp)
      if (diffTimestamp > 0 && diffTimestamp < this.interval) {
        return diffTimestamp
      }
    }
    return false
  }

  disableSendButton (telephone, send) {
    this.delOverdueBindInfo()
    let bindSeconds = this.getSeconds(telephone)
    if (bindSeconds === false) {
      send.countdown = this.interval
      Bind.setBindInfo(telephone)
    } else {
      send.countdown = this.interval - bindSeconds
    }
    send.disabled = true
    this.timer[telephone] = setInterval(() => {
      if (send.countdown > 1) {
        send.countdown --
      } else {
        clearInterval(this.timer[telephone])
        send.disabled = false
      }
    }, 1000)
  }

  enableSendButton (telephone, send) {
    send.disabled = false
    Bind.delBindInfo(telephone)
    clearInterval(this.timer[telephone])
  }

  sendAuthCode (telephone, send) {
    // if (!Bind.verifyTel(telephone)) {
    //   return
    // }
    if (this.getSeconds(telephone) !== false) {
      send.isFirstSend = false
      this.disableSendButton(telephone, send)
      return
    }
    this.disableSendButton(telephone, send)
    Bind.sms(telephone).then((data) => {
      send.isFirstSend = false
    }).catch(({ data }) => {
      this.enableSendButton(telephone, send)
      let msg = typeof data === 'string' ? data : data.msg
      VueMixins.base.methods.toast(msg)
    })
    // .catch(({ data }) => {
    //   confirm({
    //     title: '还没收到短信验证码？',
    //     text: '我们将在5秒内给您<span style="color: #FFB13C;">发送语音验证码</span>，请注意接听来电。',
    //     onConfirm: () => {
    //       this.voiceGet(telephone, send)
    //     }
    //   })
    // })
  }

  voiceGet (telephone, send) {
    if (!Bind.verifyTel(telephone)) {
      return false
    }
    if (this.getSeconds(telephone) !== false) {
      send.isFirstSend = false
      this.disableSendButton(telephone, send)
      return
    }
    Bind.voice(telephone).then(() => {
      send.isFirstSend = false
      this.disableSendButton(telephone, send)
    }).catch(({ data }) => {
      let msg = typeof data === 'string' ? data : data.msg
      VueMixins.base.methods.toast(msg)
    })
  }

}
