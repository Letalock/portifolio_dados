// Seleciona os elementos do menu mobile
let btnMenu = document.getElementById('btn-menu');
let menu = document.getElementById('menu-mobile');
let overlay = document.getElementById('overlay-menu');

// Função para abrir o menu mobile
btnMenu.addEventListener('click', () => {
    menu.classList.add('abrir-menu');
    overlay.style.display = 'block'; // Exibir overlay
});

// Função para fechar o menu mobile
function fecharMenu() {
    menu.classList.remove('abrir-menu');
    overlay.style.display = 'none'; // Esconder overlay
}

// Fecha o menu ao clicar no próprio menu
menu.addEventListener('click', fecharMenu);

// Fecha o menu ao clicar no overlay
overlay.addEventListener('click', fecharMenu);

// Fecha o menu ao clicar em um link dentro do menu mobile
document.querySelectorAll('.menu-mobile a').forEach(link => {
    link.addEventListener('click', () => {
        fecharMenu();
    });
});

// Rolagem suave ao clicar nos links do menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 60, // Ajuste para evitar sobreposição do header fixo
                behavior: "smooth"
            });
        }
    });
});
