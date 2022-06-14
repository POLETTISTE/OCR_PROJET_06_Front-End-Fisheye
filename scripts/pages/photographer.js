// ***** JAVASCRIPT POUR LES ELEMENTS DE LA PAGE PHOTOGRAPHER.HTML *****

let clickedLikes=0;
let photographers;
let medias;
let paramsIdPhotographer;
let totalOfLikes=0;
let arrMedias = [];
let arrMediasTitle = [];


async function getPhotographersMediaPage() {

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
      console.log('error in the function getPhotographerId()', err);
    });
  

  // AFFECTATION DE L'ID DU PHOTOGRAPHE DANS LA VARIABLE GLOBALE (LIGNE 6):
  paramsIdPhotographer = new URLSearchParams(window.location.search).get("id");

  // DONNEES API EN FONCTION DE L'ID DU PHOTOGRAPHE DANS URL:
  photographers = photographers.filter(photographer=> photographer["id"] === parseInt(paramsIdPhotographer));
  medias = medias.filter(media => media["photographerId"] === parseInt(paramsIdPhotographer));

  return (photographers, medias);
}
  

async function displayNamePhotographerContactForm(photographers) {
  
  const photographerNameForm = document.querySelector("#contact_modal > div > #header-form");
  
  photographers.forEach((photographer) => {
    const photographerFormContactName = photographersFactory(photographer);
    const element = photographerFormContactName.getNameFormContact();
    photographerNameForm.appendChild(element);
  });
}
  
  
async function displayPhotographerInGalleryPage(photographers){
  const photographersHeader = document.querySelector(".photograph-header");

  photographers.forEach((photographer) => {
    const photographerGalleryModel = photographersFactory(photographer);
    const element = photographerGalleryModel.getPhotographerIdHeader();
    photographersHeader.appendChild(element);
  });
}

async function displayMediasInGalleryPage(medias) {
  const MediaGallery = document.querySelector(".medias-main");



  medias.forEach((media) => {
    const MediaGalleryModel = mediasFactory(media);
    const elt = MediaGalleryModel.getMediasOfPhotographer();
    MediaGallery.appendChild(elt);
    
  })
}

async function displayPhotographerPriceBottom(photographers) {

  const photographerPriceBottom = document.querySelector(".medias-info");
  
  photographers.forEach((photographer) => {
    const photographerBottomCardDOM = photographersFactory(photographer);
    const element = photographerBottomCardDOM.getPricePhotographer();
    photographerPriceBottom.appendChild(element);
  });
  
}

async function addLikes() {
    
  let countOfLikePerPicture;
  let numberLike = document.querySelectorAll(".media-likes");
  const mediasInfo = document.querySelector(".medias-info");

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
        clickedLikes = 1;
        totalOfLikes = totalOfLikes + clickedLikes;       
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
        clickedLikes =-1;
        totalOfLikes = totalOfLikes + clickedLikes;       
    
        displayMediasLikesBottom(medias);
        displayPhotographerPriceBottom(photographers);

        // getMediaLikesCalcul();
      }
    });
  });
}

async function displayMediasLikesBottom(medias) {

  const mediasInfo = document.querySelector(".medias-info");
  const infosCardDOM = mediasFactory(medias);
  const element = infosCardDOM.getFixedBottomInfos();
  mediasInfo.appendChild(element);

}

async function getMediaLikesCalcul() {
  let mediasLikes=0;
  medias.forEach((media) => { 
    mediasLikes+= media["likes"];
  });
    
  return (mediasLikes);

}

async function displayLightbox(medias) {
  const mediasLightbox = document.querySelector("#main");

  const displayMedias = mediasFactory(medias);
  const item = displayMedias.getLightbox();
  mediasLightbox.appendChild(item);
}

async function init() {
  await getPhotographersMediaPage();
  await displayNamePhotographerContactForm(photographers);
  await displayPhotographerInGalleryPage(photographers);
  await displayMediasInGalleryPage(medias);
  await addLikes();
  await displayMediasLikesBottom(medias);
  await getMediaLikesCalcul();
  await displayPhotographerPriceBottom(photographers);
  await displayLightbox(medias);

}
    
init();
