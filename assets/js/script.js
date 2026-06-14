const perguntas = document.querySelectorAll('.perguntas');

perguntas.forEach(function(pergunta) {
    pergunta.addEventListener('click', function() {
        const resposta = pergunta.nextElementSibling;

        if (resposta.style.display === 'block') {
            resposta.style.display = 'none';
            pergunta.querySelector('i').style.transform = 'rotate(0deg)';
        } else {
            resposta.style.display = 'block';
            pergunta.querySelector('i').style.transform = 'rotate(180deg)';
        }
    });
});

function ajustarTexto() {
    const paragrafos = document.querySelectorAll('.descricao-servicos p');
    
    if (window.innerWidth >= 1024) {
        paragrafos[0].textContent = 'Nossa equipe realiza manutenção preventiva e corretiva em motores a diesel, garantindo desempenho, economia e maior vida útil.';
        paragrafos[1].textContent = 'Executamos a troca e reparo de embreagens e câmbios, com peças de qualidade e agilidade no atendimento.';
        paragrafos[2].textContent = 'Serviços completos de diagnóstico, reparo e regulagem de diferenciais para garantir segurança e performance.';
        paragrafos[3].textContent = 'Revisão e manutenção de sistemas de freios e suspensões, priorizando a segurança do seu caminhão e de sua carga.';
    } else {
        paragrafos[0].textContent = 'Manutenção preventiva e corretiva em motores a diesel, garantindo desempenho, economia e maior vida útil.';
        paragrafos[1].textContent = 'Troca e reparo de embreagens e câmbios com qualidade e agilidade no atendimento.';
        paragrafos[2].textContent = 'Diagnóstico, reparo e regulagem de diferenciais para garantir segurança e performance.';
        paragrafos[3].textContent = 'Revisão e manutenção de freios e suspensões para mais segurança na estrada.';
    }
}

window.addEventListener('load', ajustarTexto);
window.addEventListener('resize', ajustarTexto);