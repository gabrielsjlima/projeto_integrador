const perguntas = document.querySelectorAll('.perguntas');

perguntas.forEach(function(pergunta) {
    pergunta.addEventListener('click', function() {
        const resposta = pergunta.nextElementSibling;

        // Abre ou fecha a resposta clicada
        if (resposta.style.display === 'block') {
            resposta.style.display = 'none';
            pergunta.querySelector('i').style.transform = 'rotate(0deg)';
        } else {
            resposta.style.display = 'block';
            pergunta.querySelector('i').style.transform = 'rotate(180deg)';
        }
    });
});