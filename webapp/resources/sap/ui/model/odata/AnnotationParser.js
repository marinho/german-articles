/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/Device'],function(q,D){"use strict";var a={EnumMember:true,Path:true,PropertyPath:true,NavigationPropertyPath:true,AnnotationPath:true};var t={Binary:true,Bool:true,Date:true,DateTimeOffset:true,Decimal:true,Duration:true,Float:true,Guid:true,Int:true,String:true,TimeOfDay:true,LabelElementReference:true,EnumMember:true,Path:true,PropertyPath:true,NavigationPropertyPath:true,AnnotationPath:true};var m={And:true,Or:true,Eq:true,Ne:true,Gt:true,Ge:true,Lt:true,Le:true,If:true,Collection:true};var A={parse:function(M,x){this.oMetadata=M.metadata;var b={},s,S={},c,d,T,e,f,o,g,h,l,n,p,r,u,v,w,y,z,B,C,E,F,G,H,I,i,J;var K=this.getXPath();this.oServiceMetadata=this.oMetadata.getServiceMetadata();x=K.setNameSpace(x);s=K.selectNodes(x,"//d:Schema",x);for(i=0;i<s.length;i+=1){c=K.nextNode(s,i);S.Alias=c.getAttribute("Alias");S.Namespace=c.getAttribute("Namespace");}var L={};var N={};var O=this._parseReferences(x,L,N);if(O){b.annotationReferences=L;b.aliasDefinitions=N;}d=K.selectNodes(x,"//d:Term",x);if(d.length>0){T={};for(J=0;J<d.length;J+=1){e=K.nextNode(d,J);f=this.replaceWithAlias(e.getAttribute("Type"),N);T["@"+S.Alias+"."+e.getAttribute("Name")]=f;}b.termDefinitions=T;}if(!this.oMetadata.references){this.oMetadata.references=this.getAllPropertiesMetadata(this.oServiceMetadata);}o=this.oMetadata.references;if(o.extensions){b.propertyExtensions=o.extensions;}g=K.selectNodes(x,"//d:Annotations ",x);for(J=0;J<g.length;J+=1){h=K.nextNode(g,J);if(h.hasChildNodes()===false){continue;}l=h.getAttribute("Target");n=l.split(".")[0];if(n&&N[n]){l=l.replace(new RegExp(n,""),N[n]);}p=l;r=null;var P=null;if(l.indexOf("/")>0){p=l.split("/")[0];var Q=this.oServiceMetadata.dataServices&&this.oServiceMetadata.dataServices.schema&&this.oServiceMetadata.dataServices.schema.length;if(Q){for(var j=this.oServiceMetadata.dataServices.schema.length-1;j>=0;j--){var R=this.oServiceMetadata.dataServices.schema[j];if(R.entityContainer){var U=p.split('.');for(var k=R.entityContainer.length-1;k>=0;k--){if(R.entityContainer[k].name===U[U.length-1]){P=l.replace(p+"/","");break;}}}}}if(!P){r=l.replace(p+"/","");}}if(r){if(!b.propertyAnnotations){b.propertyAnnotations={};}if(!b.propertyAnnotations[p]){b.propertyAnnotations[p]={};}if(!b.propertyAnnotations[p][r]){b.propertyAnnotations[p][r]={};}u=K.selectNodes(x,"./d:Annotation",h);for(var V=0;V<u.length;V+=1){v=K.nextNode(u,V);w=this.replaceWithAlias(v.getAttribute("Term"),N);var W=h.getAttribute("Qualifier")||v.getAttribute("Qualifier");if(W){w+="#"+W;}if(v.hasChildNodes()===false){b.propertyAnnotations[p][r][w]=this.enrichFromPropertyValueAttributes({},v,N);}else{b.propertyAnnotations[p][r][w]=this.getPropertyValue(x,v,N);}}}else{var X;if(P){if(!b["EntityContainer"]){b["EntityContainer"]={};}if(!b["EntityContainer"][p]){b["EntityContainer"][p]={};}X=b["EntityContainer"][p];}else{if(!b[p]){b[p]={};}X=b[p];}y=p.replace(N[n],n);u=K.selectNodes(x,"./d:Annotation",h);for(var Y=0;Y<u.length;Y+=1){v=K.nextNode(u,Y);z=h.getAttribute("Qualifier")||v.getAttribute("Qualifier");B=this.replaceWithAlias(v.getAttribute("Term"),N);if(z){B+="#"+z;}C=this.getPropertyValue(x,v,N);C=this.setEdmTypes(C,o.types,p,S);if(!P){X[B]=C;}else{if(!X[P]){X[P]={};}X[P][B]=C;}}E=K.selectNodes(x,"//d:Annotations[contains(@Target, '"+y+"')]//d:PropertyValue[contains(@Path, '/')]//@Path",x);for(i=0;i<E.length;i+=1){F=K.nextNode(E,i);G=F.value;if(b.propertyAnnotations){if(b.propertyAnnotations[p]){if(b.propertyAnnotations[p][G]){continue;}}}H=G.split('/');if(!!this.findNavProperty(p,H[0],this.oServiceMetadata)){if(!b.expand){b.expand={};}if(!b.expand[p]){b.expand[p]={};}b.expand[p][H[0]]=H[0];}}I=K.selectNodes(x,"//d:Annotations[contains(@Target, '"+y+"')]//d:Path[contains(., '/')]",x);for(i=0;i<I.length;i+=1){F=K.nextNode(I,i);G=K.getNodeText(F);if(b.propertyAnnotations&&b.propertyAnnotations[p]&&b.propertyAnnotations[p][G]){continue;}if(!b.expand){b.expand={};}if(!b.expand[p]){b.expand[p]={};}H=G.split('/');if(!!this.findNavProperty(p,H[0],this.oServiceMetadata)){if(!b.expand){b.expand={};}if(!b.expand[p]){b.expand[p]={};}b.expand[p][H[0]]=H[0];}}}}return b;},_parseReferences:function(x,b,c){var f=false;var n,i;var d=this.getXPath();var s="//edmx:Reference/edmx:Include[@Namespace and @Alias]";var o=d.selectNodes(x,s,x);for(i=0;i<o.length;++i){f=true;n=d.nextNode(o,i);c[n.getAttribute("Alias")]=n.getAttribute("Namespace");}var r="//edmx:Reference[@Uri]/edmx:IncludeAnnotations[@TermNamespace]";var R=d.selectNodes(x,r,x);for(i=0;i<R.length;++i){f=true;n=d.nextNode(R,i);var T=n.getAttribute("TermNamespace");var e=n.getAttribute("TargetNamespace");var g=n.parentNode.getAttribute("Uri");if(e){if(!b[e]){b[e]={};}b[e][T]=g;}else{b[T]=g;}}return f;},getAllPropertiesMetadata:function(M){var o={},P={},b={},c=false,n,e,C,E={},d={},f={},g=false,h,r,s,T,u,R={types:P};if(!M.dataServices.schema){return R;}for(var i=M.dataServices.schema.length-1;i>=0;i-=1){o=M.dataServices.schema[i];if(o.entityType){n=o.namespace;e=o.entityType;C=o.complexType;for(var j in e){E=e[j];f={};d={};if(E.hasStream&&E.hasStream==="true"){continue;}for(var k in E.property){h=E.property[k];if(h.type.substring(0,n.length)===n){for(var l in C){if(C[l].name===h.type.substring(n.length+1)){for(k in C[l].property){r=C[l].property[k];d[C[l].name+"/"+r.name]=r.type;}}}}else{s=h.name;T=h.type;for(var p in h.extensions){u=h.extensions[p];if((u.name==="display-format")&&(u.value==="Date")){T="Edm.Date";}else{g=true;if(!f[s]){f[s]={};}if(u.namespace&&!f[s][u.namespace]){f[s][u.namespace]={};}f[s][u.namespace][u.name]=u.value;}}d[s]=T;}}if(!P[n+"."+E.name]){P[n+"."+E.name]={};}P[n+"."+E.name]=d;if(g){if(!b[n+"."+E.name]){c=true;}b[n+"."+E.name]={};b[n+"."+E.name]=f;}}}}if(c){R={types:P,extensions:b};}return R;},setEdmTypes:function(p,P,T,s){var o,e='';for(var b in p){if(p[b]){o=p[b];if(o.Value&&o.Value.Path){e=this.getEdmType(o.Value.Path,P,T,s);if(e){p[b].EdmType=e;}continue;}if(o.Path){e=this.getEdmType(o.Path,P,T,s);if(e){p[b].EdmType=e;}continue;}if(o.Facets){p[b].Facets=this.setEdmTypes(o.Facets,P,T,s);continue;}if(o.Data){p[b].Data=this.setEdmTypes(o.Data,P,T,s);continue;}if(b==="Data"){p.Data=this.setEdmTypes(o,P,T,s);continue;}if(o.Value&&o.Value.Apply){p[b].Value.Apply.Parameters=this.setEdmTypes(o.Value.Apply.Parameters,P,T,s);continue;}if(o.Value&&o.Type&&(o.Type==="Path")){e=this.getEdmType(o.Value,P,T,s);if(e){p[b].EdmType=e;}}}}return p;},getEdmType:function(p,P,T,s){var i=p.indexOf("/");if(i>-1){var b=p.substr(0,i);var n=this.findNavProperty(T,b,this.oServiceMetadata);if(n){var c=this.oMetadata._getEntityTypeByNavPropertyObject(n);if(c){T=c.entityType;p=p.substr(i+1);}}}if((p.charAt(0)==="@")&&(p.indexOf(s.Alias)===1)){p=p.slice(s.Alias.length+2);}if(p.indexOf("/")>=0){if(P[p.slice(0,p.indexOf("/"))]){T=p.slice(0,p.indexOf("/"));p=p.slice(p.indexOf("/")+1);}}for(var d in P[T]){if(p===d){return P[T][d];}}},enrichFromPropertyValueAttributes:function(b,n,c){var I={"Property":true,"Term":true,"Qualifier":true};var r=function(v){return this.replaceWithAlias(v,c);}.bind(this);for(var i=0;i<n.attributes.length;i+=1){if(!I[n.attributes[i].name]){var N=n.attributes[i].name;var v=n.attributes[i].value;if(N==="EnumMember"&&v.indexOf(" ")>-1){var V=v.split(" ");b[N]=V.map(r).join(" ");}else{b[N]=this.replaceWithAlias(v,c);}}}return b;},_getRecordValues:function(x,b,n){var N=[];var c=this.getXPath();for(var i=0;i<n.length;++i){var o=c.nextNode(n,i);var v=this.getPropertyValues(x,o,b);var T=o.getAttribute("Type");if(T){v["RecordType"]=this.replaceWithAlias(T,b);}N.push(v);}return N;},_getTextValues:function(x,n,b){var N=[];var c=this.getXPath();for(var i=0;i<n.length;i+=1){var o=c.nextNode(n,i);var v={};var T=c.getNodeText(o);v[o.nodeName]=b?this.replaceWithAlias(T,b):T;N.push(v);}return N;},_getTextValue:function(n,b){var x=this.getXPath();var v="";if(n.nodeName in a){v=this.replaceWithAlias(x.getNodeText(n),b);}else{v=x.getNodeText(n);}if(n.nodeName!=="String"){v=v.trim();}return v;},getPropertyValue:function(x,d,b){var c=this.getXPath();var p=d.nodeName==="Collection"?[]:{};if(d.hasChildNodes()){var r=c.selectNodes(x,"./d:Record",d);var R=this._getRecordValues(x,b,r);var C=c.selectNodes(x,"./d:Collection/d:Record | ./d:Collection/d:If/d:Record",d);var e=this._getRecordValues(x,b,C);var P=R.concat(e);if(P.length>0){if(C.length===0&&r.length>0){p=P[0];}else{p=P;}}else{var o=c.selectNodes(x,"./d:Collection/d:AnnotationPath | ./d:Collection/d:PropertyPath",d);if(o.length>0){p=this._getTextValues(x,o,b);}else{var f=c.selectNodes(x,"./d:*[not(local-name() = \"Annotation\")]",d);if(f.length>0){for(var i=0;i<f.length;i++){var g=c.nextNode(f,i);var v;var n=g.nodeName;var s=g.parentNode.nodeName;if(n==="Apply"){v=this.getApplyFunctions(x,g,b);}else{v=this.getPropertyValue(x,g,b);}if(m[s]){if(!Array.isArray(p)){p=[];}var V={};V[n]=v;p.push(V);}else if(n==="Collection"){p=v;}else{if(p[n]){q.sap.log.warning("Annotation contained multiple "+n+" values. Only the last "+"one will be stored: "+c.getPath(g));}p[n]=v;}}}else if(d.nodeName in t){p=this._getTextValue(d,b);}this.enrichFromPropertyValueAttributes(p,d,b);}}}else if(d.nodeName in t){p=this._getTextValue(d,b);}else if(d.nodeName.toLowerCase()==="null"){p=null;}else{this.enrichFromPropertyValueAttributes(p,d,b);}return p;},getPropertyValues:function(x,p,b){var P={},i;var c=this.getXPath();var o=c.selectNodes(x,"./d:Annotation",p);var d=c.selectNodes(x,"./d:PropertyValue",p);if(o.length===0&&d.length===0){P=this.getPropertyValue(x,p,b);}else{for(i=0;i<o.length;i++){var e=c.nextNode(o,i);var T=this.replaceWithAlias(e.getAttribute("Term"),b);P[T]=this.getPropertyValue(x,e,b);}for(i=0;i<d.length;i++){var f=c.nextNode(d,i);var s=f.getAttribute("Property");P[s]=this.getPropertyValue(x,f,b);var g=c.selectNodes(x,"./d:Apply",f);for(var n=0;n<g.length;n+=1){var h=c.nextNode(g,n);P[s]={};P[s]['Apply']=this.getApplyFunctions(x,h,b);}}}return P;},getApplyFunctions:function(x,b,c){var d=this.getXPath();var e={Name:b.getAttribute('Function'),Parameters:[]};var p=d.selectNodes(x,"./d:*",b);for(var i=0;i<p.length;i+=1){var P=d.nextNode(p,i);var f={Type:P.nodeName};if(P.nodeName==="Apply"){f.Value=this.getApplyFunctions(x,P);}else if(P.nodeName==="LabeledElement"){f.Value=this.getPropertyValue(x,P,c);f.Name=f.Value.Name;delete f.Value.Name;}else if(m[P.nodeName]){f.Value=this.getPropertyValue(x,P,c);}else{f.Value=d.getNodeText(P);}e.Parameters.push(f);}return e;},findNavProperty:function(e,p,M){for(var i=M.dataServices.schema.length-1;i>=0;i-=1){var o=M.dataServices.schema[i];if(o.entityType){var n=o.namespace+".";var E=o.entityType;for(var k=E.length-1;k>=0;k-=1){if(n+E[k].name===e&&E[k].navigationProperty){for(var j=0;j<E[k].navigationProperty.length;j+=1){if(E[k].navigationProperty[j].name===p){return E[k].navigationProperty[j];}}}}}}return null;},replaceWithAlias:function(v,b,r){if(r===undefined){r=1;}for(var s in b){if(v.indexOf(s+".")>=0&&v.indexOf("."+s+".")<0){v=v.replace(s+".",b[s]+".");r--;if(r===0){return v;}}}return v;},getXPath:function(){var x={};if(D.browser.internet_explorer){x={setNameSpace:function(o){o.setProperty("SelectionNamespaces",'xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx" xmlns:d="http://docs.oasis-open.org/odata/ns/edm"');o.setProperty("SelectionLanguage","XPath");return o;},selectNodes:function(o,x,i){return i.selectNodes(x);},nextNode:function(n){return n.nextNode();},getNodeText:function(n){return n.text;}};}else{x={setNameSpace:function(o){return o;},nsResolver:function(p){var n={"edmx":"http://docs.oasis-open.org/odata/ns/edmx","d":"http://docs.oasis-open.org/odata/ns/edm"};return n[p]||null;},selectNodes:function(o,p,i){var b=o.evaluate(p,i,this.nsResolver,7,null);b.length=b.snapshotLength;return b;},nextNode:function(n,i){return n.snapshotItem(i);},getNodeText:function(n){return n.textContent;}};}x.getPath=function(n){var p="";var I="getAttribute"in n?n.getAttribute("id"):"";var T=n.tagName?n.tagName:"";if(I){p='id("'+I+'")';}else if(n instanceof Document){p="/";}else if(T.toLowerCase()==="body"){p=T;}else if(n.parentNode){var P=1;for(var i=0;i<n.parentNode.childNodes.length;++i){if(n.parentNode.childNodes[i]===n){p=x.getPath(n.parentNode)+"/"+T+"["+P+"]";break;}else if(n.parentNode.childNodes[i].nodeType===1&&n.parentNode.childNodes[i].tagName===T){++P;}}}else{q.sap.log.error("Wrong Input node - cannot find XPath to it: "+T);}return p;};return x;}};return A;});