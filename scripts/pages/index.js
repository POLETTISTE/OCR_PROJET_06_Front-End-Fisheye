// ***** JAVASCRIPT POUR LES ELEMENTS DE LA PAGE INDEX.HTML *****

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
    .catch((err) => {
      console.log('error in the function getPhotographerId()', err);
    });

  return {photographers};

}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = new photographersFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
        
  await getPhotographers();
  await displayData(photographers);
}

init();
