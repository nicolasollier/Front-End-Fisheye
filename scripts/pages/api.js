export async function getPhotographers() {
  let photographers = [];

  await fetch("data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      photographers = data.photographers;
    });

  return { photographers: [...photographers] };
}

export async function getPhotographer(id) {
  let photographer = {};

  await fetch("data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      photographer = data.photographers.find((photographer) => photographer.id == id);
    });

  return photographer;
}

export async function getPhotographerMedias(id) {
  let medias = [];

  await fetch("data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      medias = data.media.filter((media) => media.photographerId == id);
    });

  return medias;
}