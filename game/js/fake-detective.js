// Данные для игры
const gameData = [
    {
        title: "Вакцины Pfizer содержат наночипы для слежения?",
        text: "По данным «анонимных исследователей», вакцины Pfizer содержат графеновые наночипы, позволяющие отслеживать передвижения людей. В статье приводятся «результаты спектрального анализа»",
        isFake: true,
        explanation: "<i class='fas fa-microscope'></i><strong>Научный фейк!</strong><br>• FDA опубликовало полный состав вакцин<br>• Графеновые наночипы не используется в производстве<br>• Это является конспирологической теорией "
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
        explanation: "<i class='fas fa-laptop'></i><strong>Мошенническая схема!</strong><br>• Apple не проводит такие акции<br>• Официальные акции только на apple.com<br>• Нет подтверждения от Тина Кука"
    },
    {
        title: "NASA скрывает артефакты на Луне",
        text: "Бывший сотрудник NASA опубликовал «рассекреченные фото» с аномальными структурами в кратере Тихо. В интервью он утверждает, что агентство 20 лет скрывает доказательства внеземной цивилизации.",
        isFake: true,
        explanation: "<i class='fas fa-moon'></i><strong>Фальшивка!</strong><br>• «Сотрудник» не числится в базе NASA<br>• Кратер Тихо постоянно мониторится"
    },
{
    title: "WhatsApp вводит плату за ЛЮБОЕ сообщение в бизнес-чатах",
    text: "С апреля 2025 года WhatsApp начнёт взимать плату за каждое сообщение в бизнес-переписке — даже ответы клиентов. Тариф: $0.10 за текст, $0.30 за медиафайл. Личные чаты также попадут под платную модель, если в них есть контакт бизнес-аккаунта. Решение уже вызвало бурю негодования у предпринимателей.",
    isFake: true,
    explanation: "<i class='fas fa-comment-dots'></i><strong>Фейк</strong><br>• WhatsApp НЕ будет брать плату с клиентов за их сообщения<br>• Личные чаты остаются бесплатными даже при контакте с бизнесом<br>• Нет подтверждения от Meta или авторитетных СМИ<br>• Реальные изменения касаются только шаблонных рассылок от бизнеса"
},
   {
    title: "5G превращает вакцинированных в разносчиков COVID-19, утверждают «учёные»",
    text: "Анонимный «исследовательский коллектив» опубликовал доклад, в котором заявляет, что излучение 5G «перепрограммирует» вакцины от коронавируса, превращая привитых людей в активных распространителей мутировавшего штамма. В качестве доказательства приводятся «анализы крови» неизвестного происхождения.",
    isFake: true,
    explanation: "<i class='fas fa-virus-slash'></i><strong>Фейк</strong><br>• Нет подтверждённых научных данных о влиянии 5G на вирусы или вакцины<br>• Вакцины не могут «перепрограммироваться» из-за радиоволн<br>• «Исследование» анонимное, без рецензирования и публикации в научных журналах<br>• ВОЗ и CDC неоднократно опровергали подобные мифы"
},
   {
    title: "ЕС вводит обязательную маркировку ИИ-контента",
    text: "С 2023 года согласно новому регламенту ЕС все материалы, созданные искусственным интеллектом, должны маркироваться специальным знаком. Это касается текстов, изображений и видео, сгенерированных такими системами как ChatGPT и Midjourney. Правило уже одобрено Европарламентом.",
    isFake: false,
    explanation: "<i class='fas fa-flag-eu'></i><strong>Подтверждённый факт</strong><br>• Регламент EU AI Act от декабря 2023<br>• Опубликовано в Official Journal EU"
},
    {
        title: "Windows 12 будет подпиской за $7/мес",
        text: "На внутренней встрече Microsoft объявила о переходе на модель подписки. «Windows 12 Subscription» заменит лицензии с ежемесячной платой. В сети появились «скриншоты» панели управления с новой опцией оплаты.",
        isFake: true,
        explanation: "<i class='fas fa-window-restore'></i><strong>Фейковые утечки</strong><br>• Microsoft продолжает разовые продажи<br> Нет упоминания на microsoft.com<br>• Цена не соответствует политике компании"
    },
    {
        title: "Tesla Model π — смартфон с нейроинтерфейсом",
        text: "Илон Маск представил смартфон Tesla Model π с «прямым нейроподключением». Устройство якобы позволяет набирать текст силой мысли. Предзаказ открыт на «особых условиях» с оплатой в криптовалюте.",
        isFake: true,
        explanation: "<i class='fas fa-brain'></i><strong>Глубокий фейк</strong><br>• Tesla не производит смартфоны<br>• Технология не запатентована<br>• Нет презентации на канале Маска<br>• Домен teslamodelpi.com зарегистрирован мошенниками"
    },
{
    title: "С 2025 года вход на «Госуслуги» только по биометрии",
    text: "Минцифры России объявило, что с января 2025 года вход на портал «Госуслуги» будет возможен исключительно через Единую биометрическую систему (ЕБС). Пароли и SMS-подтверждения отключат. Те, кто не сдал биометрию, потеряют доступ к сервису.",
    isFake: true,
    explanation: "<i class='fas fa-fingerprint'></i><strong>Фейк</strong><br>• Нет официального заявления о полном отказе от паролей и SMS<br>• Биометрия — лишь дополнительный, а не обязательный способ входа<br>• Доступ к базовым функциям останется без ЕБС<br>• Ведомство лишь рекомендует биометрию для усиления защиты"
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