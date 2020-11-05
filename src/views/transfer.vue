<template>
  <!-- 换乘查询 -->
  <div class="box-header">
    <div class="box">
      <div class="panel">
        <div class="panel-wrapper flex">
          <!-- 圆点 -->
          <div class="panel-pos flex flex-column">
            <img src="@/assets/starting@3x.png"
                 alt="">
            <div class="ponit"></div>
            <img src="../assets/finishing@3x.png"
                 alt="">
          </div>
          <div class="panel-left">
            <a href="#/search?from=customBus&type=origin&url=index">
              <span v-show="!pos.end.length">出发地: </span>
              <span>{{pos.start}}</span>
            </a>
            <a href="#/search?from=customBus&type=destination&url=index">
              <span v-show="!pos.end.length">目的地: </span>
              <span>{{pos.end}}</span>
            </a>
          </div>
          <div class="panel-right flex align-center"
               @click="exchangePos">
            <img src="../assets/fanxiang@3x.png"
                 alt="">
          </div>
        </div>
        <button class="searchBtn"
                :class="{submitBtn: canSubmit}"
                seed="searchLine"
                @click="searchLine">查询</button>
      </div>
    </div>
    <banner class="my-banner"
            :position="positionId2"
            :page-code="pageCode2"
            :city-code="cityCode"
            :url="banderUrl"
            :size='10' />
    <banner class="banner-top"
            :position="positionId1"
            :page-code="pageCode1"
            :city-code="cityCode"
            :url="banderUrl" />
  </div>
</template>
<script>
// import HireBus from '@/services/hirebus'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
import CONFIG from '@/utils/config'
import Banner from '@/components/banner'
export default {
  components: { Banner },
  data () {
    return {
      animated: false,
      cityCode: CONFIG.CITY_ID,
      positionId1: '1',
      positionId2: '3',
      pageCode1: '610300002',
      pageCode2: '610300002',
      banderUrl: CONFIG.baseBannerURL + 'tcapp/ads/classify'
    }
  },
  computed: {
    canSubmit: function () {
      if (this.startObj && this.endObj) return true
      return false
    },
    ...mapGetters([
      'pos',
      'startObj',
      'endObj'
    ])
  },

  methods: {
    exchangePos () {
      this.$store.dispatch('ExchangePos')
      location.hash = '#/transfer' // 更新hash值
    },
    async animate () {
      let userId = await this.$parent.getUserInfo()
      if (userId) {
        this.animated = true
        location.href = `#/tickets?userId=${userId}`
      } else {
        console.warn('need userId to go tickets')
      }
    },
    // 查找
    async searchLine () {
      if (this.canSubmit) {
        let adcode = CONFIG.CITY_ID.substr(0, 4)
        if (this.startObj.adcode && this.startObj.adcode.indexOf(adcode) >= 0 && this.endObj.adcode && this.endObj.adcode.indexOf(adcode) >= 0) {
          location.href = '#/manageRoute'
        } else {
          console.warn('adcode not match ' + adcode)
          Toast(`不能查询非本市(${CONFIG.CITY_NAME})公交线路`)
        }
      }
    },
    // 获取已开通列表
    async gettailorMadeList () {
      let res = await this.$parent.$parent.request({
        url: `/custbus?city_code=${this.$parent.$parent.CONFIG.CITY_ID}`
      })
      console.log(res)
      if (res) {
        this.busLineList = res
      }
    }
  },

  created () {
    try {
      // eslint-disable-next-line
      AlipayJSBridge.call('hideOptionMenu')
    } catch (e) {
      console.log(e)
    }
    // console.log(this.$route.query.lng && this.$route.query.lat)
    // 主动设置当前位置
    if (this.$route.query.lng && this.$route.query.lat) {
      this.$store.dispatch('SetCurrentPos', {
        name: '宝鸡市',
        adcode: CONFIG.CITY_ID,
        location: `${this.$route.query.lng},${this.$route.query.lat}`
      })
    }
  },
  mounted () {
    // document.title = '换乘查询'
    if (this.$route.query.detail) {
      const detail = JSON.parse(this.$route.query.detail)
      this.$parent.setSearchHistory(detail)
      // console.log(detail)
      if (this.$route.query.type === 'origin') {
        // 起始地
        this.$store.dispatch('HandlePos', {
          start: detail.name
        })
        this.$store.dispatch('SetStart', detail)
      } else if (this.$route.query.type === 'destination') {
        // 目的地
        this.$store.dispatch('HandlePos', {
          end: detail.name
        })
        this.$store.dispatch('SetEnd', detail)
      }
    } else {
      this.$store.dispatch('HandleCurrentPos')
    }
  }
}
</script>
<style lang="less" src="@/style/transfer.less"></style>
