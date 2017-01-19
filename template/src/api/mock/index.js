import Mock from 'mockjs'

const mockClose = window.devOptions !== 'undefined' && window.devOptions.mock !== 'undefined' && window.devOptions.mock === false

let startMockServer = function () {
  if (!mockClose) {
    Mock.setup({
      timeout: '500-2000'
    })

    Mock.mock('api/auth-code', 'post', {
      msg: '发送成功'
    })

    Mock.mock('api/member', 'patch', {
      id: 9000,
      msg: '提交成功'
    })

    Mock.mock('api/member', 'get', {
      id: 9000,
      msg: '获取成功'
    })
  }
}

module.exports = startMockServer