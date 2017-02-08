<template>
<div>
  <group title="调试辅助">
    <x-input title="用户id"
             text-align="right"
             placeholder="输入模拟用户id"
             v-model="id">
    </x-input>
    <cell title="模拟登陆所给用户id" @click="fakeLogin(id)" is-link>
      <span class="iconfont icon-rank route-link" slot="icon"></span>
    </cell>
    <cell title="清理cookies" @click="clearCookies" is-link>
      <span class="iconfont icon-rank route-link" slot="icon"></span>
    </cell>
    <cell title="组件" @click="this.routerGo('components')" is-link>
      <span class="iconfont icon-rank route-link" slot="icon"></span>
    </cell>
  </group>
  <group title="项目列表">
    <!--第一级路由可自动生成-->
    <cell :title="router.title" :link="router.testPath ? router.testPath : router.path" v-for="router in routers" v-if="showItem(router.title)">
      <span class="iconfont icon-rank route-link" slot="icon"></span>
    </cell>
  </group>
</div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import { Group, Cell, XInput } from 'vux'

export default {
  components: { Group, Cell, XInput },
  data () {
    return {
      id: '1',
      routers: window.appRouters,
      notShowItems: new Set(['文章']),
      article: {
        type: '1',
        id: '1'
      }
    }
  },
  methods: {
    fakeLogin (id) {
      this.loading('请求中...')
      Vue.http.get(`/fake-login/${id}`).then((data) => {
        console.log(id, data.data.name)
        this.loading(false)
        this.toast({ text: `模拟登陆'${data.data.name}'成功`, time: 1000 })
        window.location.reload()
      }).catch(() => {
        this.loading(false)
        this.toast({ text: '模拟登陆失败', time: 1000 })
      })
    },
    clearCookies () {
      location.href = 'http://debugx5.qq.com'
    },
    showItem (title) {
      return !this.notShowItems.has(title)
    }
  }
}
</script>

<style type="scss">
.route-link {
  width: 24px;
  display: block;
  color:#FBC701
}
</style>
