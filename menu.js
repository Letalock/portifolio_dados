// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os elementos do menu mobile
    let btnMenu = document.getElementById('btn-menu');
    let menu = document.getElementById('menu-mobile');
    let overlay = document.getElementById('overlay-menu');
    let btnFechar = document.querySelector('.btn-fechar');

    // Função para abrir o menu mobile
    if (btnMenu) {
        btnMenu.addEventListener('click', () => {
            menu.classList.add('abrir-menu');
            overlay.style.display = 'block';
        });
    }

    // Função para fechar o menu mobile
    function fecharMenu() {
        menu.classList.remove('abrir-menu');
        overlay.style.display = 'none';
    }

    // Fecha o menu ao clicar no botão fechar
    if (btnFechar) {
        btnFechar.addEventListener('click', fecharMenu);
    }

    // Fecha o menu ao clicar no overlay
    if (overlay) {
        overlay.addEventListener('click', fecharMenu);
    }

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
                    top: targetElement.offsetTop - 60,
                    behavior: "smooth"
                });
            }
        });
    });
});
