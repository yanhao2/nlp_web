(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7efff55b"],{"04e1":function(t,e,a){"use strict";var n=a("7afa");function o(t){this.message=t}o.prototype=new Error,o.prototype.name="InvalidTokenError",t.exports=function(t,e){if("string"!==typeof t)throw new o("Invalid token specified");e=e||{};var a=!0===e.header?0:1;try{return JSON.parse(n(t.split(".")[a]))}catch(r){throw new o("Invalid token specified: "+r.message)}},t.exports.InvalidTokenError=o},"31ab":function(t,e,a){},3275:function(t,e,a){"use strict";var n=a("31ab"),o=a.n(n);o.a},"557e":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"headersCon"},[a("div",{staticClass:"headers"},[a("div",{staticClass:"wrapper rows"},[a("div",{staticClass:"cols"},[a("div",{staticClass:"rows",staticStyle:{"align-items":"center"}},[a("div",{staticClass:"Headers_title"},[t._v("新联中文语义演示平台")]),t._l(t.navList,(function(e,n){return a("div",{directives:[{name:"show",rawName:"v-show",value:e.isShow,expression:"item.isShow"}],key:n,staticClass:"navItem",class:t.activeName==e.path?"active":"",on:{click:function(a){return t.onSelectClick(e)}}},[t._v(t._s(e.name))])}))],2)]),a("Dropdown",{on:{"on-click":t.onLoGout}},[a("a",{staticStyle:{height:"80px","line-height":"80px"},attrs:{href:"javascript:void(0)"}},[a("Icon",{staticStyle:{color:"#12D4C9","font-weight":"bold","font-size":"20px","margin-right":"5px"},attrs:{type:"md-person"}}),a("span",{staticStyle:{color:"#fff","font-weight":"bold","font-size":"16px"}},[t._v(t._s(t.userName))]),a("Icon",{staticStyle:{"margin-left":"5px",color:"#fff"},attrs:{type:"ios-arrow-down"}})],1),a("DropdownMenu",{attrs:{slot:"list"},slot:"list"},[a("DropdownItem",{attrs:{name:"logout"}},[t._v("退出")])],1)],1)],1)]),a("div",{staticStyle:{height:"calc(100% - 80px)"}},[a("router-view")],1)])},o=[],r=(a("b0c0"),a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),a("04e1")),i=a.n(r),s=a("a78e"),c=a.n(s),l=(a("68ad"),a("4ec3"),a("a18c")),u={name:"Headers",data:function(){return{theme1:"light",activeName:"/partsAnalysis",userName:"",navList:[]}},computed:{routerUrl:function(){return this.$route.path}},methods:{onLoGout:function(t){var e=c.a.get("refreshToken"),a=new URLSearchParams;a.append("client_id",this.$store.state.clientId),a.append("grant_type","refresh_token"),a.append("refresh_token",e),"logout"==t&&(this.$axios.post("http://u.xlmediawatch.com/auth/realms/xlplatform/protocol/openid-connect/logout",a,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(t){})).catch((function(t){})),c.a.remove("token"),c.a.remove("routerUrl"),c.a.remove("refreshToken"),l["a"].push({path:"/login"}))},onSelectClick:function(t,e){this.activeName=t.path,localStorage.setItem("routerUrl",this.activeName),this.$router.push({path:t.path})},LoadData:function(){var t=c.a.get("token");if(t){var e=i()(t);console.log(e);var a=!1;e.resource_access.nlp_web&&(a="develop"==e.resource_access.nlp_web.roles[0]);var n=[{name:"NLP文本分析",path:"/partsAnalysis",isShow:!0},{name:"NLP文本分析测试",path:"/partsAnalysisTest",isShow:a},{name:"AI图像识别",path:"/aIRecognition",isShow:!0},{name:"自动清洗",path:"/cleaning",isShow:!0}];this.navList=n,this.userName=e.name,c.a.get("routerUrl")?this.activeName=c.a.get("routerUrl"):c.a.set("routerUrl",this.activeName)}else this.$router.push({path:"/partsAnalysis"})}},created:function(){this.LoadData()},mounted:function(){},updated:function(){}},d=u,h=(a("3275"),a("2877")),p=Object(h["a"])(d,n,o,!1,null,null,null);e["default"]=p.exports},"7afa":function(t,e,a){var n=a("9b81");function o(t){return decodeURIComponent(n(t).replace(/(.)/g,(function(t,e){var a=e.charCodeAt(0).toString(16).toUpperCase();return a.length<2&&(a="0"+a),"%"+a})))}t.exports=function(t){var e=t.replace(/-/g,"+").replace(/_/g,"/");switch(e.length%4){case 0:break;case 2:e+="==";break;case 3:e+="=";break;default:throw"Illegal base64url string!"}try{return o(e)}catch(a){return n(e)}}},"7d46":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"Layout"},[a("div",{staticClass:"sorcoll"},[a("div",{staticClass:"wrapper"},[a("div",{staticClass:"nav"},[a("el-tabs",{on:{"tab-click":t.tabClick},model:{value:t.tabSName,callback:function(e){t.tabSName=e},expression:"tabSName"}},t._l(t.navList,(function(e,n){return a("el-tab-pane",{key:n,attrs:{name:e.value}},[a("span",{attrs:{slot:"label"},slot:"label"},[a("i",{domProps:{innerHTML:t._s(e.icon)}}),t._v(" "+t._s(e.name)+" ")]),e.value===t.routers?a("div",{directives:[{name:"show",rawName:"v-show",value:t.formData.title||t.formData.content,expression:"formData.title|| formData.content"}],class:t.tabSName},[a("router-view",{ref:e.value,refInFor:!0,class:"item"+n,attrs:{formData:t.formData},on:{handleSubmitEvent:t.handleSubmit}})],1):t._e(),a("div",{staticStyle:{height:"50px"}})])})),1)],1)])])])},o=[],r=(a("96cf"),a("1da1")),i=a("4ec3"),s=a("557e"),c={name:"Layout",components:{Headers:s["default"]},data:function(){return{industry:"0",formData:{title:"",content:""},index:0,tabSName:"/index/objectLevelEmotion",navList:[{name:"对象层面情感",icon:'<span class="iconfont">&#xe7d4;</span>',value:"/index/objectLevelEmotion",data:"objectLevelEmotion"},{name:"实体识别",icon:'<span class="iconfont">&#xe61d;</span>',value:"/index/entityIdentification",data:"entityIdentification"},{name:"主题提取",icon:'<span class="iconfont">&#xe6c2;</span>',value:"/index/extractTheme",data:"extractTheme"},{name:"关键短语",icon:'<span class="iconfont">&#xe635;</span>',value:"/index/keyPhrase",data:"keyPhrase"}]}},computed:{routers:function(){return this.$route.path},query:function(){return this.$route.query}},methods:{tabClick:function(t){var e=this;this.$router.push({path:this.tabSName,query:{aid:this.query.aid,type:this.query.type}}),this.$nextTick((function(){e.$refs[e.tabSName][0].LoadData(e.formData)}))},AutomaticAccess:function(){this.LoadData()},LoadData:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){var e,a,n,o=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e=new FormData,e.append("aid",this.query.aid),e.append("type",this.query.type),t.next=6,i["a"].headersAidType(e);case 6:a=t.sent,200===a.code&&(n=a.data[0],this.formData.title=n.title,this.formData.content=n.content,this.$nextTick((function(){o.handleSubmit()}))),t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](0),console.log(t.t0);case 13:case"end":return t.stop()}}),t,this,[[0,10]])})));function e(){return t.apply(this,arguments)}return e}(),handleSubmit:function(){this.$refs[this.tabSName][0].LoadData(this.formData)}},created:function(){this.tabSName=this.routers,this.LoadData()},mounted:function(){},updated:function(){}},l=c,u=(a("9014"),a("2877")),d=Object(u["a"])(l,n,o,!1,null,null,null);e["default"]=d.exports},9014:function(t,e,a){"use strict";var n=a("eab0"),o=a.n(n);o.a},"9b81":function(t,e){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function n(t){this.message=t}function o(t){var e=String(t).replace(/=+$/,"");if(e.length%4==1)throw new n("'atob' failed: The string to be decoded is not correctly encoded.");for(var o,r,i=0,s=0,c="";r=e.charAt(s++);~r&&(o=i%4?64*o+r:r,i++%4)?c+=String.fromCharCode(255&o>>(-2*i&6)):0)r=a.indexOf(r);return c}n.prototype=new Error,n.prototype.name="InvalidCharacterError",t.exports="undefined"!==typeof window&&window.atob&&window.atob.bind(window)||o},b0c0:function(t,e,a){var n=a("83ab"),o=a("9bf2").f,r=Function.prototype,i=r.toString,s=/^\s*function ([^ (]*)/,c="name";!n||c in r||o(r,c,{configurable:!0,get:function(){try{return i.call(this).match(s)[1]}catch(t){return""}}})},eab0:function(t,e,a){}}]);