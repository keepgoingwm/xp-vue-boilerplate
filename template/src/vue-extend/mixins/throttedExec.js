var executingFuncList = {}

export default {
  methods: {
    /**
     * @param id
     * @param func
     * @param interval
     * @param warnCb
     */
    throttledExec (id, func, interval, warnCb) {
      if (!executingFuncList[id]) {
        executingFuncList[id] = {
          executing: false,
          lastTimeoutId: null
        }
      }
      if (!executingFuncList[id].executing) {
        executingFuncList[id].executing = true
        func()
        executingFuncList[id].lastTimeoutId = setTimeout(() => {
          executingFuncList[id].executing = false
        }, interval)
      } else {
        warnCb()
      }
    },
    resetThrottledExec (id) {
      executingFuncList[id].executing = false
      clearTimeout(executingFuncList[id].lastTimeoutId)
    }
  }
}
