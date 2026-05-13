const track = document.querySelector('.track');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const bullets = document.querySelectorAll('.bullet');

let counter = 1; // 0 é o último clone
const size = 100;

// Inicializa a posição sem animação
track.style.transform = `translateX(${-size * counter}%)`;

function moveNext() {
    if (counter >= slides.length - 1) return;
    counter++;
    track.style.transition = "transform 0.6s ease-in-out";
    track.style.transform = `translateX(${-size * counter}%)`;
    updateUI();
}

function movePrev() {
    if (counter <= 0) return;
    counter--;
    track.style.transition = "transform 0.6s ease-in-out";
    track.style.transform = `translateX(${-size * counter}%)`;
    updateUI();
}

// quando a transição termina, verifica se é em um clone
track.addEventListener('transitionend', () => {
    if (slides[counter].classList.contains('clone')) {
        track.style.transition = "none"; // Remove animação
        if (slides[counter].innerHTML.includes("Slide 01")) {
            counter = 1; // Volta para o slide 1
        } else {
            counter = slides.length - 2; // Vai para o slide 5
        }
        track.style.transform = `translateX(${-size * counter}%)`;
    }
});

function updateUI() {
    // 1. Identifica qual o índice visual (0 a 4) para os bullets
    let bulletIndex = counter - 1;
    if (counter === 0) bulletIndex = bullets.length - 1; // Se estiver no clone do início, bullet 5
    if (counter === slides.length - 1) bulletIndex = 0;   // Se estiver no clone do fim, bullet 1

    slides.forEach((slide, i) => {
        // Sincronização:
        let isCurrent = (i === counter);
        // Se for Clone do Slide 01 (último), ativa o Slide 01 (índice 1)
        if (counter === slides.length - 1 && i === 1) isCurrent = true;
        
        // Se eu for Clone do Slide 05 (primeiro), ativa o Slide 05 (índice length - 2)
        if (counter === 0 && i === slides.length - 2) isCurrent = true;

        slide.classList.toggle('active', isCurrent);
    });

    // Atualiza os bullets
    bullets.forEach((bullet, i) => {
        bullet.classList.toggle('active', i === bulletIndex);
    });
}

nextBtn.addEventListener('click', () => {
    moveNext();
    resetAutoSlide(); // Avisa ao cronômetro para recomeçar
});

prevBtn.addEventListener('click', () => {
    movePrev();
    resetAutoSlide(); // Avisa ao cronômetro para recomeçar
});

/* --- AUTOPLAY (10 SEGUNDOS) --- */
let autoPlayTimer;

function startAutoSlide() {
    stopAutoSlide(); // Previne múltiplos intervalos ativos
    autoPlayTimer = setInterval(() => {
        moveNext();
    }, 10000); 
}

function stopAutoSlide() {
    clearInterval(autoPlayTimer);
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

//início
startAutoSlide();

// Pausa o tempo se o usuário passar o mouse sobre o carrossel
const carouselContainer = document.querySelector('.carrossel');
carouselContainer.addEventListener('mouseenter', stopAutoSlide);
carouselContainer.addEventListener('mouseleave', startAutoSlide);