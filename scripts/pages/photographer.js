// ***** JAVASCRIPT POUR LES ELEMENTS DE LA PAGE PHOTOGRAPHER.HTML *****

// DEFINITION DE VARIABLES GLOBALES:
let photographers;
let medias;
let paramsId;
let mediasLikes;
let mediaID;
let arrMedias = [];
let nextMedia;
let prevMedia;
//retourne l'index dans l'array du media -> findIndex?
let mediaIDIndex;

console.log(arrMedias);

    async function getPhotographerId() {
        await fetch('data/photographers.json')
            // APPEL DE L'API:
            .then(function(res) {
                if (res.ok) {
                return res.json();
                }
            })
            // RENVOI LES DONNEES DE L'API:
            .then(function(data) {
                // ON AFFECTE DANS DES VARIABLE LES DONNEES DES OBJETS PHOTOGRAPHERS ET MEDIA:
                photographers = data.photographers;
                medias = data.media;
            })
            // SI UN PROBLEME EST SURVENU DANS LE PROCESSUS:
            .catch(function(err) {
                //MESSAGE D'ERREUR DANS LA CONSOLE:
                console.log("error in the function getPhotographerId()"); 
            });

        // AFFECTATION DE L'ID DU PHOTOGRAPHE DANS LA VARIABLE GLOBALE (LIGNE 3):
        paramsId = new URLSearchParams(window.location.search).get("id");
 
        // DONNEES API EN FONCTION DE L'ID DU PHOTOGRAPHE DANS URL:
        photographers = photographers.filter(photographer=> photographer["id"] == paramsId);
        
        // DONNEES API EN FONCTION DE L'ID DU PHOTOGRAPHE DANS L'URL:
        medias = medias.filter(media => media["photographerId"] == paramsId);
    };


    async function displayNamePhotographerContactForm(photographers) {
        const photographerNameForm = document.querySelector("#contact_modal > div > header");
        // ITERATION POUR RECUPERER NOM DU PHOTOGRAPHE DANS FORMULAIRE DE CONTACT:
        photographers.forEach((photographer) => {
            const photographerFormContactName = PhotographerGalleryPageFactory(photographer);
            const element = photographerFormContactName.getNameFormContact();
            photographerNameForm.appendChild(element);
        });
    };

    async function displayPhotographerInGalleryPage(photographers){
        const photographersHeader = document.querySelector(".photograph-header");
        // ITERATION POUR RECUPERER HEADER (INFOS PHOTOGRAPHE):
        photographers.forEach((photographer) => {
            const photographerGalleryModel = PhotographerGalleryPageFactory(photographer);
            const element = photographerGalleryModel.getPhotographerIdHeader();
            photographersHeader.appendChild(element);
        });
    };

    async function displayPhotographerPriceBottom(photographers) {
        const photographerPriceBottom = document.querySelector(".medias-info");
        // ITERATION POUR AFFICHER LE TARIF JOURNALIER DU PHOTOGRAPHE (BAS DE PAGE):
        photographers.forEach((photographer) => {
            // DEFINITION VARIABLE:
            const photographerBottomCardDOM = 
            // PAGE FACTORY + APPEL DE LA FONCTION:
            PhotographerGalleryPageFactory(photographer).getPricePhotographer();
            // CHARGEMENT DANS LA CLASSE ".MEDIAS-INFO" DU CONTENU DE LA VARIABLE:
            photographerPriceBottom.appendChild(photographerBottomCardDOM);
        });

    }

    async function displayMediasInGalleryPage(medias) {
        const mediasInfo = document.querySelector(".medias-info");
        const infosCardDOM = MediasGalleryPageFactory(medias).getFixedBottomInfos();
        mediasInfo.appendChild(infosCardDOM);

        const mediasMain = document.querySelector(".medias-main");
         // ITERATION POUR AFFICHER LES MEDIAS DU PHOTOGRAPHE:
        medias.forEach((media) => { 
            mediaID = media.id;
            arrMedias.push(media.id);
            const mediasGalleryModel = MediasGalleryPageFactory(media);
            const element = mediasGalleryModel.getMediasOfPhotographer();
            console.log(element);
            element.addEventListener("click", () => getLightbox(media.id));
            // element.addEventListener("click", () => displayLightbox());
            element.addEventListener("click", () => console.log(media.id));
            mediasMain.appendChild(element);
        });
        // on recherche id dans l'array


    };


    async function displayLightbox() {
        // AFFICHAGE DE LA LIGHTBOX 
        const mediasLightbox = document.querySelector("#main");
        console.log(mediasLightbox);
        const displayMedias = MediasGalleryPageFactory(medias).getLightbox();
        console.log(displayMedias);
        mediasLightbox.appendChild(displayMedias);
    };


    async function init() {
        // INITIALISATION DE TOUTES LES FONCTIONS
        await getPhotographerId();
        displayNamePhotographerContactForm(photographers);
        displayPhotographerInGalleryPage(photographers);
        displayMediasInGalleryPage(medias);
        displayPhotographerPriceBottom(photographers);
        displayLightbox();
    };
    // APPEL DE TOUTES LES FONCTIONS
    init();