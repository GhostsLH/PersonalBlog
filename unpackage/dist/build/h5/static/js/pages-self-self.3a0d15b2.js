(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-self-self"],{"0664":function(t,e,n){"use strict";var i=n("b5c9"),a=n.n(i);a.a},"1bc3":function(t,e,n){t.exports=n.p+"static/img/logo.fb0da7e3.jpeg"},"9dd8":function(t,e,n){"use strict";n.r(e);var i=n("bdf0"),a=n("e674");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("0664");var r=n("f0c5"),s=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"0b42cb92",null,!1,i["a"],void 0);e["default"]=s.exports},a86e:function(t,e,n){"use strict";(function(t){n("7a82");var i=n("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("5530")),o=i(n("c7eb")),r=i(n("1da1")),s={onLoad:function(){},data:function(){return{title:"我的",haveNewVersion:!0,currentVersion:"1.0.0"}},methods:{siginOut:function(){this.$store.commit("updateUserInfo",null),uni.navigateTo({url:"/pages/index/index"})},goLogoPage:function(){uni.navigateTo({url:"/pages/userInfo/login/login"})},_checkVersion:function(){var t=this;return(0,r.default)((0,o.default)().mark((function e(){var n,i,a;return(0,o.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get_current_version();case 2:n=e.sent,i=n.version,a=n.downLoadLinkUrl,i>t.currentVersion&&(t.haveNewVersion=!0,t.downLoadLinkUrl=a);case 6:case"end":return e.stop()}}),e)})))()},_getNewVersion:function(){uni.showLoading({title:"下载中，请稍后"});var t=plus.downloader.createDownload(this.downLoadLinkUrl,{},(function(t,e){uni.hideLoading({}),200==e?plus.runtime.install(plus.io.convertLocalFileSystemURL(t.filename),{},{},(function(t){uni.showToast({title:"安装失败",duration:1500,icon:"none"})})):uni.showToast({title:"更新失败",duration:1500,icon:"none"})}));t.start()},goMyArticlepage:function(){uni.navigateTo({url:"/pages/myArticle/myArticle"})},goFeedbackPage:function(){uni.navigateTo({url:"/pages/feedback/feedback"})},changeAvatar:function(){var t=this;uni.chooseImage({count:1,success:function(){var e=(0,r.default)((0,o.default)().mark((function e(n){var i;return(0,o.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t._uploadFile(n.tempFilePaths[0],n.tempFiles[0].name);case 2:return i=e.sent,e.next=5,t._updateUserAvatar(i);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()})},_uploadFile:function(e,n){return(0,r.default)((0,o.default)().mark((function i(){var a,r;return(0,o.default)().wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,t.uploadFile({filePath:e,cloudPath:n});case 2:return a=i.sent,r=a.fileID,i.abrupt("return",r);case 5:case"end":return i.stop()}}),i)})))()},_updateUserAvatar:function(t){var e=this;return(0,r.default)((0,o.default)().mark((function n(){var i,r;return(0,o.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$http.update_user_avatar({userId:e.userInfo._id,filePath:t});case 2:i=n.sent,r=i.msg,uni.showToast({title:r,icon:"none"}),e.updateUserInfo((0,a.default)((0,a.default)({},e.userInfo),{},{avatar:t}));case 6:case"end":return n.stop()}}),n)})))()}}};e.default=s}).call(this,n("a9ff")["default"])},b5c9:function(t,e,n){var i=n("ec53");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("f7a4932a",i,!0,{sourceMap:!1,shadowMode:!1})},bdf0:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={uniIcons:n("b8ec").default},a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[t.userInfo?i("v-uni-view",{staticClass:"my-header"},[i("v-uni-view",{staticClass:"my-header-background"},[i("v-uni-image",{attrs:{src:t.userInfo.avatar,mode:"aspectFill"}})],1),i("v-uni-view",{staticClass:"my-header-logo"},[i("v-uni-view",{staticClass:"my-header-logo-box",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeAvatar.apply(void 0,arguments)}}},[i("v-uni-image",{attrs:{src:t.userInfo.avatar,mode:"aspectFill"}})],1),i("v-uni-text",{staticClass:"user-name"},[t._v(t._s(t.userInfo.author_name))])],1),i("v-uni-view",{staticClass:"my-header-info"},[i("v-uni-view",{staticClass:"my-header-info-box"},[i("v-uni-text",{staticClass:"my-header-info-title"},[t._v("被关注")]),i("v-uni-text",[t._v(t._s(t.userInfo.follow_count))])],1),i("v-uni-view",{staticClass:"my-header-info-box"},[i("v-uni-text",{staticClass:"my-header-info-title"},[t._v("粉丝")]),i("v-uni-text",[t._v(t._s(t.userInfo.fans_count))])],1),i("v-uni-view",{staticClass:"my-header-info-box"},[i("v-uni-text",{staticClass:"my-header-info-title"},[t._v("积分")]),i("v-uni-text",[t._v(t._s(t.userInfo.integral_count||0))])],1)],1)],1):t._e(),i("v-uni-view",{staticClass:"my-content"},[t.userInfo?t._e():i("v-uni-view",{staticClass:"my-content-list",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goLogoPage.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"my-content-list-title"},[i("v-uni-image",{staticClass:"company-logo",attrs:{src:n("1bc3"),mode:"aspectFill"}}),i("v-uni-text",[t._v("HI,您尚未登陆，请点击登录")])],1),i("uni-icons",{attrs:{type:"arrowright",size:"14",color:"#666"}})],1),i("v-uni-view",{staticClass:"my-content-list",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goMyArticlepage.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"my-content-list-title"},[i("uni-icons",{staticClass:"icons",attrs:{type:"contact",size:"16",color:"#666"}}),i("v-uni-text",[t._v("我的文章")])],1),i("uni-icons",{attrs:{type:"arrowright",size:"14",color:"#666"}})],1),i("v-uni-view",{staticClass:"my-content-list",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goFeedbackPage.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"my-content-list-title"},[i("uni-icons",{staticClass:"icons",attrs:{type:"help",size:"16",color:"#666"}}),i("v-uni-text",[t._v("意见反馈")])],1),i("uni-icons",{attrs:{type:"arrowright",size:"14",color:"#666"}})],1),t.userInfo?i("v-uni-button",{staticClass:"sigin-out",attrs:{type:"warn"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.siginOut.apply(void 0,arguments)}}},[t._v("退出")]):t._e()],1)],1)},o=[]},e674:function(t,e,n){"use strict";n.r(e);var i=n("a86e"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},ec53:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/*全局系统样式定义*/uni-page-body[data-v-0b42cb92]{background-color:#f5f5f5}body.?%PAGE?%[data-v-0b42cb92]{background-color:#f5f5f5}.my-header[data-v-0b42cb92]{position:relative;padding-bottom:%?30?%}.my-header .my-header-background[data-v-0b42cb92]{position:absolute;top:0;right:0;left:0;bottom:0;opacity:.3;-webkit-filter:blur(%?16?%);filter:blur(%?16?%)}.my-header .my-header-background uni-image[data-v-0b42cb92]{width:100%;height:100%}.my-header .my-header-logo[data-v-0b42cb92]{display:flex;align-items:center;justify-content:flex-start;flex-wrap:nowrap;flex-direction:column;align-items:center;padding-top:%?60?%;position:relative;z-index:10}.my-header .my-header-logo .my-header-logo-box[data-v-0b42cb92]{width:%?120?%;height:%?120?%;border-radius:50%;overflow:hidden}.my-header .my-header-logo .my-header-logo-box uni-image[data-v-0b42cb92]{width:100%;height:100%}.my-header .my-header-logo .user-name[data-v-0b42cb92]{margin-top:%?30?%;font-size:%?32?%;font-weight:700}.my-header .my-header-info[data-v-0b42cb92]{margin-top:%?30?%;display:flex;align-items:center;justify-content:space-between;flex-wrap:nowrap;flex-direction:row}.my-header .my-header-info .my-header-info-box[data-v-0b42cb92]{width:100%;display:flex;align-items:center;justify-content:space-between;flex-wrap:nowrap;flex-direction:column;font-size:%?24?%;color:#999}.my-header .my-header-info .my-header-info-box .my-header-info-title[data-v-0b42cb92]{font-size:%?28?%;color:#333}.my-content .my-content-list[data-v-0b42cb92]{display:flex;align-items:center;justify-content:space-between;flex-wrap:nowrap;flex-direction:row;padding:%?30?%;margin-bottom:%?20?%;background-color:#fff;color:#333;font-size:%?28?%}.my-content .my-content-list .my-content-list-title[data-v-0b42cb92]{display:flex;align-items:center;flex-grow:1}.my-content .my-content-list .my-content-list-title .icons[data-v-0b42cb92]{margin-right:%?10?%}.my-content .my-content-list .my-content-list-title .version-container[data-v-0b42cb92]{display:flex;align-items:center;justify-content:space-between;flex-wrap:nowrap;flex-direction:row;flex-grow:1}.my-content .my-content-list .my-content-list-title .version-container .version[data-v-0b42cb92]{margin-right:%?40?%;color:#888;font-weight:700}.my-content .my-content-list .my-content-list-title .version-container .new-version-tip[data-v-0b42cb92]{font-size:%?20?%;color:#f25037}.my-content .sigin-out[data-v-0b42cb92]{margin:%?120?% %?20?% 0}.my-content .company-logo[data-v-0b42cb92]{width:%?100?%;height:%?100?%;border-radius:50%;margin-right:%?40?%}',""]),t.exports=e}}]);