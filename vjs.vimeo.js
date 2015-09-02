/**
 * @fileoverview Vimeo Media Controller - Wrapper for Vimeo Media API
 */
var VimeoState={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3}
videojs.Vimeo=videojs.MediaTechController.extend({init:function(e,t,o){if(videojs.MediaTechController.call(this,e,t,o),"undefined"!=typeof t.source)for(var i in t.source)e.options()[i]=t.source[i]
this.player_=e,this.player_el_=document.getElementById(this.player_.id()),this.player_.controls(!1),this.id_=this.player_.id()+"_vimeo_api",this.el_=videojs.Component.prototype.createEl("iframe",{id:this.id_,className:"vjs-tech",scrolling:"no",marginWidth:0,marginHeight:0,frameBorder:0}),this.el_.setAttribute("webkitAllowFullScreen",""),this.el_.setAttribute("mozallowfullscreen",""),this.el_.setAttribute("allowFullScreen",""),this.player_el_.insertBefore(this.el_,this.player_el_.firstChild)
var n="file:"===document.location.protocol?"http:":document.location.protocol
this.baseUrl=n+"//player.vimeo.com/video/",this.vimeo={},this.vimeoInfo={}
var r=this
this.el_.onload=function(){r.onLoad()},this.startMuted=e.options().muted,this.src(e.options().src)}}),videojs.Vimeo.prototype.dispose=function(){this.vimeo.removeEvent("ready"),this.vimeo.api("unload"),delete this.vimeo,this.el_.parentNode.removeChild(this.el_),videojs.MediaTechController.prototype.dispose.call(this)},videojs.Vimeo.prototype.src=function(e){this.isReady_=!1
var t=/^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/,o=e.match(t)
o&&(this.videoId=o[5])
var i={api:1,byline:0,portrait:0,show_title:0,show_byline:0,show_portait:0,fullscreen:1,player_id:this.id_,autoplay:this.player_.options().autoplay?1:0,loop:this.player_.options().loop?1:0,color:this.player_.options().color||""}
"#"===i.color.substring(0,1)&&(i.color=i.color.substring(1)),this.el_.src=this.baseUrl+this.videoId+"?"+videojs.Vimeo.makeQueryString(i)},videojs.Vimeo.prototype.load=function(){},videojs.Vimeo.prototype.play=function(){this.vimeo.api("play")},videojs.Vimeo.prototype.pause=function(){this.vimeo.api("pause")},videojs.Vimeo.prototype.paused=function(){return this.vimeoInfo.state!==VimeoState.PLAYING&&this.vimeoInfo.state!==VimeoState.BUFFERING},videojs.Vimeo.prototype.currentTime=function(){return this.vimeoInfo.time||0},videojs.Vimeo.prototype.setCurrentTime=function(e){this.vimeo.api("seekTo",e),this.player_.trigger("timeupdate")},videojs.Vimeo.prototype.duration=function(){return this.vimeoInfo.duration||0},videojs.Vimeo.prototype.buffered=function(){return videojs.createTimeRange(0,this.vimeoInfo.buffered*this.vimeoInfo.duration||0)},videojs.Vimeo.prototype.volume=function(){return this.vimeoInfo.muted?this.vimeoInfo.muteVolume:this.vimeoInfo.volume},videojs.Vimeo.prototype.setVolume=function(e){this.vimeo.api("setvolume",e),this.vimeoInfo.volume=e,this.player_.trigger("volumechange")},videojs.Vimeo.prototype.currentSrc=function(){return this.el_.src},videojs.Vimeo.prototype.muted=function(){return this.vimeoInfo.muted||!1},videojs.Vimeo.prototype.setMuted=function(e){e?(this.vimeoInfo.muteVolume=this.vimeoInfo.volume,this.setVolume(0)):this.setVolume(this.vimeoInfo.muteVolume),this.vimeoInfo.muted=e,this.player_.trigger("volumechange")},videojs.Vimeo.prototype.onReady=function(){this.isReady_=!0,this.triggerReady(),this.player_.trigger("loadedmetadata"),this.startMuted&&(this.setMuted(!0),this.startMuted=!1)},videojs.Vimeo.prototype.onLoad=function(){this.vimeo&&this.vimeo.api&&(this.vimeo.api("unload"),delete this.vimeo),this.vimeo=$f(this.el_),this.vimeoInfo={state:VimeoState.UNSTARTED,volume:1,muted:!1,muteVolume:1,time:0,duration:0,buffered:0,url:this.baseUrl+this.videoId,error:null}
var e=this
this.vimeo.addEvent("ready",function(t){e.onReady(),e.vimeo.addEvent("loadProgress",function(t,o){e.onLoadProgress(t)}),e.vimeo.addEvent("playProgress",function(t,o){e.onPlayProgress(t)}),e.vimeo.addEvent("play",function(t){e.onPlay()}),e.vimeo.addEvent("pause",function(t){e.onPause()}),e.vimeo.addEvent("finish",function(t){e.onFinish()}),e.vimeo.addEvent("seek",function(t,o){e.onSeek(t)})})},videojs.Vimeo.prototype.onLoadProgress=function(e){var t=!this.vimeoInfo.duration
this.vimeoInfo.duration=e.duration,this.vimeoInfo.buffered=e.percent,this.player_.trigger("progress"),t&&this.player_.trigger("durationchange")},videojs.Vimeo.prototype.onPlayProgress=function(e){this.vimeoInfo.time=e.seconds,this.player_.trigger("timeupdate")},videojs.Vimeo.prototype.onPlay=function(){this.vimeoInfo.state=VimeoState.PLAYING,this.player_.trigger("play")},videojs.Vimeo.prototype.onPause=function(){this.vimeoInfo.state=VimeoState.PAUSED,this.player_.trigger("pause")},videojs.Vimeo.prototype.onFinish=function(){this.vimeoInfo.state=VimeoState.ENDED,this.player_.trigger("ended")},videojs.Vimeo.prototype.onSeek=function(e){this.vimeoInfo.time=e.seconds,this.player_.trigger("timeupdate"),this.player_.trigger("seeked")},videojs.Vimeo.prototype.onError=function(e){this.player_.error=e,this.player_.trigger("error")},videojs.Vimeo.isSupported=function(){return!0},videojs.Vimeo.prototype.supportsFullScreen=function(){return!1},videojs.Vimeo.canPlaySource=function(e){return"video/vimeo"==e.type},videojs.Vimeo.makeQueryString=function(e){var t=[]
for(var o in e)e.hasOwnProperty(o)&&t.push(encodeURIComponent(o)+"="+encodeURIComponent(e[o]))
return t.join("&")}
var Froogaloop=function(){function e(t){return new e.fn.init(t)}function t(e,t,o){if(!o.contentWindow.postMessage)return!1
var i=JSON.stringify({method:e,value:t})
o.contentWindow.postMessage(i,u)}function o(e){var t,o
try{t=JSON.parse(e.data),o=t.event||t.method}catch(i){}if("ready"!=o||l||(l=!0),!/^https?:\/\/player.vimeo.com/.test(e.origin))return!1
"*"===u&&(u=e.origin)
var r=t.value,s=t.data,a=""===a?null:t.player_id,d=n(o,a),m=[]
return d?(void 0!==r&&m.push(r),s&&m.push(s),a&&m.push(a),m.length>0?d.apply(null,m):d.call()):!1}function i(e,t,o){o?(a[o]||(a[o]={}),a[o][e]=t):a[e]=t}function n(e,t){return t&&a[t]?a[t][e]:a[e]}function r(e,t){if(t&&a[t]){if(!a[t][e])return!1
a[t][e]=null}else{if(!a[e])return!1
a[e]=null}return!0}function s(e){return!!(e&&e.constructor&&e.call&&e.apply)}var a={},l=!1,u=(Array.prototype.slice,"*")
return e.fn=e.prototype={element:null,init:function(e){return"string"==typeof e&&(e=document.getElementById(e)),this.element=e,this},api:function(e,o){if(!this.element||!e)return!1
var n=this,r=n.element,a=""!==r.id?r.id:null,l=s(o)?null:o,u=s(o)?o:null
return u&&i(e,u,a),t(e,l,r),n},addEvent:function(e,o){if(!this.element)return!1
var n=this,r=n.element,s=""!==r.id?r.id:null
return i(e,o,s),"ready"!=e?t("addEventListener",e,r):"ready"==e&&l&&o.call(null,s),n},removeEvent:function(e){if(!this.element)return!1
var o=this,i=o.element,n=""!==i.id?i.id:null,s=r(e,n)
"ready"!=e&&s&&t("removeEventListener",e,i)}},e.fn.init.prototype=e.fn,window.addEventListener?window.addEventListener("message",o,!1):window.attachEvent("onmessage",o),window.Froogaloop=window.$f=e}()
