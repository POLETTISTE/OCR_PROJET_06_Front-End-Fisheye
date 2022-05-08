// ----- Affichage de la page index.html

function PhotographersFactory(data) {
    const { name, id, city, country, tagline, price, portrait} = data;
    
    const picture = `assets/photographers/${portrait}`;
    
    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        // Affichage avatar photographe + ses infos
        const avatarPictureAndName = document.createElement ('a');
        avatarPictureAndName.setAttribute('href', `photographer.html?id=${id}`);
        avatarPictureAndName.setAttribute('aria-label', 'collection des photos du photographe');
        avatarPictureAndName.setAttribute('aria-current', 'page');
        avatarPictureAndName.classList.add('photographer__avatar');

        // image du photographe
        const img = document.createElement( 'img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        img.classList.add('photographer__avatar-picture');

        // nom du photographe
        const h2 = document.createElement( 'h2' );
        h2.classList.add('photographer__avatar-name');
        h2.textContent = name;

        //informations du photographe
        const infos = document.createElement ('div');
        infos.classList.add('photographer__infos');

        //informations du photographe ville + pays
        const paragraphCityCountry = document.createElement('p');
        paragraphCityCountry.classList.add('photographer__infos-city-country');
        paragraphCityCountry.textContent = `${city}, ${country}`;

        // informations du photographe tagline
        const paragraphTagline = document.createElement('p');
        paragraphTagline.classList.add('photographer__infos-tagline');
        paragraphTagline.textContent = tagline;
        
        //informations du photographe prix journalier
        const paragraphPrice = document.createElement('p');
        paragraphPrice.classList.add('photographer__infos-price');
        paragraphPrice.textContent = `${price} €/jour`;


        article.appendChild(avatarPictureAndName);
        avatarPictureAndName.appendChild(img);
        avatarPictureAndName.appendChild(h2);

        article.appendChild(infos);
        infos.appendChild(paragraphCityCountry);
        infos.appendChild(paragraphTagline);
        infos.appendChild(paragraphPrice);

        return (article);
    }

    return { getUserCardDOM }
}
