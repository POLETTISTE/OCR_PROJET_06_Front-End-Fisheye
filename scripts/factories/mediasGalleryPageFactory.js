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
            img.setAttribute('role', "link");

            img.classList.add('media-element');
            img.classList.add('image-card');
            arrMedias.push(mediaImage);
            arrMediasTitle.push(mediaTitle);


            img.addEventListener('keydown', (e) => {
                if (e.key=="Enter" && lightbox.classList.contains('active')) {
                    e.preventDefault();
                    e.stopPropagation();

                }else if (e.key=="Enter"){
                    e.preventDefault();
                    e.stopPropagation();
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
            vid.classList.add('media-element');
            vid.classList.add('video-card');
            arrMedias.push(mediaVideo);
            arrMediasTitle.push(mediaTitle);


            vid.addEventListener('keydown', (e) => {
                if (e.key=="Enter" && lightbox.classList.contains('active')) {
                    e.preventDefault();
                    e.stopPropagation();

                }else if (e.key=="Enter"){
                    e.preventDefault();
                    e.stopPropagation();
                    vid.remove();
                    vid.click();
                }else{
                }

              });
        }

        // AFFICHAGE INFOS CARD MEDIAS 
        const imgInfos = document.createElement('div');
        imgInfos.classList.add("image-card-infos");

        const imgTitle = document.createElement('h2');
        imgTitle.textContent = title;
        imgTitle.classList.add('media-title');
        imgTitle.setAttribute('role', 'heading');
        imgTitle.setAttribute('aria-level','2');


        const imgLikes = document.createElement('h3');
        imgLikes.textContent = likes;
        imgLikes.classList.add('media-likes');
        imgLikes.setAttribute('role', 'heading');
        imgTitle.setAttribute('aria-level','3');

        imgLikes.innerHTML = `${likes} <i class='fa-solid fa-heart'></i>`;
        imgLikes.setAttribute('aria-label', 'likes');
        imgLikes.setAttribute('tabindex', "0");

        imgLikes.addEventListener('keydown', (e) => {
            if (e.key=="Enter" && lightbox.classList.contains('active')) {
                e.preventDefault();
                e.stopPropagation();

            }else if (e.key=="Enter"){
                e.preventDefault();
                e.stopPropagation();
                imgLikes.click();
            }else{
            }

          });

        
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
        lightbox.setAttribute('tabindex', '0');

        
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
        closeLightbox.setAttribute('tabindex', '0');
 

        // CREATION BOUTON PRECEDENT:
        const prevLightbox = document.createElement('div');
        prevLightbox.classList.add('lightbox__prev');
        prevLightbox.innerHTML = `<i class="fa-solid fa-chevron-left"></i>`;
        prevLightbox.setAttribute('role', 'link');
        prevLightbox.setAttribute('aria-label', 'Previous image');
        prevLightbox.setAttribute('tabindex', '0');


        // CREATION BOUTON SUIVANT:
        const nextLightbox = document.createElement('div');
        nextLightbox.classList.add('lightbox__next');
        nextLightbox.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;
        nextLightbox.setAttribute('role', 'link');
        nextLightbox.setAttribute('aria-label', 'Next');
        nextLightbox.setAttribute('tabindex', '0');


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

            function clickToOpenLightbox() {
                document.getElementById("lightbox").focus();
            }

            media.addEventListener("click", () => {
                lightbox.classList.add('active');
                clickToOpenLightbox();

                // SI LE MEDIA A LA CLASS IMAGE-CARD:
                if(media.classList=="media-element image-card") {
                    img = document.createElement('img');
                    img.classList.add('media-lightbox');
                    img.src = actualMedia;
                    img.setAttribute('role', 'img');
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
                    // vid.setAttribute('role', 'img');
                    vid.setAttribute('aria-label', media.getAttribute('aria-label'));
                    lightboxContainer.setAttribute('aria-label', `${media.getAttribute('aria-label')}, closeup view`);
                    titleMedia = document.createElement('p');
                    titleMedia.setAttribute('role', 'text');
                    titleMedia.textContent=media.getAttribute('aria-label');
                };

                // FERMETURE DE LA LIGHTBOX
                function closeTheLightBox() {
                    lightbox.remove();
                    displayLightbox(medias);
                    let tri = document.querySelector("#filter > div > div > div.new-select");
                    tri.click();
                    tri.click();
                };


                // EVENEMENT CLIC BOUTON FERMER DE LA LIGHTBOX -> FERMETURE DE LA LIGHTBOX
                closeLightbox.addEventListener('click', closeTheLightBox);

                // EVENEMENT ENTER SUR ICONE FERMER DE LA LIGHTBOX -> FERMETURE DE LA LIGHTBOX
                closeLightbox.addEventListener('keydown', (e) => {
                    if (e.key=="Enter") {
                        e.preventDefault();
                        e.stopPropagation();
                        closeTheLightBox();
                    }
                  });

                // EVENEMENT PRESS ECHAP FERMETURE DE LA LIGHTBOX
                document.addEventListener('keydown', EscapeLightbox);

                function EscapeLightbox(e) {
                    if(e.key == "Escape") {
                        e.preventDefault();
                        e.preventDefault();
                        closeTheLightBox();    
                    }
                };
                
                // EVENEMENT AU CLIC DU BOUTON PRECEDENT DE LA LIGHTBOX
                prevLightbox.addEventListener('click', (previousArrow));

                // EVENEMENT AU PRESS FLECHE GAUCHE
                document.addEventListener('keydown', (e) => {
                    if (e.key=="ArrowLeft") {
                        e.preventDefault();
                        e.stopPropagation();
                        previousArrow();
                    }
                });

                // EVENEMENT ENTER SUR ICONE CHEVRON PRECEDENT
                prevLightbox.addEventListener('keydown', (e) => {
                    if (e.key=="Enter") {
                        e.preventDefault();
                        e.stopPropagation();
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

                // EVENEMENT AU PRESS FLECHE DROITE
                document.addEventListener('keydown', (e) => {
                    if (e.key=="ArrowRight") {
                        e.preventDefault();
                        e.stopPropagation();
                        nextArrow();
                    }
                });

                // EVENEMENT ENTER SUR ICONE CHEVRON SUIVANT
                nextLightbox.addEventListener('keydown', (e) => {
                    if (e.key=="Enter") {
                        e.preventDefault();
                        e.stopPropagation();
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
