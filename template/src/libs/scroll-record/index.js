export default class ScrollRecord {
  constructor (id) {
    this.id = id
  }

  initRecord () {
    if (!window.scrollRecord) {
      window.scrollRecord = {}
    }
    this.updateRecord()
  }

  scrollToRecord () {
    // let scrollRecord = JSON.parse(localStorage.getItem(this.id))
    // if (scrollRecord) {
    //   window.scrollTo(scrollRecord.x, scrollRecord.y)
    // }
    let scrollRecord = window.scrollRecord[this.id]
    if (scrollRecord) {
      window.scrollTo(scrollRecord.x, scrollRecord.y)
    }
  }

  updateRecord () {
    this.listener = () => {
      // localStorage.setItem(this.id, JSON.stringify({
      //   x: window.scrollX,
      //   y: window.scrollY
      // }))
      window.scrollRecord[this.id] = {
        x: window.pageXOffset,
        y: window.pageYOffset
      }
    }
    window.addEventListener('scroll', this.listener)
  }

  pauseRecord () {
    this.stopRecord()
  }

  continueRecord () {
    window.addEventListener('scroll', this.listener)
  }

  stopRecord () {
    if (this.listener) {
      window.removeEventListener('scroll', this.listener, false)
    }
  }
}
