// ***** AFFICHAGE DE LA PAGE PHOTOGRAPHER.HTML *****

function MediasGalleryPageFactory(data) {

    const { id, photographerId, title, image, video, likes, date, price} = data;

    // DEFINITION DES VARIABLES GLOBALES
    const mediaImage = `assets/images/${photographerId}/${image}`;
    const mediaVideo = `assets/images/${photographerId}/${video}`;
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
            img.setAttribute("alt",'photo de la gallerie du photographe');
            img.classList.add('media-element');
            img.classList.add('image-card');

            arrMedias.push(mediaImage);
            
        }else if(data.hasOwnProperty('video')){

            vid = document.createElement('video');
            vid.setAttribute("src", mediaVideo);
            vid.setAttribute('type', "video/mp4");
            vid.classList.add('media-element');
            vid.classList.add('video-card');

            arrMedias.push(mediaVideo);


        }else{ 

            console.log('error in function getMediasOfPhotographer()')
        };

        // AFFICHAGE INFOS CARD MEDIAS 
        const imgInfos = document.createElement('div');
        imgInfos.classList.add("image-card-infos");

        const imgTitle = document.createElement('h2');
        imgTitle.textContent = title;
        imgTitle.classList.add('media-title');

        const imgLikes = document.createElement('h3');
        imgLikes.textContent = likes;
        imgLikes.classList.add('media-likes');
        imgLikes.innerHTML = `${likes} <i class='fa-solid fa-heart'></i>`;
        
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
        
        // CREATION BOUTON FERMER:
        const closeLightbox = document.createElement('div');
        closeLightbox.classList.add('lightbox__close');
        closeLightbox.innerHTML = `<i class="fa-solid fa-xmark"></i>`;  
        
        // CREATION BOUTON SUIVANT:
        const nextLightbox = document.createElement('div');
        nextLightbox.classList.add('lightbox__next');
        nextLightbox.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;

        // CREATION BOUTON PRECEDENT:
        const prevLightbox = document.createElement('div');
        prevLightbox.classList.add('lightbox__prev');
        prevLightbox.innerHTML = `<i class="fa-solid fa-chevron-left"></i>`;

        // EVENEMENT CLIC BOUTON FERMER DE LA LIGHTBOX -> FERMETURE DE LA LIGHTBOX
        closeLightbox.addEventListener('click', () => { closeTheLightBox()});

        // EVENEMENT PRESS ECHAP FERMETURE DE LA LIGHTBOX
        document.addEventListener('keyup', EscapeLightbox);

        function EscapeLightbox(e) {
            if(e.key === "Escape") {
                e.preventDefault();
                closeTheLightBox();           
            }
        };

        // EVENEMENT AU CLIC SUR LA ZONE AUTOUR DE L'IMAGE -> FERMETURE DE LA LIGHTBOX
        lightbox.addEventListener('click', function(e) { if (e.target === e.currentTarget) return closeTheLightBox()});

        // EVENEMENT CLIC SUR UN MEDIA DANS LA GALLERIE -> CHARGEMENT CONTENU LIGHTBOX
        const mediasGallery = document.querySelectorAll('.media-element');


        mediasGallery.forEach(media => {
            let img = document.createElement('div');
            let vid = document.createElement('div');
            let actualMedia = media.getAttribute('src');
            let previousIndex;
            let nextIndex;
            let typeOfOld;
            let typeOfNew;

            media.addEventListener("click", () => {
                lightbox.classList.add('active');


                // SI LE MEDIA A LA CLASS IMAGE-CARD:
                if(media.classList=="media-element image-card") {
                    img = document.createElement('img');
                    img.classList.add('media-lightbox');
                    img.src = actualMedia;    
 
                  // SI L'IMAGE A LA CLASSE VIDEO-CARD
                } else if (media.classList=="media-element video-card") {
                    vid = document.createElement('video');
                    vid.controls = true;
                    vid.classList.add('media-lightbox');
                    vid.src = actualMedia;
                };


                // EVENEMENT AU CLIC DU BOUTON PRECEDENT DE LA LIGHTBOX
                prevLightbox.addEventListener('click', (previousArrow));

                    function previousArrow() {
                    if (arrMedias.indexOf(actualMedia) === 0) {
                        previousIndex = ((arrMedias.length) -1);

                    }else {
                        previousIndex = arrMedias.indexOf(actualMedia) - 1;
                    }
                    console.log(previousIndex);
                    "AFFICHE NUMERO INDEX DU NEW" 

                    previousMedia = arrMedias[previousIndex]; 

                    console.log(previousMedia);
                    "AFFICHE LA SOURCE DU NEW"

                    console.log(actualMedia);
                    "AFFICHE LA SOURCE DU OLD"

                    typeOfOld = arrMedias[arrMedias.indexOf(actualMedia)];    
                    typeOfOld = typeOfOld.split(".");
                    typeOfOld = typeOfOld[typeOfOld.length-1];            
                    console.log(typeOfOld);
                    "AFFICHE TYPE DE MEDIA OLD"

                    typeOfNew = arrMedias[arrMedias.indexOf(actualMedia)-1]
                    typeOfNew = typeOfNew.split(".");
                    typeOfNew = typeOfNew[typeOfNew.length-1]
                    console.log(typeOfNew);
                    "AFFICHE TYPE DE MEDIA NEW"



                    if ( typeOfOld === 'jpg' && typeOfNew ==='jpg' ) {
                        // actualMedia = arrMedias[previousIndex];    
                        console.log(`actualMedia is ` + actualMedia);
                        console.log(`previousMedia is` + previousMedia);
                        console.log(`typeOfOld is ` + typeOfOld);

                    }else if (typeOfOld === 'jpg' && typeOfNew === 'mp4') {
                        // actualMedia = arrMedias[previousIndex];    

                        console.log('build element video and delete img')
                    }else if (typeOfOld ==='mp4' && typeOfNew === 'jpg') {
                        // actualMedia = arrMedias[previousIndex];    

                        console.log('build img and delete video')
                    }else if (typeOfOld ==='mp4' && typeOfNew==='mp4') {
                        // actualMedia = arrMedias[previousIndex];    

                        console.log('change src');
                    }
                    

                    



                    media.setAttribute("src", actualMedia);
                    //que si le type de media qui était affcihé avant etait le meme

                    // closeLightbox.remove();
                    // nextLightbox.remove();
                    // prevLightbox.remove();
                    // media.click();

                };
                
                // EVENEMENT AU CLIC DU BOUTON SUIVANT DE LA LIGHTBOX
                nextLightbox.addEventListener('click', (nextArrow));

                function nextArrow() {
                    if (arrMedias.indexOf(actualMedia) === (arrMedias.length)-1) {
                        nextIndex = 0;
                    }else {
                        nextIndex = arrMedias.indexOf(actualMedia) + 1;
                    }
                    actualMedia = arrMedias[nextIndex];
                    console.log(actualMedia);
                    media.setAttribute("src", actualMedia);
                    // closeLightbox.remove();
                    // nextLightbox.remove();
                    // prevLightbox.remove();
                    // media.click();
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
                lightboxContainer.appendChild(img);
                lightboxContainer.appendChild(vid);
                lightboxContainer.appendChild(nextLightbox);
                lightboxContainer.appendChild(closeLightbox);
            })
            closeTheLightBox = () => {
                lightbox.classList.remove('active');
                lightbox.innerHTML="";
                newSelect.click();
                newSelect.click();
            }

             document.addEventListener('keyup', (e) => {
                 if (e.key=="ArrowRight") {
                    next();
                 }
             });

             document.addEventListener('keyup', (e) => {
                if (e.key=="ArrowLeft") {
                   previous();
                }
            });


        });
        
        return (lightbox);
    }

    return {getMediasOfPhotographer, getFixedBottomInfos, getLightbox }
}
