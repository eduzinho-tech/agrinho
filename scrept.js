document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. Lógica do Accordion (Caixas Expansíveis) --- */
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const content = item.querySelector('.accordion-content');
            const icon = item.querySelector('.icon');
            const isActive = item.classList.contains('active');

            // Fecha todos antes de abrir o atual (Opcional: remover para permitir múltiplos abertos)
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

    /* --- 2. Prevenção de envio real dos formulários para demonstração --- */
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Ação registrada com sucesso! (Modo de demonstração)');
            form.reset();
        });
    });

    /* --- 3. Sistema de Acessibilidade Avançado --- */
    
    // 3.1 Tamanho da Fonte
    const btnIncreaseFont = document.getElementById('btn-increase-font');
    const btnDecreaseFont = document.getElementById('btn-decrease-font');
    let currentFontSize = 100; // Porcentagem

    const adjustFontSize = (increment) => {
        currentFontSize += increment;
        // Limita entre 80% e 150% para não quebrar o layout
        if(currentFontSize > 150) currentFontSize = 150;
        if(currentFontSize < 80) currentFontSize = 80;
        
        document.body.style.fontSize = `${currentFontSize}%`;
    };

    btnIncreaseFont.addEventListener('click', () => adjustFontSize(10));
    btnDecreaseFont.addEventListener('click', () => adjustFontSize(-10));

    // 3.2 Alternância de Contraste
    const btnContrast = document.getElementById('btn-contrast');
    btnContrast.addEventListener('click', () => {
        document.body.classList.toggle('dark-contrast');
    });

    // 3.3 Text-to-Speech (Leitura de Voz)
    const btnRead = document.getElementById('btn-read');
    const btnStopRead = document.getElementById('btn-stop-read');
    
    // Verifica suporte do navegador
    if ('speechSynthesis' in window) {
        
        btnRead.addEventListener('click', () => {
            window.speechSynthesis.cancel(); // Para qualquer leitura anterior

            // Seleciona APENAS títulos e parágrafos dentro de main e do footer textual
            const readableElements = document.querySelectorAll('main h2, main p, footer p');
            let textToRead = '';

            readableElements.forEach(el => {
                // Filtra conteúdo não desejado (ex: textos de placeholder ou prompts estáticos)
                if(!el.textContent.includes('[PROMPT')) {
                    textToRead += el.textContent + '. ';
                }
            });

            if (textToRead.trim() !== '') {
                const utterance = new SpeechSynthesisUtterance(textToRead);
                utterance.lang = 'pt-BR';
                utterance.rate = 1.0; // Velocidade de leitura normal
                window.speechSynthesis.speak(utterance);
            }
        });

        btnStopRead.addEventListener('click', () => {
            window.speechSynthesis.cancel();
        });

    } else {
        // Fallback caso o navegador não suporte
        btnRead.style.display = 'none';
        btnStopRead.style.display = 'none';
        console.warn('API SpeechSynthesis não suportada neste navegador.');
    }
});