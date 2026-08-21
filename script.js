document.addEventListener('DOMContentLoaded', () => {
    // 1. Efeito de Digitação (Typewriter Effect)
    const texts = [
        "Desenvolvedor Backend",
        "Especialista Java & Node.js",
        "Entusiasta Mobile (Kotlin)"
    ];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    const typingElement = document.querySelector('.typing');

    if (typingElement) {
        (function type() {
            if (count === texts.length) {
                count = 0;
            }
            currentText = texts[count];
            letter = currentText.slice(0, ++index);

            typingElement.textContent = letter;

            if (letter.length === currentText.length) {
                setTimeout(() => {
                    // Start erasing
                    erase();
                }, 2000);
            } else {
                setTimeout(type, 100);
            }
        }());

        function erase() {
            letter = currentText.slice(0, --index);
            typingElement.textContent = letter;

            if (letter.length === 0) {
                count++;
                index = 0;
                setTimeout(type, 500);
            } else {
                setTimeout(erase, 50);
            }
        }
    }

    // 2. Menu Mobile (Hamburger Menu)
    const menuToggle = document.querySelector('.menu-toggle');
    const navContent = document.querySelector('.nav-content');
    const navLinks = document.querySelectorAll('.nav-content a');

    if (menuToggle && navContent) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navContent.classList.toggle('active');
        });

        // Fechar menu ao clicar em qualquer link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navContent.classList.remove('active');
            });
        });
    }

    // 3. Highlight de Links Ativos na Navegação (Scroll Spy)
    const sections = document.querySelectorAll('section, footer');
    
    function scrollSpy() {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', scrollSpy);

    // 4. Animações de Revelação ao Rolar a Página (Scroll Reveal)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Remove observation after animation triggers to keep page lightweight
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 5. Simulação de Formulário de Contato com Feedback Premium
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Desabilitar botão temporariamente
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            // Simular tempo de envio de API (1.5 segundos)
            setTimeout(() => {
                // Criar modal de sucesso customizado
                showSuccessModal();
                
                // Resetar formulário
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    function showSuccessModal() {
        // Remover modal existente se houver
        const existingModal = document.querySelector('.success-modal');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.innerHTML = `
            <div class="success-modal-content">
                <div class="success-icon">✓</div>
                <h3>Mensagem Enviada!</h3>
                <p>Obrigado pelo contato. Responderei o mais breve possível.</p>
                <button class="btn-close-modal">Fechar</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Animação fade-in
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);

        // Eventos para fechar
        const closeBtn = modal.querySelector('.btn-close-modal');
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        function closeModal() {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    // 6. Efeito Paralaxe Suave e Scroll no Hero
    const hero = document.getElementById('about');
    window.addEventListener('scroll', () => {
        if (hero) {
            let offset = window.pageYOffset;
            hero.style.backgroundPositionY = offset * 0.4 + 'px';
        }
    });
});
