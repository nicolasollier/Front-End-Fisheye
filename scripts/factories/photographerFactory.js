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

export class PhotographerMediasList {
  constructor(medias, activeFilter) {
    this.container = document.querySelector(".photograph-medias");
    this.medias = medias;
    this.activeFilter = activeFilter;
  }

  render() {
    console.log(this.activeFilter);
    // Filter medias by active filter
    if (this.activeFilter === "popular") {
      this.medias.sort((a, b) => b.likes - a.likes);
    } else if (this.activeFilter === "date") {
      this.medias.sort((a, b) => b.date - a.date);
    } else if (this.activeFilter === "title") {
      this.medias.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    }
    this.medias.forEach((media) => {
      const mediaFigure = document.createElement("figure");
      mediaFigure.classList.add("photograph-medias__media");

      if (media.image) {
        const mediaImage = new Image();

        mediaImage.src = `assets/photographers/${media.photographerId}/${media.image}`;
        mediaImage.alt = media.alt;
        mediaImage.classList.add("photograph-medias__media__image");
        mediaFigure.appendChild(mediaImage);
      } else if (media.video) {
        const mediaVideo = document.createElement("video");

        mediaVideo.src = `assets/photographers/${media.photographerId}/${media.video}`;
        mediaVideo.alt = media.alt;
        mediaVideo.classList.add("photograph-medias__media__video");
        mediaFigure.appendChild(mediaVideo);
      }

      const mediaTitle = document.createElement("figcaption");
      mediaTitle.textContent = media.title;
      mediaTitle.classList.add("photograph-medias__media__title");

      const mediaLikes = document.createElement("span");
      mediaLikes.textContent = media.likes;
      mediaLikes.classList.add("photograph-medias__media__likes");

      const mediaLikeButton = document.createElement("button");
      mediaLikeButton.classList.add("photograph-medias__media__like-button");
      mediaLikeButton.setAttribute("aria-label", "J'aime");

      const textWrapper = document.createElement("div");
      textWrapper.classList.add("photograph-medias__media__text-wrapper");

      mediaLikes.appendChild(mediaLikeButton);
      textWrapper.appendChild(mediaTitle);
      textWrapper.appendChild(mediaLikes);
      mediaFigure.appendChild(textWrapper);

      this.container.appendChild(mediaFigure);
    });
  }
}

export class PhotographerInfos {
  constructor(likes, price) {
    this.container = document.querySelector(".photograph-infos");
    this.likes = likes;
    this.price = price;
  }

  render() {
    const likes = document.createElement("p");
    likes.textContent = `${this.likes}`;
    const likesIcon = document.createElement("i");
    likesIcon.classList.add("fas", "fa-heart");
    likes.appendChild(likesIcon);

    likes.classList.add("photograph-infos__likes");

    const price = document.createElement("p");
    price.textContent = `${this.price}€ / jour`;
    price.classList.add("photograph-infos__price");

    this.container.appendChild(likes);
    this.container.appendChild(price);
  }
}

export class PhotographerPage {
  constructor(photographer, medias, activeFilter) {
    // If activeFilter is not null, set it to activeFilter, else set it to an empty string
    activeFilter ? this.activeFilter = activeFilter : "";

    this.photographer = photographer;
    this.photographerHeader = new PhotographerHeader(
      photographer.name,
      photographer.city,
      photographer.country,
      photographer.tagline,
      "assets/photographers/" + photographer.portrait
    );

    let totalLikes = 0;
    medias.forEach((media) => {
      totalLikes += media.likes;
    });
    
    this.photographerInfos = new PhotographerInfos(totalLikes, photographer.price);
    this.photographerMediasList = new PhotographerMediasList(medias, this.activeFilter);
  }

  render() {
    this.photographerHeader.render();
    this.photographerInfos.render();
    this.photographerMediasList.render();
  }
}
