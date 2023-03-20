// API
import { getPhotographer } from "../../scripts/pages/api.js";

// Get photographer id from URL
let params = new URLSearchParams(window.location.search);
let id = parseInt(params.get("id"));

const openContactModalButton = document.querySelector(".contact_button");
const closeContactModalButton = document.querySelector(".contact_modal__close");
const modal = document.getElementById("contact_modal");
const contactForm = document.querySelector("#contactForm");

openContactModalButton.addEventListener("click", async () => {
    const photographer = await getPhotographer(id);
    modal.style.display = "flex";
    const modalName = document.querySelector(".contact__title");
    modalName.innerHTML = "";
    modalName.innerHTML = `Contactez-moi <br> <h2 class="contact__title__name">${photographer.name}</h2>`;
});

closeContactModalButton.addEventListener("click", () => {
    modal.style.display = "none";
});

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log({
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        message: e.target.message.value,
    });
    e.target.reset();
    modal.style.display = "none";
});
