window.onload = () => {
    // on recupere le select
    const selectElt = document.querySelector('select');

    //on récupère la 1ere div "custom-select"
    const selectDiv = document.querySelector('.custom-select');

    // on crée le nouveau select
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

    newSelect.addEventListener("click", function(e){
        // on empeche la propagation du click
        e.stopPropagation();

        // on retire le select-hide de notre menu
        this.nextSibling.classList.toggle("select-hide");
        //on ajoute la classe active à newSelect(change le sens du chevron)
        this.classList.toggle("active");

    })
}
