(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0e67":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(n("a34a")),a=i(n("e3b2")),o=n("1fbd");function i(t){return t&&t.__esModule?t:{default:t}}function u(t){return d(t)||f(t)||s(t)||c()}function c(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t,e){if(t){if("string"===typeof t)return l(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(t,e):void 0}}function f(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function d(t){if(Array.isArray(t))return l(t)}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function h(t,e,n,r,a,o,i){try{var u=t[o](i),c=u.value}catch(s){return void n(s)}u.done?e(c):Promise.resolve(c).then(r,a)}function v(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function i(t){h(o,r,a,i,u,"next",t)}function u(t){h(o,r,a,i,u,"throw",t)}i(void 0)}))}}var m=function(){n.e("pages/index/card-box").then(function(){return resolve(n("3bab"))}.bind(null,n)).catch(n.oe)},p={mixins:[a.default],components:{cardBox:m},data:function(){return{}},onLoad:function(){},mounted:function(){return v(r.default.mark((function t(){return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},methods:{tapLove:function(){0!=this.dataList.length&&(this.moveX=10,this.moveY=1,this._del())},tapLoathe:function(){0!=this.dataList.length&&(this.moveX=-10,this.moveY=1,this._del())},init:function(){this.number=3,this.translate={x:0,y:8},this.scale={x:.95,y:1},this.type=!0,this.moveRotate={x:0,y:t.getSystemInfoSync().screenHeight}},getData:function(){var t=this;return v(r.default.mark((function e(){var n,a,i;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,o.get)();case 2:return n=e.sent,a=n.data,console.log(a),i=new Promise((function(e,n){for(var r=[],o=0;o<a.length;o++)r.push({id:a[o].id,src:a[o].posterImgUrl,sex:Math.round(Math.random()),address:a[o].author,name:a[o].name,constellation:a[o].tag,number:10,old:18});t.dataList=[].concat(u(t.dataList),r),e()})),e.abrupt("return",i);case 7:case"end":return e.stop()}}),e)})))()},moveJudge:function(t,e,n){var r=this.$refs.cardBox[0];t>20?r.moveRight(n):t<-20?r.moveLeft(n):r.moveCenter()},endJudge:function(t,e){var n=this.$refs.cardBox[0];Math.abs(t)<40?(this._back(),n._back()):(this._del(),n.clearAnimation())},delCard:function(t,e){t>0?console.log(this.dataList[0],"喜欢"):console.log(this.dataList[0],"不喜欢")},tapCard:function(e){t.navigateTo({url:"/pages/index/update?index="+e.id})},changeTopNav:function(t){this.topNavIndex=t.currentTarget.dataset.index}}};e.default=p}).call(this,n("543d")["default"])},"176d":function(t,e,n){},"1f16":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var a=function(){var t=this,e=t.$createElement;t._self._c},o=[]},2704:function(t,e,n){"use strict";(function(t){n("3af0");r(n("66fd"));var e=r(n("d825"));function r(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},"7ef0":function(t,e,n){"use strict";n.r(e);var r=n("0e67"),a=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=a.a},c2ec:function(t,e,n){"use strict";var r=n("176d"),a=n.n(r);a.a},d825:function(t,e,n){"use strict";n.r(e);var r=n("1f16"),a=n("7ef0");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("c2ec");var i,u=n("f0c5"),c=Object(u["a"])(a["default"],r["b"],r["c"],!1,null,"27bdb67e",null,!1,r["a"],i);e["default"]=c.exports}},[["2704","common/runtime","common/vendor"]]]);