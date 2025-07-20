document.addEventListener('DOMContentLoaded', function() {
    // Инициализация шагов
    const steps = document.querySelectorAll('.scenario-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    let currentStep = 1;
    
    // Инициализация аккордеона
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const icon = header.querySelector('.accordion-icon');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Закрываем все элементы
            accordionItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-icon').textContent = '+';
            });
            
            // Открываем текущий, если он был закрыт
            if (!isActive) {
                item.classList.add('active');
                icon.textContent = '×';
            }
        });
    });
    
    // Проверка email через HIBP (имитация)
    const checkEmailBtn = document.getElementById('check-email');
    const emailInput = document.getElementById('email-check');
    const emailResult = document.getElementById('email-result');
    
    checkEmailBtn.addEventListener('click', function() {
        const email = emailInput.value.trim();
        
        if (!email) {
            emailResult.textContent = 'Пожалуйста, введите email';
            emailResult.className = 'result-box positive';
            return;
        }
        
        // Имитация запроса к API
        checkEmailBtn.disabled = true;
        checkEmailBtn.textContent = 'Проверяем...';
        
        // В реальном приложении здесь был бы fetch запрос к API HIBP
        setTimeout(() => {
            // Рандомный результат для демонстрации
            const isPwned = Math.random() > 0.5;
            
            if (isPwned) {
                emailResult.innerHTML = `
                    <strong>Обнаружена утечка!</strong><br>
                    Этот email был найден в ${Math.floor(Math.random() * 5) + 1} утечках данных.
                    <div class="hibp-link">
                        <a href="https://haveibeenpwned.com/account/${encodeURIComponent(email)}" target="_blank">
                            Посмотреть подробности на Have I Been Pwned
                        </a>
                    </div>
                `;
                emailResult.className = 'result-box positive';
            } else {
                emailResult.textContent = 'Поздравляем! Этот email не найден в известных утечках.';
                emailResult.className = 'result-box negative';
            }
            
            checkEmailBtn.disabled = false;
            checkEmailBtn.textContent = 'Проверить';
        }, 1500);
    });
    
    // Навигация по шагам
    function showStep(stepNumber) {
        // Скрываем все шаги
        steps.forEach(step => {
            step.classList.remove('active');
        });
        
        // Показываем текущий шаг
        document.querySelector(`.scenario-step[data-step="${stepNumber}"]`).classList.add('active');
        
        // Обновляем прогресс
        progressSteps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) <= stepNumber) {
                step.classList.add('active');
            }
        });
        
        currentStep = stepNumber;
    }
    
    // Кнопки "Далее"
    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep < steps.length) {
                showStep(currentStep + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
    
    // Кнопки "Назад"
    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 1) {
                showStep(currentStep - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
    // Автоматически добавляем tooltips ко всем терминам
document.querySelectorAll('.term-with-tooltip').forEach(item => {
  item.innerHTML = `
    <span class="tooltip">${item.dataset.term}
      <span class="tooltiptext">${item.dataset.definition}</span>
    </span>
  `;
});
    // Инициализация первого шага
    showStep(1);
    
    // Анимация перехода между страницами
    const pageTransition = document.querySelector('.page-transition');
    
    setTimeout(() => {
        pageTransition.style.opacity = '0';
    }, 500);
});