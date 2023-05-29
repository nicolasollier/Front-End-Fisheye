// Imports
import { Lightbox } from "../factories/lightbox.js";

// Factories
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

export class MediaFactory {
  constructor(media, medias) {
    this.media = media;
    this.medias = medias;
  }
  
  render() {
    if(this.media.image) {
      const mediaImage = new Image();
      const mediaButton = document.createElement("button");

      mediaButton.classList.add("unstyled");
      mediaImage.src = `assets/photographers/${this.media.photographerId}/${this.media.image}`;
      mediaImage.alt = this.media.title;
      mediaImage.classList.add("photograph-medias__media__image");

      mediaButton.addEventListener("click", () => {
        const lightbox = new Lightbox(this.media, this.medias);
        lightbox.render();
      });

      mediaButton.appendChild(mediaImage);
      return mediaButton;
    }
    else if(this.media.video) {
      const mediaVideo = document.createElement("video");
      const mediaButton = document.createElement("button");

      mediaButton.classList.add("unstyled");
      mediaVideo.src = `assets/photographers/${this.media.photographerId}/${this.media.video}`;
      mediaButton.title = this.media.title;
      mediaVideo.classList.add("photograph-medias__media__video");

      mediaButton.addEventListener("click", () => {
        const lightbox = new Lightbox(this.media, this.medias);
        lightbox.render();
      });

      mediaButton.appendChild(mediaVideo);
      return mediaButton;
    }
  }
}

export class PhotographerMediasList {
  constructor(medias) {
    this.container = document.querySelector(".photograph-medias");
    this.medias = medias;
  }

  // Filters getters
  get sortByPopular() {
    return this.medias.sort((a, b) => b.likes - a.likes);
  }
  get sortByDate() {
    return this.medias.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  get sortByTitle() {
    return this.medias.sort((a, b) => a.title.localeCompare(b.title));
  }

  render() {
    this.medias.forEach((media) => {
      const mediaFigure = document.createElement("figure");
      mediaFigure.classList.add("photograph-medias__media");

      // Add the media an id to be able to target it in the lightbox
      mediaFigure.setAttribute("id", 'media-figure__' + media.id);

      const generatedMedia = new MediaFactory(media, this.medias);
      mediaFigure.appendChild(generatedMedia.render());

      const mediaTitle = document.createElement("figcaption");
      mediaTitle.textContent = media.title;
      mediaTitle.classList.add("photograph-medias__media__title");

      const mediaLikesWrapper = document.createElement("span");
      mediaLikesWrapper.classList.add(
        "photograph-medias__media__likes-wrapper"
      );

      const mediaLikes = document.createElement("p");
      mediaLikes.textContent = `${media.likes}`;
      mediaLikes.classList.add("photograph-medias__media__likes");

      const mediaLikesButton = document.createElement("button");
      mediaLikesButton.classList.add("photograph-medias__media__likes-button");
      mediaLikesButton.setAttribute("aria-label", "J'aime");

      mediaLikesButton.addEventListener("click", () => {
        let mediaIndex = this.medias.indexOf(media);
        let operationType = "";

        mediaLikesButton.classList.contains(
          "photograph-medias__media__likes-button--liked"
        )
          ? (this.medias[mediaIndex].likes -= 1, (operationType = "decrement"))
          : (this.medias[mediaIndex].likes += 1, (operationType = "increment"));

        mediaLikes.textContent = `${this.medias[mediaIndex].likes}`;

        document.dispatchEvent(
          new CustomEvent("updatePhotographerLikes", {
            detail: {
              likes: this.medias[mediaIndex].likes,
              photographerId: this.medias[mediaIndex].photographerId,
              operationType,
            },
          })
        );
        // Toggle liked class on the button
        mediaLikesButton.classList.toggle(
          "photograph-medias__media__likes-button--liked"
        );
      });

      const mediaLikeButton = document.createElement("button");
      mediaLikeButton.classList.add("photograph-medias__media__like-button");
      mediaLikeButton.setAttribute("aria-label", "J'aime");

      const textWrapper = document.createElement("div");
      textWrapper.classList.add("photograph-medias__media__text-wrapper");

      mediaLikesWrapper.appendChild(mediaLikes);
      mediaLikesWrapper.appendChild(mediaLikesButton);
      textWrapper.appendChild(mediaTitle);
      textWrapper.appendChild(mediaLikesWrapper);
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
    const likesWrapper = document.createElement("div");
    likesWrapper.classList.add("photograph-infos__likes-wrapper");

    const likes = document.createElement("p");
    likes.textContent = `${this.likes}`;
    likes.classList.add("photograph-infos__likes");

    const likesIcon = document.createElement("i");
    likesIcon.classList.add("fas", "fa-heart");

    const price = document.createElement("p");
    price.textContent = `${this.price}€ / jour`;
    price.classList.add("photograph-infos__price");

    likesWrapper.appendChild(likes);
    likesWrapper.appendChild(likesIcon);

    this.container.appendChild(likesWrapper);
    this.container.appendChild(price);
  }
}
