import Api from '../../api/index'

import Checker from 'vux-components/checker/checker'
import CheckerItem from 'vux-components/checker/checker-item'
import XButton from 'vux-components/x-button'
import IconSvg from 'components/icon-svg'
import Explain from 'components/explain'
import XpCircle from 'components/xp-circle'
import Avatar from 'components/avatar'
import Tab from 'vux-components/tab/tab'
import TabItem from 'vux-components/tab/tab-item'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import FloatButtons from 'xp-fab'
import Circle from '../../components/xp-circle/index'

import { memberInfo, setting } from 'src/vuex/getters'

let mixin = {
  components: {
    Checker,
    CheckerItem,
    XButton,
    IconSvg,
    Explain,
    XpCircle,
    Avatar,
    Tab,
    TabItem,
    Group,
    Cell,
    FloatButtons,
    Circle
  },
  vuex: {
    getters: {
      memberInfo,
      setting
    }
  }
}

export {
  Api,
  mixin
}
