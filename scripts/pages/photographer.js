// ***** JAVASCRIPT POUR LES ELEMENTS DE LA PAGE PHOTOGRAPHER.HTML *****

let photographers;
let medias;
let paramsId;
let mediaLikes = 0;
let clickedLikes=0;
let previousButton;
let nextButton;
let arrMedias = [];
let arrMediasTitle= [];


async function getPhotographerId() {
    
    await fetch('data/photographers.json')
        .then(function(res) {
            if (res.ok) {
            return res.json();
            }
        })
        .then(function(data) {
            photographers = data.photographers;
            medias = data.media;
        })
        .catch((err) => {
            console.log('error in the function getPhotographerId() line 12', err);
        });

    // AFFECTATION DE L'ID DU PHOTOGRAPHE DANS LA VARIABLE GLOBALE (LIGNE 6):
    paramsId = new URLSearchParams(window.location.search).get("id");

    // DONNEES API EN FONCTION DE L'ID DU PHOTOGRAPHE DANS URL:
    photographers = photographers.filter(photographer=> photographer["id"] == paramsId);
    
    // DONNEES API EN FONCTION DE L'ID DU PHOTOGRAPHE DANS L'URL:
    medias = medias.filter(media => media["photographerId"] == paramsId);
};


async function displayNamePhotographerContactForm(photographers) {

    const photographerNameForm = document.querySelector("#contact_modal > div > #header-form");

    photographers.forEach((photographer) => {
        const photographerFormContactName = PhotographerGalleryPageFactory(photographer);
        const element = photographerFormContactName.getNameFormContact();
        photographerNameForm.appendChild(element);
    });

};


async function displayPhotographerInGalleryPage(photographers){

    const photographersHeader = document.querySelector(".photograph-header");

    photographers.forEach((photographer) => {
        const photographerGalleryModel = PhotographerGalleryPageFactory(photographer);
        const element = photographerGalleryModel.getPhotographerIdHeader();
        photographersHeader.appendChild(element);
    });

};


async function displayPhotographerPriceBottom(photographers) {

    const photographerPriceBottom = document.querySelector(".medias-info");

    photographers.forEach((photographer) => {
        const photographerBottomCardDOM = PhotographerGalleryPageFactory(photographer);
        const element = photographerBottomCardDOM.getPricePhotographer();
        photographerPriceBottom.appendChild(element);
    });

};

async function displayMediasLikesBottom(medias) {

    const mediasInfo = document.querySelector(".medias-info");

    const infosCardDOM = MediasGalleryPageFactory(medias);
    const element = infosCardDOM.getFixedBottomInfos();
    mediasInfo.appendChild(element);

};


async function displayMediasInGalleryPage(medias) {

    const mediasMain = document.querySelector(".medias-main");

    medias.forEach((media) => { 

        const mediasGalleryModel = MediasGalleryPageFactory(media);
        const element = mediasGalleryModel.getMediasOfPhotographer();
        mediasMain.appendChild(element);

    });

};

// CREATION DE LA LIGHTBOX
async function displayLightbox(medias) {

    const mediasLightbox = document.querySelector("#main");

    const displayMedias = MediasGalleryPageFactory(medias);
    const item = displayMedias.getLightbox();
    mediasLightbox.appendChild(item);

};


// LIKE UNE PHOTO + SOMME TOTALE LIKES
async function addLikes() {
    
    let numberLike = document.querySelectorAll(".media-likes");
    let countOfLikePerPicture;
    mediasInfo = document.querySelector(".medias-info");
    
    
    numberLike.forEach((medias) => {
        
        let alreadyLiked = false;
        
        medias.addEventListener('click', function() {
            if (alreadyLiked === false) {
                countOfLikePerPicture = medias.textContent;
                countOfLikePerPicture = parseInt(countOfLikePerPicture, 10);
                countOfLikePerPicture+=1;
                countOfLikePerPicture = countOfLikePerPicture.toString();
                mediasInfo.innerHTML ="";
                medias.innerHTML = `${countOfLikePerPicture} <i class='fa-solid fa-heart'></i>`;

                alreadyLiked=true;
                clickedLikes += 1;
                
                displayMediasLikesBottom(medias);
                displayPhotographerPriceBottom(photographers);
                
            }else{
                countOfLikePerPicture = medias.textContent;
                countOfLikePerPicture = parseInt(countOfLikePerPicture, 10);
                countOfLikePerPicture-=1;
                countOfLikePerPicture = countOfLikePerPicture.toString();
                mediasInfo.innerHTML ="";
                medias.innerHTML = `${countOfLikePerPicture} <i class='fa-solid fa-heart'></i>`;
                alreadyLiked=false;                    
                clickedLikes -=1;
                
                displayMediasLikesBottom(medias);
                displayPhotographerPriceBottom(photographers);
            }
        });
    });
};


async function init() {

    // INITIALISATION DE TOUTES LES FONCTIONS

    await getPhotographerId();
    displayNamePhotographerContactForm(photographers);
    displayPhotographerInGalleryPage(photographers);
    displayMediasInGalleryPage(medias);
    displayLightbox(medias);
    displayMediasLikesBottom(medias);
    displayPhotographerPriceBottom(photographers);
    addLikes(medias);
};
// APPEL DE TOUTES LES FONCTIONS
init();




