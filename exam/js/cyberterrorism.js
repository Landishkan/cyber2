document.addEventListener('DOMContentLoaded', function() {
    // Обновление прогресс-бара при прокрутке
    window.addEventListener('scroll', updateProgressBar);
    
    // Инициализация прогресс-бара
    updateProgressBar();
    
    // Анимация появления элементов
    animateElements();
});

function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progress").style.width = scrolled + "%";
}

function animateElements() {
    const elements = document.querySelectorAll('.lecture-section, .quiz-block, .conclusion-block');
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Изначальные стили для анимации
    const sections = document.querySelectorAll('.lecture-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    const quizBlock = document.querySelector('.quiz-block');
    quizBlock.style.opacity = '0';
    quizBlock.style.transform = 'translateY(20px)';
    quizBlock.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    const conclusionBlock = document.querySelector('.conclusion-block');
    conclusionBlock.style.opacity = '0';
    conclusionBlock.style.transform = 'translateY(20px)';
    conclusionBlock.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
}

// Функции для теста
let correctAnswers = 0;
const totalQuestions = 5;

function checkAnswer(element, isCorrect) {
    // Сброс всех выделений в этом вопросе
    const options = element.parentElement.querySelectorAll('.quiz-option');
    options.forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
    });
    
    // Выделение выбранного ответа
    if (isCorrect) {
        element.classList.add('correct');
        correctAnswers++;
    } else {
        element.classList.add('incorrect');
        
        // Найдем правильный ответ и выделим его
        options.forEach(opt => {
            if (opt.getAttribute('onclick').includes('true')) {
                opt.classList.add('correct');
            }
        });
    }
    
    // Делаем вопрос неактивным после ответа
    options.forEach(opt => {
        opt.style.pointerEvents = 'none';
    });
}

function showResults() {
    const resultsElement = document.getElementById('quiz-results');
    let message = '';
    
    if (correctAnswers === totalQuestions) {
        message = `🛡️ Отлично! ${totalQuestions}/${totalQuestions}! Ты отлично разбираешься в теме кибертерроризма!`;
    } else if (correctAnswers >= totalQuestions * 0.7) {
        message = `👍 Хорошо! ${correctAnswers} из ${totalQuestions}. Ты на верном пути в изучении кибербезопасности!`;
    } else {
        message = `💻 ${correctAnswers} из ${totalQuestions}. Рекомендуем перечитать лекцию - эта тема очень важна!`;
    }
    
    resultsElement.innerHTML = `<h4 style="color: var(--warning-color);">Твой результат:</h4><p>${message}</p>`;
    resultsElement.style.display = 'block';
    
    // Прокрутка к результатам
    resultsElement.scrollIntoView({ behavior: 'smooth' });
    
    // Сброс счетчика для возможного повторного прохождения
    correctAnswers = 0;
}