document.addEventListener('DOMContentLoaded', function() {
    const emails = [
        {
            sender: "Поддержка Apple (support@apple.secure.com)",
            subject: "Срочно: Ваш аккаунт был заблокирован",
            body: `
                <p>Уважаемый пользователь,</p>
                <p>Мы обнаружили подозрительную активность в вашем аккаунте. Для разблокировки перейдите по ссылке:</p>
                <a href="#" class="phishing-link">https://apple-id-verify.com/restore</a>
                <p>Если вы не предпримете действий в течение 24 часов, ваш аккаунт будет удален.</p>
                <p>С уважением,<br>Служба поддержки Apple</p>
            `,
            isPhishing: true,
            redFlags: [
                "Доменное имя в ссылке не соответствует официальному (apple.com)",
                "Использование тактики запугивания ('аккаунт будет удален')",
                "Грамматические ошибки в письме",
                "Требуются немедленные действия"
            ]
        },
        // Добавь больше примеров...
    ];

    let currentLevel = 0;
    let score = 0;
    
    // Инициализация первого письма
    loadEmail(currentLevel);
    
    // Обработчики кнопок
    document.querySelector('.report-button').addEventListener('click', function() {
        checkAnswer(true);
    });
    
    document.querySelector('.trust-button').addEventListener('click', function() {
        checkAnswer(false);
    });
    
    document.querySelector('.next-button').addEventListener('click', function() {
        currentLevel++;
        if (currentLevel < emails.length) {
            loadEmail(currentLevel);
            document.querySelector('.feedback-modal').classList.add('hidden');
            updateProgress();
        } else {
            // Конец сценария
            showFinalResults();
        }
    });
    
    function loadEmail(index) {
        const email = emails[index];
        const emailContainer = document.querySelector('.email');
        
        emailContainer.innerHTML = `
            <div class="email-header">
                <span class="sender">${email.sender}</span>
                <span class="date">Сегодня, ${getRandomTime()}</span>
            </div>
            <div class="email-subject">${email.subject}</div>
            <div class="email-body">${email.body}</div>
            <div class="email-actions">
                <button class="report-button">Это фишинг</button>
                <button class="trust-button">Это легитимно</button>
            </div>
        `;
        
        // Обновляем обработчики для новых кнопок
        document.querySelector('.report-button').addEventListener('click', function() {
            checkAnswer(true);
        });
        
        document.querySelector('.trust-button').addEventListener('click', function() {
            checkAnswer(false);
        });
    }
    
    function checkAnswer(userSaidPhishing) {
        const currentEmail = emails[currentLevel];
        const isCorrect = (userSaidPhishing === currentEmail.isPhishing);
        const modal = document.querySelector('.feedback-modal');
        const feedbackTitle = document.querySelector('.feedback-title');
        const feedbackText = document.querySelector('.feedback-text');
        const feedbackDetails = document.querySelector('.feedback-details');
        const redFlagsList = document.querySelector('.red-flags');
        
        if (isCorrect) {
            score++;
            feedbackTitle.textContent = currentEmail.isPhishing ? "Правильно! Это фишинг!" : "Правильно! Это легитимное письмо!";
            feedbackText.textContent = currentEmail.isPhishing ? "Вы успешно распознали фишинговую атаку." : "Вы правильно определили безопасное письмо.";
        } else {
            feedbackTitle.textContent = currentEmail.isPhishing ? "Ошибка! Это был фишинг!" : "Ошибка! Это было безопасное письмо!";
            feedbackText.textContent = currentEmail.isPhishing ? "Будьте осторожнее с такими письмами." : "Не стоит безосновательно подозревать все письма.";
        }
        
        if (currentEmail.isPhishing) {
            feedbackDetails.classList.remove('hidden');
            redFlagsList.innerHTML = currentEmail.redFlags.map(flag => `<li>${flag}</li>`).join('');
        } else {
            feedbackDetails.classList.add('hidden');
        }
        
        modal.classList.remove('hidden');
    }
    
    function updateProgress() {
        const progress = (currentLevel / emails.length) * 100;
        document.querySelector('.progress').style.width = `${progress}%`;
    }
    
    function showFinalResults() {
        const modal = document.querySelector('.feedback-modal');
        modal.classList.remove('hidden');
        
        document.querySelector('.feedback-title').textContent = "Сценарий завершен!";
        document.querySelector('.feedback-text').textContent = `Ваш результат: ${score} из ${emails.length} правильных ответов`;
        document.querySelector('.feedback-details').classList.add('hidden');
        document.querySelector('.next-button').textContent = "Завершить";
        
        document.querySelector('.next-button').addEventListener('click', function() {
            window.location.href = "scenarios.html"; // Вернуться к списку сценариев
        });
    }
    
    function getRandomTime() {
        const hours = Math.floor(Math.random() * 12) + 1;
        const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
});