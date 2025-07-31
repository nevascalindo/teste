// Header com efeito glassmorphism ao scroll
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const logo = document.querySelector('.logo');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Logo clicável para voltar ao topo
    if (logo) {
        logo.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Botão de surpresa
    const surpriseBtn = document.getElementById('surpriseBtn');
    const qrContainer = document.getElementById('qrContainer');
    const qrCode = document.getElementById('qrcode');
    
    if (surpriseBtn && qrContainer) {
        surpriseBtn.addEventListener('click', function() {
            qrContainer.classList.add('show');
            surpriseBtn.style.display = 'none';
            
            // Adiciona animação de entrada
            qrContainer.style.animation = 'fadeInUp 0.8s ease-out';
        });
        
        // QR Code clicável (abre link do YouTube)
        if (qrCode) {
            qrCode.addEventListener('click', function() {
                // Substitua pelo link real do YouTube
                window.open('https://youtu.be/teWDJpLvW4M?si=wm0ZWvcWB0OxIk-y', '_blank');
            });
        }
        
        // QR Code clicável também no container
        const qrContainer = document.getElementById('qrContainer');
        if (qrContainer) {
            qrContainer.addEventListener('click', function() {
                // Substitua pelo link real do YouTube
                window.open('https://youtu.be/teWDJpLvW4M?si=wm0ZWvcWB0OxIk-y', '_blank');
            });
        }
    }
    
    // Animações de entrada ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observa elementos para animação
    const animatedElements = document.querySelectorAll('.letter-card, .story-card, .final-quote, .surprise-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
    
    // Smooth scroll para links internos (se houver)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Efeito de parallax suave no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Adiciona efeito de hover nos cards da história
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efeito de loading inicial
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});

// Função para detectar se é dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Otimizações para mobile
if (isMobile()) {
    // Ajusta o scroll do carrossel para touch
    const carousel = document.querySelector('.story-carousel');
    if (carousel) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.style.cursor = 'grabbing';
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });
        
        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });
        
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    }
}

// Adiciona efeito de confete quando o QR code é revelado
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: 'translateY(0px)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 100}px)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => {
            confetti.remove();
        };
    }
}

// Chama a função de confete quando o QR code é revelado
document.addEventListener('DOMContentLoaded', function() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', function() {
            setTimeout(createConfetti, 500);
        });
    }
}); 