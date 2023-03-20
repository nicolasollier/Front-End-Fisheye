export class Lightbox {
  constructor(media) {
    this.media = media;
  }

  render() {
    const lightbox = document.querySelector(".lightbox");

    // Render HTMl
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

    // Adds active class to lightbox
    lightbox.classList.add("lightbox__active");

    // Get lightbox elements
    const lightboxCloseButton = document.querySelector(
      ".lightbox__close-button"
    );
    const lightboxImage = document.querySelector(".lightbox__image");

    // Handle close button
    lightboxCloseButton.addEventListener("click", () => {
      lightbox.classList.remove("lightbox__active");
    });

    // Handle lightbox image
    lightboxImage.src = `assets/photographers/${this.media.photographerId}/${this.media.image}`;
    lightboxImage.alt = this.media.alt;

    // Handle lightbox title
    const lightboxTitle = document.querySelector(".lightbox__title-image");
    lightboxTitle.textContent = this.media.title;
  }
}
