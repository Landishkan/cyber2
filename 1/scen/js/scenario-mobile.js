document.addEventListener('DOMContentLoaded', function() {
 
    // Данные сценария
    const scenarioData = [
        {
            question: "Ты получил сообщение от незнакомого номера: 'Поздравляем! Вы выиграли новый iPhone! Перейдите по ссылке, чтобы получить приз.'",
            description: "Что ты сделаешь в этой ситуации?",
            image: "https://via.placeholder.com/600x300/121235/00f2ff?text=Сообщение+о+выигрыше",
            options: [
                {
                    text: "Перейду по ссылке - вдруг правда выиграл!",
                    correct: false,
                    feedback: "❌ Опасно! Это классическая фишинговая атака. Такие ссылки могут вести на вредоносные сайты или красть твои данные."
                },
                {
                    text: "Удалю сообщение и заблокирую номер",
                    correct: true,
                    feedback: "✅ Верно! Это скорее всего мошенники. Лучший вариант - игнорировать и блокировать такие сообщения."
                },
                {
                    text: "Перешлю сообщение друзьям - пусть тоже попробуют",
                    correct: false,
                    feedback: "❌ Не стоит! Ты можешь непреднамеренно помочь мошенникам распространять их схему."
                },
                {
                    text: "Спрошу у родителей, что делать",
                    correct: true,
                    feedback: "✅ Отличный вариант! Если сомневаешься, всегда можно спросить совета у взрослых."
                }
            ]
        },
        {
            question: "Ты хочешь скачать новую модную игру, но она доступна только на непроверенном сайте.",
            description: "Как поступить?",
            image: "https://via.placeholder.com/600x300/121235/00ff88?text=Скачать+игру",
            options: [
                {
                    text: "Скачаю - очень хочется поиграть!",
                    correct: false,
                    feedback: "❌ Рискованно! Неофициальные источники часто распространяют вредоносные программы вместе с играми."
                },
                {
                    text: "Поищу игру в официальном магазине приложений",
                    correct: true,
                    feedback: "✅ Правильно! Официальные магазины (Google Play, App Store) проверяют приложения на безопасность."
                },
                {
                    text: "Спрошу в чате у друзей, откуда они качали",
                    correct: false,
                    feedback: "❌ Не самый безопасный вариант. Даже если у друзей всё работает, файл может содержать скрытые угрозы."
                },
                {
                    text: "Погуглю отзывы об этом сайте перед загрузкой",
                    correct: true,
                    feedback: "✅ Хорошая мысль! Проверка репутации сайта может помочь избежать проблем, но официальный магазин всё равно безопаснее."
                }
            ]
        },
        {
            question: "Твой телефон просит обновить систему, но это займет время и интернет.",
            description: "Что ты выберешь?",
            image: "https://via.placeholder.com/600x300/121235/3a6bff?text=Обновление+системы",
            options: [
                {
                    text: "Отложу на потом - сейчас некогда",
                    correct: false,
                    feedback: "❌ Небезопасно! Обновления часто содержат исправления уязвимостей. Лучше не откладывать."
                },
                {
                    text: "Обновлю сразу, подключившись к Wi-Fi",
                    correct: true,
                    feedback: "✅ Верное решение! Регулярные обновления защищают твой телефон от новых угроз."
                },
                {
                    text: "Отключу автоматические обновления, чтобы не мешали",
                    correct: false,
                    feedback: "❌ Плохая идея! Без обновлений твой телефон становится уязвимым для хакеров."
                },
                {
                    text: "Проверю, действительно ли это официальное обновление",
                    correct: true,
                    feedback: "✅ Умно! Иногда мошенники маскируются под системные обновления. Проверь в настройках телефона."
                }
            ]
        },
        {
            question: "Ты находишь в парке USB-флешку с надписью 'Фото вечеринки'.",
            description: "Как поступишь?",
            image: "https://via.placeholder.com/600x300/121235/ff2d75?text=Найденная+флешка",
            options: [
                {
                    text: "Подключу к телефону через переходник - интересно же!",
                    correct: false,
                    feedback: "❌ Очень опасно! Флешки могут содержать вирусы, которые заразят твоё устройство."
                },
                {
                    text: "Отнесу в службу находок или выброшу",
                    correct: true,
                    feedback: "✅ Правильно! Это самый безопасный вариант. Неизвестные носители лучше не подключать."
                },
                {
                    text: "Дам другу - пусть он проверит на своем компьютере",
                    correct: false,
                    feedback: "❌ Не стоит! Ты можешь подвергнуть риску не только себя, но и друга."
                },
                {
                    text: "Оставлю на месте - это не мои проблемы",
                    correct: true,
                    feedback: "✅ Разумно! Хотя отнести в службу находок было бы лучше, но оставить - безопаснее, чем подключать."
                }
            ]
        },
        {
            question: "Приложение запрашивает доступ к твоим контактам, камере и местоположению, хотя это просто фонарик.",
            description: "Твои действия?",
            image: "https://via.placeholder.com/600x300/121235/00f2ff?text=Разрешения+приложения",
            options: [
                {
                    text: "Разрешу всё - наверное, так нужно для работы",
                    correct: false,
                    feedback: "❌ Осторожно! Приложения не должны запрашивать лишние разрешения. Это признак сбора данных."
                },
                {
                    text: "Откажусь и найду другое приложение",
                    correct: true,
                    feedback: "✅ Отлично! Фонарику не нужны такие разрешения. Лучше выбрать более честное приложение."
                },
                {
                    text: "Разрешу, но потом отключу в настройках",
                    correct: false,
                    feedback: "❌ Не идеально. Лучше сразу не давать ненужных разрешений, чем потом отключать."
                },
                {
                    text: "Почитаю отзывы о приложении перед решением",
                    correct: true,
                    feedback: "✅ Хороший подход! Проверка репутации приложения поможет принять верное решение."
                }
            ]
        }
    ];

    // Элементы DOM
    const scenarioContent = document.getElementById('scenarioContent');
    const scenarioActions = document.getElementById('scenarioActions');
    const scenarioFeedback = document.getElementById('scenarioFeedback');
    const progressBar = document.querySelector('.progress-bar::after');
    const progressText = document.getElementById('progressText');
    
    // Переменные состояния
    let currentQuestion = 0;
    let score = 0;
    let selectedOption = null;
    
    // Инициализация сценария
    function initScenario() {
        showQuestion(currentQuestion);
        updateProgress();
    }
    
    // Показать вопрос
    function showQuestion(index) {
        if (index >= scenarioData.length) {
            showResult();
            return;
        }
        
        const question = scenarioData[index];
        selectedOption = null;
        
        // Очищаем предыдущий контент
        scenarioContent.innerHTML = '';
        scenarioActions.innerHTML = '';
        scenarioFeedback.style.display = 'none';
        
        // Создаем HTML для вопроса
        const questionHTML = `
            <div class="scenario-question fade-in">${question.question}</div>
            <div class="scenario-description fade-in">${question.description}</div>
            ${question.image ? `<img src="${question.image}" alt="Иллюстрация" class="scenario-image fade-in">` : ''}
        `;
        
        scenarioContent.innerHTML = questionHTML;
        
        // Создаем варианты ответов
        question.options.forEach((option, i) => {
            const button = document.createElement('button');
            button.className = 'action-button fade-in';
            button.style.animationDelay = `${i * 0.1}s`;
            button.innerHTML = option.text;
            button.addEventListener('click', () => selectOption(i));
            scenarioActions.appendChild(button);
        });
        
        // Анимация появления
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(el => {
            el.style.opacity = 0;
            setTimeout(() => {
                el.style.opacity = 1;
            }, 100);
        });
    }
    
    // Выбор варианта ответа
    function selectOption(index) {
        if (selectedOption !== null) return;
        
        selectedOption = index;
        const question = scenarioData[currentQuestion];
        const option = question.options[index];
        const buttons = document.querySelectorAll('.action-button');
        
        // Помечаем выбранный вариант
        buttons.forEach((button, i) => {
            if (i === index) {
                button.classList.add(option.correct ? 'correct' : 'incorrect');
            } else if (question.options[i].correct) {
                button.classList.add('correct');
            }
        });
        
        // Обновляем счет
        if (option.correct) {
            score++;
        }
        
        // Показываем обратную связь
        showFeedback(option.feedback, option.correct);
    }
    
    // Показать обратную связь
   function showFeedback(text, isCorrect) {
    scenarioFeedback.innerHTML = `
        <div class="feedback-title">
            <span class="icon">${isCorrect ? '✅' : '❌'}</span>
            <span>${isCorrect ? 'Правильно!' : 'Не совсем'}</span>
        </div>
        <div class="feedback-explanation">${text}</div>
        <button class="next-button">${currentQuestion < scenarioData.length - 1 ? 'Далее' : 'Посмотреть результат'}</button>
    `;
    
    scenarioFeedback.className = `scenario-feedback fade-in feedback-${isCorrect ? 'correct' : 'incorrect'}`;
    scenarioFeedback.style.display = 'block';

    // Назначаем обработчик с небольшой задержкой
    setTimeout(() => {
        const nextButton = scenarioFeedback.querySelector('.next-button');
        if (nextButton) {
            nextButton.onclick = nextQuestion; // Используем onclick
        }
    }, 10);
}
    
    // Следующий вопрос
function nextQuestion() {
    // Проверяем, был ли ответ на последний вопрос
    if (currentQuestion >= scenarioData.length - 1) {
        showResult();
        return;
    }
    
    currentQuestion++;
    updateProgress();
    showQuestion(currentQuestion);
}
    // Обновить прогресс бар
  function updateProgress() {
    const progress = (currentQuestion / scenarioData.length) * 100;
    document.querySelector('.progress-bar-fill').style.width = `${progress}%`; // Изменяем реальный элемент
    progressText.textContent = `${currentQuestion + 1}/${scenarioData.length}`;
}
    // Показать результат
function showResult() {
    console.log("showResult вызвана"); // Проверка
    const percentage = Math.round((score / scenarioData.length) * 100);
    console.log("Результат:", score, "из", scenarioData.length); // Проверка данных
    
    let message, icon;
    
    if (percentage >= 80) {
        icon = '🎉';
        message = 'Отличный результат! Ты отлично разбираешься в мобильной безопасности.';
    } else if (percentage >= 50) {
        icon = '👍';
        message = 'Хорошо, но есть куда расти!';
    } else {
        icon = '🤔';
        message = 'Есть над чем поработать!';
    }
    
    // Формируем HTML
    console.log("Формируем HTML результата");
    const resultHTML = `
        <div class="scenario-result">
            <div class="result-icon">${icon}</div>
            <h2 class="result-title">Сценарий завершён!</h2>
            <div class="result-score">${score} из ${scenarioData.length} правильных ответов</div>
            <div class="result-message">${message}</div>
            <button class="restart-button">Пройти ещё раз</button>
        </div>
    `;
    
    // Вставляем в DOM
     console.log("Вставляем в DOM:", resultHTML);
    scenarioContent.innerHTML = resultHTML;
     console.log("Проверяем DOM:", scenarioContent.innerHTML);
    // Назначаем обработчик для кнопки "Пройти ещё раз"
    const restartButton = document.querySelector('.restart-button');
    if (restartButton) {
        restartButton.onclick = restartScenario;
    }
}
    
    // Перезапустить сценарий
    function restartScenario() {
        currentQuestion = 0;
        score = 0;
        initScenario();
    }
    
    // Инициализируем сценарий при загрузке
    initScenario();
    
    // Анимация перехода между страницами

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Если ссылка ведёт на другую страницу (не якорь)
        if (this.href && !this.href.startsWith('#')) {
            e.preventDefault();
            const href = this.href;
            
            document.querySelector('.page-transition').classList.add('active');
            
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        }
    });
});
});