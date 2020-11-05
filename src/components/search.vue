<template>
  <div class="search-bar">
    <!-- 搜索组件 -->
    <input name="search" v-focus
    autofocus ref="input"
    v-model="search"
    maxlength="20"
    class="search-inp" placeholder="搜线路">
    <div class="search-icon"></div>
    <div class="search-delete" v-show="search.length" @click="handleClean"></div>
    <div class="search-text" @click="handleCancel">取消</div>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      search: ''
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
        console.log('insert focus on search comp')
      }
    }
  },
  methods: {
    handleClean () {
      this.clearSearch()
      this.$emit('clean-search', '')
    },
    // 取消搜索
    handleCancel () {
      this.$router.go(-1)
    },
    clearSearch () {
      this.search = ''
    }
  },
  watch: {
    search: function (val) {
      console.log(val)
      this.$emit('handle-search', val)
    }
  }
}
</script>

<style scoped lang="less">
.search-bar {
  z-index: 10;
  display: block;
  position: relative;
  height: 1.173333rem;
  padding: 0.2rem 0.426667rem 0.2rem 0.426667rem;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
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
  .search-delete{
    position: absolute;
    right: 1.8rem;
    top: 0.39rem;
    width: 0.4rem;
    height: 0.4rem;
    background: url('../assets/icon/delete.png') no-repeat;
    background-size: 0.4rem 0.4rem;
    z-index: 11;
  }
  .search-inp {
    display: inline-block;
    width: 8rem;
    height: 0.773333rem;
    line-height: 0.78rem;
    background: #ededed;
    border-radius: 6px;
    padding-left: 0.986667rem;
    box-sizing: border-box;
    font-family: 'PingFangSC-Regular';
    font-size: 16px;
    color: #aaa;
    letter-spacing: 0;
  }
  .search-text {
    display: inline-block;
    font-family: 'PingFangSC-Medium';
    font-size: 0.426667rem;
    color: #00a0e9;
    letter-spacing: 0;
    margin-left: 0.133333rem;
  }
}
</style>
