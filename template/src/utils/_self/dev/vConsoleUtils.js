var vConsole = require('vconsole')

function addToolsPlugin () {
  var toolsPlugin = new vConsole.VConsolePlugin('Tools', 'Tools')
  toolsPlugin.on('renderTab', function (callback) {
    var html = '<div>Click the tool button below!</div>'
    callback(html)
  })

  toolsPlugin.on('addTool', function (callback) {
    var forward = {
      name: 'Forward',
      onClick: function (event) {
        window.history.forward()
      }
    }
    callback([ forward ])
  })
  vConsole.addPlugin(toolsPlugin)
}

addToolsPlugin()

module.exports = {}
