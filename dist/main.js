!function(t){var e={};function i(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){i(1),t.exports=i(2)},function(t,e){if("undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");function i(t){let e={x:0,y:0,z:0};if(null==t.attributes.position)return e;let i=t.attributes.position.value.split(" ");return""!==i[0]&&null!=i[0]&&(e.x=i[0]),""!==i[1]&&null!=i[1]&&(e.y=i[1]),""!==i[2]&&null!=i[2]&&(e.z=i[2]),e}function n(t,e){let i=0;"bar"!==e.type&&"cylinder"!==e.type||(i=t.size/2);let n=t.label+": "+t.y,o=2;n.length>16&&(o=n.length/8);let l=document.createElement("a-plane");return l.setAttribute("position",{x:t.x+i,y:t.y+3,z:t.z}),l.setAttribute("height","2"),l.setAttribute("width",o),l.setAttribute("color","white"),l.setAttribute("text",{value:"DataPoint:\n\n"+n,align:"center",width:6,color:"black"}),l.setAttribute("light",{intensity:.3}),l}function o(t,e,i){let n="",o=t.slice(),l=o.indexOf(e);o.splice(l,1);for(let t=0;t<o.length;t++)"pie"===i.type?n+=o[t].label+": "+o[t].size:n+=o[t].label+": "+o[t].y,t!==o.length-1&&(n+="\n");return n}function l(t,e,i){let n="";n="pie"===i.type?e.size:e.y;let o=document.createElement("a-plane");return o.setAttribute("position",t.position_sel_text),o.setAttribute("rotation",t.rotation),o.setAttribute("height","0.5"),o.setAttribute("width",t.width),o.setAttribute("color","white"),o.setAttribute("text__title",{value:e.label+": "+n,align:"center",width:"7",color:e.color}),o.setAttribute("light",{intensity:"0.3"}),o}function r(t,e){let i=document.createElement("a-plane");return i.setAttribute("position",t.position_all_text),i.setAttribute("rotation",t.rotation),i.setAttribute("height",t.height),i.setAttribute("width",t.width),i.setAttribute("color","white"),i.setAttribute("text__title",{value:e,align:"center",width:"6",color:"black"}),i.setAttribute("light",{intensity:"0.3"}),i}function s(t,e,i,n){let o=document.createElement("a-cylinder");return o.setAttribute("color",t.color),o.setAttribute("theta-start",e),o.setAttribute("theta-length",i),o.setAttribute("side","double"),o.setAttribute("radius",n),o}function a(t,e,i,n){let o=document.createElement("a-torus");return o.setAttribute("color",t.color),o.setAttribute("rotation",{x:90,y:0,z:e}),o.setAttribute("arc",i),o.setAttribute("side","double"),o.setAttribute("radius",n),o.setAttribute("radius-tubular",n/4),o}function u(t){let e=document.createElement("a-sphere");return e.setAttribute("position",{x:t.x,y:t.y,z:t.z}),e.setAttribute("color",t.color),e.setAttribute("radius",t.size),e}function d(t){let e=document.createElement("a-box");return e.setAttribute("position",{x:t.x+t.size/2,y:t.y/2,z:t.z}),e.setAttribute("color",t.color),e.setAttribute("height",t.y),e.setAttribute("depth",t.size),e.setAttribute("width",t.size),e}function x(t){let e=document.createElement("a-cylinder");return e.setAttribute("position",{x:t.x+t.size/2,y:t.y/2,z:t.z}),e.setAttribute("color",t.color),e.setAttribute("height",t.y),e.setAttribute("radius",t.size/2),e}function c(t,e,i){let n=document.createElement("a-plane");return n.setAttribute("position",t.position),n.setAttribute("scale",{x:1,y:1,z:.01}),n.setAttribute("height","0.5"),n.setAttribute("width",t.width),n.setAttribute("text__title",{value:t.name,align:"center",width:"8",color:"black"}),n.addEventListener("click",function(){let t=e.split(",");for(let e of t){let t=document.getElementById(e),n=t.getAttribute("charts");n.dataPoints=i,t.setAttribute("charts",n)}}),n}AFRAME.registerComponent("charts",{schema:{type:{type:"string",default:"bubble"},dataPoints:{type:"asset"},axis_visible:{type:"boolean",default:!0},axis_position:{type:"vec3",default:{x:0,y:0,z:0}},axis_color:{type:"string",default:"red"},axis_length:{type:"number",default:0},axis_tick_separation:{type:"number",default:1},axis_tick_length:{type:"number",default:.2},axis_tick_color:{type:"string",default:"red"},axis_negative:{type:"boolean",default:!0},axis_grid:{type:"boolean",default:!1},axis_grid_3D:{type:"boolean",default:!1},axis_text:{type:"boolean",default:!0},axis_text_color:{type:"string",default:"white"},axis_text_size:{type:"number",default:10},pie_radius:{type:"number",default:1},pie_doughnut:{type:"boolean",default:!1},show_popup_info:{type:"boolean",default:!1},show_legend_info:{type:"boolean",default:!1},show_legend_position:{type:"vec3",default:{x:0,y:0,z:0}},show_legend_rotation:{type:"vec3",default:{x:0,y:0,z:0}},show_legend_title:{type:"string",default:"Legend"},entity_id_list:{type:"string",default:""},dataPoints_list:{type:"string",default:""}},multiple:!1,init:function(){this.loader=new THREE.FileLoader},update:function(t){const e=this.data;if(e.dataPoints&&e.dataPoints!==t.dataPoints)for(;this.el.firstChild;)this.el.firstChild.remove();if(e.dataPoints){if(e.dataPoints.constructor===[{}].constructor)this.onDataLoaded(this,e.dataPoints,!0);else if(e.dataPoints.constructor==="".constructor)try{this.onDataLoaded(this,JSON.parse(e.dataPoints),!0)}catch(t){this.loader.load(e.dataPoints,this.onDataLoaded.bind(this,!1))}}else"totem"===e.type&&function(t,e){if(""===t.dataPoints_list)return;let n=t.dataPoints_list.constructor==={}.constructor?t.dataPoints_list:JSON.parse(t.dataPoints_list),o=i(e),l=function(t){let e="Select dataSource:".length;for(let i in t)i.length>e&&(e=i.length);let i=2;e>9&&(i=e/4.4);return i}(n);e.appendChild(function(t,e){let i=document.createElement("a-plane");return i.setAttribute("position",e),i.setAttribute("scale",{x:1,y:1,z:.01}),i.setAttribute("height","0.5"),i.setAttribute("color","blue"),i.setAttribute("width",t),i.setAttribute("text__title",{value:"Select dataSource:",align:"center",width:"9",color:"white"}),i}(l,o));let r=.75;for(let i in n){let s={};s.position={x:o.x,y:parseInt(o.y)-r,z:o.z},s.name=i,s.width=l,e.appendChild(c(s,t.entity_id_list,n[i])),r+=.65}}(e,this.el)},remove:function(){},pause:function(){},play:function(){},onDataLoaded:function(t,e){let c=e;try{t||(c=JSON.parse(e))}catch(t){throw new Error("Can't parse JSON file. Maybe is not a valid JSON file")}const y=this.data;let p,_=this.el;!function(t,e,i){if(!e.axis_visible||"pie"===e.type)return;if(0===e.axis_length){let t=function(t){let e=0,i=!1;for(let n of t){(n.x<0||n.y<0||n.z<0)&&(i=!0);let t=Math.abs(n.x),o=Math.abs(n.y),l=Math.abs(n.z);t>e&&(e=t),o>e&&(e=o),l>e&&(e=l)}return{max:e,has_negative:i}}(i);e.axis_length=t.max,e.axis_negative&&(e.axis_negative=t.has_negative)}e.axis_grid||e.axis_grid_3D?function(t,e){let i=e.axis_length,n=e.axis_position,o=e.axis_color,l=e.axis_negative,r=0,s=0,a=e.axis_grid_3D,u=e.axis_text,d=e.axis_text_color,x=e.axis_text_size;for(let e of["x","y","z"]){let c={x:n.x,y:n.y,z:n.z};c[e]=i+n[e];let y={x:n.x,y:n.y,z:n.z};l&&(r=i,s=i+1,y[e]=-i+n[e]);let p=document.createElement("a-entity");p.setAttribute("line__"+e,{start:y,end:c,color:o});for(let l=1-s;l<=i;l++){let s,c,y,_;if("x"===e?(s={x:n.x+l,y:n.y-r,z:n.z},c={x:n.x+l,y:n.y+i,z:n.z},y={x:n.x+l,y:n.y,z:n.z-r},_={x:n.x+l,y:n.y,z:n.z+i}):"y"===e?(s={x:n.x,y:n.y+l,z:n.z-r},c={x:n.x,y:n.y+l,z:n.z+i},y={x:n.x-r,y:n.y+l,z:n.z},_={x:n.x+i,y:n.y+l,z:n.z}):(s={x:n.x-r,y:n.y,z:n.z+l},c={x:n.x+i,y:n.y,z:n.z+l},y={x:n.x,y:n.y-r,z:n.z+l},_={x:n.x,y:n.y+i,z:n.z+l}),u){let i=document.createElement("a-text");i.setAttribute("position",c),"x"===e?i.setAttribute("text__"+e+l,{value:Math.round(100*l)/100,width:x,color:d,xOffset:5}):"y"===e?i.setAttribute("text__"+e+l,{value:Math.round(100*l)/100,width:x,color:d,xOffset:4}):i.setAttribute("text__"+e+l,{value:Math.round(100*l)/100,width:x,color:d,xOffset:4.5}),t.appendChild(i)}if(p.setAttribute("line__"+e+l,{start:s,end:c,color:o}),p.setAttribute("line__"+e+l+i,{start:y,end:_,color:o}),a)for(let t=1-r;t<=i;t++){let s,a;"x"===e?(s={x:n.x+l,y:n.y-r,z:n.z+t},a={x:n.x+l,y:n.y+i,z:n.z+t}):"y"===e?(s={x:n.x+t,y:n.y+l,z:n.z-r},a={x:n.x+t,y:n.y+l,z:n.z+i}):(s={x:n.x-r,y:n.y+t,z:n.z+l},a={x:n.x+i,y:n.y+t,z:n.z+l}),p.setAttribute("line__"+e+l+t+i,{start:s,end:a,color:o})}}t.appendChild(p)}}(t,e):function(t,e){let i=e.axis_length,n=e.axis_position,o=e.axis_color,l=e.axis_tick_separation,r=e.axis_tick_length,s=e.axis_tick_color,a=e.axis_negative,u=0,d=e.axis_text,x=e.axis_text_color,c=e.axis_text_size;for(let e of["x","y","z"]){let y={x:n.x,y:n.y,z:n.z};y[e]=i+n[e];let p={x:n.x,y:n.y,z:n.z};a&&(u=i+1,p[e]=-i+n[e]);let _=document.createElement("a-entity");_.setAttribute("line__"+e,{start:p,end:y,color:o});for(let o=l-u;o<=i;o+=l){let i,l;if("x"===e?(i={x:n.x+o,y:n.y-r,z:n.z},l={x:n.x+o,y:n.y+r,z:n.z}):"y"===e?(i={x:n.x,y:n.y+o,z:n.z-r},l={x:n.x,y:n.y+o,z:n.z+r}):(i={x:n.x-r,y:n.y,z:n.z+o},l={x:n.x+r,y:n.y,z:n.z+o}),_.setAttribute("line__"+e+o,{start:i,end:l,color:s}),d){let n=document.createElement("a-text");n.setAttribute("position",i),"x"===e?n.setAttribute("text__"+e+o,{value:Math.round(100*o)/100,width:c,color:x,xOffset:5}):"y"===e?n.setAttribute("text__"+e+o,{value:Math.round(100*o)/100,width:c,color:x,xOffset:4}):n.setAttribute("text__"+e+o,{value:Math.round(100*o)/100,width:c,color:x,xOffset:4.5}),t.appendChild(n)}}t.appendChild(_)}}(t,e)}(_,y,c);let h,f,b,z,g=y.show_popup_info&&"pie"!==y.type&&!y.pie_doughnut,A=y.show_legend_info;A&&c.length>0&&(h=function(t){let e=document.createElement("a-plane");return e.setAttribute("position",t.position_tit),e.setAttribute("rotation",t.rotation),e.setAttribute("height","0.5"),e.setAttribute("width",t.width),e.setAttribute("color","white"),e.setAttribute("text__title",{value:t.title,align:"center",width:"8",color:"black"}),e}(z=function(t,e,n){let o=2;t.length-1>6&&(o=(t.length-1)/3);let l=e.show_legend_title.length;for(let i of t){let t=i.label+": ";"pie"===e.type?t+=i.size:t+=i.y,t.length>l&&(l=t.length)}let r=2;l>9&&(r=l/4.4);let s=i(n),a={x:e.show_legend_position.x-s.x,y:e.show_legend_position.y-s.y+o/2+.5,z:e.show_legend_position.z-s.z},u={x:e.show_legend_position.x-s.x,y:e.show_legend_position.y-s.y+o/2,z:e.show_legend_position.z-s.z},d={x:e.show_legend_position.x-s.x,y:e.show_legend_position.y-s.y,z:e.show_legend_position.z-s.z},x=function(t){let e={x:0,y:0,z:0};if(null==t.attributes.rotation)return e;let i=t.attributes.rotation.value.split(" ");""!==i[0]&&null!=i[0]&&(e.x=i[0]);""!==i[1]&&null!=i[1]&&(e.y=i[1]);""!==i[2]&&null!=i[2]&&(e.z=i[2]);return e}(n),c={x:e.show_legend_rotation.x-x.x,y:e.show_legend_rotation.y-x.y,z:e.show_legend_rotation.z-x.z};return{height:o,width:r,title:e.show_legend_title,rotation:c,position_tit:a,position_sel_text:u,position_all_text:d}}(c,y,_)),f=l(z,c[0],y),b=r(z,o(c,c[0],y)),_.appendChild(h),_.appendChild(f),_.appendChild(b));let w=0,m=0,v=0;if("pie"===y.type)for(let t of c)v+=t.size;for(let t of c){let e;"bar"===y.type?e=d(t):"cylinder"===y.type?e=x(t):"pie"===y.type?(m=360*t.size/v,e=y.pie_doughnut?a(t,w,m,y.pie_radius):s(t,w,m,y.pie_radius),w+=m):e=u(t),e.addEventListener("mouseenter",function(){this.setAttribute("scale",{x:1.3,y:1.3,z:1.3}),g&&(p=n(t,y),_.appendChild(p)),A&&(_.removeChild(f),_.removeChild(b),f=l(z,t,y),b=r(z,o(c,t,y)),_.appendChild(f),_.appendChild(b))}),e.addEventListener("mouseleave",function(){this.setAttribute("scale",{x:1,y:1,z:1}),g&&_.removeChild(p)}),_.appendChild(e)}}})},function(t,e){!function(t){var e={};function i(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=t,i.c=e,i.i=function(t){return t},i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e){if("undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");function i(t){let e={x:0,y:0,z:0};if(null==t.attributes.position)return e;let i=t.attributes.position.value.split(" ");return""!==i[0]&&null!=i[0]&&(e.x=i[0]),""!==i[1]&&null!=i[1]&&(e.y=i[1]),""!==i[2]&&null!=i[2]&&(e.z=i[2]),e}function n(t,e){let i=0;"bar"!==e.type&&"cylinder"!==e.type||(i=t.size/2);let n=t.label+": "+t.y,o=2;n.length>16&&(o=n.length/8);let l=document.createElement("a-plane");return l.setAttribute("position",{x:t.x+i,y:t.y+3,z:t.z}),l.setAttribute("height","2"),l.setAttribute("width",o),l.setAttribute("color","white"),l.setAttribute("text",{value:"DataPoint:\n\n"+n,align:"center",width:6,color:"black"}),l.setAttribute("light",{intensity:.3}),l}function o(t,e,i){let n="",o=t.slice(),l=o.indexOf(e);o.splice(l,1);for(let t=0;t<o.length;t++)"pie"===i.type?n+=o[t].label+": "+o[t].size:n+=o[t].label+": "+o[t].y,t!==o.length-1&&(n+="\n");return n}function l(t,e,i){let n="";n="pie"===i.type?e.size:e.y;let o=document.createElement("a-plane");return o.setAttribute("position",t.position_sel_text),o.setAttribute("rotation",t.rotation),o.setAttribute("height","0.5"),o.setAttribute("width",t.width),o.setAttribute("color","white"),o.setAttribute("text__title",{value:e.label+": "+n,align:"center",width:"7",color:e.color}),o.setAttribute("light",{intensity:"0.3"}),o}function r(t,e){let i=document.createElement("a-plane");return i.setAttribute("position",t.position_all_text),i.setAttribute("rotation",t.rotation),i.setAttribute("height",t.height),i.setAttribute("width",t.width),i.setAttribute("color","white"),i.setAttribute("text__title",{value:e,align:"center",width:"6",color:"black"}),i.setAttribute("light",{intensity:"0.3"}),i}function s(t,e,i,n){let o=document.createElement("a-cylinder");return o.setAttribute("color",t.color),o.setAttribute("theta-start",e),o.setAttribute("theta-length",i),o.setAttribute("side","double"),o.setAttribute("radius",n),o}function a(t,e,i,n){let o=document.createElement("a-torus");return o.setAttribute("color",t.color),o.setAttribute("rotation",{x:90,y:0,z:e}),o.setAttribute("arc",i),o.setAttribute("side","double"),o.setAttribute("radius",n),o.setAttribute("radius-tubular",n/4),o}function u(t){let e=document.createElement("a-sphere");return e.setAttribute("position",{x:t.x,y:t.y,z:t.z}),e.setAttribute("color",t.color),e.setAttribute("radius",t.size),e}function d(t){let e=document.createElement("a-box");return e.setAttribute("position",{x:t.x+t.size/2,y:t.y/2,z:t.z}),e.setAttribute("color",t.color),e.setAttribute("height",t.y),e.setAttribute("depth",t.size),e.setAttribute("width",t.size),e}function x(t){let e=document.createElement("a-cylinder");return e.setAttribute("position",{x:t.x+t.size/2,y:t.y/2,z:t.z}),e.setAttribute("color",t.color),e.setAttribute("height",t.y),e.setAttribute("radius",t.size/2),e}AFRAME.registerComponent("charts",{schema:{type:{type:"string",default:"bubble"},dataPoints:{type:"asset"},axis_visible:{type:"boolean",default:!0},axis_position:{type:"vec3",default:{x:0,y:0,z:0}},axis_color:{type:"string",default:"red"},axis_length:{type:"number",default:0},axis_tick_separation:{type:"number",default:1},axis_tick_length:{type:"number",default:.2},axis_tick_color:{type:"string",default:"red"},axis_negative:{type:"boolean",default:!0},axis_grid:{type:"boolean",default:!1},axis_grid_3D:{type:"boolean",default:!1},axis_text:{type:"boolean",default:!0},axis_text_color:{type:"string",default:"white"},axis_text_size:{type:"number",default:10},pie_radius:{type:"number",default:1},pie_doughnut:{type:"boolean",default:!1},show_popup_info:{type:"boolean",default:!1},show_legend_info:{type:"boolean",default:!1},show_legend_position:{type:"vec3",default:{x:0,y:0,z:0}},show_legend_rotation:{type:"vec3",default:{x:0,y:0,z:0}},show_legend_title:{type:"string",default:"Legend"},entity_id_list:{type:"string",default:""},dataPoints_list:{type:"string",default:""}},multiple:!1,init:function(){this.loader=new THREE.FileLoader},update:function(t){const e=this.data;null!=t&&t.dataPoints?this.loader.load(t.dataPoints,this.onDataLoaded.bind(this)):e.dataPoints?this.loader.load(e.dataPoints,this.onDataLoaded.bind(this)):"totem"===e.type&&function(t,e){if(""===t.dataPoints_list)return;let n=t.dataPoints_list.split(","),o=i(e),l=function(t){let e=0;for(let i of t){let t=i.split("/")[i.split("/").length-1];t.length>e&&(e=t.length)}let i=2;e>9&&(i=e/4.4);return i}(n);e.appendChild(function(t,e){let i=document.createElement("a-plane");return i.setAttribute("position",e),i.setAttribute("scale",{x:1,y:1,z:.01}),i.setAttribute("height","0.5"),i.setAttribute("color","blue"),i.setAttribute("width",t),i.setAttribute("text__title",{value:"Select dataSource:",align:"center",width:"9",color:"white"}),i}(l,o));let r=.75;for(let i of n){let n={};n.position={x:o.x,y:parseInt(o.y)-r,z:o.z},n.name=i.split("/")[i.split("/").length-1],n.width=l,e.appendChild(y(n,t.entity_id_list,i)),r+=.65}}(e,this.el)},remove:function(){},pause:function(){},play:function(){},onDataLoaded:function(t){let e;try{e=JSON.parse(t)}catch(t){throw new Error("Can't parse JSON file. Maybe is not a valid JSON file")}const c=this.data;let y,p=this.el;!function(t,e,i){if(!e.axis_visible||"pie"===e.type)return;if(0===e.axis_length){let t=function(t){let e=0,i=!1;for(let n of t){(n.x<0||n.y<0||n.z<0)&&(i=!0);let t=Math.abs(n.x),o=Math.abs(n.y),l=Math.abs(n.z);t>e&&(e=t),o>e&&(e=o),l>e&&(e=l)}return{max:e,has_negative:i}}(i);e.axis_length=t.max,e.axis_negative&&(e.axis_negative=t.has_negative)}e.axis_grid||e.axis_grid_3D?function(t,e){let i=e.axis_length,n=e.axis_position,o=e.axis_color,l=e.axis_negative,r=0,s=0,a=e.axis_grid_3D,u=e.axis_text,d=e.axis_text_color,x=e.axis_text_size;for(let e of["x","y","z"]){let c={x:n.x,y:n.y,z:n.z};c[e]=i+n[e];let y={x:n.x,y:n.y,z:n.z};l&&(r=i,s=i+1,y[e]=-i+n[e]);let p=document.createElement("a-entity");p.setAttribute("line__"+e,{start:y,end:c,color:o});for(let l=1-s;l<=i;l++){let s,c,y,_;if("x"===e?(s={x:n.x+l,y:n.y-r,z:n.z},c={x:n.x+l,y:n.y+i,z:n.z},y={x:n.x+l,y:n.y,z:n.z-r},_={x:n.x+l,y:n.y,z:n.z+i}):"y"===e?(s={x:n.x,y:n.y+l,z:n.z-r},c={x:n.x,y:n.y+l,z:n.z+i},y={x:n.x-r,y:n.y+l,z:n.z},_={x:n.x+i,y:n.y+l,z:n.z}):(s={x:n.x-r,y:n.y,z:n.z+l},c={x:n.x+i,y:n.y,z:n.z+l},y={x:n.x,y:n.y-r,z:n.z+l},_={x:n.x,y:n.y+i,z:n.z+l}),u){let i=document.createElement("a-text");i.setAttribute("position",c),"x"===e?i.setAttribute("text__"+l,{value:Math.round(100*l)/100,width:x,color:d,xOffset:5}):"y"===e?i.setAttribute("text__"+l,{value:Math.round(100*l)/100,width:x,color:d,xOffset:4}):i.setAttribute("text__"+l,{value:Math.round(100*l)/100,width:x,color:d,xOffset:4.5}),t.appendChild(i)}if(p.setAttribute("line__"+l,{start:s,end:c,color:o}),p.setAttribute("line__"+l+i,{start:y,end:_,color:o}),a)for(let t=1-r;t<=i;t++){let s,a;"x"===e?(s={x:n.x+l,y:n.y-r,z:n.z+t},a={x:n.x+l,y:n.y+i,z:n.z+t}):"y"===e?(s={x:n.x+t,y:n.y+l,z:n.z-r},a={x:n.x+t,y:n.y+l,z:n.z+i}):(s={x:n.x-r,y:n.y+t,z:n.z+l},a={x:n.x+i,y:n.y+t,z:n.z+l}),p.setAttribute("line__"+l+t+i,{start:s,end:a,color:o})}}t.appendChild(p)}}(t,e):function(t,e){let i=e.axis_length,n=e.axis_position,o=e.axis_color,l=e.axis_tick_separation,r=e.axis_tick_length,s=e.axis_tick_color,a=e.axis_negative,u=0,d=e.axis_text,x=e.axis_text_color,c=e.axis_text_size;for(let e of["x","y","z"]){let y={x:n.x,y:n.y,z:n.z};y[e]=i+n[e];let p={x:n.x,y:n.y,z:n.z};a&&(u=i+1,p[e]=-i+n[e]);let _=document.createElement("a-entity");_.setAttribute("line__"+e,{start:p,end:y,color:o});for(let o=l-u;o<=i;o+=l){let i,l;if("x"===e?(i={x:n.x+o,y:n.y-r,z:n.z},l={x:n.x+o,y:n.y+r,z:n.z}):"y"===e?(i={x:n.x,y:n.y+o,z:n.z-r},l={x:n.x,y:n.y+o,z:n.z+r}):(i={x:n.x-r,y:n.y,z:n.z+o},l={x:n.x+r,y:n.y,z:n.z+o}),_.setAttribute("line__"+o,{start:i,end:l,color:s}),d){let n=document.createElement("a-text");n.setAttribute("position",i),"x"===e?n.setAttribute("text__"+o,{value:Math.round(100*o)/100,width:c,color:x,xOffset:5}):"y"===e?n.setAttribute("text__"+o,{value:Math.round(100*o)/100,width:c,color:x,xOffset:4}):n.setAttribute("text__"+o,{value:Math.round(100*o)/100,width:c,color:x,xOffset:4.5}),t.appendChild(n)}}t.appendChild(_)}}(t,e)}(p,c,e);let _,h,f,b,z=c.show_popup_info&&"pie"!==c.type&&!c.pie_doughnut,g=c.show_legend_info;g&&e.length>0&&(_=function(t){let e=document.createElement("a-plane");return e.setAttribute("position",t.position_tit),e.setAttribute("rotation",t.rotation),e.setAttribute("height","0.5"),e.setAttribute("width",t.width),e.setAttribute("color","white"),e.setAttribute("text__title",{value:t.title,align:"center",width:"8",color:"black"}),e}(b=function(t,e,n){let o=2;t.length-1>6&&(o=(t.length-1)/3);let l=e.show_legend_title.length;for(let i of t){let t=i.label+": ";"pie"===e.type?t+=i.size:t+=i.y,t.length>l&&(l=t.length)}let r=2;l>9&&(r=l/4.4);let s=i(n),a={x:e.show_legend_position.x-s.x,y:e.show_legend_position.y-s.y+o/2+.5,z:e.show_legend_position.z-s.z},u={x:e.show_legend_position.x-s.x,y:e.show_legend_position.y-s.y+o/2,z:e.show_legend_position.z-s.z},d={x:e.show_legend_position.x-s.x,y:e.show_legend_position.y-s.y,z:e.show_legend_position.z-s.z},x=function(t){let e={x:0,y:0,z:0};if(null==t.attributes.rotation)return e;let i=t.attributes.rotation.value.split(" ");""!==i[0]&&null!=i[0]&&(e.x=i[0]);""!==i[1]&&null!=i[1]&&(e.y=i[1]);""!==i[2]&&null!=i[2]&&(e.z=i[2]);return e}(n),c={x:e.show_legend_rotation.x-x.x,y:e.show_legend_rotation.y-x.y,z:e.show_legend_rotation.z-x.z};return{height:o,width:r,title:e.show_legend_title,rotation:c,position_tit:a,position_sel_text:u,position_all_text:d}}(e,c,p)),h=l(b,e[0],c),f=r(b,o(e,e[0],c)),p.appendChild(_),p.appendChild(h),p.appendChild(f));let A=0,w=0,m=0;if("pie"===c.type)for(let t of e)m+=t.size;for(let t of e){let i;"bar"===c.type?i=d(t):"cylinder"===c.type?i=x(t):"pie"===c.type?(w=360*t.size/m,i=c.pie_doughnut?a(t,A,w,c.pie_radius):s(t,A,w,c.pie_radius),A+=w):i=u(t),i.addEventListener("mouseenter",function(){this.setAttribute("scale",{x:1.3,y:1.3,z:1.3}),z&&(y=n(t,c),p.appendChild(y)),g&&(p.removeChild(h),p.removeChild(f),h=l(b,t,c),f=r(b,o(e,t,c)),p.appendChild(h),p.appendChild(f))}),i.addEventListener("mouseleave",function(){this.setAttribute("scale",{x:1,y:1,z:1}),z&&p.removeChild(y)}),p.appendChild(i)}}});let c=function(t,e){e.forEach(function(e){t.el.removeChild(e)})};function y(t,e,i){let n=document.createElement("a-plane");return n.setAttribute("position",t.position),n.setAttribute("scale",{x:1,y:1,z:.01}),n.setAttribute("height","0.5"),n.setAttribute("width",t.width),n.setAttribute("text__title",{value:t.name,align:"center",width:"8",color:"black"}),n.addEventListener("click",function(){console.log(i);let t=e.split(",");for(let e of t){let t=document.querySelector("#"+e).components.charts;c(t,t.el.getChildEntities()),t.update({dataPoints:i})}}),n}}])}]);