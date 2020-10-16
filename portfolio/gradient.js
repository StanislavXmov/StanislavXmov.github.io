!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=124)}({124:function(t,e,n){"use strict";n.r(e);n(125);function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}(new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.gradient=document.querySelector(".gradient-container"),this.sliders=document.querySelectorAll(".sliders"),this.slidersInputs=document.querySelectorAll(".sliders input"),this.angleInputs=document.querySelector(".slider-angle input"),this.angleValue=document.querySelector("#angle-value"),this.style=this.gradient.style,this.initialColors=[],this.colorStop=[0,100],this.angle="",this.buttons=document.querySelectorAll(".button button"),this.gradientStyle=document.querySelector("#gradient-style"),this.background=document.querySelector(".background")}var e,n,i;return e=t,(n=[{key:"init",value:function(){var t=this;this.slidersInputs.forEach((function(e){e.addEventListener("input",t.setControls.bind(t))})),this.buttons.forEach((function(e){e.addEventListener("click",t.randomColor.bind(t))})),this.angleInputs.addEventListener("input",this.angleControl.bind(this)),this.randomColors(),this.angle="".concat(this.angleInputs.value,"deg"),this.angleValue.textContent=this.angle,this.createGradient()}},{key:"createGradient",value:function(){this.style.background="linear-gradient(".concat(this.angle,", ").concat(this.initialColors[0],"  ").concat(this.colorStop[0],"%, ").concat(this.initialColors[1]," ").concat(this.colorStop[1],"%)"),this.background.style.background="linear-gradient(".concat(this.angle,", ").concat(this.initialColors[0],"  ").concat(this.colorStop[0],"%, ").concat(this.initialColors[1]," ").concat(this.colorStop[1],"%)"),this.gradientStyle.textContent=this.style.background}},{key:"generateHex",value:function(){return chroma.random()}},{key:"randomColor",value:function(t){var e=t.target.dataset.random,n=this.generateHex();this.initialColors[e]=chroma(n).hex();var r=this.sliders[e].querySelectorAll(".sliders input");this.hslInputs(n,r),this.resetInputs(),this.createGradient()}},{key:"randomColors",value:function(){var t=this;this.initialColors=[],this.sliders.forEach((function(e,n){var r=t.generateHex();t.initialColors.push(chroma(r).hex());var i=e.querySelectorAll(".sliders input");t.hslInputs(r,i)})),this.resetInputs()}},{key:"hslInputs",value:function(t,e){var n=chroma(t),r=e[0],i=e[1],a=e[2];this.colorizeSliders(n,r,i,a)}},{key:"colorizeSliders",value:function(t,e,n,r){var i=t.set("hsl.s",0),a=t.set("hsl.s",1),o=chroma.scale([i,t,a]),l=t.set("hsl.l",.5),s=chroma.scale(["black",l,"white"]);r.style.backgroundImage="linear-gradient(to right, ".concat(o(0),", ").concat(o(1),")"),n.style.backgroundImage="linear-gradient(to right, ".concat(s(0),", ").concat(s(.5),",").concat(s(1),")"),e.style.backgroundImage="linear-gradient(to right, \n      rgb(204, 75, 75),\n      rgb(204, 204, 75), \n      rgb(75, 204, 75), \n      rgb(75, 204, 204), \n      rgb(75, 75, 204), \n      rgb(204, 75, 204), \n      rgb(204, 75, 75))"}},{key:"resetInputs",value:function(){var t=this;this.slidersInputs.forEach((function(e){if("hue"===e.name){var n=t.initialColors[e.dataset.hue],r=chroma(n).hsl()[0];e.value=Math.floor(r)}if("brightness"===e.name){var i=t.initialColors[e.dataset.bright],a=chroma(i).hsl()[2];e.value=Math.floor(100*a)/100}if("saturation"===e.name){var o=t.initialColors[e.dataset.sat],l=chroma(o).hsl()[1];e.value=Math.floor(100*l)/100}}))}},{key:"setControls",value:function(t){var e=t.target.dataset.bright||t.target.dataset.hue||t.target.dataset.sat,n=t.target.parentElement.querySelectorAll('input[type="range"]'),r=n[0],i=n[1],a=n[2],o=n[3],l=this.initialColors[e],s=chroma(l).set("hsl.s",a.value).set("hsl.l",i.value).set("hsl.h",r.value);this.initialColors[e]=s.hex(),this.colorStop[e]=o.value,this.createGradient(),this.colorizeSliders(s,r,i,a)}},{key:"angleControl",value:function(t){this.angle="".concat(t.target.value,"deg"),this.angleValue.textContent=this.angle,this.createGradient()}}])&&r(e.prototype,n),i&&r(e,i),t}())).init()},125:function(t,e,n){}});