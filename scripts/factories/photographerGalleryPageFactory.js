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
        headerLeft.setAttribute('role',"contentinfo");
        const headerLeftName = document.createElement('h1');
        headerLeftName.classList.add('photographer-name');
        headerLeftName.setAttribute('role','heading');
        headerLeftName.setAttribute('aria-level','1');
        headerLeftName.textContent = name;
        const headerLeftLocation = document.createElement('p');
        headerLeftLocation.classList.add('photographer-location');
        headerLeftLocation.setAttribute('role', 'text');
        headerLeftLocation.textContent = `${city}, ${country}`;
        const headerLeftTagline = document.createElement('p');
        headerLeftTagline.classList.add('photographer-tagline');
        headerLeftTagline.setAttribute('role', 'text');
        headerLeftTagline.textContent = tagline;

        // HEADER CENTER:
        const headerCenterRight = document.createElement ('div');
        headerCenterRight.classList.add('contact-avatar-flex');


        const headerCenter = document.createElement ('div');
        const button = document.createElement('button');
        button.classList.add("contact_button");
        button.setAttribute('onclick', 'displayModal()');
        button.setAttribute('aria-label', 'Contact Me');
        button.textContent = `Contactez-moi`;

        // HEADER RIGHT:
        const headerRight = document.createElement('div');
        const imgAvatar = document.createElement('img');
        imgAvatar.setAttribute("src", srcPicture);
        imgAvatar.setAttribute("aria-label",name);
        imgAvatar.setAttribute("role",'image');
        imgAvatar.classList.add('photographer__avatar-picture','photographer__avatar-picture-photographer' );

        // FORM CONTACT
        const modal = document.getElementById("contact_modal");
        modal.setAttribute('aria-label', `Contact Me ${name}`);
        
        const headerForm = document.querySelector("#header-form > div")
        headerForm.setAttribute('role', 'heading');
        headerForm.setAttribute('aria-level','2');

        // ELEMENTS D'ASSEMBLAGE
        article.appendChild(headerLeft);
        article.appendChild(headerCenterRight);

        headerLeft.appendChild(headerLeftName);
        headerLeft.appendChild(headerLeftLocation);
        headerLeft.appendChild(headerLeftTagline);
        headerCenterRight.appendChild(headerCenter);
        headerCenterRight.appendChild(headerRight);
        headerCenter.appendChild(button);
        headerRight.appendChild(imgAvatar);

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
