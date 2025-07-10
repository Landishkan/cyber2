// Данные для игры
const gameData = [
    {
        title: "Вакцины Pfizer содержат наночипы для слежения?",
        text: "По данным «анонимных исследователей», вакцины Pfizer содержат графеновые наночипы, позволяющие отслеживать передвижения людей. В статье приводятся «результаты спектрального анализа» и утверждается, что технология разработана DARPA.",
        isFake: true,
        explanation: "<i class='fas fa-microscope'></i><strong>Научный фейк!</strong><br>• FDA опубликовало полный состав вакцин<br>• DARPA опровергло свою причастность<br>• Графен не используется в производстве<br>• «Исследование» проводилось несертифицированной лабораторией"
    },
    {
        title: "OpenAI запускает платный ChatGPT Professional",
        text: "С 15 января 2024 года OpenAI вводит профессиональную подписку за $42/месяц с гарантированной доступностью 99.9%. Бесплатная версия останется, но с ограничением 20 запросов в час. Об этом сообщил CTO OpenAI Грег Брокман в официальном блоге компании.",
        isFake: false,
        explanation: "<i class='fas fa-robot'></i><strong>Факт подтверждён</strong><br>• Анонс в блоге openai.com<br>• Цены соответствуют пресс-релизу<br>• Грег Брокман действительно CTO<br>• Лимиты указаны точно"
    },
    {
        title: "Apple раздаёт MacBook за репосты",
        text: "В честь 45-летия компании Apple запустила акцию: 1000 новых MacBook Pro M3 достанется пользователям, сделавшим репост этой новости и отметившим 5 друзей. Акция якобы одобрена Тином Куком.",
        isFake: true,
        explanation: "<i class='fas fa-laptop'></i><strong>Мошенническая схема!</strong><br>• Apple не проводит такие акции<br>• Официальные акции только на apple.com<br>• Нет подтверждения от Тина Кука<br>• Графика содержит ошибки в логотипе"
    },
    {
        title: "NASA скрывает артефакты на Луне",
        text: "Бывший сотрудник NASA опубликовал «рассекреченные фото» с аномальными структурами в кратере Тихо. В интервью он утверждает, что агентство 20 лет скрывает доказательства внеземной цивилизации.",
        isFake: true,
        explanation: "<i class='fas fa-moon'></i><strong>Фальшивка!</strong><br>• Фото являются фотошопом<br>• «Сотрудник» не числится в базе NASA<br>• Кратер Тихо постоянно мониторится<br>• Нет EXIF-данных у «фото»"
    },
    {
        title: "WhatsApp вводит платные бизнес-аккаунты",
        text: "Meta официально объявила о планах монетизации WhatsApp Business: с марта 2024 года для компаний станет обязательной ежемесячная подписка $14.99. Личные аккаунты останутся бесплатными. Информация подтверждена пресс-службой.",
        isFake: false,
        explanation: "<i class='fas fa-comment-dots'></i><strong>Достоверно</strong><br>• Официальное заявление Meta<br>• Указана верная цена<br>• Разделение на бизнес/личные аккаунты<br>• Подтверждено TechCrunch и The Verge"
    },
    {
        title: "5G вызывает мгновенный COVID-19",
        text: "«Исследование немецких учёных» утверждает, что излучение 5G активирует латентный COVID-19 в вакцинированных. В статье приводятся графики «совпадения» вспышек болезни с запуском вышек.",
        isFake: true,
        explanation: "<i class='fas fa-tower-cell'></i><strong>Антинаучный бред</strong><br>• Нет такого исследования в Германии<br>• COVID-19 — вирус, а не радиация<br>• ВОЗ опровергла эту теорию<br>• Графики сфальсифицированы"
    },
   {
    title: "ЕС вводит обязательную маркировку ИИ-контента",
    text: "С 2024 года согласно новому регламенту ЕС все материалы, созданные искусственным интеллектом, должны маркироваться специальным знаком. Это касается текстов, изображений и видео, сгенерированных такими системами как ChatGPT и Midjourney. Правило уже одобрено Европарламентом.",
    isFake: false,
    explanation: "<i class='fas fa-flag-eu'></i><strong>Подтверждённый факт</strong><br>• Регламент EU AI Act от 08.12.2023<br>• Обязательная маркировка с июня 2024<br>• Утверждено 467 голосами «за»<br>• Опубликовано в Official Journal EU"
},
    {
        title: "Windows 12 будет подпиской за $7/мес",
        text: "На внутренней встрече Microsoft объявила о переходе на модель подписки. «Windows 12 Subscription» заменит лицензии с ежемесячной платой. В сети появились «скриншоты» панели управления с новой опцией оплаты.",
        isFake: true,
        explanation: "<i class='fas fa-window-restore'></i><strong>Фейковые утечки</strong><br>• Microsoft продолжает разовые продажи<br>• «Скриншоты» сделаны в Photoshop<br>• Нет упоминания на microsoft.com<br>• Цена не соответствует политике компании"
    },
    {
        title: "Tesla Model π — смартфон с нейроинтерфейсом",
        text: "Илон Маск представил смартфон Tesla Model π с «прямым нейроподключением». Устройство якобы позволяет набирать текст силой мысли. Предзаказ открыт на «особых условиях» с оплатой в криптовалюте.",
        isFake: true,
        explanation: "<i class='fas fa-brain'></i><strong>Глубокий фейк</strong><br>• Tesla не производит смартфоны<br>• Технология не запатентована<br>• Нет презентации на канале Маска<br>• Домен teslamodelpi.com зарегистрирован мошенниками"
    },
 {
        title: "Госуслуги внедряют биометрический вход",
        text: "Минцифры России анонсировало поэтапный переход на биометрическую идентификацию. С 2025 года для доступа к расширенным функциям портала потребуется подтверждение личности через ЕБС.",
        isFake: false,
        explanation: "<i class='fas fa-id-card'></i><strong>Правда</strong><br>• Соответствует стратегии цифровизации<br>• Упоминается в интервью министра<br>• ЕБС действительно разрабатывается<br>• Сроки внедрения подтверждены"
    }
];
// Инициализация игры
document.addEventListener('DOMContentLoaded', () => {
    // Элементы DOM
    const contentTitle = document.getElementById('content-title');
    const contentText = document.getElementById('content-text');
    const fakeBtn = document.getElementById('fake-btn');
    const trueBtn = document.getElementById('true-btn');
    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');
    const messagePopup = document.getElementById('messagePopup');
    const gameEnd = document.getElementById('gameEnd');
    const finalScore = document.getElementById('finalScore');
    const restartBtn = document.getElementById('restartBtn');
    const gameCard = document.getElementById('gameCard');

    let currentLevel = 0;
    let score = 0;
    let gameActive = true;

    // Функции игры...
    function loadLevel(levelIndex) {
        if (!gameActive) return;
        
        const level = gameData[levelIndex];
        gameCard.style.opacity = 0;
        
        fakeBtn.disabled = false;
        trueBtn.disabled = false;
        
        setTimeout(() => {
            contentTitle.textContent = level.title;
            contentText.textContent = level.text;
            levelElement.textContent = `${levelIndex + 1}/${gameData.length}`;
            gameCard.style.opacity = 1;
        }, 500);
    }

    function showMessage(html, isCorrect) {
        messagePopup.innerHTML = html;
        messagePopup.className = `message-popup ${isCorrect ? 'correct' : 'incorrect'}`;
        messagePopup.classList.add('show');
        
        setTimeout(() => {
            messagePopup.classList.remove('show');
        }, 4000); //
    }

    function checkAnswer(isFake) {
        if (!gameActive) return;
        
        gameActive = false;
        fakeBtn.disabled = true;
        trueBtn.disabled = true;
        
        const correct = gameData[currentLevel].isFake === isFake;
        
        if (correct) {
            score++;
            scoreElement.textContent = score;
            showMessage(gameData[currentLevel].explanation, true);
        } else {
            showMessage(
                `<i class='fas fa-exclamation-triangle message-icon'></i>
                <strong>Неверно!</strong><br>
                ${gameData[currentLevel].explanation.split('<br>').slice(1).join('<br>') || 
                'Это был ' + (gameData[currentLevel].isFake ? 'фейк' : 'правдивый материал')}`,
                false
            );
        }
        
        currentLevel++;
        if (currentLevel < gameData.length) {
            setTimeout(() => {
                gameActive = true;
                loadLevel(currentLevel);
            }, 4000);
        } else {
            setTimeout(endGame, 4000);
        }
    }

    function endGame() {
        finalScore.innerHTML = `Вы обнаружили ${score} из ${gameData.length} фейков`;
        
        if (score === gameData.length) {
            finalScore.innerHTML += "<br><span style='color:#00ff88'>ИДЕАЛЬНЫЙ РЕЗУЛЬТАТ!</span>";
        } else if (score >= gameData.length * 0.7) {
            finalScore.innerHTML += "<br><span style='color:#00f2ff'>ОТЛИЧНО!</span>";
        } else if (score >= gameData.length * 0.4) {
            finalScore.innerHTML += "<br><span style='color:#ffcc00'>НЕПЛОХО!</span>";
        } else {
            finalScore.innerHTML += "<br><span style='color:#ff2d55'>ПОПРОБУЙТЕ ЕЩЁ!</span>";
        }
        
        gameEnd.classList.add('show');
    }

    function restartGame() {
        currentLevel = 0;
        score = 0;
        scoreElement.textContent = score;
        gameActive = true;
        gameEnd.classList.remove('show');
        loadLevel(currentLevel);
    }

    // Обработчики событий
    fakeBtn.addEventListener('click', () => checkAnswer(true));
    trueBtn.addEventListener('click', () => checkAnswer(false));
    restartBtn.addEventListener('click', restartGame);

    // Начало игры
    loadLevel(currentLevel);
});