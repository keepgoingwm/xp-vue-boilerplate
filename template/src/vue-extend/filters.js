import formatFilters from './filters/format'

export default Object.assign(
  {
    /**
     * 对象数组按照属性对应mapObj转换为新对象数组
     * @param {[object]} objArray
     * @param {object} mapObj
     * @param {boolean} keepOrigin
     * @returns {[object]}
     */
    transObjArray (objArray, mapObj = {}, keepOrigin = true) {
      if (!objArray) {
        return objArray
      }
      var resObjArray = []
      for (var i = 0; i < objArray.length; i++) {
        var obj = objArray[i]
        resObjArray[i] = keepOrigin ? obj : {}
        for (var nowProp in obj) {
          if (mapObj.hasOwnProperty(nowProp)) {
            resObjArray[i][mapObj[nowProp]] = obj[nowProp]
          }
        }
      }
      return resObjArray
    },
    /**
     * 相比Vue自带的orderBy，sortBy是个稳定排序
     * @param arr
     * @param key
     * @param order
     * @returns {*}
     */
    sortBy (arr, key, order) {
      if (order > 0) {
        return _.sortBy(arr, key)
      } else {
        return _.sortBy(arr, key).reverse()
      }
    }
  },
  formatFilters
)

