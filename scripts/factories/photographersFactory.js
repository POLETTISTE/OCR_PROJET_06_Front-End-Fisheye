// ***** AFFICHAGE DE LA PAGE INDEX.HTML *****

function PhotographersFactory(data) {
    const { name, id, city, country, tagline, price, portrait} = data;
    
    const picture = `assets/photographers/${portrait}`;
    
    // CREATION DES CARDS DES PHOTOGRAPHES:
    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        // CONSTRUCTION CARD PHOTOGRAPHE LIEN VERS PAGE DEDIEE:
        const avatarPictureAndName = document.createElement ('a');
        avatarPictureAndName.setAttribute('href', `photographer.html?id=${id}`);
        avatarPictureAndName.setAttribute('aria-label', 'collection des photos du photographe');
        avatarPictureAndName.setAttribute('aria-current', 'page');
        avatarPictureAndName.classList.add('photographer__avatar');

        // CONSTRUCTION AVATAR PHOTOGRAPHE:
        const img = document.createElement( 'img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        img.classList.add('photographer__avatar-picture');

        // CONSTRUCTION NOM PHOTOGRAPHE:
        const h2 = document.createElement( 'h2' );
        h2.classList.add('photographer__avatar-name');
        h2.textContent = name;

        // CONSTRUCTION DIV INFORMATIONS PHOTOGRAPHE:
        const infos = document.createElement ('div');
        infos.classList.add('photographer__infos');

        // CONSTRUCTION INFORMATIONS VILLE + PAYS PHOTOGRAPHE
        const paragraphCityCountry = document.createElement('p');
        paragraphCityCountry.classList.add('photographer__infos-city-country');
        paragraphCityCountry.textContent = `${city}, ${country}`;

        // CONSTRUCTION TAGLINE PHOTOGRAPHE
        const paragraphTagline = document.createElement('p');
        paragraphTagline.classList.add('photographer__infos-tagline');
        paragraphTagline.textContent = tagline;
        
        // CONSTRUCTION PRIX JOURNALIER DU PHOTOGRAPHE
        const paragraphPrice = document.createElement('p');
        paragraphPrice.classList.add('photographer__infos-price');
        paragraphPrice.textContent = `${price} €/jour`;


        // ELEMENT DE CONSTRUCTION:
        article.appendChild(avatarPictureAndName);
        article.appendChild(infos);
        avatarPictureAndName.appendChild(img);
        avatarPictureAndName.appendChild(h2);
        infos.appendChild(paragraphCityCountry);
        infos.appendChild(paragraphTagline);
        infos.appendChild(paragraphPrice);

        return (article);
    }

    return { getUserCardDOM }
}
