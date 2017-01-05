<template>
  <div>
    <group title="调试辅助">
      <x-input title="用户id"
               text-align="left"
               placeholder="输入模拟用户id"
               type="tel"
               :value.sync="userId">
      </x-input>
      <cell title="模拟登陆所给用户id" @click="fakeLogin(userId)">
        <span class="iconfont icon-rank route-link" slot="icon"></span>
      </cell>
    </group>
    <group title="项目列表">
      <template v-for="router in routers">
        <cell :title="router.title" :link="router.testPath ? router.testPath : router.path" v-if="showItem(router.title)">
          <span class="iconfont icon-rank route-link" slot="icon"></span>
        </cell>
      </template>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import Group from 'vux-src-components/group'
  import Cell from 'vux-src-components/cell'
  import XInput from 'vux-src-components/x-input'

  export default {
    components: { Group, Cell, XInput },
    data () {
      return {
        userId: '1',
        routers: window.appRouters,
        notShowItems: new Set(['文章'])
      }
    },
    methods: {
      fakeLogin (userId) {
        console.log('模拟登陆用户' + userId)
        this.loading('请求中...')
        Vue.http.get(`/fake-login/${userId}`).then(() => {
          this.loading(false)
          this.toast({ text: '模拟登陆成功', time: 500 })
          window.location.reload()
        }).catch(() => {
          this.loading(false)
          this.toast({ text: '模拟登陆失败', time: 500 })
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
