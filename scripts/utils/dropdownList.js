//on récupère la div "custom-select" (qui contient tout le code du menu déroulant)
const selectDiv = document.querySelector('.custom-select');
// on recupere le select (caché en display none car pas joli)
const selectElt = document.querySelector('select');


// on crée le nouveau select (design personnalisé)
const newSelect = document.createElement('div');
// on ajoute la classe 'new-select'
newSelect.classList.add('new-select');
// on lui donne le contenu de l'option actuellement choisie dans le select
newSelect.innerHTML = selectElt.options[selectElt.selectedIndex].innerHTML;

// on cree l'element dans le DOM
selectDiv.appendChild(newSelect);

// on cree le menu deroulant
const newMenu = document.createElement('div');
newMenu.classList.add("select-items", "select-hide");

// on va boucler sur toutes les options dans le select et les copier dans la div
for (let option of selectElt.options) {
    // on cree une div pour cette option
    const newOption = document.createElement("div");
    
    // on copie le contenu de l'option
    newOption.innerHTML = option.innerHTML;

    //on ajoute un écouteur d'evenement click sur l'option
    newOption.addEventListener('click', function() {
        // on boucle sur chacun des options du select original
        for(let option of selectElt.options) {
            if(option.innerHTML===this.innerHTML) {
                //on active la bonne option dans le select
                selectElt.selectedIndex = option.index;

                //on change le texte de notre "newSelect"
                newSelect.innerHTML = this.innerHTML;

                break;
            }
        }
        // on simule un click sur 'newSelect'
        newSelect.click();
    });

    //on ajoute l'option dans le newMenu
    newMenu.appendChild(newOption);
}

// on affiche le menu
selectDiv.appendChild(newMenu);

// on ajoute l'écouteur d'evenement click sur newSelect

newSelect.addEventListener("click", FilteringMedias)

function FilteringMedias() {
    // on empeche la propagation du click
    // e.stopPropagation();

    newSelectValue = newSelect.textContent;
    
    switch (newSelectValue) {
        case 'Popularité':
            medias = medias.sort(compare_likes);
            break;
        case 'Date':
            medias = medias.sort(compare_date);
            break;
        case 'Titre':
            medias = medias.sort(compare_title);
            break;
        default:
            console.log('Invalid sort');
            break;
    }
                
    
    // on supprime le contenu pour insérer le contenu trié
    let mediasInfo = document.querySelector(".medias-info");
    mediasInfo.innerHTML ="";

    let mediasMain = document.querySelector(".medias-main");
    mediasMain.innerHTML = "";
    clickedLikes = 0;

    displayMediasLikesBottom(medias);
    displayPhotographerPriceBottom(photographers);
    addLikes();
    displayMediasInGalleryPage(medias);
    displayLightbox(medias);
    

    // on retire le select-hide de notre menu
    newSelect.nextSibling.classList.toggle("select-hide");

    //on cache le newSelect pour éviter le doublon
    newSelect.classList.toggle("select-hide");
    
    //on ajoute la classe active à newSelect(change le sens du chevron)
    newSelect.classList.toggle("active");

}

function compare_title( a, b ) {
    if ( a.title.toLowerCase() < b.title.toLowerCase()){
    return -1;
    }
    if ( a.title.toLowerCase() > b.title.toLowerCase()){
    return 1;
    }
    return 0;
}

function compare_likes ( a, b ) {
    if ( a.likes > b.likes){
        return -1;
        }
        if ( a.likes < b.likes){
        return 1;
        }
        return 0;
}

function compare_date ( a,b ) {

    if ( a.date < b.date){ return -1 };
    if ( a.date > b.date){ return 1 };
    return 0;
};