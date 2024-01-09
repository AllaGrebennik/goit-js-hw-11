'use strict';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const fetchBtn = document.querySelector(".search-btn");
const qSearch = document.querySelector(".input-text");
const gallery = document.querySelector(".gallery");
const spinner = document.querySelector(".spinner");

let searchParams = {
    key: "41702324-4ff2c897c89b5acf667452ea5",
    q: "",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
};
    
const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});
        
fetchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    gallery.innerHTML = "";
    spinner.classList.add("loader");
    fetchFoto()
        .then((fotos) => renderFotos(fotos))
        .catch((error) => iziToast.error({ position: 'topRight', title: "Error", message: error }))
        .finally(() => spinner.classList.remove("loader"));
});

function fetchFoto() {
    searchParams.q = qSearch.value;
    const searchParamsCurrent = new URLSearchParams(searchParams);
    return fetch(`http://pixabay.com/api?${searchParamsCurrent}`).then(
        (response) => {
            if (!response.ok) {
                throw new Error(response.status);
            };
            return response.json();
        }
    );
};

function renderFotos(fotos) {
    if (fotos.hits.length === 0) {
         iziToast.error({
            position: 'topRight',
            maxWidth: 350,
            message: "Sorry, there are no images matching \n your search query. Please try again!"
        })
    }
    else {
        const markup = fotos.hits.map(({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads
        }) => `
            <li class="gallery-item">
                <a class="gallery-link" href="${largeImageURL}">
                <img
                    class="gallery-image"
                    src="${webformatURL}"
                    alt="${tags}"/>
                </a>
                <div class="info-item">
                    <div class="info-image">
                        <h3 class="info-key">Likes</h3>
                        <p class="info-value">${likes}</p>
                    </div>
                    <div class="info-image">
                        <h3 class="info-key">Views</h3>
                        <p class="info-value">${views}</p>
                    </div>
                    <div class="info-image">
                        <h3 class="info-key">Comments</h3>
                        <p class="info-value">${comments}</p>
                    </div>
                    <div class="info-image">
                        <h3 class="info-key">Downloads</h3>
                        <p class="info-value">${downloads}</p>
                    </div>
                </div>
                
            </li>`).join("");
        gallery.innerHTML = markup;
        lightbox.refresh();
    }       
}
