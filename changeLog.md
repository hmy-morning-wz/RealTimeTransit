# 说明
- 2018.12.13
npm run build.test 编译测试环境
npm run build 编译生产环境


- 2018.11.20

增加搜索组件

- 2018.11.7

添加vuex
增加宝鸡公交换乘查询
优化附近站点

- 添加bug监控工具 raven

```javascript
<script src="https://cdn.ravenjs.com/3.26.4/raven.min.js" crossorigin="anonymous"></script>
Raven.config('https://xxx@sentry.io/xxx').install()
```

- 2018 08 30

宝鸡实时公交 v1.0
包含文件searchLine --->lineLists || searchLineDetails--->lineDetails
功能说明：

1. searchLine

 附近站点
2. lineLists 首界面

附近站点
3. searchLineDetails
站点的线路列表
4. lineDetails
线路详情页面