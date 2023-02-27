import { getPhotographer } from "./api.js";
import { getPhotographerMedias } from "./api.js";
import { PhotographerPage } from "../factories/photographerFactory.js";

// Get photographer id from URL
let params = new URLSearchParams(window.location.search);
let id = parseInt(params.get("id"));

// Init photographer page
async function init() {
  const photographer = await getPhotographer(id);
  const medias = await getPhotographerMedias(id);

  const photographerPage = new PhotographerPage(photographer, medias);
  photographerPage.render();
}

init();
