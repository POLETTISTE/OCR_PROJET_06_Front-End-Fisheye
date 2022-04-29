function MediasGalleryPageFactory(data) {

    const { id, photographerId, title, image, video, likes, date, price} = data;

    const mediaImage = `assets/images/${photographerId}/${image}`;
    const mediaVideo = `assets/images/${photographerId}/${video}`;


    // // SAVOIR SI DATE CONTIENT LA PROPRIETE IMAGE OU VIDEO
    // if (data.hasOwnProperty('image')) {
    //     console.log("c'est une image");
        
    // }else if(data.hasOwnProperty('video')){
    //     console.log("c'est une video");
        
    // }else{ 
    //     console.log("error");
    // }

            
    let mediaLikes=0;
        medias.forEach((media) => { 
            mediaLikes+= media["likes"]            
        });

    function getMediasOfPhotographer() {
        
        const article = document.createElement( 'article' );
        article.classList.add('media-card');
    
        const img = document.createElement('img');
        img.setAttribute("src", mediaImage);
        img.setAttribute("alt",' ');
        img.classList.add('image-card');

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
