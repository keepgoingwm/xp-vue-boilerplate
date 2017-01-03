var vConsole = require('vconsole')
var myPlugin = new vConsole.VConsolePlugin('my_plugin', 'Tool')
myPlugin.on('renderTab', function (callback) {
  var html = '<div>Click the tool button below!</div>'
  callback(html)
})
myPlugin.on('addTool', function (callback) {
  var reload = {
    name: 'Reload',
    onClick: function (event) {
      window.location.reload()
    }
  }
  var forward = {
    name: 'Forward',
    onClick: function (event) {
      window.history.forward()
    }
  }
  callback([reload, forward])
})
vConsole.addPlugin(myPlugin)
module.exports = {}
