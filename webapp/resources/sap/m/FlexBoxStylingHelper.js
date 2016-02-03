/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./FlexBoxCssPropertyMap'],function(q,F){"use strict";if(q.support.useFlexBoxPolyfill){q.sap.require("sap.ui.thirdparty.flexie");}var a={};a.setFlexBoxStyles=function(r,c){var d;var i=c.getDisplayInline();var D=c.getDirection().replace(/\W+/g,"-").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase();var f=c.getFitContainer();var j=c.getJustifyContent().replace(/\W+/g,"-").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase();var A=c.getAlignItems().replace(/\W+/g,"-").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase();if(i){d="inline-flex";}else{d="flex";}if(f&&!(c.getParent()instanceof sap.m.FlexBox)){r.addStyle("width","auto");r.addStyle("height","100%");}if(j==="start"||j==="end"){j="flex-"+j;}if(A==="start"||A==="end"){A="flex-"+A;}a.setStyle(r,c,"display",d);if(D!=="row"){a.setStyle(r,c,"flex-direction",D);}if(j!=="flex-start"){a.setStyle(r,c,"justify-content",j);}if(A!=="stretch"){a.setStyle(r,c,"align-items",A);}};a.setFlexItemStyles=function(r,l,c){r=r||null;c=c||null;var o=l.getOrder();if(o){a.setStyle(r,c,"order",o);}var g=l.getGrowFactor();if(g!==undefined){a.setStyle(r,c,"flex-grow",g);}var b=l.getAlignSelf().toLowerCase();if(b==="start"||b==="end"){b="flex-"+b;}if(b&&b!=="auto"){a.setStyle(r,c,"align-self",b);}if(q.support.newFlexBoxLayout||q.support.ie10FlexBoxLayout){var s=l.getShrinkFactor();if(s!==1){a.setStyle(r,c,"flex-shrink",s);}var d=l.getBaseSize().toLowerCase();if(d!==undefined){sap.m.FlexBoxStylingHelper.setStyle(r,c,"flex-basis",d);}}};a.setStyle=function(r,c,p,v){if(typeof(v)==="string"){v=v.toLowerCase();}var V="";if(q.support.flexBoxPrefixed){if(sap.ui.Device.browser.webkit){V="-webkit-";}else if(sap.ui.Device.browser.mozilla){V="-moz-";}else if(sap.ui.Device.browser.internet_explorer){V="-ms-";}}if(q.support.newFlexBoxLayout){a.setFinalSpecStyle(r,c,p,v,V);}else if(q.support.flexBoxLayout||q.support.ie10FlexBoxLayout){a.setOldSpecStyle(r,c,p,v,V);}};a.setFinalSpecStyle=function(r,c,p,v,V){if(q.support.flexBoxPrefixed){a.writeStyle(r,c,p,v,V);}a.writeStyle(r,c,p,v);};a.setOldSpecStyle=function(r,c,p,v,V){var s="";if(V=="-ms-"){s="specie10";}else{s="spec0907";}if(F[s][p]!==null&&F[s][p]!=="<idem>"){var l=null;if(typeof(F[s][p])==="object"){if(F[s][p]["<number>"]){l={};for(var k in F[s][p]["<number>"]){if(F[s][p]["<number>"][k]==="<number>"){l[k]=v;}else{l[k]=F[s][p]["<number>"][k];}}}else{l=F[s][p][v];}}else{l=F[s][p][v];}if(l!==null&&l!=="<idem>"){if(typeof(l)==="object"){for(var L in l){a.writeStyle(r,c,L,l[L],V);}}}}};a.writeStyle=function(r,c,p,v,V){var P="";var s="";V=typeof V!=="undefined"?V:"";if(p!=="display"){P=V;}else{s=V;}if(r){r.addStyle(P+p,s+v);}else{q(c).css(P+p,s+v);}};a.applyFlexBoxPolyfill=function(i,s){if(!q.support.useFlexBoxPolyfill){q.sap.log.warning("FlexBox Polyfill is not being used");return;}var j={Start:"start",Center:"center",End:"end",SpaceBetween:"justify"};var b={Start:"start",Center:"center",End:"end",Stretch:"stretch"};var o="";var d="";switch(s.direction){case"Column":o="vertical";d="normal";break;case"RowReverse":o="horizontal";d="reverse";break;case"ColumnReverse":o="vertical";d="reverse";break;case"Row":default:o="horizontal";d="normal";}var c=new window.Flexie.box({target:document.getElementById(i),orient:o,align:b[s.alignItems],direction:d,pack:j[s.justifyContent],flexMatrix:s.flexMatrix,ordinalMatrix:s.ordinalMatrix,dynamic:true});return c;};return a;},true);
