// ==========================================================================
// 1. CÓDIGO DO SLIDER DE COMPONENTES INTERATIVO (INDEX) - COM TECLADO E ZOOM
// ==========================================================================
if (document.getElementById('cardSliderTrack')) {
    const cardTrack = document.getElementById('cardSliderTrack');
    const cardPrevBtn = document.getElementById('cardPrevBtn');
    const cardNextBtn = document.getElementById('cardNextBtn');
    const cardProgressBar = document.getElementById('cardProgressBar');

    // Elementos do Modal para o Zoom de Texto
    const modal = document.getElementById('fullscreenModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const closeModalBtn = modal.querySelector('.close-modal');

    const cardSlides = Array.from(cardTrack.children);
    const totalCardSlides = cardSlides.length;
    let currentCardIndex = 0;

    function updateCardSlider() {
        // Desloca horizontalmente o track baseado no item ativo
        cardTrack.style.transform = `translateX(-${currentCardIndex * 100}%)`;
        
        // Renderiza o preenchimento proporcional e desloca o indicador
        const stepWidth = 100 / totalCardSlides;
        cardProgressBar.style.width = `${stepWidth}%`;
        cardProgressBar.style.transform = `translateX(${currentCardIndex * 100}%)`;
    }

    function nextSlide() {
        if (currentCardIndex < totalCardSlides - 1) {
            currentCardIndex++;
        } else {
            currentCardIndex = 0;
        }
        updateCardSlider();
        if (modal.classList.contains('active')) updateModalContent();
    }

    function prevSlide() {
        if (currentCardIndex > 0) {
            currentCardIndex--;
        } else {
            currentCardIndex = totalCardSlides - 1;
        }
        updateCardSlider();
        if (modal.classList.contains('active')) updateModalContent();
    }

    // Ouvintes dos botões físicos na tela
    cardNextBtn.addEventListener('click', nextSlide);
    cardPrevBtn.addEventListener('click', prevSlide);

    // === NOVO: NAVEGAÇÃO POR TECLADO ===
    document.addEventListener('keydown', (event) => {
        if (event.key === "ArrowRight") {
            nextSlide();
        } else if (event.key === "ArrowLeft") {
            prevSlide();
        } else if (event.key === "Escape" && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // === NOVO: FUNÇÃO DE TELA CHEIA (ZOOM) ===
    window.zoomCard = function(index) {
        currentCardIndex = index;
        updateCardSlider();
        updateModalContent();
        modal.classList.add('active');
    };

    function updateModalContent() {
        // Oculta a tag <img> já que vamos exibir apenas o texto estilizado
        if (modalImg) modalImg.style.display = 'none';
        
        // Pega o HTML interno do card ativo e joga dentro da caixa de conteúdo do modal
        const activeCardHtml = cardSlides[currentCardIndex].innerHTML;
        
        // Estiliza o container para apresentar o texto em tamanho grande e centralizado
        modalCaption.style.position = 'static';
        modalCaption.style.background = 'transparent';
        modalCaption.style.color = 'var(--parchment)';
        modalCaption.style.fontSize = '2rem';
        modalCaption.style.lineHeight = '1.8';
        modalCaption.style.maxWidth = '800px';
        modalCaption.style.padding = '2rem';
        modalCaption.innerHTML = activeCardHtml;
    }

    // Configuração para fechar o Modal
    window.closeModal = function() {
        modal.classList.remove('active');
    };

    // Fechar ao clicar no botão ou no fundo escuro
    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.classList.contains('close-modal')) {
            closeModal();
        }
    });
    
    // Vincula também os botões de seta do modal (se existirem) para navegar em tela cheia
    const modalPrev = modal.querySelector('.prev-modal');
    const modalNext = modal.querySelector('.next-modal');
    if (modalPrev) modalPrev.addEventListener('click', (e) => { e.stopPropagation(); prevSlide(); });
    if (modalNext) modalNext.addEventListener('click', (e) => { e.stopPropagation(); nextSlide(); });

    // Inicialização do slider
    updateCardSlider();
}
// ==========================================================================
// 2. CÓDIGO DA BIOGRAFIA (RODA EM QUALQUER TELA / DISPONÍVEL GLOBALMENTE)
// ==========================================================================
window.abrirModal = function(idModal) {
    const bioModal = document.getElementById(idModal);
    if (bioModal) {
        bioModal.style.display = 'flex';
    } else {
        console.error('Modal de biografia não encontrado: ' + idModal);
    }
}

window.fecharModal = function(idModal) {
    const bioModal = document.getElementById(idModal);
    if (bioModal) {
        bioModal.style.display = 'none';
    }
}

// Fecha os modais de biografia ao clicar na área escura de fundo
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal-biografia')) {
        event.target.style.display = 'none';
    }
});
