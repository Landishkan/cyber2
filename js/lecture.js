// Конфигурация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAjDJPWVXFmBlWYRUf-IACsQrut_lEEFfc",
    authDomain: "cyber-questor.firebaseapp.com",
    projectId: "cyber-questor",
    storageBucket: "cyber-questor.firebasestorage.app",
    messagingSenderId: "347078202285",
    appId: "1:347078202285:web:7ac8581765d5fdc76a4724",
    measurementId: "G-GWS13K2FW1"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ID текущей лекции
const LECTURE_ID = 'lecture_3'; // кибербуллинг - lecture_3

document.addEventListener('DOMContentLoaded', function() {
    // Проверка авторизации
    auth.onAuthStateChanged(user => {
        if (!user) {
            window.location.href = "../login.html";
            return;
        }
        currentUser = user;
        loadLectureProgress(user.uid);
    });

    // Анимация прогресс-бара при скролле
    const progressBar = document.querySelector('.progress');
    
    function updateProgress() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollProgress + '%';
    }
    
    window.addEventListener('scroll', updateProgress);
    
    // Анимация появления элементов при скролле
    const animateElements = document.querySelectorAll('.animate-slide, .animate-fade');
    
    function checkAnimation() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    window.addEventListener('load', checkAnimation);
    window.addEventListener('scroll', checkAnimation);
    
    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Сохранение прогресса чтения
    let scrollSaveTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollSaveTimeout);
        scrollSaveTimeout = setTimeout(saveScrollProgress, 1000);
    });
});

let currentUser = null;
let userProgress = 0;

// Загрузка прогресса лекции
async function loadLectureProgress(userId) {
    try {
        const userDoc = await db.collection('users').doc(userId).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            userProgress = userData.progress?.[LECTURE_ID] || 0;
            updateProgressUI();
        }
    } catch (error) {
        console.error('Ошибка загрузки прогресса:', error);
    }
}

// Сохранение прогресса прокрутки
async function saveScrollProgress() {
    if (!currentUser) return;

    const scrollTop = window.pageYOffset;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100);
    
    // Сохраняем только если прокрутили более 80%
    if (scrollPercentage >= 80 && userProgress < 80) {
        await updateLectureProgress(80);
    }
}

// Обновление прогресса лекции
async function updateLectureProgress(progress) {
    if (!currentUser || progress <= userProgress) return;

    try {
        await db.collection('users').doc(currentUser.uid).update({
            [`progress.${LECTURE_ID}`]: progress,
            lastActivity: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        userProgress = progress;
        updateProgressUI();
        
        // Показываем уведомление о прогрессе
        if (progress === 100) {
            showNotification('Лекция завершена! Пройдите тест для закрепления знаний.');
        }
    } catch (error) {
        console.error('Ошибка сохранения прогресса:', error);
    }
}

// Обновление UI прогресса
function updateProgressUI() {
    const progressElement = document.getElementById('lecture-progress');
    if (progressElement) {
        progressElement.textContent = `Прогресс: ${userProgress}%`;
    }
}

// Функции для теста
let quizScore = 0;
const totalQuestions = 5;

function checkAnswer(element, isCorrect) {
    // Сбрасываем выделение у всех вариантов в этом вопросе
    const question = element.closest('.quiz-question');
    const options = question.querySelectorAll('.quiz-option');
    options.forEach(opt => {
        opt.classList.remove('correct', 'incorrect', 'selected');
    });
    
    // Выделяем выбранный вариант
    element.classList.add('selected');
    if (isCorrect) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
        
        // Показываем правильный ответ
        const correctOption = Array.from(options).find(opt => 
            opt.getAttribute('onclick').includes('true')
        );
        if (correctOption) {
            correctOption.classList.add('correct');
        }
    }
}

async function showResults() {
    const questions = document.querySelectorAll('.quiz-question');
    let score = 0;
    
    questions.forEach(question => {
        const selected = question.querySelector('.selected');
        if (selected && selected.classList.contains('correct')) {
            score++;
        }
    });
    
    quizScore = score;
    const percentage = (score / totalQuestions) * 100;
    
    const resultsDiv = document.getElementById('quiz-results');
    resultsDiv.style.display = 'block';
    resultsDiv.innerHTML = `
        <h4>Результаты теста</h4>
        <p>Правильных ответов: ${score} из ${totalQuestions}</p>
        <p>Оценка: ${percentage >= 80 ? 'Отлично' : percentage >= 60 ? 'Хорошо' : 'Нужно повторить'}</p>
        ${percentage >= 80 ? '<p class="success">Отлично! Вы хорошо усвоили материал!</p>' : ''}
    `;
    
    // Сохраняем результат теста
    if (currentUser) {
        await saveQuizResults(score, percentage);
    }
    
    // Прокрутка к результатам
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

// Сохранение результатов теста
async function saveQuizResults(score, percentage) {
    try {
        await db.collection('users').doc(currentUser.uid).update({
            [`quizResults.${LECTURE_ID}`]: {
                score: score,
                total: totalQuestions,
                percentage: percentage,
                completedAt: firebase.firestore.FieldValue.serverTimestamp()
            },
            [`progress.${LECTURE_ID}`]: percentage, // Обновляем прогресс
            lastActivity: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        userProgress = percentage;
        updateProgressUI();
        
        // Показываем уведомление
        showNotification(`Тест завершен! Ваш прогресс: ${percentage}%`);
        
    } catch (error) {
        console.error('Ошибка сохранения результатов:', error);
    }
}

// Вспомогательные функции
function showNotification(message) {
    // Создаем уведомление
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 255, 136, 0.9);
        color: #000;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Выход из системы
function logout() {
    auth.signOut().then(() => {
        window.location.href = "../index.html";
    });
}
