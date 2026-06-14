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

    // --- LÓGICA DO SVG DA LOGO (Fix para Object) ---
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
        
        // Clique para voltar ao topo/home
        logoAnimada.style.cursor = 'pointer';
        logoAnimada.addEventListener('click', () => {
            window.location.href = '#secao-hero';
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
    function scrollSuaveCustomizado(targetId, duracao = 1000) {
        const target = document.querySelector(targetId);
        if (!target) return;

        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function easing(t) {
            return 1 - Math.pow(1 - t, 4); // Quartic Out
        }

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easing(Math.min(timeElapsed / duracao, 1));
            
            window.scrollTo(0, startPosition + distance * run);

            if (timeElapsed < duracao) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    // Exemplo de uso opcional:
    /*
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const id = this.getAttribute('href');
            if (id !== '#') {
                e.preventDefault();
                scrollSuaveCustomizado(id, 1200);
            }
        });
    });
    */
});
