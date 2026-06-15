document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Lógica do Accordion --- */
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const content = item.querySelector('.accordion-content');
            const icon = item.querySelector('.icon');
            const isActive = item.classList.contains('active');

            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = null;
                otherItem.querySelector('.icon').textContent = '+';
            });

            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.textContent = '-';
            }
        });
    });

    /* --- 2. Prevenção de envio de formulários --- */
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Ação registrada com sucesso! (Modo de demonstração)');
            form.reset();
        });
    });

    /* --- 3. Sistema de Acessibilidade --- */
    const btnIncreaseFont = document.getElementById('btn-increase-font');
    const btnDecreaseFont = document.getElementById('btn-decrease-font');
    let currentFontSize = 100;

    const adjustFontSize = (increment) => {
        currentFontSize = Math.min(Math.max(currentFontSize + increment, 100), 250);
        document.documentElement.style.fontSize = `${currentFontSize}%`;
    };

    if (btnIncreaseFont) btnIncreaseFont.addEventListener('click', () => adjustFontSize(10));
    if (btnDecreaseFont) btnDecreaseFont.addEventListener('click', () => adjustFontSize(-10));

    const btnContrast = document.getElementById('btn-contrast');
    if (btnContrast) btnContrast.addEventListener('click', () => document.body.classList.toggle('dark-contrast'));

    /* --- 3.3 Text-to-Speech --- */
    const btnRead = document.getElementById('btn-read');
    const btnStopRead = document.getElementById('btn-stop-read');
    if ('speechSynthesis' in window && btnRead && btnStopRead) {
        btnRead.addEventListener('click', () => {
            window.speechSynthesis.cancel();
            const textToRead = Array.from(document.querySelectorAll('main h2, main p, footer p'))
                .map(el => el.textContent).join('. ');
            const utterance = new SpeechSynthesisUtterance(textToRead);
            utterance.lang = 'pt-BR';
            window.speechSynthesis.speak(utterance);
        });
        btnStopRead.addEventListener('click', () => window.speechSynthesis.cancel());
    }

    /* --- 4. Exibir comentário --- */
    const commentBtn = document.querySelector('.interaction-section .btn-primary');
    if (commentBtn) {
        commentBtn.addEventListener('click', function(event) {
            event.preventDefault();
            const campoTexto = document.getElementById('comentario');
            if (campoTexto.value.trim() !== "") {
                const display = document.getElementById('comments-display');
                const novoComentario = document.createElement('div');
                novoComentario.style.cssText = 'background: rgba(255, 255, 255, 0.8); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border: 1px solid var(--border-color); color: #000;';
                novoComentario.textContent = campoTexto.value;
                display.appendChild(novoComentario);
                campoTexto.value = "";
            }
        });
    }

    /* --- 5. Máquina de Escrever --- */
    const elementoTexto = document.querySelector('.hero-description');
    if (elementoTexto) {
        const texto = elementoTexto.textContent.replace(/\s+/g, ' ').trim();
        let indexLetra = 0;
        function digitar() {
            if (indexLetra < texto.length) {
                elementoTexto.textContent = texto.substring(0, indexLetra + 1);
                indexLetra++;
                setTimeout(digitar, 60);
            } else {
                setTimeout(() => { elementoTexto.textContent = ''; indexLetra = 0; setTimeout(digitar, 800); }, 4000);
            }
        }
        digitar();
    }

    /* --- 6. Sistema de Zoom de Imagens (SUBSTITUA PELO SEU ATUAL) --- */
    const imagens = document.querySelectorAll('.imagem');

    imagens.forEach(divImagem => {
        divImagem.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Remove o foco para evitar que o CSS:focus atrapalhe
            this.blur(); 
            
            const jaEstaAmpliada = this.classList.contains('ampliada');
            
            // Fecha todas as outras
            document.querySelectorAll('.imagem.ampliada').forEach(img => {
                img.classList.remove('ampliada');
            });
            
            // Se não estava ampliada, abre a atual
            if (!jaEstaAmpliada) {
                this.classList.add('ampliada');
            }
        });
    });

    // Fechar ao clicar em qualquer lugar
    document.addEventListener('click', () => {
        document.querySelectorAll('.imagem.ampliada').forEach(img => {
            img.classList.remove('ampliada');
        });
    });

});