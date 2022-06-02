let firstName = document.querySelector('#prenom');
let lastName = document.querySelector('#nom');
let email = document.querySelector('#email');
let message = document.querySelector('#message');
const send = document.querySelector('.contact_button');
const modal = document.getElementById("contact_modal");

function displayModal() {
	modal.style.display = "block";
};

function closeModal() {
    modal.style.display = "none";

};

document.addEventListener('keydown', EscapeModal);

function EscapeModal(e) {
    if(e.key === "Escape") {
        e.preventDefault();
        closeModal();           
    }
};

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
};


