document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DO MENU HAMBÚRGUER ---
    const hamb = document.querySelector('.hamb');
    const nav = document.querySelector('.nav-links');
    const btnFechar = document.querySelector('.btn-fechar');

    if (hamb && nav) {
        hamb.addEventListener('click', () => nav.classList.add('ativo'));
        
        if (btnFechar) {
            btnFechar.addEventListener('click', () => nav.classList.remove('ativo'));
        }

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => nav.classList.remove('ativo'));
        });
    }

    // --- LÓGICA DO SVG DA LOGO (link para home e reset da animação) ---
    const logoAnimada = document.getElementById('logo-svg');
    if (logoAnimada) {
        function resetarLogo() {
            const obj = logoAnimada.querySelector('object');
            if (obj && obj.contentDocument) {
                const svg = obj.contentDocument.querySelector('svg');
                if (svg) {
                    try {
                        svg.setCurrentTime(0);
                        if (svg.unpauseAnimations) svg.unpauseAnimations();
                    } catch (e) {
                        console.warn("Erro ao resetar animação do SVG:", e);
                    }
                }
            }
        }
        logoAnimada.addEventListener('mouseenter', resetarLogo);
        logoAnimada.addEventListener('touchstart', resetarLogo, { passive: true });
        
        // Clique para voltar ao topo/home com scroll suave
        logoAnimada.style.cursor = 'pointer';
        logoAnimada.addEventListener('click', () => {
            scrollSuaveCustomizado('html', 1500); 
        });
    }

    // --- LÓGICA PARA OS BOTÕES DE NAVEGAÇÃO DO SLIDE (DIR E ESQ) ---
    const btnsNavegacao = document.querySelectorAll('.btn-navegacao');
    btnsNavegacao.forEach(btn => {
        const resetarAnim = () => {
            const obj = btn.querySelector('object');
            if (obj && obj.contentDocument) {
                const svg = obj.contentDocument.querySelector('svg');
                if (svg) {
                    try {
                        svg.setCurrentTime(0);
                        if (svg.unpauseAnimations) svg.unpauseAnimations();
                    } catch (e) {
                        console.warn("Erro ao resetar animação do botão:", e);
                    }
                }
            }
        };
        btn.addEventListener('mouseenter', resetarAnim);
        btn.addEventListener('click', resetarAnim);
    });

    // --- LÓGICA DE SCROLL SUAVE CUSTOMIZADO ---
    /**
     * @param {string} targetId - Seletor do elemento alvo (ex: '#contato' ou 'html')
     * @param {number} duracao - Duração em ms
     */
    function scrollSuaveCustomizado(targetId, duracao = 200) {
        const target = document.querySelector(targetId);
        if (!target) return;

        // Pega a altura do header dinamicamente para compensar o scroll
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        
        const targetPosition = target === document.documentElement || target === document.body 
            ? 0 
            : target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        // Curva simples (Linear)
        function easing(t) {
            return t;
        }

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duracao, 1);

            window.scrollTo(0, startPosition + distance * easing(progress));

            if (timeElapsed < duracao) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    // Ativando o scroll suave para todos os links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const id = this.getAttribute('href');
            if (id !== '#') {
                e.preventDefault();
                // Usamos uma duração maior (1500ms) para ser bem suave como solicitado
                scrollSuaveCustomizado(id, 1500);
            }
        });
    });
});
