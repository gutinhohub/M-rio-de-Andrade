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
            currentCardIndex = 0; // Retorna ao primeiro card de forma cíclica
        }
        updateCardSlider();
        if (modal.classList.contains('active')) {
            updateModalContent();
        }
    }

    function prevSlide() {
        if (currentCardIndex > 0) {
            currentCardIndex--;
        } else {
            currentCardIndex = totalCardSlides - 1; // Vai para o último card
        }
        updateCardSlider();
        if (modal.classList.contains('active')) {
            updateModalContent();
        }
    }

    // Função que alimenta o conteúdo do modal de zoom de forma limpa e estruturada
    function updateModalContent() {
        if (modalImg) modalImg.style.display = 'none';
        
        // Pega o parágrafo ou conteúdo que está dentro do card ativo do slider
        const activeCardHtml = cardSlides[currentCardIndex].innerHTML;
        
        // Remove estilos antigos injetados
        modalCaption.removeAttribute('style');
        
        // Adiciona a classe correta para estilização via CSS
        modalCaption.className = 'modal-text-content';
        modalCaption.innerHTML = activeCardHtml;
    }

    function openModal() {
        modal.classList.add('active');
        document.body.classList.add('modal-aberto'); // Classe auxiliar para sumir com o footer
        updateModalContent();
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-aberto');
    }

    // Vincula a função zoomCard globalmente para os cliques nos cards do index.html
    window.zoomCard = function(index) {
        currentCardIndex = index;
        updateCardSlider();
        openModal();
    };

    // Ouvintes de Eventos para os botões do Slider
    cardNextBtn.addEventListener('click', nextSlide);
    cardPrevBtn.addEventListener('click', prevSlide);

    // Navegação Avançada via Teclado (Setas e Esc)
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            nextSlide();
        } else if (event.key === 'ArrowLeft') {
            prevSlide();
        } else if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Fecha o modal ao clicar no botão 'Fechar' ou fora da caixa de conteúdo
    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.classList.contains('close-modal')) {
            closeModal();
        }
    });
    
    // Vincula também os botões de seta do modal para navegar em tela cheia
    const modalPrev = modal.querySelector('.prev-modal');
    const modalNext = modal.querySelector('.next-modal');
    if (modalPrev) modalPrev.addEventListener('click', (e) => { e.stopPropagation(); prevSlide(); });
    if (modalNext) modalNext.addEventListener('click', (e) => { e.stopPropagation(); nextSlide(); });

    updateCardSlider();
}

// ==========================================================================
// 2. CÓDIGO DA BIOGRAFIA (RODA EM QUALQUER TELA / DISPONÍVEL GLOBALMENTE)
// ==========================================================================
window.abrirModal = function(idModal) {
    const bioModal = document.getElementById(idModal);
    if (bioModal) {
        bioModal.style.display = 'flex';
        document.body.classList.add('modal-aberto'); // Oculta o footer quando aberto
    } else {
        console.error('Modal de biografia não encontrado: ' + idModal);
    }
}

window.fecharModal = function(idModal) {
    const bioModal = document.getElementById(idModal);
    if (bioModal) {
        bioModal.style.display = 'none';
        document.body.classList.remove('modal-aberto'); // Reexibe o footer ao fechar
    }
}

// Fecha os modais de biografia ao clicar na área escura de fundo
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal-biografia')) {
        event.target.style.display = 'none';
        document.body.classList.remove('modal-aberto');
    }
});
