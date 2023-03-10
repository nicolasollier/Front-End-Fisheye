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