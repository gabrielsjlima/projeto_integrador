/**
 * Navegação por swipe no carrossel.
 * Usa a mesma irParaSlide dos botões (animações idênticas).
 * Não reinicia o autoplay — o intervalo segue rodando normalmente.
 */
(function () {
  const container = document.getElementById('carrossel-container');
  const trilhaSlides = document.getElementById('trilha-slides');

  if (!container || !trilhaSlides) return;

  const DISTANCIA_MINIMA = 50;
  const RAZAO_HORIZONTAL = 1.2;
  const LIMITE_DIRECAO = 10;

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
    let proximo = slideAtual + 1;
    if (proximo >= totalSlides) proximo = 0;

    travarTransicao();
    irParaSlide(proximo);
  }

  function retrocederUmSlide() {
    const api = obterAPI();
    if (!api || emTransicao) return;

    const { slideAtual, totalSlides, irParaSlide } = api;
    let anterior = slideAtual - 1;
    if (anterior < 0) anterior = totalSlides - 1;

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

  function obterCoordenadasToque(e) {
    if (e.touches?.length) return e.touches[0];
    return e;
  }

  function aoMoverToque(e) {
    if (emTransicao || direcaoGesto) return;

    const toque = obterCoordenadasToque(e);
    if (!toque) return;

    const deltaX = Math.abs(toque.clientX - inicioX);
    const deltaY = Math.abs(toque.clientY - inicioY);

    if (deltaX < LIMITE_DIRECAO && deltaY < LIMITE_DIRECAO) return;

    direcaoGesto = deltaY * RAZAO_HORIZONTAL >= deltaX ? 'vertical' : 'horizontal';
  }

  function aoTerminarToque(e) {
    if (emTransicao || direcaoGesto === 'vertical') {
      direcaoGesto = null;
      return;
    }

    const toque = e.changedTouches ? e.changedTouches[0] : e;
    const deltaX = toque.clientX - inicioX;
    const deltaY = toque.clientY - inicioY;
    const movimentoHorizontal = Math.abs(deltaX);
    const movimentoVertical = Math.abs(deltaY);

    direcaoGesto = null;

    if (movimentoHorizontal < DISTANCIA_MINIMA) return;
    if (movimentoVertical * RAZAO_HORIZONTAL >= movimentoHorizontal) return;

    if (deltaX < 0) {
      avancarUmSlide();
    } else {
      retrocederUmSlide();
    }
  }

  function aoCancelarToque() {
    direcaoGesto = null;
  }

  function iniciarSwipe() {
    if (!obterAPI()) return;

    container.addEventListener('touchstart', aoIniciarToque, { passive: true });
    container.addEventListener('touchmove', aoMoverToque, { passive: true });
    container.addEventListener('touchend', aoTerminarToque, { passive: true });
    container.addEventListener('touchcancel', aoCancelarToque, { passive: true });

    container.addEventListener('pointerdown', aoIniciarToque, { passive: true });
    container.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'mouse') return;
      aoMoverToque(e);
    }, { passive: true });
    container.addEventListener('pointerup', function (e) {
      if (e.pointerType === 'mouse') return;
      aoTerminarToque(e);
    }, { passive: true });
    container.addEventListener('pointercancel', aoCancelarToque, { passive: true });
  }

  iniciarSwipe();
})();
