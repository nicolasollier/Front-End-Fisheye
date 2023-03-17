export class lightbox {
    constructor() {}
    render() {
        const lightbox = document.querySelector(".lightbox");
        
        // Lightbox hidden by default
        lightbox.classList.add("lightbox__hidden");

        const lightboxClose = document.querySelector(".lightbox__close-button");
        lightboxClose.addEventListener("click", () => {
            lightbox.classList.remove("lightbox__active");
            lightbox.classList.add("lightbox__hidden");
            // Enables scroll on body
            document.body.style.overflow = "auto";
        });
    }
}