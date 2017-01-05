import Mock from 'mockjs'

let startMockServer = function () {
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

module.exports = startMockServer