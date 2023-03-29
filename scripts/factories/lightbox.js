export class Lightbox {
  constructor(currentMedia, medias) {
    this.currentMedia = currentMedia;
    this.medias = medias;
  }

  renderImage() {
    const figure = document.querySelector(".lightbox__figure");
    figure.querySelector(
      "img"
    ).src = `assets/photographers/${this.currentMedia.photographerId}/${this.currentMedia.image}`;
    figure.querySelector('.lightbox__title-image').textContent = this.currentMedia.title;
  }

  renderVideo() {
    const figure = document.querySelector(".lightbox__figure");
    figure.querySelector(
      "video"
    ).src = `assets/photographers/${this.currentMedia.photographerId}/${this.currentMedia.video}`;
    figure.querySelector('.lightbox__title-video').textContent = this.currentMedia.title;
  }

  render() {
    const lightbox = document.querySelector(".lightbox");
    // Render HTMl conditionally if image or video
    if (this.currentMedia.image) {
      lightbox.innerHTML = `
        <button class="lightbox__previous-arrow">
            <i class="fa-solid fa-chevron-left"></i>
        </button>
        <figure class="lightbox__figure">
            <img class="lightbox__image"></img>
            <figcaption class="lightbox__title-image"></figcaption>
        </figure>
        <button class="lightbox__next-arrow">
            <i class="fa-solid fa-chevron-right"></i>
        </button>
        <button class="lightbox__close-button">
            <i class="fa-solid fa-times"></i>
        </button>
        `;
    } else if (this.currentMedia.video) {
      lightbox.innerHTML = `
            <button class="lightbox__previous-arrow">
                <i class="fa-solid fa-chevron-left"></i>    
            </button>
            <figure class="lightbox__figure">
                <video class="lightbox__video" controls></video>
                <figcaption class="lightbox__title-video"></figcaption>
            </figure>
            <button class="lightbox__next-arrow">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
            <button class="lightbox__close-button">
                <i class="fa-solid fa-times"></i>
            </button>
        `;
    }

    // Adds active class to lightbox
    lightbox.classList.add("lightbox__active");

    // Get lightbox elements
    const lightboxCloseButton = document.querySelector(
      ".lightbox__close-button"
    );

    if (this.currentMedia.image) {
      const lightboxImage = document.querySelector(".lightbox__image");
      lightboxImage.src = `assets/photographers/${this.currentMedia.photographerId}/${this.currentMedia.image}`;
      lightboxImage.alt = this.currentMedia.alt;

      const lightboxTitleImage = document.querySelector(
        ".lightbox__title-image"
      );
      lightboxTitleImage.textContent = this.currentMedia.title;
    } else if (this.currentMedia.video) {
      const lightboxVideo = document.querySelector(".lightbox__video");
      lightboxVideo.src = `assets/photographers/${this.currentMedia.photographerId}/${this.currentMedia.video}`;
      lightboxVideo.alt = this.currentMedia.alt;

      const lightboxTitleVideo = document.querySelector(
        ".lightbox__title-video"
      );
      lightboxTitleVideo.textContent = this.currentMedia.title;
    }

    // Handle close button
    lightboxCloseButton.addEventListener("click", () => {
      lightbox.classList.remove("lightbox__active");
    });

    // Handle previous arrow
    const lightboxPreviousArrow = document.querySelector(
      ".lightbox__previous-arrow"
    );
    lightboxPreviousArrow.addEventListener("click", () => {
      const currentIndex = this.medias.indexOf(this.currentMedia);
      const previousMedia = this.medias[currentIndex - 1];
      if (previousMedia) {
        this.currentMedia = previousMedia;
        this.currentMedia.image ? this.renderImage() : this.renderVideo();
      }
    });

    // Handle next arrow
    const lightboxNextArrow = document.querySelector(".lightbox__next-arrow");
    lightboxNextArrow.addEventListener("click", () => {
      const currentIndex = this.medias.indexOf(this.currentMedia);
      const nextMedia = this.medias[currentIndex + 1];
      if (nextMedia) {
        this.currentMedia = nextMedia;
        this.currentMedia.image ? this.renderImage() : this.renderVideo();
      }
    });
  }
}
