var RBAC = require('rbac-a')
const JsonProvider = RBAC.providers.JsonProvider

// 关于rbac-a这个库
// new实例时传入基本配置，定义用户-角色-角色权限
// 通过attribute可以使角色对用户deactive，从而灵活的添加了一层权限过滤

// 考虑安全问题，这里先不把roles可配
const roles = {
  'guest': {
  },
  'reader': {
    'permissions': ['read'],
    'inherited': ['guest']
  },
  'writer': {
    'permissions': ['create'],
    'inherited': ['reader']
  },
  'editor': {
    'permissions': ['update'],
    'inherited': ['reader'],
    'attributes': ['dailySchedule']
  },
  'director': {
    'permissions': ['delete'],
    'inherited': ['reader', 'editor']
  },
  'admin': {
    'permissions': ['manage'],
    'inherited': ['director'],
    'attributes': ['hasSuperPrivilege']
  }
}

class MyRBAC {
  constructor (userGroups) {
    let config = Object.assign({
      roles: roles
    }, {
      'users': {
        'me': userGroups,
        'admin': ['admin']
      }
    })

    this.rbac = new RBAC({
      provider: new JsonProvider(config),
      attributes: new RBAC.AttributesManager()
    })
  }

  check (item) {
    return this.rbac.check('me', item)
  }

  can (item) {
    this.check(item).then((allowed) => {
      return allowed
    })
  }
}

module.exports = MyRBAC

var userGroups = ['writer']
var test = new MyRBAC(userGroups)
test.check('creates').then(function (allowed) {
  if (allowed) {
    console.log('allpw')
  } else {
    console.log('aaa')
  }
}).catch(function (err) {
  console.error(err && err.stack || err || 'ERROR')
})
console.log(test.can('create'))