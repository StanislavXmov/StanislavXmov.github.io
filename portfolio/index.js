!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=121)}({121:function(t,e,n){"use strict";n.r(e);n(122);var o=document.querySelector('[data-hard="skills"]'),r=document.querySelector('[data-soft="skills"]'),c=document.getElementById("contact"),i=function(t,e){var n;document.querySelector(".popup-wraper")?n=document.querySelector(".popup-wraper"):((n=document.createElement("div")).dataset.popup="close",document.body.append(n),n.classList.add("popup-wraper"),n.addEventListener("click",(function(t){"close"===t.target.dataset.popup&&(n.style.display="none",n.innerHTML="")})));var o='\n    <div class="popup '.concat(t,'">\n      <h2>').concat(e.title,"</h2>\n      ").concat(e.content?e.content.map((function(t){return"<span>".concat(t,"</span>")})).join(""):"",'\n      <button data-popup="close">Ok</button>\n    </div>\n  ');n.innerHTML=o,n.style.display="flex"};o.addEventListener("click",(function(){return i("popup-hard",{title:"Hard Skills",content:["HTML+CSS","SCSS","Pure JS (ES8+)","Webpack","React","Redux","ThreeJS","NodeJS","Git","SVG","Figma"]})})),r.addEventListener("click",(function(){return i("popup-soft",{title:"Soft Skills",content:["Креативность","Мотивация","Адаптивность","Умение слушать","Эмпатия"]})})),c.addEventListener("click",(function(){return i("popup-contact",{title:"Contact",content:['<div style="display: flex; flex-direction: column; align-items: center;"><svg width="60" height="60" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <rect x="10.5" y="10.5" width="299" height="299" rx="26.5" stroke="#3c3c3c" stroke-width="21"/>\n  <path d="M40 153.5L279.5 65L216 272.5L151 202L279.5 65L115 176.5L40 153.5Z" fill="#3c3c3c"/>\n  <path d="M279.5 65L40 153.5L115 176.5L279.5 65ZM279.5 65L151 202L216 272.5L279.5 65Z" stroke="#3c3c3c"/>\n  </svg><a style="font-size: 2rem;" href="https://t.me/stanislav_Xmov">Telegram</a></div>','<div style="display: flex; flex-direction: column; align-items: center;"><svg width="60" height="60" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <rect x="10.5" y="10.5" width="299" height="299" rx="26.5" stroke="#3c3c3c" stroke-width="21"/>\n  <path d="M258.5 248V71L159.75 154.5L61 71V248H159.75H258.5Z" fill="#3c3c3c"/>\n  <path d="M248 71L159.75 143L71.5 71H248Z" fill="#3c3c3c"/>\n  <path d="M258.5 248V71L159.75 154.5L61 71V248H159.75H258.5Z" stroke="#3c3c3c"/>\n  <path d="M248 71L159.75 143L71.5 71H248Z" stroke="#3c3c3c"/>\n  </svg>\n  \n  <a style="font-size: 2rem;" href="mailto:xiiiovart@gmail.com">xiiiovart@gmail.com</a></div>']})}))},122:function(t,e,n){}});