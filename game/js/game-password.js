document.addEventListener('DOMContentLoaded', function() {
    // DOM элементы
    const difficultySelector = document.getElementById('difficulty-selector');
    const gameContent = document.getElementById('game-content');
    const passwordDisplay = document.getElementById('password-display');
    const guessInput = document.getElementById('guess-input');
    const guessButton = document.getElementById('guess-button');
    const attemptsContainer = document.getElementById('attempts');
    const hintElement = document.getElementById('hint');
    const difficultyElement = document.getElementById('difficulty');
    const levelElement = document.getElementById('level');
    const scoreElement = document.getElementById('score');
    const changeDifficultyBtn = document.getElementById('change-difficulty-button');
    const newGameButton = document.getElementById('new-game-button');
    const hintButton = document.getElementById('hint-button');
    const winModal = document.getElementById('win-modal');
    const attemptsCountElement = document.getElementById('attempts-count');
    const pointsEarnedElement = document.getElementById('points-earned');
    const nextLevelButton = document.getElementById('next-level-button');
    const winMessage = document.getElementById('win-message');

    // Наборы символов для разных уровней сложности
    const charSets = {
        1: '0123456789', // Только цифры
        2: '0123456789abcdefghijklmnopqrstuvwxyz', // Цифры + строчные буквы
        3: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=?' // Все символы
    };
// []{}|;:,.<>
    // Конфигурация игры
  const config = {
    passwordLength: 8,
    maxAttempts: 12,
    basePoints: 50,
    hintCost: 10 // Стоимость одной подсказки
};

// В состоянии игры убираем hintsAvailable и hintsUsed
const state = {
    password: '',
    attempts: 0,
    score: 30, // Начальные очки (можно изменить)
    currentDifficulty: 1,
    gameActive: false,
    revealedPositions: [] // Позиции, открытые подсказками
};

    // Инициализация игры
    function init() {
        setupEventListeners();
        showDifficultySelector();
        updateUI();
    }

    // Настройка обработчиков событий
    function setupEventListeners() {
        // Выбор сложности
        document.querySelectorAll('.difficulty-option').forEach(option => {
            option.addEventListener('click', () => selectDifficulty(parseInt(option.dataset.level)));
        });

        // Игровые кнопки
        guessButton.addEventListener('click', checkGuess);
        guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkGuess();
        });
        newGameButton.addEventListener('click', startNewGame);
        changeDifficultyBtn.addEventListener('click', showDifficultySelector);
        nextLevelButton.addEventListener('click', startNextLevel);
        hintButton.addEventListener('click', giveHint);
    }

    // Дать подсказку (открыть случайный символ)
   function giveHint() {
   
    
    if (state.score < config.hintCost) {
        showHint(`Недостаточно очков! Нужно ${config.hintCost}`, 'error');
        return;
    }

    // Находим все еще скрытые позиции
    const hiddenPositions = [];
    for (let i = 0; i < config.passwordLength; i++) {
        if (!state.revealedPositions.includes(i)) {
            hiddenPositions.push(i);
        }
    }

    if (hiddenPositions.length === 0) {
        showHint('Все символы уже открыты!', 'info');
        return;
    }

    // Выбираем случайную скрытую позицию
    const positionToReveal = hiddenPositions[Math.floor(Math.random() * hiddenPositions.length)];
    
    // Открываем символ
    const digitElement = passwordDisplay.querySelectorAll('.digit')[positionToReveal];
    digitElement.textContent = state.password[positionToReveal];
    digitElement.style.backgroundColor = 'rgba(0, 242, 255, 0.3)';
    digitElement.style.borderColor = 'var(--accent-color)'; //
    
    // Обновляем состояние
    state.revealedPositions.push(positionToReveal);
    state.score -= config.hintCost;
    updateUI();
    
    showHint(`Открыт символ на позиции ${positionToReveal + 1}! -${config.hintCost} очков`, 'info');
}

    // Показать экран выбора сложности
    function showDifficultySelector() {
        difficultySelector.style.display = 'block';
        gameContent.style.display = 'none';
        state.gameActive = false;
         
        hintButton.disabled = false;
        //  hintButton.disabled = false;
    }

    // Выбор сложности
    function selectDifficulty(level) {
        state.currentDifficulty = level;
        difficultySelector.style.display = 'none';
        gameContent.style.display = 'block';
        startNewGame();
    }

    // Начать новую игру
    function startNewGame() {
        generatePassword();
        resetGameState();
        updateUI();
        focusInput();
        state.gameActive = true;
        hintButton.disabled = false;
    }

    // Следующий уровень
    function startNextLevel() {
        closeModal();
        if (state.currentDifficulty < 3) {
            state.currentDifficulty++;
            startNewGame();
        } else {
            showDifficultySelector();
        }
    }

    // Генерация пароля
    function generatePassword() {
        let password = '';
        const chars = charSets[state.currentDifficulty];
        
        for (let i = 0; i < config.passwordLength; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        state.password = password;
        console.log('Cгенерирован пароль:', password); // Для тестирования
    }

    // Сброс состояния игры
  function resetGameState() {
    state.attempts = 0;
    state.revealedPositions = [];
    attemptsContainer.innerHTML = '';
    hintElement.textContent = '';
    guessInput.value = '';
    enableInput();
    
    // Сброс отображения пароля
    const digits = passwordDisplay.querySelectorAll('.digit');
    digits.forEach(digit => {
        digit.textContent = '?';
        digit.style.backgroundColor = 'transparent';
        digit.style.borderColor = 'var(--secondary-color)';

    });
     hintButton.disabled = false;
}


    // Проверка ввода пользователя
    function checkGuess() {
      
        const guess = guessInput.value.trim();
        
        if (!validateGuess(guess)) return;
        
        state.attempts++;
        const result = analyzeGuess(guess);
        
        displayAttempt(guess, result);
        
        if (guess === state.password) {
            handleWin();
        } else if (state.attempts >= config.maxAttempts) {
            handleLoss();
        } else {
            provideHint(result);
        }
        
        updateUI();
    }

    // Валидация ввода
    function validateGuess(guess) {
        if (guess.length !== config.passwordLength) {
            showHint(`Введите ровно ${config.passwordLength} символов!`, 'error');
            return false;
        }
        
        const allowedChars = charSets[state.currentDifficulty];
        const invalidChars = [...guess].filter(c => !allowedChars.includes(c));
        
        if (invalidChars.length > 0) {
            showHint(`Недопустимые символы: ${invalidChars.join(', ')}`, 'error');
            return false;
        }
        
        return true;
    }

    // Анализ попытки
    function analyzeGuess(guess) {
        const result = Array(config.passwordLength).fill(null);
        const passwordChars = [...state.password];
        const guessChars = [...guess];
        
        // Проверка точных совпадений
        for (let i = 0; i < config.passwordLength; i++) {
            if (guessChars[i] === passwordChars[i]) {
                result[i] = 'correct';
                passwordChars[i] = '_';
                guessChars[i] = '_';
            }
        }
        
        // Проверка наличия символов
        for (let i = 0; i < config.passwordLength; i++) {
            if (guessChars[i] !== '_') {
                const index = passwordChars.indexOf(guessChars[i]);
                if (index !== -1) {
                    result[i] = 'present';
                    passwordChars[index] = '_';
                } else {
                    result[i] = 'absent';
                }
            }
        }
        
        return result;
    }

    // Отображение попытки
    function displayAttempt(guess, result) {
        const attemptElement = document.createElement('div');
        attemptElement.className = 'attempt';
        
        for (let i = 0; i < config.passwordLength; i++) {
            const charElement = document.createElement('div');
            charElement.className = `attempt-digit ${result[i]}`;
            charElement.textContent = guess[i];
            attemptElement.appendChild(charElement);
        }
        
        attemptsContainer.appendChild(attemptElement);
        guessInput.value = '';
    }

    // Показать подсказку
    function showHint(message, type) {
        hintElement.textContent = message;
        hintElement.className = 'hint';
        
        switch (type) {
            case 'error':
                hintElement.classList.add('error-hint');
                break;
            case 'success':
                hintElement.classList.add('success-hint');
                break;
            default:
                hintElement.classList.add('info-hint');
        }
    }

    // Дать подсказку на основе результата
    function provideHint(result) {
        const correct = result.filter(r => r === 'correct').length;
        const present = result.filter(r => r === 'present').length;
        
        showHint(
            `Угадано: ${correct} на месте, ${present} не на месте`,
            'info'
        );
    }

    // Обработка победы
    function handleWin() {
    const points = calculatePoints();
    
    // Проверяем, что points - валидное число
    if (isNaN(points)) {
        console.error("Invalid points calculated:", points);
        state.score += 50; // Значение по умолчанию при ошибке
    } else {
        state.score += points;
    }
    
    showHint(`Успех! Пароль взломан за ${state.attempts} попыток. +${points} очков`, 'success');
    disableInput();
    
    showWinModal(points);
    updateUI();
}

    // Показать модальное окно победы
  function showWinModal(points) {
    // Проверяем, что points - число
    const earnedPoints = isNaN(points) ? 50 : points;
    
    attemptsCountElement.textContent = state.attempts;
    pointsEarnedElement.textContent = earnedPoints;
    
    if (state.currentDifficulty < 3) {
        winMessage.innerHTML = `Вы угадали пароль за <span class="highlight">${state.attempts}</span> попыток!`;
        nextLevelButton.style.display = 'block';
        nextLevelButton.textContent = `Уровень ${state.currentDifficulty + 1} →`;
    } else {
        winMessage.innerHTML = `Поздравляем! Вы прошли <span class="highlight">все уровни</span>!`;
        nextLevelButton.style.display = 'none';
    }
    
    winModal.style.display = 'flex';
}

    // Закрыть модальное окно
    function closeModal() {
        winModal.style.display = 'none';
    }

    // Обработка проигрыша
    function handleLoss() {
        showHint(`Пароль не взломан! Правильный пароль: ${state.password}`, 'error');
        disableInput();
        
        // Показываем правильный пароль
        const digits = passwordDisplay.querySelectorAll('.digit');
        for (let i = 0; i < digits.length; i++) {
            digits[i].textContent = state.password[i];
            digits[i].style.backgroundColor = 'rgba(255, 45, 117, 0.3)';
        }
    }

    // Расчет очков
  function calculatePoints() {
    const difficultyMultiplier = state.currentDifficulty * 0.5 + 0.5; // 1, 1.5, 2
    const attemptsPenalty = state.attempts * 1;
    
    // Убедимся, что все значения - числа
    const base = Number(config.basePoints) || 50;
    const multiplier = Number(difficultyMultiplier) || 1;
    const penalty = Number(attemptsPenalty) || 0;
    
    const points = Math.max(
        10,
        Math.floor(base * multiplier - penalty)
    );
    
    // Дебаг информация
    console.log(`Calculating points: 
        Base: ${base}, 
        Multiplier: ${multiplier}, 
        Penalty: ${penalty},
        Result: ${points}`);
    
    return points;
}

    // Обновление интерфейса
   function updateUI() {
    difficultyElement.textContent = getDifficultyName();
    levelElement.textContent = state.currentDifficulty;
    scoreElement.textContent = state.score;
    
    // Количество доступных подсказок = Math.floor(очки / стоимость подсказки)
    const availableHints = Math.floor(state.score / config.hintCost);
    hintButton.innerHTML = `<i class="fas fa-lightbulb"></i> Подсказка (${availableHints})`;
 hintButton.disabled = availableHints <= 0;
    
    // Обновление статуса игры
    document.getElementById('game-status').textContent = state.gameActive ? 
        `Идет игра (Уровень ${state.currentDifficulty})` : 'Выберите сложность';

        
}

    // Получение названия сложности
    function getDifficultyName() {
        const names = {
            1: 'только цифры',
            2: 'цифры и буквы',
            3: 'все символы'
        };
        return names[state.currentDifficulty] || '';
    }

    // Включить поле ввода
    function enableInput() {
        guessInput.disabled = false;
        guessButton.disabled = false;
        guessInput.focus();
    }

    // Отключить поле ввода
    function disableInput() {
        guessInput.disabled = true;
        guessButton.disabled = true;
    }

    // Фокус на поле ввода
    function focusInput() {
        guessInput.focus();
    }

    // Запуск игры
    init();
});