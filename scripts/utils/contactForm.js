let firstName = document.querySelector('#prenom');
let lastName = document.querySelector('#nom');
let email = document.querySelector('#email');
let message = document.querySelector('#message');
const send = document.querySelector('.contact_button');
const contactModal = document.getElementById("contact_modal");
const modal = document.getElementById("modal");
const modalCloseButton = document.querySelector("#header-form > div > img")

function displayModal() {
  contactModal.style.display = "block";
  modal.focus();
}

function closeModal() {
  contactModal.style.display = "none";
}

document.addEventListener('keydown', EscapeModal);

function EscapeModal(e) {
  if(e.key === "Escape") {
    e.preventDefault();
    e.stopPropagation();
    closeModal();           
  }
}



modalCloseButton.addEventListener('keydown', EscapeModalEnter);

function EscapeModalEnter(e) {
  if(e.key === "Enter") {
    e.preventDefault();
    e.stopPropagation();
    closeModal();           
  }

}

send.addEventListener('click', sendMessage);

function sendMessage(e) {

  e.preventDefault();
  console.log("message envoyé");
  console.log([firstName.value, lastName.value, email.value, message.value]);
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  message.value = "";
  closeModal();
}



