// 获取路径上的参数
export function urlQueryString (name) {
  var rex = new RegExp('[?&]s*' + name + 's*=([^&$#]*)', 'i')
  var r = rex.exec(location.search)
  if (r && r.length === 2) {
    return decodeURIComponent(r[1])
  }
}

export function hideLoading () {
  window.yl.call('hideLoading')
}
// 菊花
export function showLoading (opt) {
  opt = Object.assign({
    title: '加载中...',
    duration: 3000
  }, opt)

  window.yl.call('showLoading', {
    content: opt.title,
    duration: opt.duration
  }, {
    onSuccess: function (a) {
      console.log('success')
    }
  })
}
