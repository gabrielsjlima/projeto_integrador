/**
 * Navegação por swipe no carrossel.
 * Permite rolagem vertical nativa (pan-y) enquanto suporta swipes horizontais.
 */
(function () {
  const container = document.getElementById('carrossel-container');
  const trilhaSlides = document.getElementById('trilha-slides');

  if (!container || !trilhaSlides) return;

  const DISTANCIA_MINIMA = 40; // Distância mínima para considerar um swipe
  const LIMITE_DIRECAO = 8;    // Tolerância inicial antes de travar a direção

  let inicioX = 0;
  let inicioY = 0;
  let emTransicao = false;
  let direcaoGesto = null; /* 'horizontal' | 'vertical' | null */

  function obterAPI() {
    return window.CarrosselHero;
  }

  function travarTransicao() {
    emTransicao = true;
    const aoTerminar = (e) => {
      if (e.target !== trilhaSlides || e.propertyName !== 'transform') return;
      emTransicao = false;
      trilhaSlides.removeEventListener('transitionend', aoTerminar);
    };
    trilhaSlides.addEventListener('transitionend', aoTerminar);
  }

  function avancarUmSlide() {
    const api = obterAPI();
    if (!api || emTransicao) return;
    const { slideAtual, totalSlides, irParaSlide } = api;
    let proximo = (slideAtual + 1) % totalSlides;
    travarTransicao();
    irParaSlide(proximo);
  }

  function retrocederUmSlide() {
    const api = obterAPI();
    if (!api || emTransicao) return;
    const { slideAtual, totalSlides, irParaSlide } = api;
    let anterior = (slideAtual - 1 + totalSlides) % totalSlides;
    travarTransicao();
    irParaSlide(anterior);
  }

  function aoIniciarToque(e) {
    if (emTransicao) return;
    const toque = e.touches ? e.touches[0] : e;
    inicioX = toque.clientX;
    inicioY = toque.clientY;
    direcaoGesto = null;
  }

  function aoMoverToque(e) {
    if (emTransicao || direcaoGesto === 'vertical') return;

    const toque = e.touches ? e.touches[0] : e;
    const deltaX = toque.clientX - inicioX;
    const deltaY = toque.clientY - inicioY;

    // Detecta a direção do gesto apenas uma vez após ultrapassar o limite
    if (!direcaoGesto) {
      if (Math.abs(deltaX) > LIMITE_DIRECAO || Math.abs(deltaY) > LIMITE_DIRECAO) {
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          direcaoGesto = 'vertical';
          // Se for vertical, não fazemos nada e deixamos o navegador rolar
        } else {
          direcaoGesto = 'horizontal';
          // Se for horizontal e quisermos evitar scroll lateral da página (raro em mobile se bem feito)
          // Mas como estamos com passive: true, não podemos dar preventDefault.
          // O touch-action: pan-y no CSS já ajuda a dizer ao navegador o que fazer.
        }
      }
    }
  }

  function aoTerminarToque(e) {
    if (emTransicao || direcaoGesto !== 'horizontal') {
      direcaoGesto = null;
      return;
    }

    const toque = e.changedTouches ? e.changedTouches[0] : e;
    const deltaX = toque.clientX - inicioX;
    
    direcaoGesto = null;

    if (Math.abs(deltaX) < DISTANCIA_MINIMA) return;

    if (deltaX < 0) {
      avancarUmSlide();
    } else {
      retrocederUmSlide();
    }
  }

  function iniciarSwipe() {
    // Usamos touch events diretamente para melhor suporte a passive listeners
    container.addEventListener('touchstart', aoIniciarToque, { passive: true });
    container.addEventListener('touchmove', aoMoverToque, { passive: true });
    container.addEventListener('touchend', aoTerminarToque, { passive: true });
    container.addEventListener('touchcancel', () => direcaoGesto = null, { passive: true });

    // Suporte para Pointer Events (Windows Phone / Surface)
    container.addEventListener('pointerdown', (e) => {
        if (e.pointerType !== 'mouse') aoIniciarToque(e);
    }, { passive: true });
    container.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') aoMoverToque(e);
    }, { passive: true });
    container.addEventListener('pointerup', (e) => {
        if (e.pointerType !== 'mouse') aoTerminarToque(e);
    }, { passive: true });
  }

  // Pequeno delay para garantir que o CarrosselHero esteja disponível
  setTimeout(iniciarSwipe, 100);
})();
