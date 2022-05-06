let photographers;
let medias;
let paramsId;
let mediasLikes;

    async function getPhotographerId() {

        await fetch('data/photographers.json')
            .then(function(res) {
                if (res.ok) {
                return res.json();
                }
            })
            .then(function(data) {
                // On ajoute les données de l'API dans les variables photographersData et mediaData :
                // console.log(data);
                photographers = data.photographers;
                medias = data.media;

            })
            .catch(function(err) {
                // Se déclenche si une erreur est survenue dans l'appel de l'Api
                console.log("error in the function getPhotographerId()"); 
            });

        // On récupère l'ID du photographe dans l'URL
        paramsId = new URLSearchParams(window.location.search).get("id");
 
        // On filtre le photographe qui correspond avec l'ID dans  
        // le fichier data et l'ID de l'URL
        photographers = photographers.filter(photographer=> photographer["id"] == paramsId);
        medias = medias.filter(media => media["photographerId"] == paramsId);
    };

    async function displayNamePhotographerContactForm(photographers) {
        const photographerNameForm = document.querySelector("#contact_modal > div > header");

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
            // On itère pour que le photographe soit construit via la factory et declenche
            // sa vue dans le HTML via les consignes de construction dans pages/photographer.js
            const photographerBottomCardDOM = 
            PhotographerGalleryPageFactory(photographer).getPricePhotographer();

            photographerPriceBottom.appendChild(photographerBottomCardDOM);
    });

    }

    async function displayMediasInGalleryPage(medias) {

        const mediasInfo = document.querySelector(".medias-info");
        const infosCardDOM = MediasGalleryPageFactory(medias).getFixedBottomInfos();
    
        mediasInfo.appendChild(infosCardDOM);
        
        const mediasMain = document.querySelector(".medias-main");
        
        medias.forEach((media) => {   
            const mediasGalleryModel = MediasGalleryPageFactory(media);
            const element = mediasGalleryModel.getMediasOfPhotographer();
            mediasMain.appendChild(element);
            
        });
    }

    async function displayLightbox() {
        // ajouter localisation dans main pour le queryselector puis deplacer le reste dans factory
        const mediasLightbox = document.querySelector("#main");
        const displayMedias = MediasGalleryPageFactory(medias).getLightbox();

        mediasLightbox.appendChild(displayMedias);


    }

    async function init() {
        // Récupère les datas des photographes
        await getPhotographerId();
        displayNamePhotographerContactForm(photographers);
        displayPhotographerInGalleryPage(photographers);
        displayMediasInGalleryPage(medias);
        displayPhotographerPriceBottom(photographers);
        displayLightbox();
    };
    
    init();