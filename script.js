// Executa o script do carrossel e modal apenas se estiver na página index.html
if (document.querySelector('.carousel')) {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.carousel-item');
    let currentModalIndex = 0;

    function moveCarousel(n, event) {
        if (event) event.stopPropagation();
        slides[slideIndex].classList.remove('active');
        slideIndex = (slideIndex + n + slides.length) % slides.length;
        slides[slideIndex].classList.add('active');
    }

    let autoPlayInterval = setInterval(() => moveCarousel(1), 5000);

    const modal = document.getElementById('fullscreenModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');

    window.openModal = function(index) {
        clearInterval(autoPlayInterval);
        currentModalIndex = index;
        updateModalContent();
        modal.classList.add('active');
    }

    function updateModalContent() {
        const currentSlide = slides[currentModalIndex];
        modalImg.src = currentSlide.querySelector('img').src;
        
        const captionElement = currentSlide.querySelector('.carousel-caption');
        if (captionElement) {
            modalCaption.innerHTML = captionElement.innerHTML;
        } else {
            modalCaption.innerHTML = "";
        }
    }

    window.moveModalCarousel = function(n, event) {
        if (event) event.stopPropagation();
        currentModalIndex = (currentModalIndex + n + slides.length) % slides.length;
        updateModalContent();
        
        slides[slideIndex].classList.remove('active');
        slideIndex = currentModalIndex;
        slides[slideIndex].classList.add('active');
    }

    window.closeModal = function(event) {
        if (!event || event.target === modal || event.target.classList.contains('close-modal')) {
            modal.classList.remove('active');
            autoPlayInterval = setInterval(() => moveCarousel(1), 5000);
        }
    }

    document.addEventListener('keydown', function(event) {
        if (modal.classList.contains('active')) {
            if (event.key === "ArrowRight") {
                moveModalCarousel(1);
            } else if (event.key === "ArrowLeft") {
                moveModalCarousel(-1);
            } else if (event.key === "Escape") {
                closeModal();
            }
        }
    });
}
