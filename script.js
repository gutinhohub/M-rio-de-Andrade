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
    const modalProgressBar = document.getElementById('modalProgressBar');

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

    // Sincroniza e atualiza a barra de progresso interna do Modal
    function updateModalProgress() {
        if (modalProgressBar) {
            const stepWidth = 100 / totalCardSlides;
            modalProgressBar.style.width = `${stepWidth}%`;
            modalProgressBar.style.transform = `translateX(${currentCardIndex * 100}%)`;
        }
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

    cardNextBtn.addEventListener('click', nextSlide);
    cardPrevBtn.addEventListener('click', prevSlide);

    // Captura o clique nos cards para abrir o Zoom de Leitura
  window.zoomCard = function(index) {
    const cardSlides = Array.from(document.getElementById('cardSliderTrack').children);
    const activeSlide = cardSlides[index];
    const modal = document.getElementById('fullscreenModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const modalContainer = document.querySelector('.modal-card-container');

    if (!activeSlide || !modal) return;

    // Limpa qualquer classe de leitor que já estava no modal antes
    modalContainer.classList.remove('leitor-vicenty', 'leitor-maria-clara', 'leitor-joao-felipe', 'leitor-steffany');

    // Identifica qual classe de leitor o slide original possui e copia para o modal
    if (activeSlide.classList.contains('leitor-vicenty')) modalContainer.classList.add('leitor-vicenty');
    if (activeSlide.classList.contains('leitor-maria-clara')) modalContainer.classList.add('leitor-maria-clara');
    if (activeSlide.classList.contains('leitor-joao-felipe')) modalContainer.classList.add('leitor-joao-felipe');
    if (activeSlide.classList.contains('leitor-steffany')) modalContainer.classList.add('leitor-steffany');

    // Mantém a lógica original do seu script de pegar o texto/parágrafo
    const paragraph = activeSlide.querySelector('p');
    if (paragraph) {
        modalCaption.innerHTML = paragraph.innerHTML;
        modalCaption.style.display = 'block';
        modalImg.style.display = 'none';
    }

    modal.classList.add('active');
    modal.style.display = 'flex';
    
    if (typeof updateModalProgressBar === 'function') {
        updateModalProgressBar();
    }
}
    function updateModalContent() {
        const activeSlide = cardSlides[currentCardIndex];
        if (activeSlide) {
            // Extrai o texto interno preservando tags HTML como <strong> ou <em>
            modalCaption.innerHTML = activeSlide.innerHTML;
            if (modalImg) modalImg.style.display = 'none'; 
            updateModalProgress();
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Liberta o scroll
    }

    // Fecha o modal ao clicar fora do card ou no botão fechar
    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.classList.contains('close-modal')) {
            closeModal();
        }
    });
    
    // Vincula os botões de seta internos do modal
    const modalPrev = modal.querySelector('.prev-modal');
    const modalNext = modal.querySelector('.next-modal');
    if (modalPrev) modalPrev.addEventListener('click', (e) => { e.stopPropagation(); prevSlide(); });
    if (modalNext) modalNext.addEventListener('click', (e) => { e.stopPropagation(); nextSlide(); });

    // Navegação via Teclado (Setas e Esc)
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        } else if (document.querySelector('.screen.active').contains(cardTrack)) {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        }
    });

    // Inicialização padrão do slider
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

window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal-biografia')) {
        event.target.style.display = 'none';
    }
});
