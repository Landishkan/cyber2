document.addEventListener('DOMContentLoaded', function() {
    // Дата запуска - 1 августа 2025
    const launchDate = new Date('August 1, 2025 00:00:00').getTime();
    
    // Обновляем таймер каждую секунду
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = launchDate - now;
        
        // Расчет дней, часов, минут, секунд
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Вывод результата
        document.getElementById('days').textContent = formatTime(days);
        document.getElementById('hours').textContent = formatTime(hours);
        document.getElementById('minutes').textContent = formatTime(minutes);
        document.getElementById('seconds').textContent = formatTime(seconds);
        
        // Прогресс-бар (сколько % времени прошло)
        const startDate = new Date('July 12, 2025 00:00:00').getTime(); // Дата создания страницы
        const totalDuration = launchDate - startDate;
        const elapsed = now - startDate;
        const progressPercent = Math.min((elapsed / totalDuration) * 100, 100);
        
        document.getElementById('progress-fill').style.width = progressPercent + '%';
        
        // Если время вышло
        if (distance < 0) {
            clearInterval(timer);
            document.querySelector('.circle-content h1').textContent = 'Функция доступна!';
            document.querySelector('.circle-content p').textContent = 'Новая функция теперь доступна для использования!';
            document.querySelector('.countdown-container').style.display = 'none';
            document.querySelector('.launch-date').textContent = 'Функция запущена!';
            document.getElementById('progress-fill').style.width = '100%';
        }
    }, 1000);
    
    // Форматирование времени (добавляем 0 перед однозначными числами)
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
    
    // Дополнительные анимации
    const cyberCircle = document.querySelector('.cyber-circle');
    cyberCircle.addEventListener('mousemove', (e) => {
        const rect = cyberCircle.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        cyberCircle.style.boxShadow = `
            ${(x - rect.width/2) / 10}px ${(y - rect.height/2) / 10}px 40px rgba(91, 156, 240, 0.5)
        `;
    });
    
    cyberCircle.addEventListener('mouseleave', () => {
        cyberCircle.style.boxShadow = '0 0 30px rgba(91, 156, 240, 0.3)';
    });
});