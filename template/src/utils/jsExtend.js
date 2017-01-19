// export const clone = function () {
//   /**
//    * 深复制扩展
//    */
//   /* Method of Object */
//   Object.prototype.clone = function () {
//     var Constructor = this.constructor
//     var obj = new Constructor()
//
//     for (var attr in this) {
//       if (this.hasOwnProperty(attr)) {
//         if (typeof(this[attr]) !== 'function') {
//           if (this[attr] === null) {
//             obj[attr] = null
//           }
//           else {
//             obj[attr] = this[attr].clone()
//           }
//         }
//       }
//     }
//     return obj
//   }
//
//   /* Method of Array */
//   Array.prototype.clone = function () {
//     var thisArr = this.valueOf()
//     var newArr = []
//     for (var i = 0; i < thisArr.length; i++) {
//       newArr.push(thisArr[i].clone())
//     }
//     return newArr
//   }
//
//   /* Method of Boolean, Number, String */
//   Boolean.prototype.clone = function () { return this.valueOf() }
//   Number.prototype.clone = function () { return this.valueOf() }
//   String.prototype.clone = function () { return this.valueOf() }
//
//   /* Method of Date */
//   Date.prototype.clone = function () { return new Date(this.valueOf()) }
//
//   /* Method of RegExp */
//   RegExp.prototype.clone = function () {
//     var pattern = this.valueOf()
//     var flags = ''
//     flags += pattern.global ? 'g' : ''
//     flags += pattern.ignoreCase ? 'i' : ''
//     flags += pattern.multiline ? 'm' : ''
//     return new RegExp(pattern.source, flags)
//   }
// }

var nativeIsArray = Array.isArray
export const isArray = nativeIsArray || function (obj) {
  return toString.call(obj) === '[object Array]'
}

export const isObject = function (obj) {
  var type = typeof obj
  return type === 'function' || type === 'object' && !!obj
}

export const isEmptyObject = function isEmptyObject (obj) {
  /* eslint-disable */
  for (var prop in obj) {
    return false
  }
  /* eslint-enable */
  return true
}
