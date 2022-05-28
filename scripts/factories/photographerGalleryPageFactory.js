// ***** AFFICHAGE DE LA PAGE PHOTOGRAPHER.HTML *****

function PhotographerGalleryPageFactory(data) {

    const { name, id, city, country, tagline, price, portrait} = data;

    const srcPicture = `assets/photographers/${portrait}`;

    // AFFICHAGE DES INFORMATIONS DU PHOTOGRAPHE SUR SA PAGE DEDIEE:
    function getPhotographerIdHeader() {

        const article = document.createElement( 'article' );
        article.classList.add('photograph-header-banner');

        // HEADER LEFT:
        const headerLeft = document.createElement ('div');
        headerLeft.classList.add('photographer-introduction');
        const headerLeftName = document.createElement('h1');
        headerLeftName.classList.add('photographer-name');
        headerLeftName.textContent = name;
        const headerLeftLocation = document.createElement('p');
        headerLeftLocation.classList.add('photographer-location');
        headerLeftLocation.textContent = `${city}, ${country}`;
        const headerLeftTagline = document.createElement('p');
        headerLeftTagline.classList.add('photographer-tagline');
        headerLeftTagline.textContent = tagline;

        // HEADER CENTER:
        const headerCenter = document.createElement ('div');
        const button = document.createElement('button');
        button.classList.add("contact_button");
        button.setAttribute('onclick', 'displayModal()');
        button.textContent = `Contactez-moi`;

        // HEADER RIGHT:
        const headerRight = document.createElement('img');
        headerRight.setAttribute("src", srcPicture);
        headerRight.setAttribute("alt", '');
        headerRight.classList.add('photographer__avatar-picture','photographer__avatar-picture-photographer' );

        // ELEMENTS D'ASSEMBLAGE
        article.appendChild(headerLeft);
        article.appendChild(headerCenter);
        article.appendChild(headerRight);
        headerLeft.appendChild(headerLeftName);
        headerLeft.appendChild(headerLeftLocation);
        headerLeft.appendChild(headerLeftTagline);
        headerCenter.appendChild(button);

        return (article);
    };

    // FORMULAIRE DE CONTACT
    // AFFICHAGE DU NOM DU PHOTOGRAPHE SUR LE FORMULAIRE DE CONTACT:
    function getNameFormContact() {

        const nameForm = document.createElement('h2');
        nameForm.classList.add('photograph-form-name');
        nameForm.textContent = name;

        return(nameForm);
    };

    // MEDIAS-INFOS
    // AFFICHAGE DU PRIX JOURNALIER DU PHOTOGRAPHE EN BAS DE PAGE
    function getPricePhotographer() {

        const p = document.createElement('p');
        p.classList.add('insert-rate');
        p.textContent = `${price}€ / jour`;

        return (p);
    };

    return { getNameFormContact, getPhotographerIdHeader, getPricePhotographer }
}
