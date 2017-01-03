// 根据target自动赋值 需为{} 没有type时为merge type=1只替换target有的属性 type=2绝对替换成source
export let autoValue = (target, source, type) => {
  if (!type) {
    Object.assign(target, source)
  } else if (type === 1) {
    let eachValuation = (t, s) => {
      for (let k in target) {
        t[k] = _.clone(s[k])
        if (Object.prototype.toString.call(t[k]) === '[object Object]') {
          eachValuation(t[k], _.clone(s[k]))
        }
      }
    }
    eachValuation(target, source)
  } else if (type === 2) {
    target = _.clone(source)
  }
}
