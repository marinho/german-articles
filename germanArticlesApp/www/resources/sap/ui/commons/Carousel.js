/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/ResizeHandler','sap/ui/core/delegate/ItemNavigation'],function(q,a,C,R,I){"use strict";var b=C.extend("sap.ui.commons.Carousel",{metadata:{library:"sap.ui.commons",properties:{orientation:{type:"sap.ui.commons.enums.Orientation",group:"Misc",defaultValue:sap.ui.commons.enums.Orientation.horizontal},width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},height:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},defaultItemHeight:{type:"int",group:"Misc",defaultValue:150},defaultItemWidth:{type:"int",group:"Misc",defaultValue:150},animationDuration:{type:"int",group:"Misc",defaultValue:500},visibleItems:{type:"int",group:"Misc",defaultValue:null},handleSize:{type:"int",group:"Misc",defaultValue:22},firstVisibleIndex:{type:"int",group:"Appearance",defaultValue:0}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content",bindable:"bindable"}}}});b.prototype.init=function(){this._visibleItems=0;this.data("sap-ui-fastnavgroup","true",true);};b.prototype.exit=function(){if(this.sResizeListenerId){R.deregister(this.sResizeListenerId);this.sResizeListenerId=null;}this._destroyItemNavigation();};b.prototype.onclick=function(e){var c=this.getId();switch(e.target){case q.sap.byId(c+'-prevbutton')[0]:this.showPrevious();break;case q.sap.byId(c+'-nextbutton')[0]:this.showNext();break;default:return;}};b.prototype.onBeforeRendering=function(){if(this.sResizeListenerId){R.deregister(this.sResizeListenerId);this.sResizeListenerId=null;}};b.prototype.onAfterRendering=function(){if(this.getOrientation()=="vertical"){this._sAnimationAttribute='margin-top';}else{if(sap.ui.getCore().getConfiguration().getRTL()){this._sAnimationAttribute='margin-right';}else{this._sAnimationAttribute='margin-left';}}this.showElementWithId(this._getItemIdByIndex(this.getFirstVisibleIndex()));this.calculateAndSetSize();this.oDomRef=this.getDomRef();this.sResizeListenerId=R.register(this.oDomRef,q.proxy(this.onresize,this));this._initItemNavigation();};b.prototype._initItemNavigation=function(){var $=this.$("scrolllist");if(!this._oItemNavigation){this._oItemNavigation=new I();this._oItemNavigation.setCycling(true);this.addDelegate(this._oItemNavigation);this._oItemNavigation.attachEvent(I.Events.AfterFocus,function(e){var c=this.$("contentarea"),s=this.$("scrolllist");var o=e.getParameter("event");if(o&&o.type=="mousedown"){var d=false;for(var i=0;i<s.children().length;i++){var f=s.children()[i];if(o.target.id==f.id){d=true;break;}}if(!d){o.target.focus();}}if(sap.ui.getCore().getConfiguration().getRTL()){c.scrollLeft(s.width()-c.width());}else{c.scrollLeft(0);}},this);}this._oItemNavigation.setRootDomRef($[0]);this._oItemNavigation.setItemDomRefs($.children());};b.prototype._destroyItemNavigation=function(){if(this._oItemNavigation){this._oItemNavigation.destroy();this._oItemNavigation=undefined;}};b.prototype.onThemeChanged=function(e){this.calculateAndSetSize();};b.prototype.onfocusin=function(e){var $=q(e.target);if(!this._bIgnoreFocusIn&&($.hasClass("sapUiCrslBefore")||$.hasClass("sapUiCrslAfter"))){this._leaveActionMode();q(this._oItemNavigation.getFocusedDomRef()||this._oItemNavigation.getRootDomRef()).focus();}};b.prototype.onsaptabnext=function(e){var $=this.$();if(this._bActionMode){if($.find(".sapUiCrslScl").lastFocusableDomRef()===e.target){$.find(".sapUiCrslScl").firstFocusableDomRef().focus();e.preventDefault();e.stopPropagation();}}else{if(this._oItemNavigation.getFocusedDomRef()===e.target){this._bIgnoreFocusIn=true;$.find(".sapUiCrslAfter").focus();this._bIgnoreFocusIn=false;}}};b.prototype.onsaptabprevious=function(e){var $=this.$();if(this._bActionMode){if($.find(".sapUiCrslScl").firstFocusableDomRef()===e.target){$.find(".sapUiCrslScl").lastFocusableDomRef().focus();e.preventDefault();e.stopPropagation();}}else{if(this._oItemNavigation.getFocusedDomRef()===e.target&&q.sap.containsOrEquals($.find(".sapUiCrslScl").get(0),e.target)){this._bIgnoreFocusIn=true;$.find(".sapUiCrslBefore").focus();this._bIgnoreFocusIn=false;}}};b.prototype.onsapescape=function(e){this._leaveActionMode(e);};b.prototype.onsapnext=function(e){var $=q(e.target);var s=this.$("scrolllist");s.stop(true,true);if($.hasClass('sapUiCrslItm')&&$.nextAll(':visible').length<2){this.showNext();e.preventDefault();}};b.prototype.onsapprevious=function(e){var $=q(e.target);var s=this.$("scrolllist");s.stop(true,true);if($.hasClass('sapUiCrslItm')&&$.prevAll(':visible').length<2){this.showPrevious();e.preventDefault();}};b.prototype.onkeydown=function(e){var $=this.$();if(!this._bActionMode&&e.keyCode==q.sap.KeyCodes.F2||e.keyCode==q.sap.KeyCodes.ENTER){if($.find(".sapUiCrslScl li:focus").length>0){this._enterActionMode($.find(".sapUiCrslScl li:focus :sapFocusable").get(0));e.preventDefault();e.stopPropagation();}}else if(this._bActionMode&&e.keyCode==q.sap.KeyCodes.F2){this._leaveActionMode(e);}};b.prototype.onmouseup=function(e){if(this.$().find(".sapUiCrslScl li :focus").length>0){this._enterActionMode(this.$().find(".sapUiCrslScl li :focus").get(0));}else{this._leaveActionMode(e);}};if(sap.ui.Device.support.touch){b.prototype.onswipeleft=function(e){this.showNext();};b.prototype.onswiperight=function(e){this.showPrevious();};}b.prototype._enterActionMode=function(d){if(d&&!this._bActionMode){this._bActionMode=true;this.removeDelegate(this._oItemNavigation);q(this._oItemNavigation.getFocusedDomRef()).attr("tabindex","-1");this.$("scrolllist").attr("aria-activedescendant",q(this._oItemNavigation.getFocusedDomRef()).attr("id"));q(d).focus();}};b.prototype._leaveActionMode=function(e){if(this._bActionMode){this._bActionMode=false;this.addDelegate(this._oItemNavigation);q(this._oItemNavigation.getFocusedDomRef()).attr("tabindex","0");this.$("scrolllist").removeAttr("aria-activedescendant");if(e){if(q(e.target).closest("li[tabindex=-1]").length>0){var i=q(this._oItemNavigation.aItemDomRefs).index(q(e.target).closest("li[tabindex=-1]").get(0));this._oItemNavigation.focusItem(i,null);}else{if(q.sap.containsOrEquals(this.$().find(".sapUiCrslScl").get(0),e.target)){this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex(),null);}}}else{this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex(),null);}}};b.prototype.onresize=function(e){if(!this.getDomRef()){if(this.sResizeListenerId){R.deregister(this.sResizeListenerId);this.sResizeListenerId=null;}return;}this.calculateAndSetSize();};b.prototype.showPrevious=function(){var t=this,A={},s=this.$("scrolllist");var $,c;A[this._sAnimationAttribute]=0;if(s.children('li').length<2){return;}s.stop(true,true);s.css(this._sAnimationAttribute,-this._iMaxWidth);$=s.children('li:last');c=s.children('li:first');this._showAllItems();$.insertBefore(c);s.append($.sapExtendedClone(true));s.animate(A,this.getAnimationDuration(),function(){s.children('li:last').remove();t.setProperty("firstVisibleIndex",t._getContentIndex(s.children('li:first').attr('id')),true);t._hideInvisibleItems();});};b.prototype.showNext=function(){var t=this,A={},s=this._sAnimationAttribute,S=this.$("scrolllist");var $;A[this._sAnimationAttribute]=-this._iMaxWidth;if(S.children('li').length<2){return;}S.stop(true,true);this._showAllItems();$=S.children('li:first');$.appendTo(S);$.sapExtendedClone(true).insertBefore(S.children('li:first'));S.animate(A,this.getAnimationDuration(),function(){S.children('li:first').remove();q(this).css(s,'0px');t.setProperty("firstVisibleIndex",t._getContentIndex(S.children('li:first').attr('id')),true);t._hideInvisibleItems();});};b.prototype.showElementWithId=function(e){this._showAllItems();var s=this.$("scrolllist"),i;e=this.getId()+"-item-"+e;i=s.children('li').index(q.sap.byId(e));s.children('li:lt('+i+')').appendTo(s);this._hideInvisibleItems();};b.prototype.calculateAndSetSize=function(){var c=this.getId();var d=this._getDimensions();var m=d.maxWidth;var e=d.maxHeight;var f;var v=this.getVisibleItems();var M=q.sap.byId(c);var n=q.sap.byId(c+'-nextbutton');var p=q.sap.byId(c+'-prevbutton');var $=q.sap.byId(c+'-contentarea');this._showAllItems();if(this.getContent().length<=0){return;}if(this.getWidth()&&this.getOrientation()=="vertical"){m=M.width();}if(this.getHeight()&&this.getOrientation()=="horizontal"){e=M.height();}this.$().addClass('sapUiCrsl'+q.sap.charToUpperCase(this.getOrientation(),0));if(this.getOrientation()=="horizontal"){f=M.width()-this.getHandleSize()*2-1;$.css('left',this.getHandleSize()+"px").css('right',this.getHandleSize()+"px");if(v==0){v=Math.floor(f/m);}m=f/v;this._iMaxWidth=m;var g=e+"px";$.find('.sapUiCrslItm').css("width",m+"px").css("height",e+"px").css("display","inline-block");p.css("height",e).css("line-height",g);n.css("height",e).css("line-height",g);$.height(e);M.height(e);var V=this.getContent().length<v?this.getContent().length:v;if(this.getWidth()){M.width(this.getWidth());}else{M.width(m*V+(this.getHandleSize()*2-1));}}else{f=M.height()-this.getHandleSize()*2-1;$.css('top',this.getHandleSize()+"px").css('bottom',this.getHandleSize()+"px");if(v==0){v=Math.floor(f/e);}e=f/v;this._iMaxWidth=e;$.find('.sapUiCrslItm').css("width",m+"px").css("height",e+"px").css("display","block");p.width(m).after($);n.width(m);$.width(m);M.width(m);}this._visibleItems=v;this._hideInvisibleItems();};b.prototype._getDimensions=function(){var c=this.getContent();var m=0;var d=0;for(var i=0;i<c.length;i++){var f,g;try{f=c[i].getWidth();if(f.substr(-1)=="%"){f=this.getDefaultItemWidth();}}catch(e){f=this.getDefaultItemWidth();}try{g=c[i].getHeight();if(g.substr(-1)=="%"){g=this.getDefaultItemHeight();}}catch(e){g=this.getDefaultItemHeight();}m=Math.max(m,parseInt(f,10));d=Math.max(d,parseInt(g,10));}if(m==0||isNaN(m)){m=this.getDefaultItemWidth();}if(d==0||isNaN(d)){d=this.getDefaultItemHeight();}return{maxWidth:m,maxHeight:d};};b.prototype.getFocusDomRef=function(){return this.$("scrolllist");};b.prototype._showAllItems=function(){var c=this.$("contentarea");c.find('.sapUiCrslItm').show().css("display","inline-block");};b.prototype._hideInvisibleItems=function(){var c=this.$("contentarea");c.find('.sapUiCrslItm:gt('+(this._visibleItems-1)+')').hide();};b.prototype._getContentIndex=function(i){var c=i.split("-item-");return q.inArray(sap.ui.getCore().byId(c[1]),this.getContent());};b.prototype._getItemIdByIndex=function(i){var c=this.getContent()[i];if(!c){return null;}return c.getId();};b.prototype.setFirstVisibleIndex=function(f){if(f>this.getContent().length-1){q.sap.log.warning("The index is invalid. There are less items available in the carousel.");return this;}this.setProperty("firstVisibleIndex",f,true);this.showElementWithId(this._getItemIdByIndex(f));if(this._oItemNavigation){this._oItemNavigation.focusItem(f);}return this;};
//Licensed under the terms of the MIT source code license
(function(o){q.fn.sapExtendedClone=function(){var r=o.apply(this,arguments);var m=this.find('textarea').add(this.filter('textarea'));var c=r.find('textarea').add(r.filter('textarea'));var d=this.find('select').add(this.filter('select'));var e=r.find('select').add(r.filter('select'));for(var i=0,l=m.length;i<l;++i){q(c[i]).val(q(m[i]).val());}for(var i=0,l=d.length;i<l;++i){e[i].selectedIndex=d[i].selectedIndex;}return r;};})(q.fn.clone);return b;},true);
