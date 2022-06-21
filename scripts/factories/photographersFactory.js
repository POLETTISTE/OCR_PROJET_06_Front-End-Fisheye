// ***** AFFICHAGE DES ELEMENTS DES PHOTOGRAPHES ET MEDIAS *****
class photographersFactory {

  constructor(data) {
    this._name = data.name
    this._id = data.id
    this._city = data.city
    this._country = data.country
    this._tagline = data.tagline
    this._price = data.price
    this._portrait = data.portrait
  }
   

  // CREATION DES CARDS DES PHOTOGRAPHES:
   getUserCardDOM() {

    const article = document.createElement( 'article' );

    // CONSTRUCTION CARD PHOTOGRAPHE LIEN VERS PAGE DEDIEE:
    const avatarPictureAndName = document.createElement ('a');
    avatarPictureAndName.setAttribute('href', `photographer.html?id=${this._id}`);
    avatarPictureAndName.setAttribute('aria-label', this._name);
    avatarPictureAndName.setAttribute('aria-current', 'page');
    avatarPictureAndName.classList.add('photographer__avatar');

    // CONSTRUCTION AVATAR PHOTOGRAPHE:
    const img = document.createElement( 'img');
    img.setAttribute("src", `assets/photographers/${this._portrait}`);
    img.setAttribute("alt", "");
    img.classList.add('photographer__avatar-picture','photographer__avatar-picture-index' );

    // CONSTRUCTION NOM PHOTOGRAPHE:
    const h2 = document.createElement( 'h2' );
    h2.classList.add('photographer__avatar-name');
    h2.textContent = this._name;

    // CONSTRUCTION DIV INFORMATIONS PHOTOGRAPHE:
    const infos = document.createElement ('div');
    infos.classList.add('photographer__infos');
    infos.setAttribute('role',"text");

    // CONSTRUCTION INFORMATIONS VILLE + PAYS PHOTOGRAPHE
    const paragraphCityCountry = document.createElement('p');
    paragraphCityCountry.classList.add('photographer__infos-city-country');
    paragraphCityCountry.textContent = `${this._city}, ${this._country}`;

    // CONSTRUCTION TAGLINE PHOTOGRAPHE
    const paragraphTagline = document.createElement('p');
    paragraphTagline.classList.add('photographer__infos-tagline');
    paragraphTagline.textContent = this._tagline;
        
    // CONSTRUCTION PRIX JOURNALIER DU PHOTOGRAPHE
    const paragraphPrice = document.createElement('p');
    paragraphPrice.classList.add('photographer__infos-price');
    paragraphPrice.textContent = `${this._price} €/jour`;

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

   getNameFormContact() {

    const nameForm = document.createElement('h2');
    nameForm.classList.add('photograph-form-name');
    nameForm.textContent = this._name;

    return(nameForm);
  }

   getPhotographerIdHeader() {

    const article = document.createElement( 'article' );
    article.classList.add('photograph-header-banner');

    // HEADER LEFT:
    const headerLeft = document.createElement ('div');
    headerLeft.classList.add('photographer-introduction');
    const headerLeftName = document.createElement('h1');
    headerLeftName.classList.add('photographer-name');
    headerLeftName.setAttribute('role','heading');
    headerLeftName.setAttribute('aria-level','1');
    headerLeftName.textContent = this._name;
    const headerLeftLocation = document.createElement('p');
    headerLeftLocation.classList.add('photographer-location');
    headerLeftLocation.setAttribute('role', 'text');
    headerLeftLocation.textContent = `${this._city}, ${this._country}`;
    const headerLeftTagline = document.createElement('p');
    headerLeftTagline.classList.add('photographer-tagline');
    headerLeftTagline.setAttribute('role', 'text');
    headerLeftTagline.textContent = this._tagline;

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
    imgAvatar.setAttribute("src",this._picture);
    imgAvatar.setAttribute("aria-label",this._name);
    imgAvatar.setAttribute("role",'img');
    imgAvatar.classList.add('photographer__avatar-picture','photographer__avatar-picture-photographer' );

    // FORM CONTACT
    const modal = document.getElementById("contact_modal");
    modal.setAttribute('aria-label', `Contact Me ${this._name}`);
        
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

   getPricePhotographer() {
    const p = document.createElement('p');
    p.classList.add('insert-rate');
    p.textContent = `${this._price}€ / jour`;
    return (p);
    
  }
  // return { getUserCardDOM, getNameFormContact, getPhotographerIdHeader, getPricePhotographer}
}


