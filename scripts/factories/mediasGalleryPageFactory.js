function MediasGalleryPageFactory(data) {

    const { id, photographerId, title, image, likes, date, price} = data;

    const picture = `assets/images/${photographerId}/${image}`;

    let mediaLikes;
        medias.forEach((media) => { 
            mediaLikes = 0
            mediaLikes+=media['likes'];
        });

    function getMediasOfPhotographer() {

        const divGeneral = document.createElement('div');
        
        const article = document.createElement( 'article' );
        article.classList.add('liste-media');

        const insertInfos = document.createElement('div');
        insertInfos.classList.add('insert-infos');

        const insertLikes = document.createElement('p');
        insertLikes.classList.add('insert-likes');
        insertLikes.textContent=(`nombre de likes ${mediaLikes}`);

        const insertRate = document.createElement('p');
        insertRate.classList.add('insert-rate');
        insertRate.textContent=(`${price} €/jour`);

        
        // if media is a picture
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", '');
        img.classList.add('media-card');


        divGeneral.appendChild(img);
        divGeneral.appendChild(article);
        article.appendChild(insertInfos);
        insertInfos.appendChild(insertLikes);
        insertInfos.appendChild(insertRate);

        // if media is a video
        // <video controls width="250">

        // <source src="/media/cc0-videos/flower.webm"
        //         type="video/webm">

        // <source src="/media/cc0-videos/flower.mp4"
        //         type="video/mp4">

        // Sorry, your browser doesn't support embedded videos.
        // </video>

        return (divGeneral);
    }
    return { id, photographerId, title, image, likes, date, price, picture, getMediasOfPhotographer }
}
