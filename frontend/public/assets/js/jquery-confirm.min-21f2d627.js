/*!

*/if(typeof jQuery>"u")throw new Error("jquery-confirm requires jQuery");var c,h;(function(o,f){o.fn.confirm=function(t,i){return typeof t>"u"&&(t={}),typeof t=="string"&&(t={content:t,title:i||!1}),o(this).each(function(){var n=o(this);if(n.attr("jc-attached")){console.warn("jConfirm has already been attached to this element ",n[0]);return}n.on("click",function(s){s.preventDefault();var e=o.extend({},t);if(n.attr("data-title")&&(e.title=n.attr("data-title")),n.attr("data-content")&&(e.content=n.attr("data-content")),typeof e.buttons>"u"&&(e.buttons={}),e.$target=n,n.attr("href")&&Object.keys(e.buttons).length==0){var a=o.extend(!0,{},c.pluginDefaults.defaultButtons,(c.defaults||{}).defaultButtons||{}),r=Object.keys(a)[0];e.buttons=a,e.buttons[r].action=function(){location.href=n.attr("href")}}e.closeIcon=!1,o.confirm(e)}),n.attr("jc-attached",!0)}),o(this)},o.confirm=function(t,i){typeof t>"u"&&(t={}),typeof t=="string"&&(t={content:t,title:i||!1});var n=t.buttons!=!1;if(typeof t.buttons!="object"&&(t.buttons={}),Object.keys(t.buttons).length==0&&n){var s=o.extend(!0,{},c.pluginDefaults.defaultButtons,(c.defaults||{}).defaultButtons||{});t.buttons=s}return c(t)},o.alert=function(t,i){typeof t>"u"&&(t={}),typeof t=="string"&&(t={content:t,title:i||!1});var n=t.buttons!=!1;if(typeof t.buttons!="object"&&(t.buttons={}),Object.keys(t.buttons).length==0&&n){var s=o.extend(!0,{},c.pluginDefaults.defaultButtons,(c.defaults||{}).defaultButtons||{}),e=Object.keys(s)[0];t.buttons[e]=s[e]}return c(t)},o.dialog=function(t,i){return typeof t>"u"&&(t={}),typeof t=="string"&&(t={content:t,title:i||!1,closeIcon:function(){}}),t.buttons={},typeof t.closeIcon>"u"&&(t.closeIcon=function(){}),t.confirmKeys=[13],c(t)},c=function(t){typeof t>"u"&&(t={});var i=o.extend(!0,{},c.pluginDefaults);c.defaults&&(i=o.extend(!0,i,c.defaults)),i=o.extend(!0,{},i,t);var n=new h(i);return c.instances.push(n),n},h=function(t){o.extend(this,t),this._init()},h.prototype={_init:function(){var t=this;c.instances.length||(c.lastFocused=o("body").find(":focus")),this._id=Math.round(Math.random()*99999),this.contentParsed=o(document.createElement("div")),this.lazyOpen||setTimeout(function(){t.open()},0)},_buildHTML:function(){var t=this;this._parseAnimation(this.animation,"o"),this._parseAnimation(this.closeAnimation,"c"),this._parseBgDismissAnimation(this.backgroundDismissAnimation),this._parseColumnClass(this.columnClass),this._parseTheme(this.theme),this._parseType(this.type);var i=o(this.template);i.find(".jconfirm-box").addClass(this.animationParsed).addClass(this.backgroundDismissAnimationParsed).addClass(this.typeParsed),this.typeAnimated&&i.find(".jconfirm-box").addClass("jconfirm-type-animated"),this.useBootstrap?(i.find(".jc-bs3-row").addClass(this.bootstrapClasses.row),i.find(".jc-bs3-row").addClass("justify-content-md-center justify-content-sm-center justify-content-xs-center justify-content-lg-center"),i.find(".jconfirm-box-container").addClass(this.columnClassParsed),this.containerFluid?i.find(".jc-bs3-container").addClass(this.bootstrapClasses.containerFluid):i.find(".jc-bs3-container").addClass(this.bootstrapClasses.container)):i.find(".jconfirm-box").css("width",this.boxWidth),this.titleClass&&i.find(".jconfirm-title-c").addClass(this.titleClass),i.addClass(this.themeParsed);var n="jconfirm-box"+this._id;i.find(".jconfirm-box").attr("aria-labelledby",n).attr("tabindex",-1),i.find(".jconfirm-content").attr("id",n),this.bgOpacity!==null&&i.find(".jconfirm-bg").css("opacity",this.bgOpacity),this.rtl&&i.addClass("jconfirm-rtl"),this.$el=i.appendTo(this.container),this.$jconfirmBoxContainer=this.$el.find(".jconfirm-box-container"),this.$jconfirmBox=this.$body=this.$el.find(".jconfirm-box"),this.$jconfirmBg=this.$el.find(".jconfirm-bg"),this.$title=this.$el.find(".jconfirm-title"),this.$titleContainer=this.$el.find(".jconfirm-title-c"),this.$content=this.$el.find("div.jconfirm-content"),this.$contentPane=this.$el.find(".jconfirm-content-pane"),this.$icon=this.$el.find(".jconfirm-icon-c"),this.$closeIcon=this.$el.find(".jconfirm-closeIcon"),this.$holder=this.$el.find(".jconfirm-holder"),this.$btnc=this.$el.find(".jconfirm-buttons"),this.$scrollPane=this.$el.find(".jconfirm-scrollpane"),t.setStartingPoint(),this._contentReady=o.Deferred(),this._modalReady=o.Deferred(),this.$holder.css({"padding-top":this.offsetTop,"padding-bottom":this.offsetBottom}),this.setTitle(),this.setIcon(),this._setButtons(),this._parseContent(),this.initDraggable(),this.isAjax&&this.showLoading(!1),o.when(this._contentReady,this._modalReady).then(function(){t.isAjaxLoading?setTimeout(function(){t.isAjaxLoading=!1,t.setContent(),t.setTitle(),t.setIcon(),setTimeout(function(){t.hideLoading(!1),t._updateContentMaxHeight()},100),typeof t.onContentReady=="function"&&t.onContentReady()},50):(t._updateContentMaxHeight(),t.setTitle(),t.setIcon(),typeof t.onContentReady=="function"&&t.onContentReady()),t.autoClose&&t._startCountDown()}),this._watchContent(),this.animation==="none"&&(this.animationSpeed=1,this.animationBounce=1),this.$body.css(this._getCSS(this.animationSpeed,this.animationBounce)),this.$contentPane.css(this._getCSS(this.animationSpeed,1)),this.$jconfirmBg.css(this._getCSS(this.animationSpeed,1)),this.$jconfirmBoxContainer.css(this._getCSS(this.animationSpeed,1))},_typePrefix:"jconfirm-type-",typeParsed:"",_parseType:function(t){this.typeParsed=this._typePrefix+t},setType:function(t){var i=this.typeParsed;this._parseType(t),this.$jconfirmBox.removeClass(i).addClass(this.typeParsed)},themeParsed:"",_themePrefix:"jconfirm-",setTheme:function(t){var i=this.theme;this.theme=t||this.theme,this._parseTheme(this.theme),i&&this.$el.removeClass(i),this.$el.addClass(this.themeParsed),this.theme=t},_parseTheme:function(t){var i=this;t=t.split(","),o.each(t,function(n,s){s.indexOf(i._themePrefix)===-1&&(t[n]=i._themePrefix+o.trim(s))}),this.themeParsed=t.join(" ").toLowerCase()},backgroundDismissAnimationParsed:"",_bgDismissPrefix:"jconfirm-hilight-",_parseBgDismissAnimation:function(t){var i=t.split(","),n=this;o.each(i,function(s,e){e.indexOf(n._bgDismissPrefix)===-1&&(i[s]=n._bgDismissPrefix+o.trim(e))}),this.backgroundDismissAnimationParsed=i.join(" ").toLowerCase()},animationParsed:"",closeAnimationParsed:"",_animationPrefix:"jconfirm-animation-",setAnimation:function(t){this.animation=t||this.animation,this._parseAnimation(this.animation,"o")},_parseAnimation:function(t,i){i=i||"o";var n=t.split(","),s=this;o.each(n,function(a,r){r.indexOf(s._animationPrefix)===-1&&(n[a]=s._animationPrefix+o.trim(r))});var e=n.join(" ").toLowerCase();return i==="o"?this.animationParsed=e:this.closeAnimationParsed=e,e},setCloseAnimation:function(t){this.closeAnimation=t||this.closeAnimation,this._parseAnimation(this.closeAnimation,"c")},setAnimationSpeed:function(t){this.animationSpeed=t||this.animationSpeed},columnClassParsed:"",setColumnClass:function(t){if(!this.useBootstrap){console.warn("cannot set columnClass, useBootstrap is set to false");return}this.columnClass=t||this.columnClass,this._parseColumnClass(this.columnClass),this.$jconfirmBoxContainer.addClass(this.columnClassParsed)},_updateContentMaxHeight:function(){var t=o(f).height()-(this.$jconfirmBox.outerHeight()-this.$contentPane.outerHeight())-(this.offsetTop+this.offsetBottom);this.$contentPane.css({"max-height":t+"px"})},setBoxWidth:function(t){if(this.useBootstrap){console.warn("cannot set boxWidth, useBootstrap is set to true");return}this.boxWidth=t,this.$jconfirmBox.css("width",t)},_parseColumnClass:function(t){t=t.toLowerCase();var i;switch(t){case"xl":case"xlarge":i="col-md-12";break;case"l":case"large":i="col-md-8 col-md-offset-2";break;case"m":case"medium":i="col-md-6 col-md-offset-3";break;case"s":case"small":i="col-md-4 col-md-offset-4";break;case"xs":case"xsmall":i="col-md-2 col-md-offset-5";break;default:i=t}this.columnClassParsed=i},initDraggable:function(){var t=this,i=this.$titleContainer;this.resetDrag(),this.draggable&&(i.on("mousedown",function(n){i.addClass("jconfirm-hand"),t.mouseX=n.clientX,t.mouseY=n.clientY,t.isDrag=!0}),o(f).on("mousemove."+this._id,function(n){t.isDrag&&(t.movingX=n.clientX-t.mouseX+t.initialX,t.movingY=n.clientY-t.mouseY+t.initialY,t.setDrag())}),o(f).on("mouseup."+this._id,function(){i.removeClass("jconfirm-hand"),t.isDrag&&(t.isDrag=!1,t.initialX=t.movingX,t.initialY=t.movingY)}))},resetDrag:function(){this.isDrag=!1,this.initialX=0,this.initialY=0,this.movingX=0,this.movingY=0,this.mouseX=0,this.mouseY=0,this.$jconfirmBoxContainer.css("transform","translate("+0+"px, "+0+"px)")},setDrag:function(){if(this.draggable){this.alignMiddle=!1;var t=this.$jconfirmBox.outerWidth(),i=this.$jconfirmBox.outerHeight(),n=o(f).width(),s=o(f).height(),e=this,a=1;if(e.movingX%a===0||e.movingY%a===0){if(e.dragWindowBorder){var r=n/2-t/2,l=s/2-i/2;l-=e.dragWindowGap,r-=e.dragWindowGap,r+e.movingX<0?e.movingX=-r:r-e.movingX<0&&(e.movingX=r),l+e.movingY<0?e.movingY=-l:l-e.movingY<0&&(e.movingY=l)}e.$jconfirmBoxContainer.css("transform","translate("+e.movingX+"px, "+e.movingY+"px)")}}},_scrollTop:function(){if(typeof pageYOffset<"u")return pageYOffset;var t=document.body,i=document.documentElement;return i=i.clientHeight?i:t,i.scrollTop},_watchContent:function(){var t=this;this._timer&&clearInterval(this._timer);var i=0;this._timer=setInterval(function(){if(t.smoothContent){var n=t.$content.outerHeight()||0;n!==i&&(t.$contentPane.css({height:n}).scrollTop(0),i=n);var s=o(f).height(),e=t.offsetTop+t.offsetBottom+t.$jconfirmBox.height()-t.$contentPane.height()+t.$content.height();e<s?t.$contentPane.addClass("no-scroll"):t.$contentPane.removeClass("no-scroll")}},this.watchInterval)},_overflowClass:"jconfirm-overflow",_hilightAnimating:!1,highlight:function(){this.hiLightModal()},hiLightModal:function(){var t=this;if(!this._hilightAnimating){t.$body.addClass("hilight");var i=parseFloat(t.$body.css("animation-duration"))||2;this._hilightAnimating=!0,setTimeout(function(){t._hilightAnimating=!1,t.$body.removeClass("hilight")},i*1e3)}},_bindEvents:function(){var t=this;this.boxClicked=!1,this.$scrollPane.click(function(n){if(!t.boxClicked){var s=!1,e=!1,a;if(typeof t.backgroundDismiss=="function"?a=t.backgroundDismiss():a=t.backgroundDismiss,typeof a=="string"&&typeof t.buttons[a]<"u"?(s=a,e=!1):typeof a>"u"||a?e=!0:e=!1,s){var r=t.buttons[s].action.apply(t);e=typeof r>"u"||!!r}e?t.close():t.hiLightModal()}t.boxClicked=!1}),this.$jconfirmBox.click(function(n){t.boxClicked=!0});var i=!1;o(f).on("jcKeyDown."+t._id,function(n){i||(i=!0)}),o(f).on("keyup."+t._id,function(n){i&&(t.reactOnKey(n),i=!1)}),o(f).on("resize."+this._id,function(){t._updateContentMaxHeight(),setTimeout(function(){t.resetDrag()},100)})},_cubic_bezier:"0.36, 0.55, 0.19",_getCSS:function(t,i){return{"-webkit-transition-duration":t/1e3+"s","transition-duration":t/1e3+"s","-webkit-transition-timing-function":"cubic-bezier("+this._cubic_bezier+", "+i+")","transition-timing-function":"cubic-bezier("+this._cubic_bezier+", "+i+")"}},_setButtons:function(){var t=this,i=0;if(typeof this.buttons!="object"&&(this.buttons={}),o.each(this.buttons,function(s,e){i+=1,typeof e=="function"&&(t.buttons[s]=e={action:e}),t.buttons[s].text=e.text||s,t.buttons[s].btnClass=e.btnClass||"btn-default",t.buttons[s].action=e.action||function(){},t.buttons[s].keys=e.keys||[],t.buttons[s].isHidden=e.isHidden||!1,t.buttons[s].isDisabled=e.isDisabled||!1,o.each(t.buttons[s].keys,function(r,l){t.buttons[s].keys[r]=l.toLowerCase()});var a=o('<button type="button" class="btn"></button>').html(t.buttons[s].text).addClass(t.buttons[s].btnClass).prop("disabled",t.buttons[s].isDisabled).css("display",t.buttons[s].isHidden?"none":"").click(function(r){r.preventDefault();var l=t.buttons[s].action.apply(t,[t.buttons[s]]);t.onAction.apply(t,[s,t.buttons[s]]),t._stopCountDown(),(typeof l>"u"||l)&&t.close()});t.buttons[s].el=a,t.buttons[s].setText=function(r){a.html(r)},t.buttons[s].addClass=function(r){a.addClass(r)},t.buttons[s].removeClass=function(r){a.removeClass(r)},t.buttons[s].disable=function(){t.buttons[s].isDisabled=!0,a.prop("disabled",!0)},t.buttons[s].enable=function(){t.buttons[s].isDisabled=!1,a.prop("disabled",!1)},t.buttons[s].show=function(){t.buttons[s].isHidden=!1,a.css("display","")},t.buttons[s].hide=function(){t.buttons[s].isHidden=!0,a.css("display","none")},t["$_"+s]=t["$$"+s]=a,t.$btnc.append(a)}),i===0&&this.$btnc.hide(),this.closeIcon===null&&i===0&&(this.closeIcon=!0),this.closeIcon){if(this.closeIconClass){var n='<i class="'+this.closeIconClass+'"></i>';this.$closeIcon.html(n)}this.$closeIcon.click(function(s){s.preventDefault();var e=!1,a=!1,r;if(typeof t.closeIcon=="function"?r=t.closeIcon():r=t.closeIcon,typeof r=="string"&&typeof t.buttons[r]<"u"?(e=r,a=!1):typeof r>"u"||r?a=!0:a=!1,e){var l=t.buttons[e].action.apply(t);a=typeof l>"u"||!!l}a&&t.close()}),this.$closeIcon.show()}else this.$closeIcon.hide()},setTitle:function(t,i){if(i=i||!1,typeof t<"u")if(typeof t=="string")this.title=t;else if(typeof t=="function"){typeof t.promise=="function"&&console.error("Promise was returned from title function, this is not supported.");var n=t();typeof n=="string"?this.title=n:this.title=!1}else this.title=!1;this.isAjaxLoading&&!i||(this.$title.html(this.title||""),this.updateTitleContainer())},setIcon:function(t,i){if(i=i||!1,typeof t<"u")if(typeof t=="string")this.icon=t;else if(typeof t=="function"){var n=t();typeof n=="string"?this.icon=n:this.icon=!1}else this.icon=!1;this.isAjaxLoading&&!i||(this.$icon.html(this.icon?'<i class="'+this.icon+'"></i>':""),this.updateTitleContainer())},updateTitleContainer:function(){!this.title&&!this.icon?this.$titleContainer.hide():this.$titleContainer.show()},setContentPrepend:function(t,i){t&&this.contentParsed.prepend(t)},setContentAppend:function(t){t&&this.contentParsed.append(t)},setContent:function(t,i){i=!!i;var n=this;t&&this.contentParsed.html("").append(t),!(this.isAjaxLoading&&!i)&&(this.$content.html(""),this.$content.append(this.contentParsed),setTimeout(function(){n.$body.find("input[autofocus]:visible:first").focus()},100))},loadingSpinner:!1,showLoading:function(t){this.loadingSpinner=!0,this.$jconfirmBox.addClass("loading"),t&&this.$btnc.find("button").prop("disabled",!0)},hideLoading:function(t){this.loadingSpinner=!1,this.$jconfirmBox.removeClass("loading"),t&&this.$btnc.find("button").prop("disabled",!1)},ajaxResponse:!1,contentParsed:"",isAjax:!1,isAjaxLoading:!1,_parseContent:function(){var t=this,i="&nbsp;";if(typeof this.content=="function"){var n=this.content.apply(this);typeof n=="string"?this.content=n:typeof n=="object"&&typeof n.always=="function"?(this.isAjax=!0,this.isAjaxLoading=!0,n.always(function(e,a,r){t.ajaxResponse={data:e,status:a,xhr:r},t._contentReady.resolve(e,a,r),typeof t.contentLoaded=="function"&&t.contentLoaded(e,a,r)}),this.content=i):this.content=i}if(typeof this.content=="string"&&this.content.substr(0,4).toLowerCase()==="url:"){this.isAjax=!0,this.isAjaxLoading=!0;var s=this.content.substring(4,this.content.length);o.get(s).done(function(e){t.contentParsed.html(e)}).always(function(e,a,r){t.ajaxResponse={data:e,status:a,xhr:r},t._contentReady.resolve(e,a,r),typeof t.contentLoaded=="function"&&t.contentLoaded(e,a,r)})}this.content||(this.content=i),this.isAjax||(this.contentParsed.html(this.content),this.setContent(),t._contentReady.resolve())},_stopCountDown:function(){clearInterval(this.autoCloseInterval),this.$cd&&this.$cd.remove()},_startCountDown:function(){var t=this,i=this.autoClose.split("|");if(i.length!==2)return console.error("Invalid option for autoClose. example 'close|10000'"),!1;var n=i[0],s=parseInt(i[1]);if(typeof this.buttons[n]>"u")return console.error("Invalid button key '"+n+"' for autoClose"),!1;var e=Math.ceil(s/1e3);this.$cd=o('<span class="countdown"> ('+e+")</span>").appendTo(this["$_"+n]),this.autoCloseInterval=setInterval(function(){t.$cd.html(" ("+(e-=1)+") "),e<=0&&(t["$$"+n].trigger("click"),t._stopCountDown())},1e3)},_getKey:function(t){switch(t){case 192:return"tilde";case 13:return"enter";case 16:return"shift";case 9:return"tab";case 20:return"capslock";case 17:return"ctrl";case 91:return"win";case 18:return"alt";case 27:return"esc";case 32:return"space"}var i=String.fromCharCode(t);return/^[A-z0-9]+$/.test(i)?i.toLowerCase():!1},reactOnKey:function(t){var i=this,n=o(".jconfirm");if(n.eq(n.length-1)[0]!==this.$el[0])return!1;var s=t.which;if(this.$content.find(":input").is(":focus")&&/13|32/.test(s))return!1;var e=this._getKey(s);if(e==="esc"&&this.escapeKey){if(this.escapeKey===!0)this.$scrollPane.trigger("click");else if(typeof this.escapeKey=="string"||typeof this.escapeKey=="function"){var a;typeof this.escapeKey=="function"?a=this.escapeKey():a=this.escapeKey,a&&(typeof this.buttons[a]>"u"?console.warn("Invalid escapeKey, no buttons found with key "+a):this["$_"+a].trigger("click"))}}o.each(this.buttons,function(r,l){l.keys.indexOf(e)!=-1&&i["$_"+r].trigger("click")})},setDialogCenter:function(){console.info("setDialogCenter is deprecated, dialogs are centered with CSS3 tables")},_unwatchContent:function(){clearInterval(this._timer)},close:function(t){var i=this;return typeof this.onClose=="function"&&this.onClose(t),this._unwatchContent(),o(f).unbind("resize."+this._id),o(f).unbind("keyup."+this._id),o(f).unbind("jcKeyDown."+this._id),this.draggable&&(o(f).unbind("mousemove."+this._id),o(f).unbind("mouseup."+this._id),this.$titleContainer.unbind("mousedown")),i.$el.removeClass(i.loadedClass),o("body").removeClass("jconfirm-no-scroll-"+i._id),i.$jconfirmBoxContainer.removeClass("jconfirm-no-transition"),setTimeout(function(){i.$body.addClass(i.closeAnimationParsed),i.$jconfirmBg.addClass("jconfirm-bg-h");var n=i.closeAnimation==="none"?1:i.animationSpeed;setTimeout(function(){i.$el.remove(),c.instances;var s=c.instances.length-1;for(s;s>=0;s--)c.instances[s]._id===i._id&&c.instances.splice(s,1);if(!c.instances.length&&i.scrollToPreviousElement&&c.lastFocused&&c.lastFocused.length&&o.contains(document,c.lastFocused[0])){var e=c.lastFocused;if(i.scrollToPreviousElementAnimate){var a=o(f).scrollTop(),r=c.lastFocused.offset().top,l=o(f).height();if(r>a&&r<a+l)e.focus();else{var u=r-Math.round(l/3);o("html, body").animate({scrollTop:u},i.animationSpeed,"swing",function(){e.focus()})}}else e.focus();c.lastFocused=!1}typeof i.onDestroy=="function"&&i.onDestroy()},n*.4)},50),!0},open:function(){return this.isOpen()?!1:(this._buildHTML(),this._bindEvents(),this._open(),!0)},setStartingPoint:function(){var t=!1;if(this.animateFromElement!==!0&&this.animateFromElement)t=this.animateFromElement,c.lastClicked=!1;else if(c.lastClicked&&this.animateFromElement===!0)t=c.lastClicked,c.lastClicked=!1;else return!1;if(!t)return!1;var i=t.offset(),n=t.outerHeight()/2,s=t.outerWidth()/2;n-=this.$jconfirmBox.outerHeight()/2,s-=this.$jconfirmBox.outerWidth()/2;var e=i.top+n;e=e-this._scrollTop();var a=i.left+s,r=o(f).height()/2,l=o(f).width()/2,u=r-this.$jconfirmBox.outerHeight()/2,m=l-this.$jconfirmBox.outerWidth()/2;if(e-=u,a-=m,Math.abs(e)>r||Math.abs(a)>l)return!1;this.$jconfirmBoxContainer.css("transform","translate("+a+"px, "+e+"px)")},_open:function(){var t=this;typeof t.onOpenBefore=="function"&&t.onOpenBefore(),this.$body.removeClass(this.animationParsed),this.$jconfirmBg.removeClass("jconfirm-bg-h"),this.$body.focus(),t.$jconfirmBoxContainer.css("transform","translate("+0+"px, "+0+"px)"),setTimeout(function(){t.$body.css(t._getCSS(t.animationSpeed,1)),t.$body.css({"transition-property":t.$body.css("transition-property")+", margin"}),t.$jconfirmBoxContainer.addClass("jconfirm-no-transition"),t._modalReady.resolve(),typeof t.onOpen=="function"&&t.onOpen(),t.$el.addClass(t.loadedClass)},this.animationSpeed)},loadedClass:"jconfirm-open",isClosed:function(){return!this.$el||this.$el.css("display")===""},isOpen:function(){return!this.isClosed()},toggle:function(){this.isOpen()?this.close():this.open()}},c.instances=[],c.lastFocused=!1,c.pluginDefaults={template:'<div class="jconfirm"><div class="jconfirm-bg jconfirm-bg-h"></div><div class="jconfirm-scrollpane"><div class="jconfirm-row"><div class="jconfirm-cell"><div class="jconfirm-holder"><div class="jc-bs3-container"><div class="jc-bs3-row"><div class="jconfirm-box-container jconfirm-animated"><div class="jconfirm-box" role="dialog" aria-labelledby="labelled" tabindex="-1"><div class="jconfirm-closeIcon">&times;</div><div class="jconfirm-title-c"><span class="jconfirm-icon-c"></span><span class="jconfirm-title"></span></div><div class="jconfirm-content-pane"><div class="jconfirm-content"></div></div><div class="jconfirm-buttons"></div><div class="jconfirm-clear"></div></div></div></div></div></div></div></div></div></div>',title:"Hello",titleClass:"",type:"default",typeAnimated:!0,draggable:!0,dragWindowGap:15,dragWindowBorder:!0,animateFromElement:!0,alignMiddle:!0,smoothContent:!0,content:"Are you sure to continue?",buttons:{},defaultButtons:{ok:{action:function(){}},close:{action:function(){}}},contentLoaded:function(){},icon:"",lazyOpen:!1,bgOpacity:null,theme:"light",animation:"scale",closeAnimation:"scale",animationSpeed:400,animationBounce:1,escapeKey:!0,rtl:!1,container:"body",containerFluid:!1,backgroundDismiss:!1,backgroundDismissAnimation:"shake",autoClose:!1,closeIcon:null,closeIconClass:!1,watchInterval:100,columnClass:"col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1",boxWidth:"50%",scrollToPreviousElement:!0,scrollToPreviousElementAnimate:!0,useBootstrap:!0,offsetTop:40,offsetBottom:40,bootstrapClasses:{container:"container",containerFluid:"container-fluid",row:"row"},onContentReady:function(){},onOpenBefore:function(){},onOpen:function(){},onClose:function(){},onDestroy:function(){},onAction:function(){}};var d=!1;o(f).on("keydown",function(t){if(!d){var i=o(t.target),n=!1;i.closest(".jconfirm-box").length&&(n=!0),n&&o(f).trigger("jcKeyDown"),d=!0}}),o(f).on("keyup",function(){d=!1}),c.lastClicked=!1,o(document).on("mousedown","button, a",function(){c.lastClicked=o(this)})})(jQuery,window);