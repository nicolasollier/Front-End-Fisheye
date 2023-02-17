// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
  const { name, portrait } = data;
  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');

    const wrapperLink = document.createElement('a');
    wrapperLink.setAttribute('class', 'wrapperLink');
    wrapperLink.setAttribute('aria-label', `Voir la page de ${name}`);
    wrapperLink.setAttribute('href', `photographer.html?id=${data.id}`);

    const img = document.createElement('img');
    img.setAttribute('alt', `Image de profil de ${name}`);
    img.setAttribute('src', picture);

    const h2 = document.createElement('h2');
    h2.textContent = name;

    const location = document.createElement('h3');
    location.textContent = `${data.city}, ${data.country}`;
    location.setAttribute('class', 'location');

    const tagline = document.createElement('p');
    tagline.textContent = data.tagline;
    tagline.setAttribute('class', 'tagline');

    const price = document.createElement('p');
    price.textContent = `${data.price}€/jour`;
    price.setAttribute('class', 'price');

    wrapperLink.appendChild(img);
    wrapperLink.appendChild(h2);
    article.appendChild(wrapperLink);
    article.appendChild(location);
    article.appendChild(tagline);
    article.appendChild(price);

    return (article);
  }

  return { name, picture, getUserCardDOM };
}
