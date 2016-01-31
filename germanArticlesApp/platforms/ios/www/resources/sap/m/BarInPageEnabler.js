/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/base/Object'],function(O){"use strict";var c={footer:{contextClass:"sapMFooter-CTX",tag:"Footer",ariaLabel:"BAR_ARIA_DESCRIPTION_FOOTER"},header:{contextClass:"sapMHeader-CTX",tag:"Header",ariaLabel:"BAR_ARIA_DESCRIPTION_HEADER"},subheader:{contextClass:"sapMSubHeader-CTX",tag:"Header",ariaLabel:"BAR_ARIA_DESCRIPTION_SUBHEADER"}};var I="sapMIBar";var B=O.extend("sap.m.BarInPageEnabler",{isContextSensitive:function(){return this.getDesign&&this.getDesign()==="Auto";},setHTMLTag:function(n){if(n===this.sTag){return this;}this.sTag=n;return this;},getHTMLTag:function(){if(!this.hasOwnProperty("sTag")){this.sTag=sap.m.IBarHTMLTag.Div;}return this.sTag;},applyTagAndContextClassFor:function(C){var o=c[C];if(!o){jQuery.sap.log.error("The context "+C+" is not known",this);return this;}this._sAriaLabel=o.ariaLabel;if(!this.isContextSensitive||!this.setHTMLTag){jQuery.sap.log.error("The bar control you are using does not implement all the members of the IBar interface",this);return this;}if(!this.getRenderer().shouldAddIBarContext()){this.addStyleClass(I+"-CTX");}this.setHTMLTag(o.tag);if(this.isContextSensitive()){this.addStyleClass(o.contextClass);}return this;},render:function(r,C){var t=C.getHTMLTag().toLowerCase(),l=C.getId()+"-ariaLabel";r.write("<"+t);r.addClass(I);if(C._sAriaLabel){r.writeAttribute("aria-labelledby",l);}if(this.shouldAddIBarContext(C)){r.addClass(I+"-CTX");}r.writeControlData(C);B.renderTooltip(r,C);this.decorateRootElement(r,C);r.writeClasses();r.writeStyles();r.write(">");if(C._sAriaLabel){var m=sap.ui.getCore().getLibraryResourceBundle("sap.m");r.write("<label id='"+l+"' style='display:none;' aria-hidden='true'>"+m.getText(C._sAriaLabel)+"</label>");}this.renderBarContent(r,C);r.write("</"+t+">");}});B.renderTooltip=function(r,C){var t=C.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t);}};B.addChildClassTo=function(C){C.addStyleClass("sapMBarChild");};return B;},true);
