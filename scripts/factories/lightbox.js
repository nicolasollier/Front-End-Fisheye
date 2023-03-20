export class Lightbox {
  constructor(media) {
    this.media = media;
  }

  render() {
    console.log(this.media)
    const lightbox = document.querySelector(".lightbox");

    // Render HTMl conditionally if image or video
    if (this.media.image) {
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
    } else if (this.media.video) {
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

    if(this.media.image) {
        const lightboxImage = document.querySelector(".lightbox__image");
        lightboxImage.src = `assets/photographers/${this.media.photographerId}/${this.media.image}`;
        lightboxImage.alt = this.media.alt;

        const lightboxTitleImage = document.querySelector(".lightbox__title-image");
        lightboxTitleImage.textContent = this.media.title;
    } 
    else if (this.media.video) {
        const lightboxVideo = document.querySelector(".lightbox__video");
        lightboxVideo.src = `assets/photographers/${this.media.photographerId}/${this.media.video}`;
        lightboxVideo.alt = this.media.alt;

        const lightboxTitleVideo = document.querySelector(".lightbox__title-video");
        lightboxTitleVideo.textContent = this.media.title;
    }

    // Handle close button
    lightboxCloseButton.addEventListener("click", () => {
      lightbox.classList.remove("lightbox__active");
    });

  }
}
