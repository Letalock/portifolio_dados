function typeWriter(elementId, text, speed) {
    let i = 0;
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Elemento com ID '${elementId}' não encontrado.`);
        return;
    }
    element.innerHTML = ''; // Limpa o conteúdo inicial do elemento

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Quando a digitação do título terminar, mostre o parágrafo 
            const descriptionElement = document.getElementById('description-text');
            if (descriptionElement) {
                descriptionElement.style.opacity = 0; // Começa invisível
                descriptionElement.style.transition = 'opacity 1s ease-in'; // Adiciona transição
                setTimeout(() => {
                    descriptionElement.style.opacity = 1; // Torna visível suavemente
                }, 500); // Pequeno atraso antes de aparecer
            }
        }
    }
    type();
}

// Chame a função quando a página carregar
window.onload = function() {
    const textToAnimate = "Dados/BI🎲."; // O texto que você quer animar
    const typingSpeed = 100; // Velocidade da digitação em milissegundos (quanto menor, mais rápido)

    // Esconde o parágrafo inicialmente para que ele apareça depois do título
    const descriptionElement = document.getElementById('description-text');
    if (descriptionElement) {
        descriptionElement.style.opacity = 0;
    }

    typeWriter('animated-text', textToAnimate, typingSpeed);
};