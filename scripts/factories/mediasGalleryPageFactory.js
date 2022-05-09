// ***** AFFICHAGE DE LA PAGE PHOTOGRAPHER.HTML *****

function MediasGalleryPageFactory(data) {

    const { id, photographerId, title, image, video, likes, date, price} = data;

    // DEFINITION DES VARIABLES GLOBALES
    const mediaImage = `assets/images/${photographerId}/${image}`;
    const mediaVideo = `assets/images/${photographerId}/${video}`;
    let img = document.createElement('div');
    let vid = document.createElement('div');

    // SOMME DES LIKES DES PHOTOS DU PHOTOGRAPHE:
    let mediaLikes=0;
        medias.forEach((media) => { 
            mediaLikes+= media["likes"]            
        });

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
            
        }else if(data.hasOwnProperty('video')){
            vid = document.createElement('video');
            vid.setAttribute("src", mediaVideo);
            vid.setAttribute('type', "video/mp4");
            vid.classList.add('media-element');
            vid.classList.add('video-card');

        }else{ 
            console.log('error in function getMediasOfPhotographer()')
        }

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
    }

    // AFFICHAGE SOMME DES LIKES DU PHOTOGRAPHE (VOIR LIGNE 13):
    function getFixedBottomInfos() {
        const insertLikes = document.createElement('p');
        insertLikes.classList.add('insert-likes');
        insertLikes.innerHTML=`${mediaLikes} <i class='fa-solid fa-heart'></i>`;
        return (insertLikes);
    }


    // AFFICHAGE LIGHTBOX: 
    function getLightbox() {
        // CREATION MODALE:
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        document.body.appendChild(lightbox);
        
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

        //EVEMENT AU CLIC SUR UN MEDIA DANS LA GALLERIE -> OUVERTURE LIGHTBOX
        const medias = document.querySelectorAll('.media-element');
        medias.forEach(media => {
            media.addEventListener("click", e => {
                lightbox.classList.add('active');
                // PERMET D'AVOIR UNE DIV VIDE AU LIEU DE <img> OU <video>
                let img = document.createElement('div');
                let vid = document.createElement('div');

                // SI LE MEDIA A LA CLASS IMAGE-CARD:
                if(e.target.classList=="media-element image-card") {
                    img = document.createElement('img');
                    img.classList.add('media-lightbox');
                    img.src = media.src;

                // SI L'IMAGE A LA CLASSE VIDEO-CARD
                } else if (e.target.classList=="media-element video-card") {
                    vid = document.createElement('video');
                    vid.controls = true;
                    vid.classList.add('media-lightbox');
                    vid.src = media.src;

                } else {
                    console.log('error')
                };


                /* ACCESSOIRE:
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
                lightboxContainer.appendChild(img);
                lightboxContainer.appendChild(vid);
                lightbox.appendChild(closeLightbox);
                lightbox.appendChild(nextLightbox);
                lightbox.appendChild(prevLightbox);
            })
        });

        
        // AJOUTER CODE SI CLAVIER ECHAP ALORS FERME LA LIGHTBOX
        /*
            ----- CODER ICI EVENEMENT CLAVIER-----
        */

       // EVENEMENT AU CLIC SUR LA ZONE AUTOUR DE L'IMAGE -> FERMETURE DE LA LIGHTBOX
       lightbox.addEventListener('click', function(e) {
           if (e.target === e.currentTarget) return lightbox.classList.remove('active');
        });
        
        // EVENEMENT CLIC BOUTON FERMER DE LA LIGHTBOX -> FERMETURE DE LA LIGHTBOX
        closeLightbox.addEventListener('click', () => {
            return lightbox.classList.remove('active')
        })

        // EVENEMENT AU CLIC DU BOUTON PRECEDENT DE LA LIGHTBOX
        prevLightbox.addEventListener('click', () => {
            console.log("btn previous cliqué");

            data.map((item) => {
                console.log(item["id"])
            })
            
            const index = data.findIndex(object => {
            return object.id === 952343423;
            });

            console.log(index); // 👉️ 0
        });
         
        // EVENEMENT AU CLIC DU BOUTON SUIVANT DE LA LIGHTBOX
        nextLightbox.addEventListener('click', () => {
            console.log("btn next cliqué");

        });
        
        return (lightbox);
    }

    return { getMediasOfPhotographer, getFixedBottomInfos, getLightbox }
}
