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
