(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"030b":function(t,e,n){},"3a47":function(t,e,n){"use strict";n.r(e);var o=n("daa2");for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);n("6ba1");var r,c,a,f,i=n("f0c5"),l=Object(i["a"])(o["default"],r,c,!1,null,null,null,!1,a,f);e["default"]=l.exports},"6ba1":function(t,e,n){"use strict";var o=n("030b"),u=n.n(o);u.a},"7c11":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=r(n("66fd")),u=r(n("7c7d"));function r(t){return t&&t.__esModule?t:{default:t}}var c={onLaunch:function(){t.getSystemInfo({success:function(e){o.default.prototype.StatusBar=e.statusBarHeight;var n=wx.getMenuButtonBoundingClientRect();o.default.prototype.Custom=n,o.default.prototype.CustomBar=n.bottom+n.top-e.statusBarHeight,o.default.prototype.phoneHeight=e.windowHeight,o.default.prototype.userInfo=t.getStorageSync("loginInfo")}}),t.setStorageSync("storage_key",null),this.getShowStatus()},onShow:function(){},onHide:function(){},methods:{getShowStatus:function(){u.default.get(u.default.url.SHOW_STATUS,null).then((function(t){o.default.prototype.canShow=t}))}}};e.default=c}).call(this,n("543d")["default"])},daa2:function(t,e,n){"use strict";n.r(e);var o=n("7c11"),u=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=u.a},f80f:function(t,e,n){"use strict";(function(t){n("d369"),n("921b");var e=u(n("66fd")),o=u(n("3a47"));function u(t){return t&&t.__esModule?t:{default:t}}function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var f=function(){n.e("pages/component/home/index").then(function(){return resolve(n("c985"))}.bind(null,n)).catch(n.oe)};e.default.component("home",f);var i=function(){n.e("pages/component/search/index").then(function(){return resolve(n("3f46"))}.bind(null,n)).catch(n.oe)};e.default.component("search",i);var l=function(){n.e("pages/component/mine/index").then(function(){return resolve(n("eb65"))}.bind(null,n)).catch(n.oe)};e.default.component("mine",l);var s=function(){n.e("colorui/components/cu-custom").then(function(){return resolve(n("949c"))}.bind(null,n)).catch(n.oe)};e.default.component("cu-custom",s),e.default.config.productionTip=!1,o.default.mpType="app";var d=new e.default(c({},o.default));t(d).$mount()}).call(this,n("543d")["createApp"])}},[["f80f","common/runtime","common/vendor"]]]);