// ==========================================================================
// 1. CÓDIGO DO SLIDER DE COMPONENTES INTERATIVO (INDEX)
// ==========================================================================
if (document.getElementById('cardSliderTrack')) {
    const cardTrack = document.getElementById('cardSliderTrack');
    const cardPrevBtn = document.getElementById('cardPrevBtn');
    const cardNextBtn = document.getElementById('cardNextBtn');
    const cardProgressBar = document.getElementById('cardProgressBar');

    const cardSlides = Array.from(cardTrack.children);
    const totalCardSlides = cardSlides.length;
    let currentCardIndex = 0;

    function updateCardSlider() {
        // Desloca horizontalmente o track baseado no item ativo
        cardTrack.style.transform = `translateX(-${currentCardIndex * 100}%)`;
        
        // Renderiza o preenchimento proporcional e desloca o marcador branco
        const stepWidth = 100 / totalCardSlides;
        cardProgressBar.style.width = `${stepWidth}%`;
        cardProgressBar.style.transform = `translateX(${currentCardIndex * 100}%)`;
    }

    cardNextBtn.addEventListener('click', () => {
        if (currentCardIndex < totalCardSlides - 1) {
            currentCardIndex++;
        } else {
            currentCardIndex = 0; // Loop contínuo: volta para o primeiro
        }
        updateCardSlider();
    });

    cardPrevBtn.addEventListener('click', () => {
        if (currentCardIndex > 0) {
            currentCardIndex--;
        } else {
            currentCardIndex = totalCardSlides - 1; // Loop contínuo: pula para o último
        }
        updateCardSlider();
    });

    // Inicialização da posição do card ao carregar a página
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
