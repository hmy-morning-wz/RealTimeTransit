<template>
  <div class="banner-box"
       v-show="list && list.length">
    <img class="banner-img"
         v-for="(item,id) in list"
         :key="id"
         :src="item.pic_url"
         :seed="item.name"
         :data-expo="item.name"
         @click="handleGo(item.redi_url)">
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'banner',
  props: {
    url: {
      type: String,
      default: '/tcapp/ads/classify'
    },
    cityCode: {
      type: String,
      default: '610300'
    },
    appPosition: {
      type: String,
      default: '9'
    },
    pageCode: {
      type: String,
      default: '610300001'
    },
    size: {
      type: Number,
      default: 1
    },
    position: {
      type: String,
      default: '3' // （1顶部2中部3底部）
    }
  },
  data () {
    return {
      // imageUrl: 'https://operation-citytsm.oss-cn-hangzhou.aliyuncs.com/zct/banner/banner1.jpg',
      list: []
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    handleGo (url) {
      url && (window.location.href = url)
    },
    async fetch () {
      let url = this.url + `?city_code=${this.cityCode}&app_position=${this.appPosition}&page_code=${this.pageCode}`
      try {
        let res = await axios({
          method: 'get',
          url: url
        })
        console.log(res)
        let currPosition = this.position
        if (res && res.status === 200 && res.data.code === '0') {
          let list = res.data.data
          let list1 = []
          if (list && list.length) {
            list.forEach(element => {
              if (element.curr_position === currPosition) {
                list1.push(element)
              }
            })
            list = list.length > this.size ? list1.slice(0, this.size) : list1
            this.list = list
          }
        }
      } catch (err) {
        console.warn(err)
        /* this.list = [
          {
            'name': '测试广告',
            'curr_position': '2',
            'id': '115',
            'pic_url': 'http://sit-img-citytsm.oss-cn-hangzhou.aliyuncs.com/appicon_20180918144732229AqAOgZ.png',
            'redi_url': 'http://www.baidu.com'
          },
          {
            'name': 'banner测试',
            'curr_position': '3',
            'id': '118',
            'pic_url': 'http://sit-img-citytsm.oss-cn-hangzhou.aliyuncs.com/appicon_20180920145327114g7mzeI.png',
            'redi_url': 'https://www.baidu.com'
          }
        ] */
      }
      /*
      {
    "data": [
        {
            "name": "测试广告",
            "curr_position": "2",
            "id": "115",
            "pic_url": "http://sit-img-citytsm.oss-cn-hangzhou.aliyuncs.com/appicon_20180918144732229AqAOgZ.png",
            "redi_url": "http://www.baidu.com"
        },
        {
            "name": "banner测试",
            "curr_position": "3",
            "id": "118",
            "pic_url": "http://sit-img-citytsm.oss-cn-hangzhou.aliyuncs.com/appicon_20180920145327114g7mzeI.png",
            "redi_url": "https://www.baidu.com"
        }
    ],
    "code": "0",
    "message": "Success"
}
       */
    }
  }
}
</script>

<style scoped lang="less">
.banner-box {
  background: transparent;
  margin-top: 3%;
  .banner-img {
    width: 100%;
  }
}
</style>
