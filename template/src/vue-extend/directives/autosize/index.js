import Autosize from 'autosize'

export let autosize = {
  bind () {
    Autosize(this.el.querySelector('textarea'))
  },
  update () {
    Autosize.update(this.el.querySelector('textarea'))
  },
  unbind () {
    Autosize.destroy(this.el.querySelector('textarea'))
  }
}
