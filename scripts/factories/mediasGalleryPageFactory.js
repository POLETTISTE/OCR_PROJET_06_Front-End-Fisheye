// ***** AFFICHAGE DE LA PAGE PHOTOGRAPHER.HTML *****

function MediasGalleryPageFactory(data) {

    const { id, photographerId, title, image, video, likes, date, price} = data;

    // DEFINITION DES VARIABLES GLOBALES
    const mediaImage = `assets/images/${photographerId}/${image}`;
    const mediaVideo = `assets/images/${photographerId}/${video}`;
    const mediaTitle = title;
    let img = document.createElement('div');
    let vid = document.createElement('div');
    let totalOfLikes;
    let mediasLikes;
    
    function closeTheLightBox() {
        lightbox.remove();
        displayLightbox(medias);
        let tri = document.querySelector("#filter > div > div > div.new-select");
        tri.click();
        tri.click();
    };

    // EVENEMENT PRESS ECHAP FERMETURE DE LA LIGHTBOX
    document.addEventListener('keydown', EscapeLightbox);

    function EscapeLightbox(e) {
        if(e.key === "Escape") {
            e.preventDefault();
            e.stopPropagation();
            closeTheLightBox();           
        }
    };
    
    
    // SOMME DES LIKES DES PHOTOS DU PHOTOGRAPHE:
    function mediaLikesCalcul() {
        mediasLikes = 0;
    
        medias.forEach((media) => { 
            mediasLikes+= media["likes"];
        });
    
        totalOfLikes = mediasLikes + clickedLikes;

    }
    mediaLikesCalcul();


    // AFFICHAGE DE LA GALLERIE MEDIA DU PHOTOGRAPHE:
    function getMediasOfPhotographer() {

        const article = document.createElement( 'article' );
        article.classList.add('media-card');

        // AFFICHAGE CARD MEDIAS AVEC DISTINCTION DES DATA IMAGES ET DATA VIDEOS
        if (data.hasOwnProperty('image')) {

            img = document.createElement('img');
            img.setAttribute("src", mediaImage);
            img.setAttribute("aria-label",title);
            img.setAttribute('tabindex', "0");
            img.setAttribute('role', "image link");

            img.classList.add('media-element');
            img.classList.add('image-card');
            arrMedias.push(mediaImage);
            arrMediasTitle.push(mediaTitle);


            img.addEventListener('keydown', (e) => {
                if (e.key=="Enter" && lightbox.classList.contains('active')) {

                }else if (e.key=="Enter"){
                e.preventDefault();
                img.remove();
                img.click();
                }else{
                }

              });

            
        }else if(data.hasOwnProperty('video')){

            vid = document.createElement('video');
            vid.setAttribute("src", mediaVideo);
            vid.setAttribute("aria-label",title);
            vid.setAttribute('type', "video/mp4");
            vid.setAttribute('tabindex', "0");
            vid.setAttribute('role', "image link");
            vid.classList.add('media-element');
            vid.classList.add('video-card');
            arrMedias.push(mediaVideo);
            arrMediasTitle.push(mediaTitle);


            vid.addEventListener('keydown', (e) => {
                if (e.key=="Enter") {
                    e.preventDefault();
                    vid.remove();
                    vid.click();
                };
            });
        }

        // AFFICHAGE INFOS CARD MEDIAS 
        const imgInfos = document.createElement('div');
        imgInfos.classList.add("image-card-infos");

        const imgTitle = document.createElement('h2');
        imgTitle.textContent = title;
        imgTitle.classList.add('media-title');
        imgTitle.setAttribute('role', 'text');

        const imgLikes = document.createElement('h3');
        imgLikes.textContent = likes;
        imgLikes.classList.add('media-likes');
        imgLikes.setAttribute('role', 'image');
        imgLikes.innerHTML = `${likes} <i class='fa-solid fa-heart'></i>`;
        imgLikes.setAttribute('aria-label', 'likes');
        
        // ELEMENTS D'ASSEMBLAGE
        article.appendChild(img);
        article.appendChild(vid);
        article.appendChild(imgInfos); 
        imgInfos.appendChild(imgTitle);
        imgInfos.appendChild(imgLikes);

        return (article);
    };


    // AFFICHAGE SOMME DES LIKES DU PHOTOGRAPHE (VOIR LIGNE 13):
    function getFixedBottomInfos() {

        const insertLikes = document.createElement('p');
        insertLikes.classList.add('insert-likes');
        insertLikes.innerHTML=`${totalOfLikes} <i class='fa-solid fa-heart'></i>`;
        return (insertLikes);
    }


    // AFFICHAGE LIGHTBOX: 
    function getLightbox() {

        // CREATION MODALE:
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        
        // CREATION FENETRE QUI CONTIENT LE MEDIA

        const lightboxContainer= document.createElement('div');
        lightboxContainer.classList.add('lightbox__container');
        lightboxContainer.setAttribute('role', 'dialog');

        // CREATION DIV QUI ENGLOBE MEDIA ET TITRE DU MEDIA

        const lightboxContainerMediaAndTitle = document.createElement('div');
        lightboxContainerMediaAndTitle.classList.add('lightbox__container-media-title');
        lightboxContainerMediaAndTitle.setAttribute('role', 'dialog');
        
        // CREATION BOUTON FERMER:
        const closeLightbox = document.createElement('div');
        closeLightbox.classList.add('lightbox__close');
        closeLightbox.innerHTML = `<i class="fa-solid fa-xmark"></i>`; 
        closeLightbox.setAttribute('role', 'button'); 
        closeLightbox.setAttribute('aria-label', 'Close dialog'); 
        
        // CREATION BOUTON PRECEDENT:
        const prevLightbox = document.createElement('div');
        prevLightbox.classList.add('lightbox__prev');
        prevLightbox.innerHTML = `<i class="fa-solid fa-chevron-left"></i>`;
        prevLightbox.setAttribute('role', 'link');
        prevLightbox.setAttribute('aria-label', 'Previous image');

        // CREATION BOUTON SUIVANT:
        const nextLightbox = document.createElement('div');
        nextLightbox.classList.add('lightbox__next');
        nextLightbox.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;
        nextLightbox.setAttribute('role', 'link');
        nextLightbox.setAttribute('aria-label', 'Next');



        // EVENEMENT CLIC SUR UN MEDIA DANS LA GALLERIE -> CHARGEMENT CONTENU LIGHTBOX
        const mediasGallery = document.querySelectorAll('.media-element');


        mediasGallery.forEach(media => {
            let img = document.createElement('div');
            let vid = document.createElement('div');
            let titleMedia = document.createElement('p');
            let actualMedia = media.getAttribute('src');
            let oldIndex;
            let typeOfOld;
            let typeOfActual;

            media.addEventListener("click", () => {
                lightbox.classList.add('active');
                
                // SI LE MEDIA A LA CLASS IMAGE-CARD:
                if(media.classList=="media-element image-card") {
                    img = document.createElement('img');
                    img.classList.add('media-lightbox');
                    img.src = actualMedia;
                    img.setAttribute('role', 'image');
                    img.setAttribute('aria-label', media.getAttribute('aria-label'));
                    lightboxContainer.setAttribute('aria-label', `${media.getAttribute('aria-label')}, closeup view`);
                    titleMedia = document.createElement('p');
                    titleMedia.setAttribute('role', 'text');
                    titleMedia.textContent = media.getAttribute('aria-label');
                    

 
                  // SI L'IMAGE A LA CLASSE VIDEO-CARD
                } else if (media.classList=="media-element video-card") {
                    vid = document.createElement('video');
                    vid.controls = true;
                    vid.classList.add('media-lightbox');
                    vid.src = actualMedia;
                    img.setAttribute('role', 'image');
                    vid.setAttribute('aria-label', media.getAttribute('aria-label'));
                    lightboxContainer.setAttribute('aria-label', `${media.getAttribute('aria-label')}, closeup view`);
                    titleMedia = document.createElement('p');
                    titleMedia.setAttribute('role', 'text');
                    titleMedia.textContent=media.getAttribute('aria-label');
                };

                // EVENEMENT CLIC BOUTON FERMER DE LA LIGHTBOX -> FERMETURE DE LA LIGHTBOX
                closeLightbox.addEventListener('click', closeTheLightBox);
                
                // EVENEMENT AU CLIC DU BOUTON PRECEDENT DE LA LIGHTBOX
                prevLightbox.addEventListener('click', (previousArrow));
                
                document.addEventListener('keydown', (e) => {
                    if (e.key=="ArrowLeft") {
                       previousArrow();
                    }
                });

   
                function previousArrow() {
                    if (arrMedias.indexOf(actualMedia) === 0) {
                        oldIndex = ((arrMedias.length) -1);
                        
                    }else {
                        oldIndex = arrMedias.indexOf(actualMedia) - 1;
                    }
                    
                    newMedia = arrMedias[oldIndex]; 
                    newMediaTitle = arrMediasTitle[oldIndex];

                    typeOfOld = arrMedias[arrMedias.indexOf(actualMedia)];    
                    typeOfOld = typeOfOld.split(".");
                    typeOfOld = typeOfOld[typeOfOld.length-1];            

                    typeOfActual = arrMedias[arrMedias.indexOf(newMedia)]
                    typeOfActual = typeOfActual.split(".");
                    typeOfActual = typeOfActual[typeOfActual.length-1]

                    if ( typeOfOld === 'jpg' && typeOfActual ==='jpg' ) {
                        actualMedia = arrMedias[oldIndex];    
                        img.src = actualMedia; 
                        img.setAttribute('aria-label', `${newMediaTitle}, closeup view`);
                        lightboxContainer.setAttribute('aria-label', `${newMediaTitle}, closeup view`);
                        titleMedia.textContent = newMediaTitle;


                    }else if (typeOfOld === 'jpg' && typeOfActual === 'mp4') {

                        actualMedia = arrMedias[oldIndex];  
                        lightboxContainerMediaAndTitle.replaceChild(document.createElement("video"), img); 
                        vid = document.querySelector("#lightbox > div > div.lightbox__container-media-title > video");
                        vid.controls = true;
                        vid.classList.add('media-lightbox');
                        vid.src = actualMedia;
                        vid.setAttribute('aria-label', `${newMediaTitle}, closeup view`);
                        lightboxContainer.setAttribute('aria-label', `${newMediaTitle}, closeup view`);
                        titleMedia.textContent = newMediaTitle;

                        img.remove();

                    }else if (typeOfOld ==='mp4' && typeOfActual === 'jpg') {
                        actualMedia = arrMedias[oldIndex];  
                        lightboxContainerMediaAndTitle.replaceChild(document.createElement("img"), vid); 
                        img = document.querySelector("#lightbox > div > div.lightbox__container-media-title > img");
                        img.classList.add('media-lightbox');
                        img.setAttribute('aria-label', `${newMediaTitle}, closeup view`);
                        img.src = actualMedia;
                        lightboxContainer.setAttribute('aria-label', `${newMediaTitle}, closeup view`);
                        titleMedia.textContent = newMediaTitle;

                        vid.remove();

                    }else if (typeOfOld ==='mp4' && typeOfActual==='mp4') {
                        actualMedia = arrMedias[oldIndex];    
                        vid.setAttribute('aria-label', `${newMediaTitle}, closeup view`);
                        vid.src = actualMedia; 
                        lightboxContainer.setAttribute('aria-label', `${newMediaTitle}, closeup view`);
                        titleMedia.textContent = newMediaTitle;


                    }
                    
                };
                
                // EVENEMENT AU CLIC DU BOUTON SUIVANT DE LA LIGHTBOX
                nextLightbox.addEventListener('click', (nextArrow));
                document.addEventListener('keydown', (e) => {
                    if (e.key=="ArrowRight") {
                       nextArrow();
                    }
                });


                function nextArrow() {
                    if (arrMedias.indexOf(actualMedia) === (arrMedias.length)-1) {
                        oldIndex = 0;
                    }else {
                        oldIndex = arrMedias.indexOf(actualMedia) + 1;
                    }

                    
                    newMedia = arrMedias[oldIndex]; 
                    newMediaTitle = arrMediasTitle[oldIndex];
                    
                    typeOfOld = arrMedias[arrMedias.indexOf(actualMedia)];    
                    typeOfOld = typeOfOld.split(".");
                    typeOfOld = typeOfOld[typeOfOld.length-1];            
                    
                    typeOfActual = arrMedias[arrMedias.indexOf(newMedia)]
                    typeOfActual = typeOfActual.split(".");
                    typeOfActual = typeOfActual[typeOfActual.length-1]
                             
                    if ( typeOfOld === 'jpg' && typeOfActual ==='jpg' ) {
                        actualMedia = arrMedias[oldIndex];    
                        img.src = actualMedia; 
                        img.setAttribute('aria-label', `${newMediaTitle}, closeup view`);
                        lightboxContainer.setAttribute('aria-label', `${newMediaTitle}, closeup view`);
                        titleMedia.textContent = newMediaTitle;


                    }else if (typeOfOld === 'jpg' && typeOfActual === 'mp4') {

                        actualMedia = arrMedias[oldIndex];  
                        lightboxContainerMediaAndTitle.replaceChild(document.createElement("video"), img); 
                        vid = document.querySelector("#lightbox > div > div.lightbox__container-media-title > video");
                        vid.controls = true;
                        vid.classList.add('media-lightbox');
                        vid.src = actualMedia;
                        vid.setAttribute('aria-label', `${newMediaTitle}, closeup view`);
                        lightboxContainer.setAttribute('aria-label', `${newMediaTitle}, closeup view`);
                        titleMedia.textContent = newMediaTitle;

                        img.remove();

                    }else if (typeOfOld ==='mp4' && typeOfActual === 'jpg') {
                        actualMedia = arrMedias[oldIndex];  
                        lightboxContainerMediaAndTitle.replaceChild(document.createElement("img"), vid); 
                        img = document.querySelector("#lightbox > div > div.lightbox__container-media-title > img");
                        img.classList.add('media-lightbox');
                        img.setAttribute('aria-label', `${newMediaTitle}, closeup view`);
                        img.src = actualMedia;
                        lightboxContainer.setAttribute('aria-label', `${newMediaTitle}, closeup view`);
                        titleMedia.textContent = newMediaTitle;

                        vid.remove();

                    }else if (typeOfOld ==='mp4' && typeOfActual==='mp4') {
                        actualMedia = arrMedias[oldIndex];    
                        vid.setAttribute('aria-label', `${newMediaTitle}, closeup view`);
                        vid.src = actualMedia; 
                        lightboxContainer.setAttribute('aria-label', `${newMediaTitle}, closeup view`);
                        titleMedia.textContent = newMediaTitle;

                    }
                };



                /* 
                   AU CHARGEMENT DU MEDIA DANS LA LIGHBOX, IL EST
                   IMMEDIATEMENT SUPPRIME MAIS RESTE AFFICHE.
                   CELA PERMET DE NE PAS AVOIR PLUSIEURS MEDIAS
                   DANS LA MEME LIGHTBOX AU RAFRAICHISSEMENT DE LA PAGE.
                */
                while (lightboxContainer.firstChild) {
                    lightboxContainer.removeChild(lightboxContainer.firstChild)
                }

                // ELEMENTS D'ASSEMBLAGE
                lightbox.appendChild(lightboxContainer)
                lightboxContainer.appendChild(prevLightbox);
                lightboxContainer.appendChild(lightboxContainerMediaAndTitle);
                lightboxContainerMediaAndTitle.appendChild(img);
                lightboxContainerMediaAndTitle.appendChild(vid);
                lightboxContainerMediaAndTitle.appendChild(titleMedia);
                lightboxContainer.appendChild(nextLightbox);
                lightboxContainer.appendChild(closeLightbox);

            })
            

        });
        
        return (lightbox);
    }

    return {getMediasOfPhotographer, getFixedBottomInfos, getLightbox }
}
