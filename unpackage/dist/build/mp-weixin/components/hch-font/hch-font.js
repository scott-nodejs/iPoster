(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/hch-font/hch-font"],{3536:function(t,n,o){"use strict";o.d(n,"b",(function(){return i})),o.d(n,"c",(function(){return h})),o.d(n,"a",(function(){return e}));var e={hchColor:function(){return o.e("components/hch-color/hch-color").then(o.bind(null,"8c15"))}},i=function(){var t=this,n=t.$createElement;t._self._c;t._isMounted||(t.e0=function(n){t.colorShow=!0},t.e1=function(n){t.font.textAlign="left"},t.e2=function(n){t.font.textAlign="center"},t.e3=function(n){t.font.textAlign="right"},t.e4=function(n){t.colorShow=!1})},h=[]},"4fea":function(t,n,o){"use strict";o.r(n);var e=o("3536"),i=o("f18e");for(var h in i)"default"!==h&&function(t){o.d(n,t,(function(){return i[t]}))}(h);o("dbcf");var c,f=o("f0c5"),r=Object(f["a"])(i["default"],e["b"],e["c"],!1,null,"a6670bec",null,!1,e["a"],c);n["default"]=r.exports},"9c74":function(t,n,o){},dbcf:function(t,n,o){"use strict";var e=o("9c74"),i=o.n(e);i.a},ea99:function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=function(){o.e("components/hch-color/hch-color").then(function(){return resolve(o("8c15"))}.bind(null,o)).catch(o.oe)},i={name:"HchFont",props:{isShow:{type:Boolean,default:!1},fontData:{type:Object,default:function(){return{}}}},components:{HchColor:e},computed:{setFont:function(){return console.log("setFont -> this.fontData",this.fontData),this.fontData}},watch:{setFont:{handler:function(t){console.log("handler -> val",t),this.font=Object.assign({text:"",color:"#fff",fontWeight:"normal",fontSize:"18",textDecoration:"",textAlign:"left"},t),console.log(this.font),this.fontWeight="bold"==this.font.fontWeight,this.lineThrough="line-through"===this.font.textDecoration,this.underline="underline"===this.font.textDecoration},deep:!0,immediate:!0}},data:function(){return{colorShow:!1,underline:!1,lineThrough:!1,fontWeight:!1,font:{},show:!1}},methods:{handleCancel:function(){this.isShow=!1},handleConfirm:function(){this.$emit("confirm",this.font)},handleColorConfirm:function(t){this.font.color=t,this.colorShow=!1},handleFontSize:function(n){"add"===n?this.font.fontSize++:this.font.fontSize>10?this.font.fontSize--:t.showToast({title:"字体不能再小了哦",duration:2e3,icon:"none"})},handleFontWeight:function(){this.fontWeight=!this.fontWeight,this.font.fontWeight=this.fontWeight?"bold":"normal"},handleLineThrough:function(){this.lineThrough=!this.lineThrough,this.font.textDecoration=this.lineThrough?"line-through":this.underline?"underline":""},handleUnderline:function(){this.underline=!this.underline,this.font.textDecoration=this.lineThrough?"line-through":this.underline?"underline":""}}};n.default=i}).call(this,o("543d")["default"])},f18e:function(t,n,o){"use strict";o.r(n);var e=o("ea99"),i=o.n(e);for(var h in e)"default"!==h&&function(t){o.d(n,t,(function(){return e[t]}))}(h);n["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/hch-font/hch-font-create-component',
    {
        'components/hch-font/hch-font-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("4fea"))
        })
    },
    [['components/hch-font/hch-font-create-component']]
]);
