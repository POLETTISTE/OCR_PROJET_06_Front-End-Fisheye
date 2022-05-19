// ***** JAVASCRIPT POUR LES ELEMENTS DE LA PAGE PHOTOGRAPHER.HTML *****

// DEFINITION DE VARIABLES GLOBALES:
let photographers;
let medias;
let paramsId;
let mediasLikes = 0;
let clickedLikes = 0;
let mediaID;
let previousButton;
let nextButton;
let arrMedias = [];
console.log(arrMedias);
let mediaIDIndex;



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

    async function displayMediasLikesBottom(medias) {
        // AFFICHAGE INFOS BOTTOM
        const mediasInfo = document.querySelector(".medias-info");
        const infosCardDOM = MediasGalleryPageFactory(medias).getFixedBottomInfos();
        mediasInfo.appendChild(infosCardDOM);

    }

    async function displayMediasInGalleryPage(medias) {


        // AFFICHAGE MEDIAS GALLERIE
        const mediasMain = document.querySelector(".medias-main");
        // AFFICHAGE LIGHTBOX
        const mediasLightbox = document.querySelector("#main");

        medias.forEach((media) => { 
            //ON PUSH DANS UN TABLEAU TOUTES LES ID DES MEDIAS
            arrMedias.push(media.id);
        
            // CREATION DES MEDIAS CARDS GRACE A LA FACTORY / 
            // FUNCTION GETMEDIASOFPHOTOGRAPHER:
            const mediasGalleryModel = MediasGalleryPageFactory(media);
            const element = mediasGalleryModel.getMediasOfPhotographer();
            // console.log(element);

            mediasMain.appendChild(element);

        });

        // CREATION DE LA LIGHTBOX
        const displayMedias = MediasGalleryPageFactory(medias);
        const item = displayMedias.getLightbox();
        // console.log(item);
        mediasLightbox.appendChild(item);


    };

    function addLikes() {
        // LIKE UNE PHOTO


        // a faire : mediaLikes = somme des likes json

        // rajouter constante qui s'ajoute a medialikes;
        
        let numberLike = document.querySelectorAll(".media-likes");
        numberLike.forEach((medias) => {
            let alreadyLiked = false;
            let countOfLikePerPicture;
            medias.addEventListener('click', function() {
                if (alreadyLiked === false) {
                    countOfLikePerPicture = medias.textContent;
                    countOfLikePerPicture = parseInt(countOfLikePerPicture, 10);
                    countOfLikePerPicture+=1;
                    mediasInfo = document.querySelector(".medias-info");
                    mediasInfo.innerHTML ="";
                    countOfLikePerPicture = countOfLikePerPicture.toString();
                    medias.innerHTML = `${countOfLikePerPicture} <i class='fa-solid fa-heart'></i>`;
                    alreadyLiked=true;
                    clickedLikes += 1;
                    displayMediasLikesBottom(medias);
                    displayPhotographerPriceBottom(photographers);

                }else{
                    clickedLikes -=1;
                    countOfLikePerPicture = medias.textContent;
                    countOfLikePerPicture = parseInt(countOfLikePerPicture, 10);
                    countOfLikePerPicture-=1;
                    mediasInfo = document.querySelector(".medias-info");
                    mediasInfo.innerHTML ="";
                    countOfLikePerPicture = countOfLikePerPicture.toString();
                    medias.innerHTML = `${countOfLikePerPicture} <i class='fa-solid fa-heart'></i>`;
                    alreadyLiked=false;                    
                    displayMediasLikesBottom(medias);
                    displayPhotographerPriceBottom(photographers);


                }
            })
        });
    }

    async function init() {
        // INITIALISATION DE TOUTES LES FONCTIONS
        await getPhotographerId();
        displayNamePhotographerContactForm(photographers);
        displayPhotographerInGalleryPage(photographers);
        displayMediasInGalleryPage(medias);
        displayMediasLikesBottom(medias);
        displayPhotographerPriceBottom(photographers);
        addLikes(medias);
    };
    // APPEL DE TOUTES LES FONCTIONS
    init();


    

