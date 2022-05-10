let firstName = document.querySelector('#prenom');
let lastName = document.querySelector('#nom');
let email = document.querySelector('#email');
let message = document.querySelector('#message');

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const send = document.querySelector('.contact_button');

send.addEventListener('click', sendMessage);

function sendMessage(e) {
    e.preventDefault();
    console.log("message envoyé");
    console.log([firstName.value, lastName.value, email.value, message.value]);
    closeModal();
};

