/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Filter','sap/ui/model/Sorter','sap/ui/model/Filter','sap/ui/core/format/DateFormat'],function(q,O,S,F,D){"use strict";var r=/^([-+]?)0*(\d+)(\.\d+|)$/,a=/\.$/,b=/0+$/;var c=function(){};c.createSortParams=function(f){var g;if(!f||f.length==0){return;}g="$orderby=";for(var i=0;i<f.length;i++){var o=f[i];if(o instanceof S){g+=o.sPath;g+=o.bDescending?"%20desc":"%20asc";g+=",";}}g=g.slice(0,-1);return g;};c.createFilterParams=function(f,m,E){if(!f||f.length==0){return;}return"$filter="+this._createFilterParams(f,m,E);};c._createFilterParams=function(f,m,E){var g;if(!f||f.length==0){return;}var o={},h=0,k,g="",l=0,t=this;q.each(f,function(j,i){if(i.sPath){k=o[i.sPath];if(!k){k=o[i.sPath]=[];h++;}}else{k=o["__multiFilter"];if(!k){k=o["__multiFilter"]=[];h++;}}k.push(i);});q.each(o,function(P,k){if(k.length>1){g+='(';}q.each(k,function(i,j){if(j instanceof O){if(j.aValues.length>1){g+='(';}q.each(j.aValues,function(i,n){if(i>0){if(j.bAND){g+="%20and%20";}else{g+="%20or%20";}}g=t._createFilterSegment(j.sPath,m,E,n.operator,n.value1,n.value2,g);});if(j.aValues.length>1){g+=')';}}else if(j._bMultiFilter){g+=t._resolveMultiFilter(j,m,E);}else{g=t._createFilterSegment(j.sPath,m,E,j.sOperator,j.oValue1,j.oValue2,g);}if(i<k.length-1){g+="%20or%20";}});if(k.length>1){g+=')';}if(l<h-1){g+="%20and%20";}l++;});return g;};c._createUrlParamsArray=function(P){var u,t=q.type(P),f;if(t==="array"){return P;}u=[];if(t==="object"){f=this._encodeURLParameters(P);if(f){u.push(f);}}else if(t==="string"){if(P){u.push(P);}}return u;};c._encodeURLParameters=function(P){if(!P){return"";}var u=[];q.each(P,function(n,v){if(q.type(v)==="string"){v=encodeURIComponent(v);}n=q.sap.startsWith(n,'$')?n:encodeURIComponent(n);u.push(n+"="+v);});return u.join("&");};c.setOrigin=function(f,P){var o,g,C;if(!f||!P||f.indexOf(";mo")>0){return f;}if(typeof P=="string"){o=P;}else{o=P.alias;if(!o){g=P.system;C=P.client;if(!g||!C){q.sap.log.warning("ODataUtils.setOrigin: No Client or System ID given for Origin");return f;}o="sid("+g+"."+C+")";}}var u=f.split("?");var B=u[0];var U=u[1]?"?"+u[1]:"";var t="";if(q.sap.endsWith(B,"/")){B=B.substring(0,B.length-1);t="/";}var h=/(;o=[^/]+)$/;if(B.match(h)!=null){if(P.force){B=B.replace(h,";o="+o);return B+t+U;}return f;}B=B+";o="+o+t;return B+U;};c._resolveMultiFilter=function(m,M,E){var t=this,f=m.aFilters,g="";if(f){g+="(";q.each(f,function(i,o){if(o._bMultiFilter){g+=t._resolveMultiFilter(o,M,E);}else if(o.sPath){g+=t._createFilterSegment(o.sPath,M,E,o.sOperator,o.oValue1,o.oValue2,"");}if(i<(f.length-1)){if(m.bAnd){g+="%20and%20";}else{g+="%20or%20";}}});g+=")";}return g;};c._createFilterSegment=function(P,m,E,o,v,V,f){var g,t;if(E){g=m._getPropertyMetadata(E,P);t=g&&g.type;}if(t){v=this.formatValue(v,t);V=(V!=null)?this.formatValue(V,t):null;}else{}if(v){v=q.sap.encodeURL(String(v));}if(V){V=q.sap.encodeURL(String(V));}switch(o){case"EQ":case"NE":case"GT":case"GE":case"LT":case"LE":f+=P+"%20"+o.toLowerCase()+"%20"+v;break;case"BT":f+="("+P+"%20ge%20"+v+"%20and%20"+P+"%20le%20"+V+")";break;case"Contains":f+="substringof("+v+","+P+")";break;case"StartsWith":f+="startswith("+P+","+v+")";break;case"EndsWith":f+="endswith("+P+","+v+")";break;default:f+="true";}return f;};c.formatValue=function(v,t){if(!this.oDateTimeFormat){this.oDateTimeFormat=D.getDateInstance({pattern:"'datetime'''yyyy-MM-dd'T'HH:mm:ss''"});this.oDateTimeOffsetFormat=D.getDateInstance({pattern:"'datetimeoffset'''yyyy-MM-dd'T'HH:mm:ss'Z'''"});this.oTimeFormat=D.getTimeInstance({pattern:"'time'''HH:mm:ss''"});}if(v===null||v===undefined){return"null";}var V;switch(t){case"Edm.String":V="'"+String(v).replace(/'/g,"''")+"'";break;case"Edm.Time":V="time'"+v+"'";break;case"Edm.DateTime":V=this.oDateTimeFormat.format(new Date(v),true);break;case"Edm.DateTimeOffset":V=this.oDateTimeOffsetFormat.format(new Date(v),true);break;case"Edm.Guid":V="guid'"+v+"'";break;case"Edm.Decimal":V=v+"M";break;case"Edm.Int64":V=v+"L";break;case"Edm.Double":V=v+"d";break;case"Edm.Float":case"Edm.Single":V=v+"f";break;case"Edm.Binary":V="binary'"+v+"'";break;default:V=String(v);break;}return V;};function s(v,V){if(v===V){return 0;}if(v===null||V===null||v===undefined||V===undefined){return NaN;}return v>V?1:-1;}function p(v){var m;if(typeof v!=="string"){return undefined;}m=r.exec(v);if(!m){return undefined;}return{sign:m[1]==="-"?-1:1,integerLength:m[2].length,abs:m[2]+m[3].replace(b,"").replace(a,"")};}function d(v,V){var o,f,R;if(v===V){return 0;}o=p(v);f=p(V);if(!o||!f){return NaN;}if(o.sign!==f.sign){return o.sign>f.sign?1:-1;}R=s(o.integerLength,f.integerLength)||s(o.abs,f.abs);return o.sign*R;}function e(v){if(v instanceof Date){return v.getTime();}if(v&&v.__edmType==="Edm.Time"){return v.ms;}return v;}c.compare=function(v,V,A){return A?d(v,V):s(e(v),e(V));};c.getComparator=function(E){switch(E){case"Edm.Date":case"Edm.DateTime":case"Edm.DateTimeOffset":case"Edm.Time":return c.compare;case"Edm.Decimal":case"Edm.Int64":return d;default:return s;}};return c;},true);
