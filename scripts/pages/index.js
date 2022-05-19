// ***** JAVASCRIPT POUR LES ELEMENTS DE LA PAGE INDEX.HTML *****

// DEFINITION DE VARIABLES GLOBALES:
let photographers;

    async function getPhotographers() {

        await fetch('data/photographers.json')
            .then(function(res) {
                if (res.ok) {
                return res.json();
                }
            })
            .then(function(data) {
                photographers = data.photographers;

            })
            .catch(function(err) {
                console.log(`${err} error in the function getPhotographerId()`);
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
    