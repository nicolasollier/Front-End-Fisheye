import { getPhotographer } from "./api.js";
import { PhotographerPage } from "../factories/photographerFactory.js";

// Get photographer id from URL
let params = new URLSearchParams(window.location.search);
let id = parseInt(params.get("id"));

// Init photographer page
async function init() {
  const photographer = await getPhotographer(id);
  const photographerPage = new PhotographerPage(photographer);

  photographerPage.render();
}

init();
