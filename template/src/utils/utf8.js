export let ucs2decode = function (string) {
  var output = []
  var counter = 0
  var length = string.length
  var value
  var extra
  while (counter < length) {
    value = string.charCodeAt(counter++)
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // high surrogate, and there is a next character
      extra = string.charCodeAt(counter++)
      if ((extra & 0xFC00) === 0xDC00) { // low surrogate
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000)
      } else {
        // unmatched surrogate; only append this code unit, in case the next
        // code unit is the high surrogate of a surrogate pair
        output.push(value)
        counter--
      }
    } else {
      output.push(value)
    }
  }
  return output
}
