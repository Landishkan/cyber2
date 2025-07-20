// scenario.js (улучшенная версия)
let currentStep = 1;
const totalSteps = 5;
let userScore = 0;
const maxScore = totalSteps * 10; // Максимальный балл

// Объект для хранения выбранных ответов
const userChoices = {};

function nextStep(step, choice) {
    // Проверка существования элемента
    const currentStepElement = document.getElementById(`step${step}`);
    if (!currentStepElement) {
        console.error(`Шаг ${step} не найден`);
        return;
    }

    // Скрыть текущий шаг с анимацией
    currentStepElement.style.opacity = '0';
    setTimeout(() => {
        currentStepElement.style.display = 'none';
    }, 300);

    // Сохраняем выбор пользователя
    userChoices[`step${step}`] = choice;

    // Показать результаты выбора
    const results = document.querySelectorAll(`#step${step} .result`);
    results.forEach(result => result.style.display = 'none');
    
    const resultElement = document.getElementById(`result${step}-${choice}`);
    if (resultElement) {
        resultElement.style.display = 'block';
        
        // Добавляем баллы за правильный выбор
        if (resultElement.classList.contains('good-result')) {
            userScore += 10;
            updateScoreDisplay();
        }
    }

    // Обновить прогресс бар
    updateProgressBar(step);

    // Показать следующий шаг
    if (step < totalSteps) {
        currentStep = step + 1;
        const nextStepElement = document.getElementById(`step${currentStep}`);
        
        if (nextStepElement) {
            nextStepElement.style.display = 'block';
            nextStepElement.style.opacity = '0';
            
            // Анимация появления
            setTimeout(() => {
                nextStepElement.style.opacity = '1';
            }, 10);
            
            // Прокрутить к следующему шагу
            setTimeout(() => {
                nextStepElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        }
    } else {
        // Если это последний шаг, показать итоговую статистику
        showFinalResults();
    }
}

function updateProgressBar(step) {
    const progress = (step / totalSteps) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
        
        // Анимация заполнения
        progressBar.style.transition = 'width 0.5s ease';
    }
}

function updateScoreDisplay() {
    const scoreElement = document.getElementById('userScore');
    if (scoreElement) {
        scoreElement.textContent = userScore;
    }
}

function showFinalResults() {
    const finalScoreElement = document.getElementById('finalScore');
    if (finalScoreElement) {
        finalScoreElement.textContent = `${userScore}/${maxScore}`;
        
        // Добавить оценку в зависимости от баллов
        const ratingElement = document.getElementById('finalRating');
        if (ratingElement) {
            const percentage = (userScore / maxScore) * 100;
            
            if (percentage >= 80) {
                ratingElement.textContent = 'Отлично! Вы отлично разбираетесь в кибербезопасности';
                ratingElement.style.color = 'var(--accent-color)';
            } else if (percentage >= 50) {
                ratingElement.textContent = 'Хорошо, но есть куда расти';
                ratingElement.style.color = 'var(--secondary-color)';
            } else {
                ratingElement.textContent = 'Вам стоит изучить тему лучше';
                ratingElement.style.color = 'var(--error-color)';
            }
        }
    }
    
    // Показать итоговый экран
    setTimeout(() => {
        document.getElementById('step5').scrollIntoView({
            behavior: 'smooth'
        });
    }, 500);
}

function restartScenario() {
    // Анимация скрытия всех шагов
    document.querySelectorAll('.step').forEach((step, index) => {
        step.style.opacity = '0';
        setTimeout(() => {
            step.style.display = index === 0 ? 'block' : 'none';
            if (index === 0) {
                step.style.opacity = '1';
            }
        }, 300);
    });

    // Скрыть все результаты
    document.querySelectorAll('.result').forEach(result => {
        result.style.display = 'none';
    });
    
    // Сбросить прогресс бар
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = '0%';
        progressBar.style.transition = 'none';
        setTimeout(() => {
            progressBar.style.transition = 'width 0.5s ease';
        }, 10);
    }
    
    // Сбросить счет
    userScore = 0;
    updateScoreDisplay();
    
    // Очистить историю выбора
    for (const key in userChoices) {
        delete userChoices[key];
    }
    
    // Прокрутить к началу
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 300);
    
    currentStep = 1;
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded!');
    // Проверка поддержки необходимых функций
    if (!('querySelector' in document) || !('addEventListener' in window)) {
        alert('Ваш браузер устарел. Пожалуйста, обновите его.');
        return;
    }

    // Показать только первый шаг
    for (let i = 2; i <= totalSteps; i++) {
        const stepElement = document.getElementById(`step${i}`);
        if (stepElement) {
            stepElement.style.display = 'none';
        }
    }
    
    // Инициализировать прогресс бар
    updateProgressBar(0);
    
    // Добавить обработчик для кнопки "Начать сначала" в финале
    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) {
        restartBtn.addEventListener('click', restartScenario);
    }
    
    // Инициализация системы баллов
    const scoreContainer = document.createElement('div');
    scoreContainer.id = 'scoreContainer';
    scoreContainer.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: var(--background-light); 
                    padding: 10px 15px; border-radius: 5px; border: 1px solid var(--primary-color);
                    z-index: 1000;">
            <span style="color: var(--text-secondary);">Баллы: </span>
            <span id="userScore" style="color: var(--accent-color); font-weight: bold;">0</span>
            <span style="color: var(--text-secondary);">/${maxScore}</span>
        </div>
    `;
    document.body.appendChild(scoreContainer);
});