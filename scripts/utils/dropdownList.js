

const inputLabel = document.querySelector("#filter > label > h2");

//on récupère la div "custom-select" (qui contient tout le code du menu déroulant)
const selectDiv = document.querySelector('.custom-select');

const SelectDivGlobal = document.querySelector('.custom-select-global');
SelectDivGlobal.setAttribute('role', 'group')

// on recupere le select (caché en display none car pas joli)
const selectElt = document.querySelector('select');

// on crée le nouveau select (design personnalisé)
const newSelect = document.createElement('div');
// on ajoute la classe 'new-select'
newSelect.classList.add('new-select');
// on lui donne le contenu de l'option actuellement choisie dans le select
newSelect.innerHTML = selectElt.options[selectElt.selectedIndex].innerHTML;

newSelect.setAttribute('tabindex', "0");
newSelect.setAttribute('role', 'button');
newSelect.setAttribute('aria-haspopup', 'listbox');
newSelect.setAttribute('aria-expanded', 'false');
newSelect.setAttribute('label', `Order by ${newSelect.textContent}`);

newSelect.addEventListener('keydown', (e) => {
  if (e.key==="Enter") {
    newSelect.click();
  }
});

inputLabel.setAttribute('aria-label','Trier par');



// on cree l'element dans le DOM
SelectDivGlobal.appendChild(newSelect);

// on cree le menu deroulant
const newMenu = document.createElement('div');
newMenu.classList.add("select-items", "select-hide");

// on va boucler sur toutes les options dans le select et les copier dans la div
for (let option of selectElt.options) {
  // on cree une div pour cette option
  const newOption = document.createElement("div");
  newOption.addEventListener('keydown', (e) => {
    if (e.key==="Enter") {
      newOption.click();
    }
  });
    


  // on copie le contenu de l'option
  newOption.innerHTML = option.innerHTML;
  newOption.setAttribute('role', 'text');
  newOption.setAttribute('label', newOption.textContent);
  newOption.setAttribute('aria-activedescendant',newOption.textContent);
  newOption.setAttribute('aria-selected',newOption.textContent);
  newOption.setAttribute('aria-labelledBy',newOption.textContent);
  newOption.setAttribute('tabindex', "0");


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
SelectDivGlobal.appendChild(newMenu);

// on ajoute l'écouteur d'evenement click sur newSelect

newSelect.addEventListener("click", FilteringMedias)

function FilteringMedias(e) {
  // on empeche la propagation du click
  e.stopPropagation();
  arrMedias = [];
  arrMediasTitle= [];

  let newSelectValue = newSelect.textContent;
    
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
  displayMediasInGalleryPage(medias);
  document.querySelector("#lightbox").remove();
  displayLightbox(medias);
  
  addLikes(medias);
    

  // on retire le select-hide de notre menu
  newSelect.nextSibling.classList.toggle("select-hide");

  //on cache le newSelect pour éviter le doublon

  newMenu.childNodes.forEach((item) => {
    if (item.textContent === newSelectValue) {
      item.classList.add("select-hide");
    }else{
      item.classList.remove("select-hide");
    }
  });

  //on ajoute la classe active à newSelect(change le sens du chevron)
  newSelect.classList.toggle("active");
  selectDiv.classList.toggle("active");
  if (newSelect.classList.contains('active')){
    newSelect.setAttribute('aria-expanded', 'true');
  }else{
    newSelect.setAttribute('aria-expanded', 'false');
    newSelect.setAttribute('label', newSelect.textContent);
    inputLabel.setAttribute('role', 'listbox');


  }

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

  if ( a.date < b.date){ return -1 }
  if ( a.date > b.date){ return 1 }
  return 0;
}