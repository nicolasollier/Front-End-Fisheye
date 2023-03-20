export class Lightbox {
  constructor(medias, photographer) {
    this.medias = medias;
    this.photographer = photographer;
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

    // Handle close button
    lightboxCloseButton.addEventListener("click", () => {
      lightbox.classList.remove("lightbox__active");
    });
  }
}
