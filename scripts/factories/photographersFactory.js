// ***** AFFICHAGE DES ELEMENTS DES PHOTOGRAPHES ET MEDIAS *****

function photographersFactory(data) {

  const { name, id, city, country, tagline, price, portrait} = data;
  const picture = `assets/photographers/${portrait}`;
  
    

  // CREATION DES CARDS DES PHOTOGRAPHES:
  function getUserCardDOM() {

    const article = document.createElement( 'article' );

    // CONSTRUCTION CARD PHOTOGRAPHE LIEN VERS PAGE DEDIEE:
    const avatarPictureAndName = document.createElement ('a');
    avatarPictureAndName.setAttribute('href', `photographer.html?id=${id}`);
    avatarPictureAndName.setAttribute('aria-label', name);
    avatarPictureAndName.setAttribute('aria-current', 'page');
    avatarPictureAndName.classList.add('photographer__avatar');

    // CONSTRUCTION AVATAR PHOTOGRAPHE:
    const img = document.createElement( 'img');
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");
    img.classList.add('photographer__avatar-picture','photographer__avatar-picture-index' );

    // CONSTRUCTION NOM PHOTOGRAPHE:
    const h2 = document.createElement( 'h2' );
    h2.classList.add('photographer__avatar-name');
    h2.textContent = name;

    // CONSTRUCTION DIV INFORMATIONS PHOTOGRAPHE:
    const infos = document.createElement ('div');
    infos.classList.add('photographer__infos');
    infos.setAttribute('role',"text");

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

  function getNameFormContact() {

    const nameForm = document.createElement('h2');
    nameForm.classList.add('photograph-form-name');
    nameForm.textContent = name;

    return(nameForm);
  }

  function getPhotographerIdHeader() {

    const article = document.createElement( 'article' );
    article.classList.add('photograph-header-banner');

    // HEADER LEFT:
    const headerLeft = document.createElement ('div');
    headerLeft.classList.add('photographer-introduction');
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
    button.setAttribute('tabindex', '0');

    button.textContent = `Contactez-moi`;

    // HEADER RIGHT:
    const headerRight = document.createElement('div');
    const imgAvatar = document.createElement('img');
    imgAvatar.setAttribute("src", picture);
    imgAvatar.setAttribute("aria-label",name);
    imgAvatar.setAttribute("role",'img');
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
  }

  function getPricePhotographer() {
    const p = document.createElement('p');
    p.classList.add('insert-rate');
    p.textContent = `${price}€ / jour`;
    return (p);
    
  }





  return { getUserCardDOM, getNameFormContact, getPhotographerIdHeader, getPricePhotographer}
}


