webpackJsonp([5],{"8iIu":function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=s("Xxa5"),n=s.n(e),a=s("exGp"),l=s.n(a),o=s("X2Oc"),c=s("bzuE"),r={components:{Banner:s("YV7O").a},data:function(){var t=this.$parent.store.get("location")||{},i=t.latitude||c.a.CITY_MAP_CENTER[1],s=t.longitude||c.a.CITY_MAP_CENTER[0];return{progressWidth:10,footerHeight:"10 rem",cityCode:c.a.CITY_ID,latitude:i,longitude:s,lineLists:{},timer:null,flags:!0,timerID:null,direction:null,stationName:null,pageCode:"610300003",banderUrl:c.a.baseBannerURL+"tcapp/ads/classify"}},methods:{handleClick:function(t){var i=this;if(this.flags){var s=this.lineLists.direction||0;this.stationName=t,this.getLineDetails2(s,t)}this.flags=!1,this.timerID=setTimeout(function(){i.flags=!0},1e3)},changeDrection:function(){var t=this.lineLists.direction;t=0===t?1:0,this.direction=t,this.getLineDetails2(t,this.stationName||"")},setTitle:function(){var t=this.$route.query.lineName||Object(o.urlQueryString)("lineName");t&&window.yl.call("setTitleBarText",{title:t+"详情"},{onSuccess:function(t){},onFail:function(t){}})},getLineDetails:function(){var t=this;return l()(n.a.mark(function i(){var s,e;return n.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return window.yl.call("showLoading",{content:"加载中…",duration:15e3},{onSuccess:function(t){},onFail:function(t){}}),i.next=3,t.$parent.request({url:"line/detail_by_line_id?lng="+t.longitude+"&lat="+t.latitude+"&line_id="+t.$route.query.lineId+"&direction="+(t.direction||0)+"&city_code="+t.cityCode+"&station_name="+(t.stationName||"")});case 3:(s=i.sent)&&(e=0,s.station.forEach(function(t){t.flag&&(e=1),t.after=e}),t.lineLists=s,t.stationName=t.stationName||t.lineLists.station_name),t.$nextTick(function(){t.lineLists&&t.lineLists.station&&(t.progressWidth=90*(t.lineLists.station.length-1)/75+10*t.lineLists.station.length/75,t.$nextTick(function(){t.footerHeight=70+t.$refs.stationLists.offsetHeight+"px"}))}),window.yl.call("hideLoading");case 7:case"end":return i.stop()}},i,t)}))()},getLineDetails2:function(t,i){var s=this;return l()(n.a.mark(function e(){var a,l;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return window.yl.call("showLoading",{content:"加载中…",duration:15e3},{onSuccess:function(t){},onFail:function(t){}}),e.next=3,s.$parent.request({url:"line/detail_by_line_id?lng=107.13&lat=34.37&line_id="+s.$route.query.lineId+"&direction="+t+"&city_code="+s.cityCode+"&station_name="+i});case 3:if(!(a=e.sent)||!a.success){e.next=13;break}l=0,a.station.forEach(function(t){t.flag&&(l=1),t.after=l}),s.lineLists=a,s.stationName=s.stationName||s.lineLists.station_name,e.next=17;break;case 13:if(!s.stationName||"20"!==a.code){e.next=17;break}return s.stationName=null,s.getLineDetails(),e.abrupt("return");case 17:s.$nextTick(function(){s.lineLists.station&&(s.progressWidth=90*(s.lineLists.station.length-1)/75+10*s.lineLists.station.length/75,s.footerHeight=70+s.$refs.stationLists.offsetHeight+"px")}),window.yl.call("hideLoading");case 20:case"end":return e.stop()}},e,s)}))()}},created:function(){this.setTitle();var t=this;this.direction=this.$route.query.direction,this.stationName=this.$route.query.stationName,window.yl.call("getLocation",{},{onSuccess:function(i){i.param&&(t.latitude=i.param.latitude,t.longitude=i.param.longitude)},onFail:function(t){alert("获取地理位置失败")}}),this.getLineDetails()},mounted:function(){var t=this;window.yl.call("setTitleBarRightButton",{rightButtonShow:!0,rightButtonTextOpen:!0,rightButtonText:"刷新"},{onSuccess:function(i){t.getLineDetails()},onFail:function(t){alert("fail")}}),this.timer=setInterval(function(){t.getLineDetails()},3e4)},destroyed:function(){clearInterval(this.timer),clearTimeout(this.timerID)}},d={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"line-container"},[t.lineLists.line?s("div",{staticClass:"head"},[s("div",{staticClass:"rode-from-to"},[s("div",{staticClass:"from"},[t._v(t._s(t.lineLists.line.station_start))]),t._v(" "),s("span",{staticClass:"icon"}),t._v(" "),s("div",{staticClass:"to"},[t._v(t._s(t.lineLists.line.station_end))])]),t._v(" "),s("div",{staticClass:"times"},[s("div",{staticClass:"begin"},[s("span",{staticClass:"icon"}),t._v(" "),s("span",{staticClass:"text"},[t._v(t._s(t.lineLists.line.first_time))])]),t._v(" "),s("div",{staticClass:"finish"},[s("span",{staticClass:"icon"}),t._v(" "),s("span",{staticClass:"text"},[t._v(t._s(t.lineLists.line.last_time))])]),t._v(" "),s("div",{staticClass:"money"},[t._v("票价:"+t._s(t.lineLists.line.price_detail||"无"))])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:"double"===t.lineLists.line.line_type,expression:"lineLists.line.line_type === 'double'"}],staticClass:"right",attrs:{seed:"changeDrection"},on:{click:function(i){t.changeDrection()}}},[s("div",{staticClass:"icon"}),t._v(" "),s("div",{staticClass:"text"},[t._v("换向")])])]):t._e(),t._v(" "),t.lineLists.line?s("div",{staticClass:"content"},[s("div",{staticClass:"con"},["首站未发车"===t.lineLists.station_amount?s("div",{staticClass:"no-station"},[t._v("首站暂未发车")]):s("div",{staticClass:"station"},[s("div",{staticClass:"left"},[s("div",{staticClass:"top"},[t._v(t._s(t.lineLists.station_amount))]),t._v(" "),s("div",{staticClass:"next"},[t._v(t._s(t.lineLists.distance))])]),t._v(" "),s("div",{staticClass:"mid"},[t._v("到达")]),t._v(" "),s("div",{staticClass:"right"},[t._v(t._s(t.lineLists.station_name))])])])]):t._e(),t._v(" "),t.lineLists.station?s("div",{staticClass:"footer",style:{height:t.footerHeight}},[s("div",{staticClass:"progress-wrapper"},[s("div",{staticClass:"progress",style:{width:t.progressWidth+"rem"}},[s("div",{staticClass:"progress-lines"},t._l(t.lineLists.station,function(t,i){return s("div",{key:i,staticClass:"progress-line",class:"progress-line"+t.after})}),0),t._v(" "),s("div",{staticClass:"positions"},t._l(t.lineLists.station,function(t,i){return s("div",{key:i,staticClass:"position",class:"position"+t.flag})}),0),t._v(" "),s("div",{staticClass:"cars"},t._l(t.lineLists.station,function(t,i){return s("div",{key:i,staticClass:"car",class:"car-"+t.car_out+t.car_out_pass})}),0),t._v(" "),s("div",{staticClass:"cars-in"},t._l(t.lineLists.station,function(t,i){return s("div",{key:i,staticClass:"car",class:"car-"+t.car_in+t.car_in_pass})}),0),t._v(" "),s("div",{staticClass:"dots"},t._l(t.lineLists.station,function(t,i){return s("div",{key:i,staticClass:"dot",class:"dot"+t.flag})}),0),t._v(" "),s("div",{staticClass:"arrows"},t._l(t.lineLists.station,function(t,i){return s("div",{key:i,staticClass:"arrow"})}),0),t._v(" "),s("div",{ref:"stationLists",staticClass:"station-lists",attrs:{id:"station-lists"}},t._l(t.lineLists.station,function(i,e){return s("div",{key:e,staticClass:"station-list",class:"station-list"+i.flag,attrs:{seed:"stationClick"},on:{click:function(s){t.flags&&t.handleClick(i.name)}}},[t._v(t._s(i.name))])}),0)])])]):s("div",{staticClass:"no-data"},[t._v("暂无数据")]),t._v(" "),s("banner",{staticClass:"my-banner",attrs:{"page-code":t.pageCode,"city-code":t.cityCode,url:t.banderUrl,size:10}})],1)},staticRenderFns:[]};var u=s("VU/8")(r,d,!1,function(t){s("G0SI")},"data-v-6122b3fc",null);i.default=u.exports},G0SI:function(t,i){}});
//# sourceMappingURL=5.fa316d4f2d3118e55b81.js.map