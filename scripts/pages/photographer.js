// API
import { getPhotographer } from "./api.js";
import { getPhotographerMedias } from "./api.js";

//Factories
import { PhotographerHeader } from "../factories/photographerFactory.js";
import { PhotographerMediasList } from "../factories/photographerFactory.js";
import { PhotographerInfos } from "../factories/photographerFactory.js";

// Get photographer id from URL
let params = new URLSearchParams(window.location.search);
let id = parseInt(params.get("id"));

// Init photographer page
async function init() {
  const photographer = await getPhotographer(id);
  const medias = await getPhotographerMedias(id);
  let photographerTotalLikes = medias.reduce((acc, media) => (acc += media.likes), 0);

  let photographerHeader = new PhotographerHeader(
    photographer.name,  
    photographer.city,
    photographer.country,
    photographer.tagline,
    "assets/photographers/" + photographer.portrait
  );

  let photographerMediasList = new PhotographerMediasList(medias, "popular");
  let photographerInfos = new PhotographerInfos(photographerTotalLikes, photographer.price);

  photographerHeader.render();
  photographerInfos.render();
  photographerMediasList.render();
}

init();