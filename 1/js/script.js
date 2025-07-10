document.addEventListener('DOMContentLoaded', function() {
    // Простая анимация загрузки
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    pageTransition.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--background-dark);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 1;
        transition: opacity 0.5s ease-out;
    `;
    document.body.prepend(pageTransition);
    
    setTimeout(() => {
        pageTransition.style.opacity = '0';
        setTimeout(() => {
            pageTransition.remove();
        }, 500);
    }, 800);
    
    // Простые hover-эффекты
    const cards = document.querySelectorAll('.game-card, .scenario-card, .video-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s ease';
        });
    });
    
    // Волновой эффект для кнопок (опционально)
    const buttons = document.querySelectorAll('.play-button, .start-button, .cyber-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const wave = document.createElement('span');
            wave.className = 'wave';
            wave.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: rgba(0, 242, 255, 0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: wave 0.6s linear;
                pointer-events: none;
                left: ${e.offsetX}px;
                top: ${e.offsetY}px;
            `;
            
            this.appendChild(wave);
            setTimeout(() => wave.remove(), 600);
        });
    });
    document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', function(e) {
        // Простой переход без анимации для надежности
        window.location.href = this.getAttribute('href');
    });
});
    // Добавляем стиль для волн
    const waveStyle = document.createElement('style');
    waveStyle.textContent = `
        @keyframes wave {
            to { transform: scale(20); opacity: 0; }
        }
    `;
    document.head.appendChild(waveStyle);
    
    // Простые частицы на фоне (опционально)
    const createParticles = () => {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(0, 242, 255, ${Math.random() * 0.5 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 15 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            particlesContainer.appendChild(particle);
        }
    };
    // Убедитесь, что этот код есть в script.js

    // Добавьте этот код в существующий script.js
    createParticles();
});