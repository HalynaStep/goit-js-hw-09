const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),r=document.querySelector("body");let n=null;function o(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}t.addEventListener("click",(function(e){t.disabled=e.target,r.style.backgroundColor=o(),n=setInterval((()=>{r.style.backgroundColor=o()}),1e3)})),e.addEventListener("click",(function(e){t.disabled=!e.target,clearInterval(n)}));
//# sourceMappingURL=01-color-switcher.2f321553.js.map
