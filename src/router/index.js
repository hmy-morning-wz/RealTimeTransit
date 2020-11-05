const searchLine = r => require(['../views/searchLine'], r)
const searchLineDetails = r => require(['../views/searchLineDetails'], r)
const lineDetails = r => require(['../views/lineDetails'], r)
const lineLists = r => require(['../views/lineLists'], r)
const transfer = r => require(['../views/transfer'], r)
const search = r => require(['../views/search'], r)
const manageRoute = r => require(['../views/manageRoute'], r)
const routeDetial = r => require(['../views/routeDetial'], r)

// 页面路由
const routes = [{
  path: '',
  redirect: {
    name: 'searchLine'
  }
}, {
  path: '/routeDetial',
  component: routeDetial,
  name: 'routeDetial',
  meta: {
    title: '换乘详情',
    trackName: '换乘详情'
  }
}, {
  path: '/manageRoute',
  component: manageRoute,
  name: 'manageRoute',
  meta: {
    title: '线路规划'
  }
}, {
  path: '/search',
  component: search,
  name: 'search',
  meta: {
    title: '查询'
  }
}, {
  path: '/transfer',
  component: transfer,
  name: 'transfer',
  meta: {
    title: '换乘查询'
  }
}, {
  path: '/searchLine',
  component: searchLine,
  name: 'searchLine',
  meta: {
    title: '附近站点',
    trackName: '附近站点'
  }
}, {
  path: '/searchLineDetails',
  component: searchLineDetails,
  name: 'searchLineDetails'
}, {
  path: '/lineDetails',
  component: lineDetails,
  name: 'lineDetails'
}, {
  path: '/lineLists',
  component: lineLists,
  name: 'lineLists',
  meta: {
    title: '附近站点'
  }
}]

// 404 页
// routes.push({
//   path: '*',
//   component: error,
//   name: 'error',
//   meta: {
//     title: '众城通'
//   }
// })

export default routes
