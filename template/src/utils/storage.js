// 本地记录次数
export let storageCount = (type, num = 1) => {
  return new Promise((resolve, reject) => {
    let str = `${type}Count`
    let count = localStorage.getItem(str)
    if (!count || count < num) {
      count = count ? parseInt(count) + 1 : 1
      localStorage.setItem(str, count)
      resolve(count)
    } else {
      reject('超过次数')
    }
  })
}
