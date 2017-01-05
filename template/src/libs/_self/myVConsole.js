var vConsole = require('vconsole')
var memberPlugin = new vConsole.VConsolePlugin('Member', 'Member')
memberPlugin.on('renderTab', function (callback) {
  var html = '<div>Click the tool button below!</div>'
  callback(html)
})

memberPlugin.on('addTool', function (callback) {
  var forward = {
    name: 'Forward',
    onClick: function (event) {
      window.history.forward()
    }
  }
  callback([ forward ])
})
vConsole.addPlugin(memberPlugin)
module.exports = {}
