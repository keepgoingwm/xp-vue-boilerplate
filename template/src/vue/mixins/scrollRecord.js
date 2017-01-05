import ScrollRecord from '../../libs/scrollRecord/index'
import uuid from './uuid'

export default {
  data () {
    return {
      sr: null
    }
  },
  mixins: [uuid],
  created () {
    window.scrollTo(0, 0)
    this.sr = new ScrollRecord(this.uuid)
    this.sr.initRecord()
  },
  route: {
    activate () {
      setTimeout(() => {
        this.$nextTick(() => {
          this.sr.scrollToRecord()
          this.sr.continueRecord()
        })
      }, 300)
    },
    deactivate () {
      this.sr.pauseRecord()
    }
  }
}
