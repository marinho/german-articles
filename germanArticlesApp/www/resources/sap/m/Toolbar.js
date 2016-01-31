/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./BarInPageEnabler','./ToolbarLayoutData','./ToolbarSpacer','./library','sap/ui/core/Control','sap/ui/core/EnabledPropagator','sap/ui/core/ResizeHandler'],function(q,B,T,a,l,C,E,R){"use strict";var b=sap.m.ToolbarDesign;var c=C.extend("sap.m.Toolbar",{metadata:{interfaces:["sap.ui.core.Toolbar","sap.m.IBar"],library:"sap.m",properties:{width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},active:{type:"boolean",group:"Behavior",defaultValue:false},enabled:{type:"boolean",group:"Behavior",defaultValue:true},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:''},design:{type:"sap.m.ToolbarDesign",group:"Appearance",defaultValue:b.Auto}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},events:{press:{parameters:{srcControl:{type:"sap.ui.core.Control"}}}}}});E.call(c.prototype);c.shrinkClass="sapMTBShrinkItem";c.isRelativeWidth=function(w){return/^([-+]?\d+%|auto|inherit|)$/i.test(w);};c.checkOverflow=function(e){if(!e||!e.length){return false;}e.children().each(function(){this.style.width=c.getOrigWidth(this.id);});return e[0].scrollWidth>e[0].clientWidth;};c.getOrigWidth=function(i){var o=sap.ui.getCore().byId(i);if(!o||!o.getWidth){return"";}return o.getWidth();};c.checkShrinkable=function(o,s){if(o instanceof a){return this.isRelativeWidth(o.getWidth());}s=s||this.shrinkClass;o.removeStyleClass(s);var w=this.getOrigWidth(o.getId());if(!this.isRelativeWidth(w)){return;}var L=o.getLayoutData();if(L instanceof T){return L.getShrinkable()&&o.addStyleClass(s);}if(w.indexOf("%")>0||o.getMetadata().isInstanceOf("sap.ui.core.IShrinkable")){return o.addStyleClass(s);}var d=o.getDomRef();if(d&&(d.firstChild||{}).nodeType==3){return o.addStyleClass(s);}};c.flexie=function(e,f,s){if(!e||!e.length||!e.width()){return;}s=s||this.shrinkClass;f=f||a.flexClass;var t=0,F=[],S=[],i=0,I=e.width(),$=e.children(),o=this.checkOverflow(e),d=function(w){return!w||w=="auto"||w=="inherit";},g=function(j){i+=j.outerWidth(true);},p=function(j){var k=parseFloat(j.css("width"))||0;var m=parseFloat(j.css("min-width"))||0;if(k==m){g(j);return;}var n=0;var w=j.width();var P=(w*100)/I;t+=P;i+=j.outerWidth(true)-w;if(j.css("box-sizing")=="border-box"){n=j.outerWidth()-w;}var M=j.css("max-width");var u=parseFloat(M);if(M.indexOf("%")>0){u=Math.ceil((u*e.outerWidth())/100);}S.push({boxSizing:n,maxWidth:u,minWidth:m,percent:P,el:j[0]});},h=function(j){var k=0;S.forEach(function(m,n){var u=Math.min(100,(m.percent*100)/t);var v=Math.floor((j*u)/100);var w=m.boxSizing+v;if(w<m.minWidth){m.el.style.width=m.minWidth+"px";j-=(m.minWidth-m.boxSizing);t-=m.percent;delete S[n];}if(m.maxWidth&&m.maxWidth>m.minWidth&&w>m.maxWidth){m.el.style.width=m.maxWidth+"px";j+=(w-m.maxWidth);t-=m.percent;delete S[n];}});S.forEach(function(m){var n=Math.min(100,(m.percent*100)/t);var u=(j*n)/100;var v=m.boxSizing+u;m.el.style.width=v+"px";k+=v;});j-=k;if(j>1){F.forEach(function(m){var w=j/F.length;m.style.width=w+"px";});}};$.each(function(){var j=q(this);var A=d(this.style.width);if(A&&j.hasClass(f)){F.push(this);this.style.width="0px";}else if(j.is(":hidden")){return;}else if(o&&j.hasClass(s)){p(j);}else{g(j);}});var r=I-i;h(Math.max(r,0));};c.hasFlexBoxSupport=q.support.hasFlexBoxSupport;c.hasNewFlexBoxSupport=(function(){var s=document.documentElement.style;return(s.flex!==undefined||s.msFlex!==undefined||s.webkitFlexShrink!==undefined);}());c.prototype.init=function(){this.data("sap-ui-fastnavgroup","true",true);this._oContentDelegate={onAfterRendering:this._onAfterContentRendering};};c.prototype.onBeforeRendering=function(){this._cleanup();};c.prototype.onAfterRendering=function(){if(!this._checkContents()){return;}this._doLayout();};c.prototype.exit=function(){this._cleanup();};c.prototype.onLayoutDataChange=function(){this.rerender();};c.prototype.addContent=function(o){this.addAggregation("content",o);this._onContentInserted(o);return this;};c.prototype.insertContent=function(o,i){this.insertAggregation("content",o,i);this._onContentInserted(o);return this;};c.prototype.removeContent=function(v){v=this.removeAggregation("content",v);this._onContentRemoved(v);return v;};c.prototype.removeAllContent=function(){var d=this.removeAllAggregation("content")||[];d.forEach(this._onContentRemoved,this);return d;};c.prototype.ontap=function(e){if(this.getActive()&&!e.isMarked()){e.setMarked();this.firePress({srcControl:e.srcControl});}};c.prototype.onsapenter=function(e){if(this.getActive()&&e.srcControl===this&&!e.isMarked()){e.setMarked();this.firePress({srcControl:this});}};c.prototype.onsapspace=c.prototype.onsapenter;c.prototype.ontouchstart=function(e){this.getActive()&&e.setMarked();};c.prototype._checkContents=function(){var s=0;this.getContent().forEach(function(o){if(c.checkShrinkable(o)){s++;}});return s;};c.prototype._doLayout=function(){if(c.hasNewFlexBoxSupport){return;}if(c.hasFlexBoxSupport){this._resetOverflow();}else{this._reflexie();}};c.prototype._resetOverflow=function(){this._deregisterResize();var t=this.$();var d=t[0]||{};t.removeClass("sapMTBOverflow");var o=d.scrollWidth>d.clientWidth;o&&t.addClass("sapMTBOverflow");this._iEndPoint=this._getEndPoint();this._registerResize();};c.prototype._reflexie=function(){this._deregisterResize();c.flexie(this.$());this._iEndPoint=this._getEndPoint();this._registerResize();};c.prototype._onContentInserted=function(o){if(o){o.attachEvent("_change",this._onContentPropertyChanged,this);o.addEventDelegate(this._oContentDelegate,o);}};c.prototype._onContentRemoved=function(o){if(o){o.detachEvent("_change",this._onContentPropertyChanged,this);o.removeEventDelegate(this._oContentDelegate,o);}};c.prototype._onAfterContentRendering=function(){var L=this.getLayoutData();if(L instanceof T){L.applyProperties();}};c.prototype._onContentPropertyChanged=function(e){if(e.getParameter("name")!="width"){return;}var o=e.getSource();var p=o.getWidth().indexOf("%")>0;o.toggleStyleClass(c.shrinkClass,p);};c.prototype._registerContentResize=function(){sap.ui.getCore().attachIntervalTimer(this._handleContentResize,this);};c.prototype._deregisterContentResize=function(){sap.ui.getCore().detachIntervalTimer(this._handleContentResize,this);};c.prototype._registerToolbarResize=function(){if(c.isRelativeWidth(this.getWidth())){var r=q.proxy(this._handleToolbarResize,this);this._sResizeListenerId=R.register(this,r);}};c.prototype._deregisterToolbarResize=function(){sap.ui.getCore().detachIntervalTimer(this._handleContentResize,this);if(this._sResizeListenerId){R.deregister(this._sResizeListenerId);this._sResizeListenerId="";}};c.prototype._registerResize=function(){this._registerToolbarResize();this._registerContentResize();};c.prototype._deregisterResize=function(){this._deregisterToolbarResize();this._deregisterContentResize();};c.prototype._cleanup=function(){this._deregisterResize();};c.prototype._getEndPoint=function(){var L=(this.getDomRef()||{}).lastElementChild;if(L){var e=L.offsetLeft;if(!sap.ui.getCore().getConfiguration().getRTL()){e+=L.offsetWidth;}}return e||0;};c.prototype._handleToolbarResize=function(){this._handleResize(false);};c.prototype._handleContentResize=function(){this._handleResize(true);};c.prototype._handleResize=function(d){if(d&&this._iEndPoint==this._getEndPoint()){return;}this._doLayout();};c.prototype.setDesign=function(d,s){if(!s){return this.setProperty("design",d);}this._sAutoDesign=this.validateProperty("design",d);return this;};c.prototype.getActiveDesign=function(){var d=this.getDesign();if(d!=b.Auto){return d;}return this._sAutoDesign||d;};c.prototype.getTitleId=function(){if(!sap.m.Title){return"";}var d=this.getContent();for(var i=0;i<d.length;i++){var o=d[i];if(o instanceof sap.m.Title){return o.getId();}}return"";};c.prototype.isContextSensitive=B.prototype.isContextSensitive;c.prototype.setHTMLTag=B.prototype.setHTMLTag;c.prototype.getHTMLTag=B.prototype.getHTMLTag;c.prototype.applyTagAndContextClassFor=B.prototype.applyTagAndContextClassFor;return c;},true);
