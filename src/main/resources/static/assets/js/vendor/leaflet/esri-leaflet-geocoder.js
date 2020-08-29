/* esri-leaflet-geocoder - v2.2.13 - Tue Jul 03 2018 13:48:26 GMT-0700 (PDT)
 * Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("statics/static/js/map/leaflet"),require("statics/static/js/map/esri-leaflet")):"function"==typeof define&&define.amd?define(["exports","statics/static/js/map/leaflet","esri-leaflet"],t):t((e.L=e.L||{},e.L.esri=e.L.esri||{},e.L.esri.Geocoding={}),e.L,e.L.esri)}(this,function(e, t, s){"use strict";function i(e){return new g(e)}function o(e){return new p(e)}function r(e){return new f(e)}function n(e){return new v(e)}function a(e, t){return new m(e,t)}function l(e){return new _(e)}function u(e){return new y(e)}function d(e){return new b(e)}function h(e){return new x(e)}function c(e){return new C(e)}var g=s.Task.extend({path:"findAddressCandidates",params:{outSr:4326,forStorage:!1,outFields:"*",maxLocations:20},setters:{address:"address",neighborhood:"neighborhood",city:"city",subregion:"subregion",region:"region",postal:"postal",country:"country",text:"singleLine",category:"category",token:"token",key:"magicKey",fields:"outFields",forStorage:"forStorage",maxLocations:"maxLocations",countries:"sourceCountry"},initialize:function(e){e=e||{},e.url=e.url||S,s.Task.prototype.initialize.call(this,e)},within:function(e){return e=t.latLngBounds(e),this.params.searchExtent=s.Util.boundsToExtent(e),this},nearby:function(e,s){var i=t.latLng(e);return this.params.location=i.lng+","+i.lat,this.params.distance=Math.min(Math.max(s,2e3),5e4),this},run:function(e,t){return this.options.customParam&&(this.params[this.options.customParam]=this.params.singleLine,delete this.params.singleLine),this.request(function(s,i){var o=this._processGeocoderResponse,r=s?void 0:o(i);e.call(t,s,{results:r},i)},this)},_processGeocoderResponse:function(e){for(var i=[],o=0;o<e.candidates.length;o++){var r=e.candidates[o];if(r.extent)var n=s.Util.extentToBounds(r.extent);i.push({text:r.address,bounds:n,score:r.score,latlng:t.latLng(r.location.y,r.location.x),properties:r.attributes})}return i}}),p=s.Task.extend({path:"reverseGeocode",params:{outSR:4326,returnIntersection:!1},setters:{distance:"distance",language:"langCode",intersection:"returnIntersection"},initialize:function(e){e=e||{},e.url=e.url||S,s.Task.prototype.initialize.call(this,e)},latlng:function(e){var s=t.latLng(e);return this.params.location=s.lng+","+s.lat,this},run:function(e,s){return this.request(function(i,o){var r;r=i?void 0:{latlng:t.latLng(o.location.y,o.location.x),address:o.address},e.call(s,i,r,o)},this)}}),f=s.Task.extend({path:"suggest",params:{},setters:{text:"text",category:"category",countries:"countryCode",maxSuggestions:"maxSuggestions"},initialize:function(e){e=e||{},e.url||(e.url=S,e.supportsSuggest=!0),s.Task.prototype.initialize.call(this,e)},within:function(e){e=t.latLngBounds(e),e=e.pad(.5);var i=e.getCenter(),o=e.getNorthWest();return this.params.location=i.lng+","+i.lat,this.params.distance=Math.min(Math.max(i.distanceTo(o),2e3),5e4),this.params.searchExtent=s.Util.boundsToExtent(e),this},nearby:function(e,s){var i=t.latLng(e);return this.params.location=i.lng+","+i.lat,this.params.distance=Math.min(Math.max(s,2e3),5e4),this},run:function(e,t){if(this.options.supportsSuggest)return this.request(function(s,i){e.call(t,s,i,i)},this);console.warn("this geocoding service does not support asking for suggestions")}}),v=s.Service.extend({initialize:function(e){e=e||{},e.url?(s.Service.prototype.initialize.call(this,e),this._confirmSuggestSupport()):(e.url=S,e.supportsSuggest=!0,s.Service.prototype.initialize.call(this,e))},geocode:function(){return i(this)},reverse:function(){return o(this)},suggest:function(){return r(this)},_confirmSuggestSupport:function(){this.metadata(function(e,t){e||(t.capabilities&&t.capabilities.indexOf("Suggest")>-1?this.options.supportsSuggest=!0:this.options.supportsSuggest=!1,this.options.customParam=t.singleLineAddressField.name)},this)}}),m=t.Evented.extend({options:{zoomToResult:!0,useMapBounds:12,searchBounds:null},initialize:function(e,s){if(t.Util.setOptions(this,s),this._control=e,!s||!s.providers||!s.providers.length)throw new Error("You must specify at least one provider");this._providers=s.providers},_geocode:function(e,s,i){var o,r=0,n=[],a=t.Util.bind(function(t,s){r--,t||(s&&(n=n.concat(s)),r<=0&&(o=this._boundsFromResults(n),this.fire("results",{results:n,bounds:o,latlng:o?o.getCenter():void 0,text:e},!0),this.options.zoomToResult&&o&&this._control._map.fitBounds(o),this.fire("load")))},this);if(s)r++,i.results(e,s,this._searchBounds(),a);else for(var l=0;l<this._providers.length;l++)r++,this._providers[l].results(e,s,this._searchBounds(),a)},_suggest:function(e){var s=this._providers.length,i=t.Util.bind(function(e,i){return t.Util.bind(function(t,o){if(!t){var r;if(s-=1,e.length<2)return this._suggestions.innerHTML="",void(this._suggestions.style.display="none");if(o.length)for(r=0;r<o.length;r++)o[r].provider=i;else this._control._renderSuggestions(o);if(i._lastRender!==e&&i.nodes){for(r=0;r<i.nodes.length;r++)i.nodes[r].parentElement&&this._control._suggestions.removeChild(i.nodes[r]);i.nodes=[]}o.length&&this._control._input.value===e&&(this._control.clearSuggestions(i.nodes),i._lastRender=e,i.nodes=this._control._renderSuggestions(o),this._control._nodes=[])}},this)},this);this._pendingSuggestions=[];for(var o=0;o<this._providers.length;o++){var r=this._providers[o],n=r.suggestions(e,this._searchBounds(),i(e,r));this._pendingSuggestions.push(n)}},_searchBounds:function(){return null!==this.options.searchBounds?this.options.searchBounds:!1===this.options.useMapBounds?null:!0===this.options.useMapBounds?this._control._map.getBounds():this.options.useMapBounds<=this._control._map.getZoom()?this._control._map.getBounds():null},_boundsFromResults:function(e){if(e.length){for(var s=t.latLngBounds([0,0],[0,0]),i=[],o=[],r=e.length-1;r>=0;r--){var n=e[r];o.push(n.latlng),n.bounds&&n.bounds.isValid()&&!n.bounds.equals(s)&&i.push(n.bounds)}for(var a=t.latLngBounds(o),l=0;l<i.length;l++)a.extend(i[l]);return a}},_getAttribution:function(){for(var e=[],t=this._providers,s=0;s<t.length;s++)t[s].options.attribution&&e.push(t[s].options.attribution);return e.join(", ")}}),_=v.extend({options:{label:"Places and Addresses",maxResults:5},suggestions:function(e,t,s){var i=this.suggest().text(e);return t&&i.within(t),this.options.countries&&i.countries(this.options.countries),this.options.categories&&i.category(this.options.categories),i.maxSuggestions(this.options.maxResults),i.run(function(e,t,i){var o=[];if(!e)for(;i.suggestions.length&&o.length<=this.options.maxResults-1;){var r=i.suggestions.shift();r.isCollection||o.push({text:r.text,unformattedText:r.text,magicKey:r.magicKey})}s(e,o)},this)},results:function(e,t,s,i){var o=this.geocode().text(e);return t&&o.key(t),o.maxLocations(this.options.maxResults),s&&o.within(s),this.options.forStorage&&o.forStorage(!0),this.options.countries&&o.countries(this.options.countries),this.options.categories&&o.category(this.options.categories),o.run(function(e,t){i(e,t.results)},this)}}),y=t.Control.extend({includes:t.Evented.prototype,options:{position:"topleft",collapseAfterResult:!0,expanded:!1,allowMultipleResults:!0,placeholder:"Search for places or addresses",title:"Location Search"},initialize:function(e){t.Util.setOptions(this,e),e&&e.providers&&e.providers.length||(e||(e={}),e.providers=[l()]),this._geosearchCore=a(this,e),this._geosearchCore._providers=e.providers,this._geosearchCore.addEventParent(this);for(var s=0;s<this._geosearchCore._providers.length;s++)this._geosearchCore._providers[s].addEventParent(this);this._geosearchCore._pendingSuggestions=[],t.Control.prototype.initialize.call(e)},_renderSuggestions:function(e){var s;e.length>0&&(this._suggestions.style.display="block"),this._suggestions.style.maxHeight=this._map.getSize().y-this._suggestions.offsetTop-this._wrapper.offsetTop-10+"px";for(var i,o,r=[],n=[],a=0;a<e.length;a++){var l=e[a];if(!o&&this._geosearchCore._providers.length>1&&s!==l.provider.options.label&&(o=t.DomUtil.create("span","geocoder-control-header",this._suggestions),o.textContent=l.provider.options.label,o.innerText=l.provider.options.label,s=l.provider.options.label,r.push(o)),i||(i=t.DomUtil.create("ul","geocoder-control-list",this._suggestions)),-1===n.indexOf(l.text)){var u=t.DomUtil.create("li","geocoder-control-suggestion",i);u.innerHTML=l.text,u.provider=l.provider,u["data-magic-key"]=l.magicKey,u.unformattedText=l.unformattedText}else for(var d=0;d<i.childNodes.length;d++)i.childNodes[d].innerHTML===l.text&&(i.childNodes[d]["data-magic-key"]+=","+l.magicKey);n.push(l.text)}return t.DomUtil.removeClass(this._input,"geocoder-control-loading"),r.push(i),r},_boundsFromResults:function(e){if(e.length){for(var s=t.latLngBounds([0,0],[0,0]),i=[],o=[],r=e.length-1;r>=0;r--){var n=e[r];o.push(n.latlng),n.bounds&&n.bounds.isValid()&&!n.bounds.equals(s)&&i.push(n.bounds)}for(var a=t.latLngBounds(o),l=0;l<i.length;l++)a.extend(i[l]);return a}},clear:function(){this._suggestions.innerHTML="",this._suggestions.style.display="none",this._input.value="",this.options.collapseAfterResult&&(this._input.placeholder="",t.DomUtil.removeClass(this._wrapper,"geocoder-control-expanded")),!this._map.scrollWheelZoom.enabled()&&this._map.options.scrollWheelZoom&&this._map.scrollWheelZoom.enable()},clearSuggestions:function(){if(this._nodes)for(var e=0;e<this._nodes.length;e++)this._nodes[e].parentElement&&this._suggestions.removeChild(this._nodes[e])},_setupClick:function(){t.DomUtil.addClass(this._wrapper,"geocoder-control-expanded"),this._input.focus()},disable:function(){this._input.disabled=!0,t.DomUtil.addClass(this._input,"geocoder-control-input-disabled"),t.DomEvent.removeListener(this._wrapper,"click",this._setupClick,this)},enable:function(){this._input.disabled=!1,t.DomUtil.removeClass(this._input,"geocoder-control-input-disabled"),t.DomEvent.addListener(this._wrapper,"click",this._setupClick,this)},getAttribution:function(){for(var e=[],t=0;t<this._providers.length;t++)this._providers[t].options.attribution&&e.push(this._providers[t].options.attribution);return e.join(", ")},geocodeSuggestion:function(e){var t=e.target||e.srcElement;t.classList.length<1&&(t=t.parentNode),this._geosearchCore._geocode(t.unformattedText,t["data-magic-key"],t.provider),this.clear()},onAdd:function(e){s.Util.setEsriAttribution(e),this._map=e,this._wrapper=t.DomUtil.create("div","geocoder-control"),this._input=t.DomUtil.create("input","geocoder-control-input leaflet-bar",this._wrapper),this._input.title=this.options.title,this.options.expanded&&(t.DomUtil.addClass(this._wrapper,"geocoder-control-expanded"),this._input.placeholder=this.options.placeholder),this._suggestions=t.DomUtil.create("div","geocoder-control-suggestions leaflet-bar",this._wrapper);var i=this._geosearchCore._getAttribution();return e.attributionControl&&e.attributionControl.addAttribution(i),t.DomEvent.addListener(this._input,"focus",function(e){this._input.placeholder=this.options.placeholder,t.DomUtil.addClass(this._wrapper,"geocoder-control-expanded")},this),t.DomEvent.addListener(this._wrapper,"click",this._setupClick,this),t.DomEvent.addListener(this._suggestions,"mousedown",this.geocodeSuggestion,this),this._suggestions.addEventListener("touchend",t.Util.bind(this.geocodeSuggestion,this)),t.DomEvent.addListener(this._input,"blur",function(e){this.clear()},this),t.DomEvent.addListener(this._input,"keydown",function(e){var s=(e.target||e.srcElement).value;t.DomUtil.addClass(this._wrapper,"geocoder-control-expanded");for(var i,o=this._suggestions.querySelectorAll(".geocoder-control-suggestion"),r=this._suggestions.querySelectorAll(".geocoder-control-selected")[0],n=0;n<o.length;n++)if(o[n]===r){i=n;break}switch(e.keyCode){case 13:r?(this._geosearchCore._geocode(r.unformattedText,r["data-magic-key"],r.provider),this.clear()):this.options.allowMultipleResults&&s.length>=2?(this._geosearchCore._geocode(this._input.value,void 0),this.clear()):1===o.length?(t.DomUtil.addClass(o[0],"geocoder-control-selected"),this._geosearchCore._geocode(o[0].innerHTML,o[0]["data-magic-key"],o[0].provider)):(this.clear(),this._input.blur()),t.DomEvent.preventDefault(e);break;case 38:r&&t.DomUtil.removeClass(r,"geocoder-control-selected");var a=o[i-1];r&&a?t.DomUtil.addClass(a,"geocoder-control-selected"):t.DomUtil.addClass(o[o.length-1],"geocoder-control-selected"),t.DomEvent.preventDefault(e);break;case 40:r&&t.DomUtil.removeClass(r,"geocoder-control-selected");var l=o[i+1];r&&l?t.DomUtil.addClass(l,"geocoder-control-selected"):t.DomUtil.addClass(o[0],"geocoder-control-selected"),t.DomEvent.preventDefault(e);break;default:for(var u=0;u<this._geosearchCore._pendingSuggestions.length;u++){var d=this._geosearchCore._pendingSuggestions[u];d&&d.abort&&!d.id&&d.abort()}}},this),t.DomEvent.addListener(this._input,"keyup",t.Util.throttle(function(e){var s=e.which||e.keyCode,i=(e.target||e.srcElement).value;return i.length<2?(this._suggestions.innerHTML="",this._suggestions.style.display="none",void t.DomUtil.removeClass(this._input,"geocoder-control-loading")):27===s?(this._suggestions.innerHTML="",void(this._suggestions.style.display="none")):void(13!==s&&38!==s&&40!==s&&this._input.value!==this._lastValue&&(this._lastValue=this._input.value,t.DomUtil.addClass(this._input,"geocoder-control-loading"),this._geosearchCore._suggest(i)))},50,this),this),t.DomEvent.disableClickPropagation(this._wrapper),t.DomEvent.addListener(this._suggestions,"mouseover",function(t){e.scrollWheelZoom.enabled()&&e.options.scrollWheelZoom&&e.scrollWheelZoom.disable()}),t.DomEvent.addListener(this._suggestions,"mouseout",function(t){!e.scrollWheelZoom.enabled()&&e.options.scrollWheelZoom&&e.scrollWheelZoom.enable()}),this._geosearchCore.on("load",function(e){t.DomUtil.removeClass(this._input,"geocoder-control-loading"),this.clear(),this._input.blur()},this),this._wrapper}}),b=s.FeatureLayerService.extend({options:{label:"Feature Layer",maxResults:5,bufferRadius:1e3,formatSuggestion:function(e){return e.properties[this.options.searchFields[0]]}},initialize:function(e){s.FeatureLayerService.prototype.initialize.call(this,e),"string"==typeof this.options.searchFields&&(this.options.searchFields=[this.options.searchFields]),this._suggestionsQuery=this.query(),this._resultsQuery=this.query()},suggestions:function(e,t,s){var i=this._suggestionsQuery.where(this._buildQuery(e)).returnGeometry(!1);return t&&i.intersects(t),this.options.idField&&i.fields([this.options.idField].concat(this.options.searchFields)),i.run(function(e,t,i){if(e)s(e,[]);else{this.options.idField=i.objectIdFieldName;for(var o=[],r=t.features.length-1;r>=0;r--){var n=t.features[r];o.push({text:this.options.formatSuggestion.call(this,n),unformattedText:n.properties[this.options.searchFields[0]],magicKey:n.id})}s(e,o.slice(0,this.options.maxResults))}},this)},results:function(e,s,i,o){var r=this._resultsQuery;return s?(delete r.params.where,r.featureIds([s])):r.where(this._buildQuery(e)),i&&r.within(i),r.run(t.Util.bind(function(e,t){for(var s=[],i=0;i<t.features.length;i++){var r=t.features[i];if(r){var n=this._featureBounds(r),a={latlng:n.getCenter(),bounds:n,text:this.options.formatSuggestion.call(this,r),properties:r.properties,geojson:r};s.push(a),delete this._resultsQuery.params.objectIds}}o(e,s)},this))},orderBy:function(e,t){this._suggestionsQuery.orderBy(e,t)},_buildQuery:function(e){for(var t=[],s=this.options.searchFields.length-1;s>=0;s--){var i='upper("'+this.options.searchFields[s]+'")';t.push(i+" LIKE upper('%"+e+"%')")}return this.options.where?this.options.where+" AND ("+t.join(" OR ")+")":t.join(" OR ")},_featureBounds:function(e){var s=t.geoJson(e);if("Point"===e.geometry.type){var i=s.getBounds().getCenter(),o=this.options.bufferRadius/40075017*360/Math.cos(180/Math.PI*i.lat),r=this.options.bufferRadius/40075017*360;return t.latLngBounds([i.lat-r,i.lng-o],[i.lat+r,i.lng+o])}return s.getBounds()}}),x=s.MapService.extend({options:{layers:[0],label:"Map Service",bufferRadius:1e3,maxResults:5,formatSuggestion:function(e){return e.properties[e.displayFieldName]+" <small>"+e.layerName+"</small>"}},initialize:function(e){s.MapService.prototype.initialize.call(this,e),this._getIdFields()},suggestions:function(e,t,s){return this.find().text(e).fields(this.options.searchFields).returnGeometry(!1).layers(this.options.layers).run(function(e,t,i){var o=[];if(!e){var r=Math.min(this.options.maxResults,t.features.length);i.results=i.results.reverse();for(var n=0;n<r;n++){var a=t.features[n],l=i.results[n],u=l.layerId,d=this._idFields[u];a.layerId=u,a.layerName=this._layerNames[u],a.displayFieldName=this._displayFields[u],d&&o.push({text:this.options.formatSuggestion.call(this,a),unformattedText:a.properties[a.displayFieldName],magicKey:l.attributes[d]+":"+u})}}s(e,o.reverse())},this)},results:function(e,t,s,i){var o,r=[];if(t){var n=t.split(":")[0],a=t.split(":")[1];o=this.query().layer(a).featureIds(n)}else o=this.find().text(e).fields(this.options.searchFields).layers(this.options.layers);return o.run(function(e,t,s){if(!e){s.results&&(s.results=s.results.reverse());for(var o=0;o<t.features.length;o++){var n=t.features[o];if(a=a||s.results[o].layerId,n&&void 0!==a){var l=this._featureBounds(n);n.layerId=a,n.layerName=this._layerNames[a],n.displayFieldName=this._displayFields[a];var u={latlng:l.getCenter(),bounds:l,text:this.options.formatSuggestion.call(this,n),properties:n.properties,geojson:n};r.push(u)}}}i(e,r.reverse())},this)},_featureBounds:function(e){var s=t.geoJson(e);if("Point"===e.geometry.type){var i=s.getBounds().getCenter(),o=this.options.bufferRadius/40075017*360/Math.cos(180/Math.PI*i.lat),r=this.options.bufferRadius/40075017*360;return t.latLngBounds([i.lat-r,i.lng-o],[i.lat+r,i.lng+o])}return s.getBounds()},_layerMetadataCallback:function(e){return t.Util.bind(function(t,s){if(!t){this._displayFields[e]=s.displayField,this._layerNames[e]=s.name;for(var i=0;i<s.fields.length;i++){var o=s.fields[i];if("esriFieldTypeOID"===o.type){this._idFields[e]=o.name;break}}}},this)},_getIdFields:function(){this._idFields={},this._displayFields={},this._layerNames={};for(var e=0;e<this.options.layers.length;e++){var t=this.options.layers[e];this.get(t,{},this._layerMetadataCallback(t))}}}),C=v.extend({options:{label:"Geocode Server",maxResults:5},suggestions:function(e,t,s){if(this.options.supportsSuggest){var i=this.suggest().text(e);return t&&i.within(t),i.run(function(e,t,i){var o=[];if(!e)for(;i.suggestions.length&&o.length<=this.options.maxResults-1;){var r=i.suggestions.shift();r.isCollection||o.push({text:r.text,unformattedText:r.text,magicKey:r.magicKey})}s(e,o)},this)}return s(void 0,[]),!1},results:function(e,t,s,i){var o=this.geocode().text(e);return t&&o.key(t),o.maxLocations(this.options.maxResults),s&&o.within(s),o.run(function(e,t){i(e,t.results)},this)}}),S="https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/";e.WorldGeocodingServiceUrl=S,e.VERSION="2.2.13",e.Geocode=g,e.geocode=i,e.ReverseGeocode=p,e.reverseGeocode=o,e.Suggest=f,e.suggest=r,e.GeocodeService=v,e.geocodeService=n,e.Geosearch=y,e.geosearch=u,e.GeosearchCore=m,e.geosearchCore=a,e.ArcgisOnlineProvider=_,e.arcgisOnlineProvider=l,e.FeatureLayerProvider=b,e.featureLayerProvider=d,e.MapServiceProvider=x,e.mapServiceProvider=h,e.GeocodeServiceProvider=C,e.geocodeServiceProvider=c,Object.defineProperty(e,"__esModule",{value:!0})});