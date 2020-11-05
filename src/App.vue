<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import * as Common from './utils/common'
import { request, ajax } from './utils/request'
import MyTracker from './utils/tracker'
import Store from './utils/store'
import _ from 'lodash'
const store = new Store()
export default {
  name: 'App',
  data () {
    return {
      request: request,
      ajax: ajax,
      store: store,
      COMMON: Common
    }
  },
  methods: {
    sleep (t = 1) {
      return new Promise(resolve => setTimeout(resolve, t * 1000))
    },
    // 获取搜索历史
    getSearchHistory () {
      return this.store.getStore('searchHistory')
    },
    // 设置搜索历史
    setSearchHistory (item) {
      let s = this.getSearchHistory()
      // console.log([item, ...s])
      s = _.uniqBy([item, ...s], 'name')
      return this.store.setStore('searchHistory', JSON.stringify(s))
    },
    // 清空搜索历史
    clearHistory () {
      return this.store.setStore('searchHistory', '')
    }
  },
  async mounted () {
    this.$store.dispatch('HandleCurrentPos') // 获取当前位置
    window.yl.call('canPullDown', {
      canPullDown: false
    })
  },
  watch: {
    '$route': (to, from) => {
      MyTracker.logPv({pageName: '页面[' + to.path + '-' + (to.meta.trackName || '-') + ']', to: to.path, from: from.path})
    }
  }
}
</script>
<style lang="less" src="./style/base.less"></style>
