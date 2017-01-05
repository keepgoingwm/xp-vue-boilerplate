const linebreakRegEx = /(\r\n|\n)/g

export let transLinebreak = (message) => {
  let newMessage = ''
  message.replace(linebreakRegEx, '\n')
  while (message) {
    let linebreakIndex = message.match(/\n/) ? message.match(/\n/).index : -1

    if (linebreakIndex > -1) {
      newMessage += message.slice(0, linebreakIndex)
      newMessage += '<br />'
      message = message.substr(linebreakIndex + 1)
    } else {
      newMessage += message
      return newMessage
    }
  }
  return newMessage
}
