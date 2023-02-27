export class PhotographerHeader {
  constructor(name, city, country, tagline, profilePictureSrc) {
    this.container = document.querySelector(".photograph-header");
    this.name = name;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.profilePictureSrc = profilePictureSrc;
  }

  render() {
    const profilePicture = new Image();
    profilePicture.src = this.profilePictureSrc;
    profilePicture.alt = `Portrait de ${this.name}`;
    profilePicture.classList.add("photograph-header__profile-picture");

    const textWrapper = document.createElement("div");
    textWrapper.classList.add("photograph-header__text-wrapper");

    const name = document.createElement("h1");
    name.textContent = `${this.name}`;

    const location = document.createElement("h2");
    location.textContent = `${this.city}, ${this.country}`;

    const tagline = document.createElement("p");
    tagline.textContent = this.tagline;

    textWrapper.appendChild(name);
    textWrapper.appendChild(location);
    textWrapper.appendChild(tagline);

    this.container.appendChild(textWrapper);
    this.container.appendChild(profilePicture);
  }
}

export class PhotographerPage {
  constructor(photographer) {
    this.photographer = photographer;
    this.photographerHeader = new PhotographerHeader(
      photographer.name,
      photographer.city,
      photographer.country,
      photographer.tagline,
      "assets/photographers/" + photographer.portrait
    );
  }

  render() {
    this.photographerHeader.render();
  }
}
