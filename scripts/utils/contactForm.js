// API
import { getPhotographer } from "../../scripts/pages/api.js";

// Get photographer id from URL
let params = new URLSearchParams(window.location.search);
let id = parseInt(params.get("id"));

// Get DOM elements
const firstNameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");
const emailInput = document.querySelector("#email");

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
    closeContactModalButton.focus();
});

closeContactModalButton.addEventListener("click", () => {
    modal.style.display = "none";
    firstNameInput.classList.remove("invalid");
    lastNameInput.classList.remove("invalid");
    emailInput.classList.remove("invalid");

    document.querySelector(".first-name__feedback").style.display = "none";
    document.querySelector(".last-name__feedback").style.display = "none";
    document.querySelector(".email__feedback").style.display = "none";
    openContactModalButton.focus();
    
    resetForm();
});

// REGEX
const regexName = /^[a-zA-ZÀ-ÿ\s]{1,}$/;
const regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

// Validates inputs
let firstNameIsValid = false;
let lastNameIsValid = false;
let emailIsValid = false;


firstNameInput.addEventListener("input", () => {
    let isValid = regexName.test(firstNameInput.value) && firstNameInput.value.length > 0;
    if (isValid) {
        document.querySelector(".first-name__feedback").style.display = "none";
        firstNameInput.classList.remove("invalid");
        firstNameInput.classList.add("valid");

        return firstNameIsValid = true;
    }
    if (!isValid) {
        firstNameInput.classList.remove("valid");
        firstNameInput.classList.add("invalid");
        document.querySelector(".first-name__feedback").style.display = "block";

        return firstNameIsValid = false;
    }
});

lastNameInput.addEventListener("input", () => {
    let isValid = regexName.test(lastNameInput.value) && lastNameInput.value.length > 0;
    if (isValid) {
        document.querySelector(".last-name__feedback").style.display = "none";
        lastNameInput.classList.remove("invalid");
        lastNameInput.classList.add("valid");

        return lastNameIsValid = true;
    }
    if (!isValid) {
        lastNameInput.classList.remove("valid");
        lastNameInput.classList.add("invalid");
        document.querySelector(".last-name__feedback").style.display = "block";

        return lastNameIsValid = false;
    }
});

emailInput.addEventListener("input", () => {
    let isValid = regexEmail.test(emailInput.value) && emailInput.value.length > 0;
    if (isValid) {
        document.querySelector(".email__feedback").style.display = "none";
        emailInput.classList.remove("invalid");
        emailInput.classList.add("valid");

        return emailIsValid = true;
    }
    if (!isValid) {
        emailInput.classList.remove("valid");
        emailInput.classList.add("invalid");
        document.querySelector(".email__feedback").style.display = "block";

        return emailIsValid = false;
    }
});
// Listener onClose


// Reset form
const resetForm = () => {
    firstNameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    document.querySelector("#message").value = "";
};

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (firstNameIsValid && lastNameIsValid && emailIsValid) {
        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        const email = emailInput.value;
        const message = document.querySelector("#message").value;

        const contact = {
            firstName,
            lastName,
            email,
            message,
        };

        console.log(contact);
        modal.style.display = "none";
        resetForm();
    }
});
