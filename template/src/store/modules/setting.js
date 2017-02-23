import { SET_SETTING } from '../mutation-types'
import Moment from 'moment'

import { browserVersions } from '../../utils/env'
import { loggable } from '../../utils/object'

// let payUrlReg = new RegExp(`^${location.origin}/#/member/wallet/[^/]*$`)

const state = loggable.hasAssigned(
  {
    config: {},
    base: {
      warnText: {
        submitTooMuchWarn: '您的提交过于频繁',
        invalidPhoneNumberWarn: '请正确填写您的手机号码'
      },
      // notPayUrl: !payUrlReg.test(firstHref),
      browserVersions: browserVersions()
    }
  }
)

const mutations = {
  [SET_SETTING] (state, setting) {
    let localCurrTime = Moment().format('YYYY-MM-DD HH:mm:ss')
    let serverCurrTime = setting.serverTime
    console.log(state.config, setting)
    state.config = setting
    console.log(state.config)
    state.config.serverLocalDiffTime = Moment(serverCurrTime).diff(Moment(localCurrTime))
  }
}

export default {
  state,
  mutations
}
