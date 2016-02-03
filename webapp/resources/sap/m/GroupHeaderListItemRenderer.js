/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ListItemBaseRenderer','sap/ui/core/Renderer'],function(q,L,R){"use strict";var G=R.extend(L);G.openItemTag=function(r,l){r.write(l.getTable()?"<tr":"<li");};G.closeItemTag=function(r,l){r.write(l.getTable()?"</tr>":"</li>");};G.renderType=function(r,l){var t=l.getTable();t&&r.write('<td role="gridcell" class="sapMListTblNavCol">');L.renderType.apply(this,arguments);t&&r.write('</td>');};G.handleNoFlex=function(r,l){};G.renderCounter=function(r,l){};G.getAriaRole=function(l){return l.getTable()?"row":"option";};G.getAriaDescribedBy=function(l){var d=this.getAriaAnnouncement("group_header"),b=L.getAriaDescribedBy.call(this,l)||"";return d+" "+b;};G.renderLIAttributes=function(r,l){r.addClass("sapMGHLI");if(l.getUpperCase()){r.addClass("sapMGHLIUpperCase");}};G.renderLIContentWrapper=function(r,l){var t=l.getTable();if(t){r.write('<td class="sapMGHLICell" role="gridcell"');r.writeAttribute("colspan",t.getColSpan());r.write(">");}L.renderLIContentWrapper.apply(this,arguments);if(t){r.write("</td>");}};G.renderLIContent=function(r,l){var t=l.getTitleTextDirection();r.write("<label class='sapMGHLITitle'");if(t!=sap.ui.core.TextDirection.Inherit){r.writeAttribute("dir",t.toLowerCase());}r.write(">");r.writeEscaped(l.getTitle());var c=l.getCount();if(c){r.writeEscaped(" ("+c+")");}r.write("</label>");};G.addLegacyOutlineClass=function(r,l){if(!l.getTable()){L.addLegacyOutlineClass.apply(this,arguments);}};return G;},true);
