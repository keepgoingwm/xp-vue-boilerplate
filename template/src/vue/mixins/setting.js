import { isEmptyObject } from '../../libs/jsExtend'

export default {
  data () {
    return {
      backendTime: null
    }
  },
  compiled () {
    setInterval(() => {
      if (isEmptyObject(this.setting)) {
        this.backendTime = null
      } else {
        this.backendTime = Moment().add(this.setting.diffTime, 'ms').format('YYYY-MM-DD HH:mm:ss')
      }
    }, 500)
  }
}
