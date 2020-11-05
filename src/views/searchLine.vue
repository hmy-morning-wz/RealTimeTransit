<template>
  <div class="search-line">
    <!-- 搜索 -->
    <a class="search-bar" href="#/lineLists">
      <div class="search-inp">搜线路</div>
      <div class="search-icon"></div>
      <div class="search-text">查询</div>
    </a>
    <!-- 站点列表 -->
    <div class="show-station">
      <div class="search-lists" v-if="stationLists.length > 0">
        <div class="search-list"  v-for="(stationList,index) in stationLists" :key="index">
          <div class="search-list-left">
            <span class="icon"></span>
            <span class="text">{{stationList.name}}</span>
          </div>
          <div  seed="handleLineDetail" @click="handleLineDetail(index, stationList.direction, stationList.name, line)" v-for="(line,gprsId) in stationList.lineCarInformationList" :key="gprsId">
            <div class="line" v-show="line.index>0"></div>
            <div class="line-box" :data-expo="line.lineNo">
            <div div class="box-left">
             <div class="text2">{{line.lineNo}}</div>
             <div class="text3">开往 {{line.destination}}</div>
            </div>
            <div class="box-right">
            <span class="text2" v-show="line.count > 0"><span>距离</span> <span class="text1">{{line.count}}</span><span>站</span></span>
            <span class="text1" v-show="line.count===0" >即将到站</span>
            <span class="text2" v-show="line.count<0">首站暂未发车</span>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div class="no-infos" v-else>
        <div class="no-info"></div>
        <div class="no-info-text">附近暂无公交路线信息</div>
        <div class="no-info2"></div>
      </div>
    </div>
     <banner class="my-banner" :page-code="pageCode" :city-code="cityCode" :url="banderUrl" :size='10'/>
  </div>
</template>
<script>
// import { urlQueryString } from '../utils/common.js'
import config from '../utils/config.js'
import Banner from '@/components/banner'
export default {
  components: {Banner},
  data () {
    let location = this.$parent.store.get('location') || {}
    let latitude = location.latitude || config.CITY_MAP_CENTER[1]
    let longitude = location.longitude || config.CITY_MAP_CENTER[0]
    return {
      stationLists: [],
      latitude: latitude,
      longitude: longitude,
      gpsLocated: false,
      cityCode: config.CITY_ID,
      pageCode: '610300001',
      banderUrl: config.baseBannerURL + 'tcapp/ads/classify'
    }
  },
  methods: {
    // 点击站点列表
    handleStationList (index, stationName) {
      window.location.href = `#/searchLineDetails?stationId=${index}&stationName=${stationName}`
    },
    handleLineDetail (index, direction, stationName, line) {
      window.location.href = `#/lineDetails?lineName=${line.lineNo}&lineId=${line.gprsId}&stationName=${stationName}&direction=${direction}`
    },
    // 获取站点信息
    async getStation () {
      window.yl.call(
        'showLoading',
        {
          content: '加载中…',
          duration: 15000
        },
        {
          onSuccess: function (a) {
            // alert('success')
          },
          onFail: function (a) {
            // alert('fail')
          }
        }
      )
      let res = await this.$parent.request({
        // url: `station/list?lng=${this.$route.query.lng || urlQueryString('lng') || 107.13}&lat=${this.$route.query.lat || urlQueryString('lat') || 34.37}&limit_distance=500&city_code=${this.cityCode}`
        // url: `station/list?lng=${this.longitude || this.$route.query.lng}&lat=${this.latitude || this.$route.query.lat}&limit_distance=500&city_code=${this.cityCode}`
        url: `station/detail_list?lng=${this.longitude || this.$route.query.lng}&lat=${this.latitude || this.$route.query.lat}&limit_distance=500&city_code=${this.cityCode}`
      })
      /*   {
 "data": [{
 "name": "昌炎世福大院",
 "direction": 0,
 "lineCarInformationList": [{
 "lineNo": "1路",
 "destination": "行政中心",
 "count": null,
 "orderNo": 2,
 "lng": 107.131806,
 "lat": 34.378556,
 "gprsId": 1
 },
*
*/
      if (res && res.success) {
        // lines
      /*  res.forEach(function (t) {
          let index = 0
          t.lines = [{name: '100路', station_end: '白塔公园', distance: 100, index: index++}, {name: '101路', station_end: '白塔公园', distance: 0, index: index++}, {name: '102路', station_end: '白塔公园', distance: -1, index: index++}]
        })  */
        this.stationLists = res
      }
      // alert(JSON.stringify(res))
      window.yl.call('hideLoading')
    }
  },
  created () {
    let lng = this.$route.query.lng
    let lat = this.$route.query.lat
    if (lng && lat) {
      this.gpsLocated = true
      this.latitude = lat
      this.longitude = lng
    }
    // eslint-disable-next-line
/*    if (typeof window.AlipayJSBridge != "undefined") {
      window.AlipayJSBridge.call('setOptionMenu', {
        title: '换乘查询',
        redDot: '-1',
        color: '#ff313131'
      })
      // eslint-disable-next-line
      window.AlipayJSBridge.call('showOptionMenu')
    }*/
    window.yl.call(
      'setTitleBarRightButton',
      {
        rightButtonShow: true,
        rightButtonTextOpen: true,
        rightButtonText: '换乘查询' // 优先展示图标、其次是文字，两者选一个
      },
      {
        onSuccess: () => {
          location.href = '#/transfer' // ?lng=107.232626&lat=34.33399'
        },
        onFail: function (a) {
          alert('fail')
        }
      }
    )
    let self = this
    // 设置标题
    window.yl.call('setTitleBarText', { title: '附近站点' })
    // 获取位置
    if (!self.gpsLocated) {
      window.yl.call(
        'getLocation',
        {},
        {
          onSuccess: function (res) {
            // this.getStation()
            // alert(JSON.stringify(res.param))
            if (res.param) {
              self.latitude = res.param.latitude
              self.longitude = res.param.longitude
              let location = {latitude: self.latitude, longitude: self.longitude}
              self.$parent.store.set('location', JSON.stringify(location))
              console.log('getLocation success ' + JSON.stringify(location))
              self.gpsLocated = true
              self.getStation()
            }
          },
          onFail: function (res) {
            alert('获取地理位置失败')
          }
        }
      )
    } else {
      console.warn('gps location from query ,not need getLocation')
      self.getStation()
    }
  },
  mounted () {
    let self = this
    setTimeout(() => {
      if (self.gpsLocated) return
      self.getStation()
    }, 1000)
    // eslint-disable-next-line
/*    new Error('测试专用当前位置为 宝鸡南站: 107.232626,34.33399')
    document.addEventListener('optionMenu', () => {
      location.href = '#/transfer?lng=107.232626&lat=34.33399'
    })*/
  }
}
</script>
<style lang="less" scoped>
@import '../style/base.less';
input::-webkit-input-placeholder {
  color: #aaa;
}
.search-line {
  width: 100%;
  .my-banner{
    width: 91%;
    margin-left: 4.5%;
  }
}
.search-bar {
  display: block;
  position: relative;
  height: 1.173333rem;
  padding: 0.2rem 0.426667rem 0.2rem 0.426667rem;
  border-top: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  box-sizing: border-box;
  .search-icon {
    position: absolute;
    left: 0.613333rem;
    top: 0.293333rem;
    width: 0.586667rem;
    height: 0.586667rem;
    background: url('../assets/images/search.png') no-repeat;
    background-size: 0.586667rem 0.586667rem;
  }
  .search-inp {
    display: inline-block;
    width: 8rem;
    height: 0.773333rem;
    line-height: 0.78rem;
    background: #ededed;
    border-radius: 6px;
    padding-left: 0.986667rem;
    // padding: .133333rem 0 .133333rem 0.986667rem;
    box-sizing: border-box;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #aaa;
    letter-spacing: 0;
  }
  .search-text {
    display: inline-block;
    font-family: PingFangSC-Medium;
    font-size: 0.426667rem;
    color: #00a0e9;
    letter-spacing: 0;
    margin-left: 0.133333rem;
  }
}
.search-lists {
  .search-list {
    position: relative;
    width: 91%;
    border: 1px solid #cccccc;
    margin-top: 2%;
    margin-left: 4.5%;
    border-radius: 10px;
    box-shadow: 0 2px 20px 0 rgba(0,121,197,0.14);
    .search-list-left {
      position: relative;
      top: 30%;
      left: 0px;
      height: 1rem;
      border-radius: 10px 10px 0px 0px;
      background: #D9F0FF;
      .icon {
        margin-top:0.2rem;
        margin-left: 10px;
        vertical-align: top;
        display: inline-block;
        width: 0.586667rem;
        height: 0.586667rem;
        background: url('../assets/images/station@3x.png') no-repeat;
        background-size: 0.586667rem 0.586667rem;
      }
      .text {
        margin-top:0.25rem;
        display: inline-block;
        margin-left: 0.266667rem;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #303033;
        height: 0.586667rem;
        line-height: 0.586667rem;
      }
    }
    .search-list-right {
      position: relative;
      top: 36%;
      right: 0;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #a2a2a2;
      text-align: right;
    }
    .line{
      margin-left: 10%;
      height: 1px;
      width: 90%;
      background-color: #d9d9d9;
    }
    .line-box{
      display: flex;
      margin-bottom: 20px;
      margin-top: 10px;
      .box-left {
        position: relative;
        width: 60%;
        left: 30px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #a2a2a2;
        text-align: left;
      }
      .box-right {
        position: relative;
        margin-top: 10px;
        width: 40%;
        right: 10px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #a2a2a2;
        text-align: right;
      }
      .text1{
        font-size: 16px;
        margin-left: 0px;
        color: #00a0e9;
      }
      .text2{
        font-size: 16px;
        margin-left: 10px;
        color: #505064;
      }
      .text3{
        font-size: 12px;
        margin-left: 10px;
        color: #a2a2a2;
      }
    }
  }
}
.no-infos {
  .no-info {
    width: 3.973333rem;
    height: 3.973333rem;
    margin: 1.546667rem auto 0.426667rem auto;
    background: url('../assets/images/norecord@3x.png') no-repeat;
    background-size: 3.973333rem 3.973333rem;
  }
  .no-info-text {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #595d60;
    text-align: center;
    height: 0.586667rem;
    line-height: 0.586667rem;
  }
  .no-info2 {
    width: 3.973333rem;
    height: 2rem;
    margin: 1.546667rem auto 0.426667rem auto;
    background-size: 3.973333rem 3.973333rem;
  }
}
</style>
