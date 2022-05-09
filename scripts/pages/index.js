// ***** JAVASCRIPT POUR LES ELEMENTS DE LA PAGE INDEX.HTML *****

// DEFINITION DE VARIABLES GLOBALES:
let photographers;

    async function getPhotographers() {

        await fetch('data/photographers.json')
            // APPEL DE L'API:
            .then(function(res) {
                if (res.ok) {
                return res.json();
                }
            })
            // RENVOI LES DONNEES DE L'API:
            .then(function(data) {
                photographers = data.photographers;

            })
            // SI UN PROBLEME EST SURVENU DANS LE PROCESSUS:
            .catch(function(err) {
                console.log("error in the function getPhotographers()"); 
            });
    };

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = PhotographersFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        await getPhotographers();
        displayData(photographers);
    };
    
    init();
    