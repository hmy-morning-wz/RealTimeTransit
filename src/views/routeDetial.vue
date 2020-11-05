<template>
  <div class="amap-page-container">
    <div class="menus flex align-center">
    </div>
    <div id="container"></div>
    <div id="panel"></div>
    <div class="mask" :hidden="isLoading"></div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
export default {
  data: function () {
    return {
      map: null,
      isLoading: false
    }
  },
  async mounted () {
    // console.log(AMap)
    this.$parent.COMMON.showLoading()
    this.map = new AMap.Map('container', {
      resizeEnable: true,
      zoom: 11, // 级别
      center: [this.startObj.location.split(',')[0], this.startObj.location.split(',')[1]] // 中心点坐标
    })
    await this.setTransfer()
    await this.$parent.sleep(2)
    this.$parent.COMMON.hideLoading()
  },
  computed: {
    ...mapGetters([
      'policy',
      'city',
      'startObj',
      'endObj'
    ])
  },
  methods: {
    async setTransfer () {
       let transferOption = {
          map: this.map,
          nightflag: true, // 是否计算夜班车
          city: this.city,
          panel: 'panel',
          outlineColor: '#ffeeee',
          autoFitView: true,
          policy: AMap.TransferPolicy[this.policy]
      }
      let transfer = await new AMap.Transfer(transferOption)
      //根据起、终点坐标查询公交换乘路线
      await transfer.search(new AMap.LngLat(this.startObj.location.split(',')[0], this.startObj.location.split(',')[1]), 
       new AMap.LngLat(this.endObj.location.split(',')[0], this.endObj.location.split(',')[1]), (status, result) => {
        // result 即是对应的公交路线数据信息
        if (status === 'complete') {
            console.log('公交路线数据查询成功', result)
        } else {
            console.error('公交路线数据查询失败' + result)
        }
      })
      await this.$parent.sleep(1)
      let menu = document.getElementsByClassName('planTitle')
      let plan = document.getElementsByClassName('plan')
      let index = +this.$route.query.index
      for (let i = 0; i < menu.length; i++) {
        menu[i].style.display = 'none'
        plan[i].style.display = 'none'
      }
      this.isLoading = true
      menu[index].style.display = 'block'
      if(index) menu[index].click()
      plan[index].style.display = 'block'
      this.$parent.COMMON.hideLoading()
    }
  }
}
</script>
<style lang="less" scoped>
#container{
  width: 10rem;
  height: 10rem;
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
</style>
