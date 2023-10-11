(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/CommentBox/CommentBox"],{3187:function(n,t,e){"use strict";var o=e("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=o(e("3803")),a={name:"CommentBox",comments:{CommentBox:u.default},props:{commentData:Object,isReply:{type:Boolean,default:!1}},data:function(){return{}},methods:{commentReply:function(n){n.isReply&&(n.comment.reply_id=n.comment.comment_id,n.comment.comment_id=this.commentData.comment_id),console.log(n),this.$emit("commentReply",n)}}};t.default=a},3803:function(n,t,e){"use strict";e.r(t);var o=e("5b77"),u=e("4a66");for(var a in u)["default"].indexOf(a)<0&&function(n){e.d(t,n,(function(){return u[n]}))}(a);e("78d5");var i=e("f0c5"),r=Object(i["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);t["default"]=r.exports},"4a66":function(n,t,e){"use strict";e.r(t);var o=e("3187"),u=e.n(o);for(var a in o)["default"].indexOf(a)<0&&function(n){e.d(t,n,(function(){return o[n]}))}(a);t["default"]=u.a},"5b77":function(n,t,e){"use strict";e.d(t,"b",(function(){return u})),e.d(t,"c",(function(){return a})),e.d(t,"a",(function(){return o}));var o={uniDateformat:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat")]).then(e.bind(null,"d51f"))},CommentBox:function(){return Promise.resolve().then(e.bind(null,"3803"))}},u=function(){var n=this.$createElement;this._self._c},a=[]},"78d5":function(n,t,e){"use strict";var o=e("adb5"),u=e.n(o);u.a},adb5:function(n,t,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/CommentBox/CommentBox-create-component',
    {
        'components/CommentBox/CommentBox-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3803"))
        })
    },
    [['components/CommentBox/CommentBox-create-component']]
]);
