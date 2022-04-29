function PhotographerGalleryPageFactory(data) {
    const { name, id, city, country, tagline, price, portrait} = data;
    
    const srcPicture = `assets/photographers/${portrait}`;

    function getPhotographerIdHeader() {
        const article = document.createElement( 'article' );
        article.classList.add('photograph-header-banner');


        // BLOC LEFT >>>  NAME / CITY/COUNTRY / TAGLINE
        const headerLeft = document.createElement ('div');
        const headerLeftName = document.createElement('h1');
        headerLeftName.classList.add('photographer-name');
        headerLeftName.textContent = name;
        const headerLeftLocation = document.createElement('p');
        headerLeftLocation.classList.add('photographer-location');
        headerLeftLocation.textContent = `${city}, ${country}`;
        const headerLeftTagline = document.createElement('p');
        headerLeftTagline.classList.add('photographer-tagline');
        headerLeftTagline.textContent = tagline;

        // BLOC CENTER >>> BUTTON CONTACT
        const headerCenter = document.createElement ('div');
        const button = document.createElement('button');
        button.classList.add("contact_button");
        button.setAttribute('onclick', 'displayModal()');
        button.textContent = `Contactez-moi`;

        // BLOC RIGHT >>> AVATAR
        const headerRight = document.createElement('img');
        headerRight.setAttribute("src", srcPicture);
        headerRight.setAttribute("alt", '');
        headerRight.classList.add('photographer__avatar-picture');


        article.appendChild(headerLeft);
        headerLeft.appendChild(headerLeftName);
        headerLeft.appendChild(headerLeftLocation);
        headerLeft.appendChild(headerLeftTagline);

        article.appendChild(headerCenter);
        headerCenter.appendChild(button);

        article.appendChild(headerRight);


        return (article);
    }

    function getPricePhotographer() {

        const p = document.createElement('p');
        p.classList.add('insert-rate');
        p.textContent = `${price}€ / jour`;
    
        return (p);
    }

    return { getPhotographerIdHeader, getPricePhotographer }
}
