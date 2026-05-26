// ===== SELEÇÃO DE ELEMENTOS =====
const trilhaSlides = document.getElementById('trilha-slides');
const btnAnterior = document.getElementById('btn-anterior');
const btnProximo = document.getElementById('btn-proximo');
const indicadoresContainer = document.getElementById('indicadores');
const slides = document.querySelectorAll('.slide');

let slideAtual = 0;
const totalSlides = slides.length;
let intervaloAuto; // Para autoplay

let indicadores; 

// 2. Função de criação
function criarIndicadores() {
  // Limpa qualquer bolinha pré-existente (segurança)
  indicadoresContainer.innerHTML = '';
  
  slides.forEach((_, index) => {
    const bolinha = document.createElement('span');
    bolinha.classList.add('indicador');
    
    // Clique na bolinha
    bolinha.addEventListener('click', () => {
      irParaSlide(index);
      reiniciarAutoplay(); // Se for usar autoplay depois
    });
    
    indicadoresContainer.appendChild(bolinha);
  });

  indicadores = document.querySelectorAll('.indicador');
  
  // primeiro bullet começa ativa visualmente
  if (indicadores.length > 0) {
    indicadores[0].classList.add('ativo');
  }
}

// atualiza as bolinhas, caso o usuario clique nos botões
function irParaSlide(index) {
  if ((slideAtual === totalSlides - 1 && index === 0) || (slideAtual === 0 && index === totalSlides - 1)) {
    trilhaSlides.style.transition = 'transform 1.6s cubic-bezier(0.645, 0.045, 0.355, 1)';
  } else {
    // Limpa a propriedade em linha para que o navegador use o padrão do CSS (0.8s)
    trilhaSlides.style.transition = '';
  }

  slideAtual = index;
  
  // Move a trilha
  trilhaSlides.style.transform = `translateX(-${slideAtual * 100}%)`;
  
  // Atualiza slides (animação do texto)
  slides.forEach(s => s.classList.remove('ativo'));
  slides[slideAtual].classList.add('ativo');
  
  //SINCRONIZAÇÃO DOS BULLETS
  indicadores.forEach((ind, i) => {
    // toggle(className, condition) adiciona se true, remove se false
    ind.classList.toggle('ativo', i === slideAtual);
  });
}

//  BOTÃO PRÓXIMO 
btnProximo.addEventListener('click', () => {
  let proximoSlide = slideAtual + 1;
  if (proximoSlide >= totalSlides) {
    proximoSlide = 0; // Loop: volta pro primeiro
  }
  irParaSlide(proximoSlide);
  reiniciarAutoplay();
});

//  BOTÃO ANTERIOR 
btnAnterior.addEventListener('click', () => {
  let slideAnterior = slideAtual - 1;
  if (slideAnterior < 0) {
    slideAnterior = totalSlides - 1; // Loop: vai pro último
  }
  irParaSlide(slideAnterior);
  reiniciarAutoplay();
});

//  AUTOPLAY
function iniciarAutoplay() {
  intervaloAuto = setInterval(() => {
    let proximoSlide = slideAtual + 1;
    if (proximoSlide >= totalSlides) {
      proximoSlide = 0;
    }
    irParaSlide(proximoSlide);
  }, 8000); // Muda a cada 5 segundos (5000ms)
}

function reiniciarAutoplay() {
  clearInterval(intervaloAuto);
  iniciarAutoplay();
}

//  PAUSAR AUTOPLAY AO PASSAR O MOUSE 
const container = document.getElementById('carrossel-container');
container.addEventListener('mouseenter', () => {
  clearInterval(intervaloAuto);
});

container.addEventListener('mouseleave', () => {
  iniciarAutoplay();
});

window.registrarCarrosselHero?.({
  irParaSlide,
  get slideAtual() {
    return slideAtual;
  },
  get totalSlides() {
    return totalSlides;
  },
});

//  INICIALIZAÇÃO
criarIndicadores();
irParaSlide(0);
iniciarAutoplay(); // Inicia o autoplay
