// Painel.Casa

document.addEventListener('DOMContentLoaded', function () {
    // Navegação suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header fixo com mudança de estilo no scroll
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });

    // Carrossel para a seção de aplicações
    const sliderContainer = document.querySelector('.applications-slider');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');

    if (sliderContainer && prevButton && nextButton) {
        const cards = sliderContainer.querySelectorAll('.application-card');

        // Apenas ativar carrossel em telas pequenas
        const activateCarousel = () => {
            if (window.innerWidth <= 768) {
                let currentIndex = 0;

                // Esconder todos os cards exceto o primeiro
                cards.forEach((card, index) => {
                    if (index !== currentIndex) {
                        card.style.display = 'none';
                    } else {
                        card.style.display = 'block';
                    }
                });

                prevButton.addEventListener('click', () => {
                    cards[currentIndex].style.display = 'none';
                    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
                    cards[currentIndex].style.display = 'block';
                });

                nextButton.addEventListener('click', () => {
                    cards[currentIndex].style.display = 'none';
                    currentIndex = (currentIndex + 1) % cards.length;
                    cards[currentIndex].style.display = 'block';
                });
            } else {
                // Mostrar todos os cards em telas maiores
                cards.forEach(card => {
                    card.style.display = 'block';
                });
            }
        };

        // Ativar carrossel inicialmente e quando a janela é redimensionada
        activateCarousel();
        window.addEventListener('resize', activateCarousel);
    }

    // Formulário de contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simulação de envio do formulário
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 1500);
        });
    }

    // Formulário de Newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitButton = newsletterForm.querySelector('button[type="submit"]');

            if (emailInput.value.trim() !== '') {
                submitButton.disabled = true;

                setTimeout(() => {
                    alert('Inscrição realizada com sucesso!');
                    newsletterForm.reset();
                    submitButton.disabled = false;
                }, 1000);
            }
        });
    }

    // Animação dos elementos ao aparecerem na tela
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature, .benefit-card, .application-card, .step');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Definir opacidade inicial como 0 para elementos que serão animados
    document.querySelectorAll('.feature, .benefit-card, .application-card, .step').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Executar animação no carregamento e no scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});
