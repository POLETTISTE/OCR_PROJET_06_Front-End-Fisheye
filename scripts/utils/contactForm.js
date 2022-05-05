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
    alert("message envoyé");
};