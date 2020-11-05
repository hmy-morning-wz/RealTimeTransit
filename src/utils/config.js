// 请求域名
export default {
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'http://ztmanage.allcitygo.com:8096/'
      : process.env.NODE_ENV === 'testing'
        ? 'http://sit-zctreal.allcitygo.com/'
        : 'http://sit-zctreal.allcitygo.com/',
  // https://sit-operation.allcitygo.com/
  // 开发 http://10.0.0.105:8092/   http://10.0.0.105:8888/
  // 测试 http://sit-zctreal.allcitygo.com   http://sit-basic-ug.allcitygo.com/
  // 本地 http://10.0.1.137:8091/
  // 生产 http://ztmanage.allcitygo.com:8096/   http://ztmanage.allcitygo.com:8092/
  // sit测试 http://sit-zctreal.allcitygo.com/
  baseBannerURL:
    process.env.NODE_ENV === 'production'
      ? 'http://ztmanage.allcitygo.com:8092/'
      : process.env.NODE_ENV === 'testing'
        ? 'http://sit-basic-ug.allcitygo.com/'
        : 'http://sit-basic-ug.allcitygo.com/',
  CITY_MAP_CENTER: [107.237703, 34.362923],
  CITY_ID: '610300',
  CITY_NAME: '宝鸡市'
}
