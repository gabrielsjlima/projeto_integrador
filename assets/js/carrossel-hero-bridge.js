/**
 * Ponte entre carrossel.js e módulos externos (swipe, etc.).
 * Deve ser carregado antes de carrossel.js.
 */
(function () {
  let registro = null;

  window.registrarCarrosselHero = function (dados) {
    registro = dados;
  };

  window.CarrosselHero = {
    irParaSlide(index) {
      registro?.irParaSlide(index);
    },
    get slideAtual() {
      return registro?.slideAtual ?? 0;
    },
    get totalSlides() {
      return registro?.totalSlides ?? 0;
    },
  };
})();
