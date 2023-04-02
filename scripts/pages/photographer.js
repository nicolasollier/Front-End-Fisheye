// API
import { getPhotographer } from "./api.js";
import { getPhotographerMedias } from "./api.js";

// Factories
import { PhotographerHeader } from "../factories/photographerFactory.js";
import { PhotographerMediasList } from "../factories/photographerFactory.js";
import { PhotographerInfos } from "../factories/photographerFactory.js";

// Handle global likes update
document.addEventListener("updatePhotographerLikes", (event) => {
  const photographerLikes = document.querySelector(".photograph-infos__likes");
  const photographerLikesNumber = parseInt(photographerLikes.textContent);

  if (event.detail.operationType === "increment") {
    photographerLikes.textContent = photographerLikesNumber + 1;
  } else if (event.detail.operationType === "decrement") {
    photographerLikes.textContent = photographerLikesNumber - 1;
  }
});

// Get photographer id from URL
let params = new URLSearchParams(window.location.search);
let id = parseInt(params.get("id"));

// Init photographer page
async function init() {
  const photographer = await getPhotographer(id);
  const medias = await getPhotographerMedias(id);
  let photographerTotalLikes = medias.reduce(
    (acc, media) => (acc += media.likes),
    0
  );

  const photographerHeader = new PhotographerHeader(
    photographer.name,
    photographer.city,
    photographer.country,
    photographer.tagline,
    "assets/photographers/" + photographer.portrait
  );

  const photographerMediasList = new PhotographerMediasList(medias);
  const photographerInfos = new PhotographerInfos(
    photographerTotalLikes,
    photographer.price
  );

  photographerHeader.render();
  photographerInfos.render();
  photographerMediasList.render();

  // Handle filters and changes
  const selectButton = document.querySelector(".sort__select");

  selectButton.addEventListener("change", async (e) => {
    const activeFilter = e.target.value;

    if (activeFilter === "popular") {
      photographerMediasList.sortByPopular;
    } else if (activeFilter === "date") {
      photographerMediasList.sortByDate;
    } else if (activeFilter === "title") {
      photographerMediasList.sortByTitle;
    }

    photographerMediasList.container.innerHTML = "";
    photographerMediasList.render();
  });
}

init();