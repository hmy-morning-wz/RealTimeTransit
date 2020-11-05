<template>
  <div class="flex-container flex flex-column">
    <!-- <mt-search v-model="value" :result.sync="result" placeholder="搜索" autofocus> -->
    <c-search :search="value" @clean-search="onClean"
    @handle-search="onSearch"></c-search>
    <a v-show="!isEmpty" class="seach-item search-cell flex" v-for="(item, index) in result" :key="index"
      :href="`#/transfer?from=${isFrom}&value=${item.name}&type=${type}&detail=${JSON.stringify(item)}`">
      <span>{{item.name}}</span>
      <span>{{item.district}}</span>
    </a>
    <!-- </mt-search> -->
    <!-- 历史搜索 -->
    <div class="history" v-show="!isEmpty" v-if="!result.length">
      <div v-for="(item, index) in searchList" :key="index" seed="backHref" @click="backHref(item)">
        <div class="seach-item">{{item.name}}</div>
      </div>
      <p @click="removeHistory">清除搜索历史</p>
    </div>
    <div class="empty" v-if="isEmpty">
        没搜到结果? 换个词试试
     </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import cSearch from '@/components/search'
export default {
  components: {cSearch},
  data () {
    return {
      isFrom: '',
      isEmpty: false,
      value: '',
      result: [],
      type: '',
      searchList: this.$parent.getSearchHistory()
    }
  },
  computed: {
    ...mapGetters([
      'city'
    ])
  },
  methods: {
    backHref (obj) {
      location.href = `#/transfer?value=${obj.name}&type=${this.type}&detail=${JSON.stringify(obj)}`
    },
    // 清除历史
    removeHistory () {
      this.$parent.clearHistory()
      this.searchList = []
    },
    onClean () {
      this.value = ''
      this.result = []
    },
    async onSearch (e) {
      // console.log(e)
      let res = await this.$parent.request({
        baseURL: 'https://restapi.amap.com',
        withCredentials: false,
        url: `/v3/assistant/inputtips?key=5d1564203934a57a268d0ef563babc03&keywords=${e}&city=${this.city}&citylimit=${true}`
      })
      console.log('搜索结果：', res[0])
      if (res.length) {
        this.result = res
        this.isEmpty = false
      } else {
        this.isEmpty = true
      }
    }
  },

  // watch: {
  //   value: async function (e) {
  //     let res = await this.$parent.request({
  //       baseURL: 'https://restapi.amap.com',
  //       withCredentials: false,
  //       url: `/v3/assistant/inputtips?key=5d1564203934a57a268d0ef563babc03&keywords=${e}&city=${this.city}`
  //     })
  //     console.log('搜索结果：', res[0])
  //     if (res.length) {
  //       this.result = res
  //       this.isEmpty = false
  //     } else {
  //       this.isEmpty = true
  //     }
  //   }
  // },

  created () {
    this.type = this.$route.query.type
    this.isFrom = this.$route.query.from
  }
}
</script>
<style scoped lang="less">
.empty{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items:flex-end;
}
.seach-item{
  border-bottom: solid 1px #eee;
  line-height: 1.2rem;
  color: #505064;
  font-size: 16px;
  padding-left: .5rem;
}
.search-cell{
  justify-content: space-between;
  align-items: center;
  padding-right: .5rem;
}
.history{
  position: absolute;
  top: 1.8rem;
  left: 0;
  width: 100%;
  p {
    text-align: center;
    line-height: 1rem;
    font-size: 16px;
    color: #88929D;
  }
}
</style>
