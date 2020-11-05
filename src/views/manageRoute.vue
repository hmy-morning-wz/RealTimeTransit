<template>
  <div class="amap-page-container">
    <div class="menus flex align-center">
      <p seed="handleTab0" @click="handleTab(0)" :class="{'tab-active': index === 0}">较快捷</p>
      <p seed="handleTab1" @click="handleTab(1)" :class="{'tab-active': index === 1}">步行少</p>
      <p seed="handleTab2" @click="handleTab(2)" :class="{'tab-active': index === 2}">换乘少</p>
    </div>
    <div id="container"></div>
    <div v-show="!empty" id="panel"></div>
    <div class="mask" :hidden="isLoading"></div>
    <div v-show="empty" class="empty flex align-center flex-column">
      <img src="@/assets/images/norecord@3x.png" alt="没找到相关路线">
      没找到相关路线
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
export default {
  data: function () {
    return {
      index: 0,
      map: null,
      empty: false,
      isLoading: false
    }
  },
  async mounted () {
    // alert(JSON.stringify(this.endObj))
    this.$parent.COMMON.showLoading()
    this.map = new AMap.Map('container', {
      resizeEnable: true,
      zoom: 11, // 级别
      center: [this.startObj.location.split(',')[0], this.startObj.location.split(',')[1]] // 中心点坐标
    })
    this.setTransfer()
  },
  computed: {
    ...mapGetters([
      'city',
      'startObj',
      'endObj'
    ])
  },
  methods: {
    handleTab (i) {
      this.index = i
      this.isLoading = false
      this.$parent.COMMON.showLoading()
      let node = document.getElementById('panel')
      node.innerHTML = ''
      switch (i) {
        case 0: this.setTransfer('LEAST_TIME')
        this.$store.dispatch('HandlePolicy', 'LEAST_TIME')
        break
        case 1: this.setTransfer('LEAST_WALK')
        this.$store.dispatch('HandlePolicy', 'LEAST_WALK')
        break
        case 2: this.setTransfer('LEAST_TRANSFER')
        this.$store.dispatch('HandlePolicy', 'LEAST_TRANSFER')
        break
      }
    },
    async setTransfer (policy = 'LEAST_TIME') {
      // console.log(policy)
      let transferOption = {
          map: this.map,
          nightflag: true, // 是否计算夜班车
          city: this.city,
          panel: 'panel',
          outlineColor: '#ffeeee',
          autoFitView: true,
          policy: AMap.TransferPolicy[policy]
      }
      let transfer = await new AMap.Transfer(transferOption)
      //根据起、终点坐标查询公交换乘路线
      await transfer.search(new AMap.LngLat(this.startObj.location.split(',')[0], this.startObj.location.split(',')[1]),
       new AMap.LngLat(this.endObj.location.split(',')[0], this.endObj.location.split(',')[1]), (status, result) => {
        // result 即是对应的公交路线数据信息
          if (status === 'complete') {
            console.log('公交路线数据查询成功', result)
            if (result.info && result.info === 'NO_DATA') {
              console.warn('公交路线数据查询没有数据')
              this.empty = true
            }
          } else {
            console.error('公交路线数据查询失败' + result)
            this.empty = true
          }
      })
      await this.$parent.sleep(1)
      let menu = document.getElementsByClassName('planTitle')
      let plan = document.getElementsByClassName('plan')
      for (let i = 0; i < menu.length; i++) {
        // console.log(item)
        plan[i].style.display = 'none'
        menu[i].addEventListener('touchstart', () => {
          // console.log(i)
          location.href = `#/routeDetial?index=${i}`
        })
      }
      this.isLoading = true
      this.$parent.COMMON.hideLoading()
    }
  }
}
</script>
<style lang="less" scoped>
#container{
  width: 10rem;
  height: 0rem;
}
.menus {
  padding: 0.2rem;
  p{
    font-size: 15px;
    margin: 0.2rem;
    line-height: 0.8rem;
    position: relative;
  }
}
.tab-active{
  font-size: 21px!important;
  color: #00A0E9;
}
.tab-active::after{
  position: absolute;
  content: "";
  bottom: -0.1rem;
  left: 0.4rem;
  right: 0.4rem;
  border-top: solid 2px #00A0E9;
  width: 0.8rem;
  height: 1px;
}
.empty{
  color: #595D60;
  letter-spacing: 1px;
  font-size: 15px;
  line-height: 2rem;
  img{
    margin-top: 2rem;
    width: 2.4rem;
  }
}
</style>
