document.addEventListener('DOMContentLoaded', function() {
    // Анимация прогресс-бара при скролле
    const progressBar = document.querySelector('.progress');
    const lectureContent = document.querySelector('.lecture-content');
    
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
    
    // Проверяем при загрузке и при скролле
    window.addEventListener('load', checkAnimation);
    window.addEventListener('scroll', checkAnimation);
    
    // Имитация проверки теста
    const quizSubmit = document.querySelector('.quiz-submit');
    if (quizSubmit) {
        quizSubmit.addEventListener('click', function() {
            const selectedOption = document.querySelector('input[name="quiz1"]:checked');
            
            if (selectedOption) {
                if (selectedOption.nextSibling.textContent.includes("Сохранить доказательства")) {
                    alert('Правильно! Действительно важно сохранять доказательства и обращаться за помощью.');
                } else {
                    alert('Не совсем верно. Лучший вариант - сохранить доказательства и обратиться за помощью.');
                }
            } else {
                alert('Пожалуйста, выберите вариант ответа');
            }
        });
    }
    
    // Сохранение прогресса в localStorage
    const lectureId = 'cyberbullying';
    
    function saveProgress() {
        const scrollPosition = window.pageYOffset;
        localStorage.setItem(lectureId, scrollPosition);
    }
    
    function loadProgress() {
        const savedPosition = localStorage.getItem(lectureId);
        if (savedPosition) {
            window.scrollTo(0, savedPosition);
        }
    }
    
    window.addEventListener('beforeunload', saveProgress);
    loadProgress();
    
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
});