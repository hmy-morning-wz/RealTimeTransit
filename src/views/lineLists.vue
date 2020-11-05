<template>
  <div class="container">
    <!-- 搜索 -->
    <div class="search-bar">
      <input type="text" name="search" v-focus autofocus ref="input" @focus="handleFocus" v-model="inputValue" maxlength="10" @input="handleOnInput()" class="search-inp" placeholder="搜线路">
      <div class="search-icon"></div>
      <div class="search-close" @click="handleCancel"></div>
      <div class="search-text" @click="handleCancel">取消</div>
    </div>
    <!-- 搜索历史 -->
    <div class="history" v-show="history">
      <div class="line">搜索历史</div>
      <div class="line-list" @click="handleHistoryList(lineList.line_id,lineList.name)" v-for="(lineList,index) in historys" :key="index">
        <div class="list-wrapper">
          <span class="icon"></span>
          <span class="text">{{lineList.name}}</span>
        </div>
      </div>
      <div class="clear-history" @click="handleClearHistory">清除搜索历史</div>
    </div>
    <!-- <searchLine v-if="showStation"></searchLine> -->
    <!-- 线路列表 -->
    <div class="line-lists" v-if="lineLists.length>0">
      <div class="line" v-show="lineLists.length>0">线路</div>
      <div class="line-list" seed="handleLineList" @click="handleLineList(lineList.line_id,lineList.name)" v-for="(lineList,index) in lineLists" :key="index">
        <div class="list-wrapper">
          <span class="icon"></span>
          <span class="text">{{lineList.name}}</span>
        </div>
      </div>
    </div>
    <div class="no-infos" v-show="showNoInfo">
      <div class="no-info"></div>
      <div class="no-info-text">无搜索结果</div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  data () {
    return {
      lineLists: [],
      inputValue: '',
      cityCode: '610300',
      history: false,
      historys: [],
      showNoInfo: false
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
        console.log('insert')
      }
    }
  },
  methods: {
    // 清空搜索历史
    handleClearHistory () {
      localStorage.removeItem('historys')
      this.historys = []
    },
    // 获取焦点时
    handleFocus () {
      // this.showStation = false
    },
    // input有输入
    handleOnInput () {
      this.history = false
      this.searchLine()
    },
    // 点击取消按钮
    handleCancel () {
      this.$router.go(-1)
    },
    // 点击搜索历史列表
    handleHistoryList (lineId, lineName) {
      window.location.href = `#/lineDetails?lineId=${lineId}&lineName=${lineName}`
    },
    // 点击线路列表
    handleLineList (lineId, lineName) {
      var historys
      if (localStorage.historys) {
        historys = JSON.parse(localStorage.historys)
      } else {
        historys = []
      }
      var obj = { 'line_id': lineId, 'name': lineName }
      if (historys.length > 9) historys.shift()
      historys.push(obj)
      historys = _.uniqWith(historys, _.isEqual)
      localStorage.historys = JSON.stringify(historys)
      // console.log(JSON.parse(localStorage.historys))
      window.location.href = `#/lineDetails?lineId=${lineId}&lineName=${lineName}`
    },
    // 搜索线路
    async searchLine () {
      let res = await this.$parent.request({
        url: `line/search_by_line?line=${this.inputValue}&city_code=${
          this.cityCode
        }`
      })
      if (res) this.lineLists = res
      // alert(JSON.stringify(res))
      if (this.lineLists.length === 0) {
        this.showNoInfo = true
      } else {
        this.showNoInfo = false
      }
    }
  },
  created () {
    // 设置标题
    window.yl.call('setTitleBarText', {title: '附近站点'})
    // 判断是否有搜索历史
    if (localStorage.historys) {
      this.history = true
      this.historys = JSON.parse(localStorage.historys)
    } else {
      this.history = true
    }
    // 隐藏头部bar
    try {
      if (window.AlipayJSBridge) {
        /* eslint-disable-next-line */
        AlipayJSBridge.call('setTransparentTitle', {
          transparentTitle: 'none'
        })
        /* eslint-disable-next-line */
        AlipayJSBridge.call('hideOptionMenu')
      }
    } catch (err) {
      console.log(err)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.input.focus()
    })
  }
}
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  input::-webkit-input-placeholder {
    color: #aaa;
  }
}
.search-bar {
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
  .search-close{
    position: absolute;
    right: 1.8rem;
    top: 0.4rem;
    width: 0.4rem;
    height: 0.4rem;
    background: url('../assets/closefuceng.png') no-repeat;
    background-size:  0.4rem  0.4rem;
  }
  .search-inp {
    width: 8rem;
    height: 0.773333rem;
    border: none;
    outline: none;
    // line-height: 0.773333rem;
    background: #ededed;
    border-radius: 6px;
    padding: 0.133333rem 0 0.133333rem 0.986667rem;
    box-sizing: border-box;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #303033;
    letter-spacing: 0;
    // line-height: .533333rem;
  }
  .search-text {
    cursor: pointer;
    display: inline-block;
    font-family: PingFangSC-Medium;
    font-size: 0.426667rem;
    color: #00a0e9;
    letter-spacing: 0;
    margin-left: 0.133333rem;
  }
}
.history {
  .line {
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #303033;
    letter-spacing: 0;
    padding: 0.426667rem 0 0.32rem 0.426667rem;
    box-sizing: border-box;
  }
  .line-list {
    position: relative;
    width: 91%;
    margin: 0 auto;
    height: 1.466667rem;
    border-bottom: 1px solid #cccccc;
    .list-wrapper {
      position: absolute;
      top: 0.44rem;
      left: 0;
      .icon {
        vertical-align: top;
        display: inline-block;
        width: 0.586667rem;
        height: 0.586667rem;
        background: url('../assets/images/line.png') no-repeat;
        background-size: 0.586667rem 0.586667rem;
      }
      .text {
        display: inline-block;
        margin-left: 0.266667rem;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #303033;
        height: 0.586667rem;
        line-height: 0.586667rem;
      }
    }
  }
  .clear-history {
    font-family: PingFangSC-Regular;
    height: 1.226667rem;
    line-height: 1.226667rem;
    font-size: 16px;
    color: #00a0e9;
    text-align: center;
  }
}
.line-lists {
  .line {
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #303033;
    letter-spacing: 0;
    padding: 0.426667rem 0 0.32rem 0.426667rem;
    box-sizing: border-box;
  }
  .line-list {
    position: relative;
    width: 91%;
    margin: 0 auto;
    height: 1.466667rem;
    border-bottom: 1px solid #cccccc;
    .list-wrapper {
      position: absolute;
      top: 0.44rem;
      left: 0;
      .icon {
        vertical-align: top;
        display: inline-block;
        width: 0.586667rem;
        height: 0.586667rem;
        background: url('../assets/images/line.png') no-repeat;
        background-size: 0.586667rem 0.586667rem;
      }
      .text {
        display: inline-block;
        margin-left: 0.266667rem;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #303033;
        height: 0.586667rem;
        line-height: 0.586667rem;
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
}
</style>
