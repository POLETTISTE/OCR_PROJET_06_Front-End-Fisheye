// ----- Affichage de la page photographer.html

// ----- gallerie de photos + recherche par tri + lightbox

function MediasGalleryPageFactory(data) {

    const { id, photographerId, title, image, video, likes, date, price} = data;

    // ----- Définition de la source des médias
    const mediaImage = `assets/images/${photographerId}/${image}`;
    const mediaVideo = `assets/images/${photographerId}/${video}`;

    // ----- Somme des likes des photos du photographe
    let mediaLikes=0;
        medias.forEach((media) => { 
            mediaLikes+= media["likes"]            
        });

    // ----- définition des variables globales
    let img = document.createElement('div');
    let vid = document.createElement('div');
    

    // ----- Affichage de la gallerie des médias du photographe
    function getMediasOfPhotographer() {
        
        const article = document.createElement( 'article' );
        article.classList.add('media-card');

    // Distinguer si data contient la propriété image ou video

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
        
        const imgInfos = document.createElement('div');
        imgInfos.classList.add("image-card-infos");

        const imgTitle = document.createElement('h2');
        imgTitle.textContent = title;
        imgTitle.classList.add('media-title');

        const imgLikes = document.createElement('h3');
        imgLikes.textContent = likes;
        imgLikes.classList.add('media-likes');
        imgLikes.innerHTML = `${likes} <i class='fa-solid fa-heart'></i>`;

        article.appendChild(img);
        article.appendChild(vid);
        article.appendChild(imgInfos); 
        imgInfos.appendChild(imgTitle);
        imgInfos.appendChild(imgLikes);

        return (article);
    }

    //Affichage de la somme des likes du photographes (voir ligne 13)
    function getFixedBottomInfos() {

        const insertLikes = document.createElement('p');
        insertLikes.classList.add('insert-likes');
        insertLikes.innerHTML=`${mediaLikes} <i class='fa-solid fa-heart'></i>`;
        return (insertLikes);

    }

    // Affichage de la lightbox 
    function getLightbox() {
  
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        document.body.appendChild(lightbox);

        const closeLightbox = document.createElement('div');
        closeLightbox.classList.add('lightbox__close');
        closeLightbox.innerHTML = `<i class="fa-solid fa-xmark"></i>`;  

        const nextLightbox = document.createElement('div');
        nextLightbox.classList.add('lightbox__next');
        nextLightbox.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;

        const prevLightbox = document.createElement('div');
        prevLightbox.classList.add('lightbox__prev');
        prevLightbox.innerHTML = `<i class="fa-solid fa-chevron-left"></i>`;

        const lightboxContainer= document.createElement('div');
        lightboxContainer.classList.add('lightbox__container');

        const medias = document.querySelectorAll('.media-element');
        medias.forEach(media => {
            media.addEventListener("click", e => {
                lightbox.classList.add('active');
                let img = document.createElement('div');
                let vid = document.createElement('div');

                // if l'image a la class image-card alors cela
                if(e.target.classList=="media-element image-card") {

                    img = document.createElement('img');
                    img.classList.add('media-lightbox');
                    img.src = media.src;
                // else l'image a la classe video-card alors cela

                } else if (e.target.classList=="media-element video-card") {
                    vid = document.createElement('video');
                    vid.controls = true;
                    vid.classList.add('media-lightbox');
                    vid.src = media.src;

                } else {
                    console.log('error')
                };

                //sert à vider la lighbox de son media des que l'on sert de la lightbox.
                while (lightboxContainer.firstChild) {
                    lightboxContainer.removeChild(lightboxContainer.firstChild)
                }

                lightbox.appendChild(lightboxContainer)
                lightboxContainer.appendChild(img);
                lightboxContainer.appendChild(vid);

                lightbox.appendChild(closeLightbox);
                lightbox.appendChild(nextLightbox);
                lightbox.appendChild(prevLightbox);
            })
        })

        // ajouter si presse echap alors disparait

        // si on clique sur la zone #lightbox désactive la classe 'active' de la
        //lightbox et ca la ferme.

        lightbox.addEventListener('click', e => {

            if (e.target === e.currentTarget) return lightbox.classList.remove('active');
        })



        
        // ----- Ajout évenement sur bouton précédent sur la lightbox
        prevLightbox.addEventListener('click', () => {

            console.log("btn previous cliqué");


            data.map((item) => {
                console.log(item["id"])
            })
            
            const index = data.findIndex(object => {
            return object.id === 952343423;
            });

            console.log(index); // 👉️ 0

        })
         
        // ----- Ajout évenement sur bouton suivant sur la lightbox
        nextLightbox.addEventListener('click', () => {
            console.log("btn next cliqué");

        })
        
        // ----- Ajout évenement sur bouton fermer la lightbox
        // ----- en désactivant la classe '.active', la lightbox repasse en display none.
        closeLightbox.addEventListener('click', () => {
            return lightbox.classList.remove('active')
        })
        
        
        return (lightbox);
    }

    return { getMediasOfPhotographer, getFixedBottomInfos, getLightbox }
}
