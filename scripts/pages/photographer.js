import { getPhotographer } from "./api.js";
import { getPhotographerMedias } from "./api.js";
import { PhotographerPage } from "../factories/photographerFactory.js";

// Get photographer id from URL
let params = new URLSearchParams(window.location.search);
let id = parseInt(params.get("id"));

// Sort select button
let sortSelect = document.querySelector(".sort__select");
let activeFilter = "date";
let initFromFilter = false;

// Add event listener to sort select button
sortSelect.addEventListener("change", (event) => {
  activeFilter = event.target.value;
  initFromFilter = true;
  init();
});

// Init photographer page
async function init() {
  const photographer = await getPhotographer(id);
  const medias = await getPhotographerMedias(id);
  
  const photographerPage = new PhotographerPage(photographer, medias, activeFilter);
  photographerPage.render(initFromFilter);
}

init();