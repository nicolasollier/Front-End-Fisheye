const params = new URLSearchParams(window.location.search);
const photographerIdFromUrl = parseInt(params.get('id'), 10);

async function getPhotographer(photographerId) {
  await fetch('data/photographers.json')
    .then((response) => response.json())
    .then((data) => {
      photographers = [...data.photographers];
    });

  // eslint-disable-next-line max-len
  return ({ photographer: photographers.find((photographer) => photographer.id === photographerId) });
}

async function init() {
  const photographer = await getPhotographer(photographerIdFromUrl);
  console.log(photographer);
}

init();
