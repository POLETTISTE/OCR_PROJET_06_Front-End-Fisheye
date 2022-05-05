function MediasGalleryPageFactory(data) {

    const { id, photographerId, title, image, video, likes, date, price} = data;

    const mediaImage = `assets/images/${photographerId}/${image}`;
    const mediaVideo = `assets/images/${photographerId}/${video}`;
            
    let mediaLikes=0;
        medias.forEach((media) => { 
            mediaLikes+= media["likes"]            
        });

    let img = document.createElement('element');
    let vid = document.createElement('element');
    linkImage = document.createElement('a');
    linkVideo = document.createElement('a');



    function getMediasOfPhotographer() {
        
        const article = document.createElement( 'article' );
        article.classList.add('media-card');


    // // SAVOIR SI DATA CONTIENT LA PROPRIETE IMAGE OU VIDEO
    
    if (data.hasOwnProperty('image')) {

        linkImage = document.createElement('a');
        linkImage.setAttribute('class', 'media-element');
        linkImage.setAttribute('href', mediaImage);

        img = document.createElement('img');
        img.setAttribute("src", mediaImage);
        img.setAttribute("alt",'photo de la gallerie du photographe');
        img.classList.add('image-card');
        // img.classList.add('media-element');
        
    }else if(data.hasOwnProperty('video')){

        linkVideo = document.createElement('a');
        linkVideo.setAttribute('class', 'media-element');
        linkVideo.setAttribute('href', mediaVideo);
        
        vid = document.createElement('video');
        vid.setAttribute("src", mediaVideo);
        vid.setAttribute('type', "video/mp4");
        vid.setAttribute('alt', 'video de la gallerie du photographe');
        vid.classList.add('video-card');
        // vid.classList.add('media-element');
        
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

        
        article.appendChild(linkImage);
        article.appendChild(linkVideo);

        linkImage.appendChild(img);
        linkVideo.appendChild(vid);

        article.appendChild(imgInfos); 
        imgInfos.appendChild(imgTitle);
        imgInfos.appendChild(imgLikes);



        return (article);
    }

    function getFixedBottomInfos() {

        const insertLikes = document.createElement('p');
        insertLikes.classList.add('insert-likes');
        insertLikes.innerHTML=`${mediaLikes} <i class='fa-solid fa-heart'></i>`;

        return (insertLikes);

    }

    return { getMediasOfPhotographer, getFixedBottomInfos }
}
