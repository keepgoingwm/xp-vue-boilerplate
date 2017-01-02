<template>
  <div>
    <group title="调试辅助">
      <x-input title="用户id"
               text-align="left"
               placeholder="输入模拟用户id"
               type="tel"
               :value.sync="id">
      </x-input>
      <cell title="模拟登陆所给用户id" @click="fakeLogin(id)">
        <span class="iconfont icon-rank route-link" slot="icon"></span>
      </cell>
      <cell title="模拟登陆005230" @click="fakeLogin('005230')">
        <span class="iconfont icon-rank route-link" slot="icon"></span>
      </cell>
      <cell title="模拟登陆001228(有工资信息，1111)" @click="fakeLogin('001228')">
        <span class="iconfont icon-rank route-link" slot="icon"></span>
      </cell>
      <cell title="模拟登陆030895(有请假记录;很多调休假)" @click="fakeLogin('030895')">
        <span class="iconfont icon-rank route-link" slot="icon"></span>
      </cell>
      <cell title="模拟登陆000416(有正常有薪假)" @click="fakeLogin('000416')">
        <span class="iconfont icon-rank route-link" slot="icon"></span>
      </cell>
      <cell title="清理cookies" @click="clearCookies">
        <span class="iconfont icon-rank route-link" slot="icon"></span>
      </cell>
    </group>
    <group title="文章访问">
      <x-input title="文章type"
               text-align="left"
               placeholder="输入文章type"
               type="tel"
               :value.sync="article.type">
      </x-input>
      <x-input title="文章id"
               text-align="left"
               placeholder="输入文章id"
               type="tel"
               :value.sync="article.id">
      </x-input>
      <cell title="文章" @click="goArticle">
        <span class="iconfont icon-rank route-link" slot="icon"></span>
      </cell>
      <cell title="教程" @click="this.routerGo('course')">
        <span class="iconfont icon-rank route-link" slot="icon"></span>
      </cell>
    </group>
    <group title="项目列表">
      <cell :title="router.title" :link="router.testPath ? router.testPath : router.path" v-for="router in routers" v-if="showItem(router.title)">
        <span class="iconfont icon-rank route-link" slot="icon"></span>
      </cell>
      <!--<cell title="考勤排行" link="/attendance/rank">-->
        <!--<span class="iconfont icon-rank route-link" slot="icon"></span>-->
      <!--</cell>-->
      <cell title="考勤打卡" link="/attendance/check">
        <span class="iconfont icon-rank route-link" slot="icon"></span>
      </cell>
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
        console.log(id)
        this.loading('请求中...')
        Vue.http.get(`/fake-login/${id}`).then(() => {
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
      },
      goArticle () {
        this.routerGo('article', {type: this.article.type, id: this.article.id})
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
