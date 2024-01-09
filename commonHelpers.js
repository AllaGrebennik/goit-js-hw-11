import{S as h,i as c}from"./assets/vendor-46aac873.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const m=document.querySelector(".search-btn"),p=document.querySelector(".input-text"),f=document.querySelector(".gallery"),a=document.querySelector(".spinner");let l={key:"41702324-4ff2c897c89b5acf667452ea5",q:"",image_type:"photo",orientation:"horizontal",safesearch:!0};const y=new h(".gallery a",{captionsData:"alt",captionDelay:250});m.addEventListener("click",i=>{i.preventDefault(),f.innerHTML="",a.classList.add("loader"),g().then(t=>v(t)).catch(t=>c.error({position:"topRight",title:"Error",message:t})).finally(()=>a.classList.remove("loader"))});function g(){l.q=p.value;const i=new URLSearchParams(l);return fetch(`https://pixabay.com/api?${i}`).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()})}function v(i){if(i.hits.length===0)c.error({position:"topRight",maxWidth:350,message:`Sorry, there are no images matching 
 your search query. Please try again!`});else{const t=i.hits.map(({webformatURL:n,largeImageURL:s,tags:e,likes:r,views:o,comments:u,downloads:d})=>`
            <li class="gallery-item">
                <a class="gallery-link" href="${s}">
                <img
                    class="gallery-image"
                    src="${n}"
                    alt="${e}"/>
                </a>
                <div class="info-item">
                    <div class="info-image">
                        <h3 class="info-key">Likes</h3>
                        <p class="info-value">${r}</p>
                    </div>
                    <div class="info-image">
                        <h3 class="info-key">Views</h3>
                        <p class="info-value">${o}</p>
                    </div>
                    <div class="info-image">
                        <h3 class="info-key">Comments</h3>
                        <p class="info-value">${u}</p>
                    </div>
                    <div class="info-image">
                        <h3 class="info-key">Downloads</h3>
                        <p class="info-value">${d}</p>
                    </div>
                </div>
                
            </li>`).join("");f.innerHTML=t,y.refresh()}}
//# sourceMappingURL=commonHelpers.js.map
