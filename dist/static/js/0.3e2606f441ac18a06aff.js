webpackJsonp([0],{Dd8w:function(t,e,n){"use strict";e.__esModule=!0;var a,r=n("woOf"),i=(a=r)&&a.__esModule?a:{default:a};e.default=i.default||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t}},YV7O:function(t,e,n){"use strict";var a=n("Xxa5"),r=n.n(a),i=n("exGp"),o=n.n(i),s=n("mtWM"),c=n.n(s),u={name:"banner",props:{url:{type:String,default:"/tcapp/ads/classify"},cityCode:{type:String,default:"610300"},appPosition:{type:String,default:"9"},pageCode:{type:String,default:"610300001"},size:{type:Number,default:1},position:{type:String,default:"3"}},data:function(){return{list:[]}},mounted:function(){this.fetch()},methods:{handleGo:function(t){t&&(window.location.href=t)},fetch:function(){var t=this;return o()(r.a.mark(function e(){var n,a,i,o,s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.url+"?city_code="+t.cityCode+"&app_position="+t.appPosition+"&page_code="+t.pageCode,e.prev=1,e.next=4,c()({method:"get",url:n});case 4:a=e.sent,i=t.position,a&&200===a.status&&"0"===a.data.code&&(o=a.data.data,s=[],o&&o.length&&(o.forEach(function(t){t.curr_position===i&&s.push(t)}),o=o.length>t.size?s.slice(0,t.size):s,t.list=o)),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1);case 13:case"end":return e.stop()}},e,t,[[1,10]])}))()}}},l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"show",rawName:"v-show",value:t.list&&t.list.length,expression:"list && list.length"}],staticClass:"banner-box"},t._l(t.list,function(e,a){return n("img",{key:a,staticClass:"banner-img",attrs:{src:e.pic_url,seed:e.name,"data-expo":e.name},on:{click:function(n){t.handleGo(e.redi_url)}}})}),0)},staticRenderFns:[]};var d=n("VU/8")(u,l,!1,function(t){n("oxw3")},"data-v-386d0384",null);e.a=d.exports},oxw3:function(t,e){}});
//# sourceMappingURL=0.3e2606f441ac18a06aff.js.map