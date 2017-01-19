export var timeSync = (function () {
  var originTime = null
  var timeDiff = null

  this.setOriginTime = function (time) {
    originTime = time
    timeDiff = time - Date.now()
  }

  this.getOriginTime = function () {
    return Date.now() + timeDiff
  }

  return this
})()

