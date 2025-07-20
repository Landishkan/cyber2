document.addEventListener('DOMContentLoaded', function() {
    // Конфигурация игры
    const config = {
        cellSize: 30,
        playerSize: 20,
        virusSize: 15,
        trapSize: 20,
        bitSize: 10,
        playerSpeed: 5,
        trapSpeed: 2,
        virusCount: 10,
        trapCount: 5,
        movingTrapCount: 3,
        bitCount: 5,
        shieldDuration: 10000, // 10 секунд
        speedDuration: 5000,  // 5 секунд
        scannerDuration: 8000  // 8 секунд
    };

    // Элементы DOM
    const canvas = document.getElementById('mazeCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const livesElement = document.getElementById('lives');
    const bitsElement = document.getElementById('bits');
    const questionModal = document.getElementById('questionModal');
    const questionText = document.getElementById('questionText');
    const answerOptions = document.getElementById('answerOptions');
    const questionFeedback = document.getElementById('questionFeedback');
    const factModal = document.getElementById('factModal');
    const factText = document.getElementById('factText');
    const closeFactBtn = document.getElementById('closeFactBtn');
    const gameOverModal = document.getElementById('gameOverModal');
    const gameOverTitle = document.getElementById('gameOverTitle');
    const gameOverText = document.getElementById('gameOverText');
    const restartBtn = document.getElementById('restartBtn');
    const shieldPowerup = document.getElementById('shield-powerup');
    const speedPowerup = document.getElementById('speed-powerup');
    const scannerPowerup = document.getElementById('scanner-powerup');

    // Состояние игры
    let gameState = {
        score: 0,
        lives: 3,
        bits: 0,
        level: 1,
        virusesCollected: 0,
        isShieldActive: false,
        isSpeedActive: false,
        isScannerActive: false,
        shieldCount: 0,
        speedCount: 0,
        scannerCount: 0,
        gameActive: false,
        player: {
            x: 0,
            y: 0,
            dx: 0,
            dy: 0
        },
        viruses: [],
        traps: [],
        movingTraps: [],
        bits: [],
        walls: [],
        keys: {
            up: false,
            down: false,
            left: false,
            right: false
        }
    };

    // Вопросы по кибербезопасности
    const questions = [
        {
            question: "Что из перечисленного является самым надежным паролем?",
            answers: [
                "123456",
                "qwerty",
                "M@sterP@ssw0rd!2023",
                "password"
            ],
            correct: 2,
            fact: "Надежный пароль должен содержать не менее 12 символов, включая заглавные и строчные буквы, цифры и специальные символы."
        },
        {
            question: "Что такое фишинг?",
            answers: [
                "Вид спортивной рыбалки",
                "Метод кражи личных данных через поддельные сайты",
                "Тип компьютерного вируса",
                "Способ шифрования данных"
            ],
            correct: 1,
            fact: "Фишинг - это кибератака, при которой злоумышленник притворяется доверенным лицом, чтобы получить конфиденциальную информацию."
        },
        {
            question: "Как часто рекомендуется обновлять программное обеспечение?",
            answers: [
                "Только когда перестает работать",
                "Раз в год",
                "Как только выходят обновления",
                "Никогда, чтобы не сломать систему"
            ],
            correct: 2,
            fact: "Регулярные обновления ПО закрывают уязвимости безопасности, которые могут использовать хакеры."
        },
        {
            question: "Что такое двухфакторная аутентификация?",
            answers: [
                "Вход по логину и паролю",
                "Использование двух паролей",
                "Метод входа с подтверждением через второй канал (например, SMS)",
                "Система без пароля"
            ],
            correct: 2,
            fact: "2FA добавляет дополнительный уровень безопасности, требуя не только пароль, но и код из SMS или приложения."
        },
        {
            question: "Какой из этих Wi-Fi сетей стоит избегать?",
            answers: [
                "Домашняя сеть с паролем",
                "Открытая сеть 'Free_Airport_WiFi'",
                "Сеть предприятия с защитой WPA2",
                "Личная мобильная точка доступа"
            ],
            correct: 1,
            fact: "Открытые Wi-Fi сети часто используются хакерами для перехвата данных. Используйте VPN в публичных сетях."
        }
    ];

    // Факты о кибербезопасности
    const facts = [
        "Более 80% взломов происходят из-за слабых или украденных паролей.",
        "Регулярное резервное копирование данных может спасти от потери информации при атаке вымогателей.",
        "Даже умные устройства (камеры, холодильники) могут быть взломаны, если не менять пароли по умолчанию.",
        "Социальные сети - главная цель фишинговых атак. Будьте осторожны с неожиданными сообщениями.",
        "Обновление операционной системы закрывает уязвимости, которые используют хакеры.",
        "Публикация слишком личной информации в соцсетях может помочь злоумышленникам ответить на ваши секретные вопросы.",
        "Использование одного пароля для всех аккаунтов - как иметь один ключ от всех дверей в городе.",
        "Даже если удалить файл, его можно восстановить. Для полного удаления используйте специальные программы.",
        "Хакеры могут подделать номер телефона в SMS, чтобы он выглядел как сообщение от банка.",
        "Детские веб-камеры и игрушки с интернетом часто имеют слабую защиту и могут быть взломаны."
    ];

    // Инициализация игры
    function initGame() {
        gameState = {
            score: 0,
            lives: 3,
            bits: 0,
            level: 1,
            virusesCollected: 0,
            isShieldActive: false,
            isSpeedActive: false,
            isScannerActive: false,
            shieldCount: 0,
            speedCount: 0,
            scannerCount: 0,
            gameActive: true,
            player: {
                x: config.cellSize * 1.5,
                y: config.cellSize * 1.5,
                dx: 0,
                dy: 0
            },
            viruses: [],
            traps: [],
            movingTraps: [],
            bits: [],
            walls: []
        };

        // Создаем лабиринт
        generateMaze();
        
        // Создаем вирусы
        for (let i = 0; i < config.virusCount; i++) {
            gameState.viruses.push(createRandomPosition(config.virusSize));
        }
        
        // Создаем статические ловушки
        for (let i = 0; i < config.trapCount; i++) {
            gameState.traps.push(createRandomPosition(config.trapSize));
        }
        
        // Создаем движущиеся ловушки
        for (let i = 0; i < config.movingTrapCount; i++) {
            const trap = createRandomPosition(config.trapSize);
            trap.dx = Math.random() > 0.5 ? config.trapSpeed : -config.trapSpeed;
            trap.dy = Math.random() > 0.5 ? config.trapSpeed : -config.trapSpeed;
            gameState.movingTraps.push(trap);
        }
        
        // Создаем биты знаний
        for (let i = 0; i < config.bitCount; i++) {
            gameState.bits.push(createRandomPosition(config.bitSize));
        }

        updateUI();
        gameLoop();
    }

    // Генерация лабиринта
    function generateMaze() {
        // Очищаем стены
        gameState.walls = [];
        
        // Границы лабиринта
        const rows = Math.floor(canvas.height / config.cellSize);
        const cols = Math.floor(canvas.width / config.cellSize);
        
        // Внешние стены
        for (let i = 0; i < cols; i++) {
            gameState.walls.push({x: i * config.cellSize, y: 0, width: config.cellSize, height: config.cellSize});
            gameState.walls.push({x: i * config.cellSize, y: (rows-1) * config.cellSize, width: config.cellSize, height: config.cellSize});
        }
        
        for (let i = 1; i < rows-1; i++) {
            gameState.walls.push({x: 0, y: i * config.cellSize, width: config.cellSize, height: config.cellSize});
            gameState.walls.push({x: (cols-1) * config.cellSize, y: i * config.cellSize, width: config.cellSize, height: config.cellSize});
        }
        
        // Внутренние стены (случайные)
        for (let i = 2; i < cols-2; i += 2) {
            for (let j = 2; j < rows-2; j += 2) {
                if (Math.random() > 0.3) {
                    gameState.walls.push({x: i * config.cellSize, y: j * config.cellSize, width: config.cellSize, height: config.cellSize});
                    
                    // Добавляем дополнительные стены для сложности
                    if (Math.random() > 0.5) {
                        const dir = Math.floor(Math.random() * 4);
                        switch (dir) {
                            case 0: // вверх
                                gameState.walls.push({x: i * config.cellSize, y: (j-1) * config.cellSize, width: config.cellSize, height: config.cellSize});
                                break;
                            case 1: // вправо
                                gameState.walls.push({x: (i+1) * config.cellSize, y: j * config.cellSize, width: config.cellSize, height: config.cellSize});
                                break;
                            case 2: // вниз
                                gameState.walls.push({x: i * config.cellSize, y: (j+1) * config.cellSize, width: config.cellSize, height: config.cellSize});
                                break;
                            case 3: // влево
                                gameState.walls.push({x: (i-1) * config.cellSize, y: j * config.cellSize, width: config.cellSize, height: config.cellSize});
                                break;
                        }
                    }
                }
            }
        }
    }

    // Создание случайной позиции, не пересекающейся со стенами и игроком
    function createRandomPosition(size) {
        let x, y;
        let validPosition = false;
        
        while (!validPosition) {
            x = Math.floor(Math.random() * (canvas.width - size * 2)) + size;
            y = Math.floor(Math.random() * (canvas.height - size * 2)) + size;
            
            validPosition = true;
            
            // Проверка на пересечение со стенами
            for (const wall of gameState.walls) {
                if (x + size > wall.x && x - size < wall.x + wall.width &&
                    y + size > wall.y && y - size < wall.y + wall.height) {
                    validPosition = false;
                    break;
                }
            }
            
            // Проверка на близость к игроку
            if (Math.abs(x - gameState.player.x) < size * 3 && 
                Math.abs(y - gameState.player.y) < size * 3) {
                validPosition = false;
            }
        }
        
        return {x, y, size};
    }

    // Основной игровой цикл
    function gameLoop() {
        if (!gameState.gameActive) return;
        
        update();
        render();
        
        requestAnimationFrame(gameLoop);
    }

    // Обновление игрового состояния
    function update() {
        // Обновление позиции игрока
        if (gameState.keys.up) gameState.player.dy = -config.playerSpeed;
        else if (gameState.keys.down) gameState.player.dy = config.playerSpeed;
        else gameState.player.dy = 0;
        
        if (gameState.keys.left) gameState.player.dx = -config.playerSpeed;
        else if (gameState.keys.right) gameState.player.dx = config.playerSpeed;
        else gameState.player.dx = 0;
        
        // Ускорение, если активно
        const speedMultiplier = gameState.isSpeedActive ? 1.5 : 1;
        
        // Новая позиция игрока
        let newX = gameState.player.x + gameState.player.dx * speedMultiplier;
        let newY = gameState.player.y + gameState.player.dy * speedMultiplier;
        
        // Проверка столкновений со стенами
        let canMoveX = true;
        let canMoveY = true;
        
        for (const wall of gameState.walls) {
            // Проверка по X
            if (newX + config.playerSize/2 > wall.x && 
                newX - config.playerSize/2 < wall.x + wall.width &&
                gameState.player.y + config.playerSize/2 > wall.y && 
                gameState.player.y - config.playerSize/2 < wall.y + wall.height) {
                canMoveX = false;
            }
            
            // Проверка по Y
            if (gameState.player.x + config.playerSize/2 > wall.x && 
                gameState.player.x - config.playerSize/2 < wall.x + wall.width &&
                newY + config.playerSize/2 > wall.y && 
                newY - config.playerSize/2 < wall.y + wall.height) {
                canMoveY = false;
            }
        }
        
        if (canMoveX) gameState.player.x = newX;
        if (canMoveY) gameState.player.y = newY;
        
        // Ограничение в пределах холста
        gameState.player.x = Math.max(config.playerSize/2, Math.min(canvas.width - config.playerSize/2, gameState.player.x));
        gameState.player.y = Math.max(config.playerSize/2, Math.min(canvas.height - config.playerSize/2, gameState.player.y));
        
        // Обновление движущихся ловушек
        for (const trap of gameState.movingTraps) {
            trap.x += trap.dx;
            trap.y += trap.dy;
            
            // Проверка столкновений со стенами и отскок
            let hitWall = false;
            for (const wall of gameState.walls) {
                if (trap.x + trap.size/2 > wall.x && 
                    trap.x - trap.size/2 < wall.x + wall.width &&
                    trap.y + trap.size/2 > wall.y && 
                    trap.y - trap.size/2 < wall.y + wall.height) {
                    hitWall = true;
                    break;
                }
            }
            
            if (hitWall || trap.x <= trap.size/2 || trap.x >= canvas.width - trap.size/2) {
                trap.dx = -trap.dx;
                trap.x += trap.dx * 2;
            }
            
            if (hitWall || trap.y <= trap.size/2 || trap.y >= canvas.height - trap.size/2) {
                trap.dy = -trap.dy;
                trap.y += trap.dy * 2;
            }
        }
        
        // Проверка сбора вирусов
        for (let i = gameState.viruses.length - 1; i >= 0; i--) {
            const virus = gameState.viruses[i];
            const distance = Math.sqrt(
                Math.pow(gameState.player.x - virus.x, 2) + 
                Math.pow(gameState.player.y - virus.y, 2)
            );
            
            if (distance < (config.playerSize/2 + virus.size/2)) {
                gameState.viruses.splice(i, 1);
                gameState.score += 100;
                gameState.virusesCollected++;
                
                // Показываем случайный факт
                if (Math.random() > 0.7) {
                    showRandomFact();
                }
                
                // Проверка завершения уровня
                if (gameState.viruses.length === 0) {
                    levelComplete();
                }
            }
        }
        
        // Проверка сбора битов знаний
        for (let i = gameState.bits.length - 1; i >= 0; i--) {
            const bit = gameState.bits[i];
            const distance = Math.sqrt(
                Math.pow(gameState.player.x - bit.x, 2) + 
                Math.pow(gameState.player.y - bit.y, 2)
            );
            
            if (distance < (config.playerSize/2 + bit.size/2)) {
                gameState.bits.splice(i, 1);
                gameState.bits++;
                gameState.score += 50;
                
                // Случайный апгрейд
                const upgradeType = Math.floor(Math.random() * 3);
                switch (upgradeType) {
                    case 0:
                        gameState.shieldCount++;
                        break;
                    case 1:
                        gameState.speedCount++;
                        break;
                    case 2:
                        gameState.scannerCount++;
                        break;
                }
                
                updateUI();
            }
        }
        
        // Проверка столкновения с ловушками (если нет щита)
        if (!gameState.isShieldActive) {
            // Статические ловушки
            for (const trap of gameState.traps) {
                const distance = Math.sqrt(
                    Math.pow(gameState.player.x - trap.x, 2) + 
                    Math.pow(gameState.player.y - trap.y, 2)
                );
                
                if (distance < (config.playerSize/2 + trap.size/2)) {
                    hitTrap();
                    break;
                }
            }
            
            // Движущиеся ловушки
            for (const trap of gameState.movingTraps) {
                const distance = Math.sqrt(
                    Math.pow(gameState.player.x - trap.x, 2) + 
                    Math.pow(gameState.player.y - trap.y, 2)
                );
                
                if (distance < (config.playerSize/2 + trap.size/2)) {
                    hitTrap();
                    break;
                }
            }
        }
    }

    // Отрисовка игры
    function render() {
        // Очистка холста
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Рисуем фон
        ctx.fillStyle = '#0a0a20';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Рисуем стены
        ctx.fillStyle = '#121235';
        for (const wall of gameState.walls) {
            ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
            ctx.strokeStyle = '#8FB8ED';
            ctx.strokeRect(wall.x, wall.y, wall.width, wall.height);
        }
        
        // Рисуем биты знаний (если активен сканер или всегда)
        for (const bit of gameState.bits) {
            ctx.beginPath();
            ctx.arc(bit.x, bit.y, bit.size, 0, Math.PI * 2);
            ctx.fillStyle = gameState.isScannerActive ? '#00FF88' : '#FFCC00';
            ctx.fill();
            ctx.strokeStyle = '#FFFFFF';
            ctx.stroke();
            
            // Анимация пульсации
            if (Date.now() % 1000 < 500) {
                ctx.beginPath();
                ctx.arc(bit.x, bit.y, bit.size * 1.5, 0, Math.PI * 2);
                ctx.strokeStyle = gameState.isScannerActive ? '#00FF88' : '#FFCC00';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }
        
        // Рисуем вирусы
        for (const virus of gameState.viruses) {
            // Анимация "дыхания"
            const pulseSize = virus.size * (0.9 + 0.1 * Math.sin(Date.now() / 300));
            
            // Тело вируса
            ctx.beginPath();
            ctx.arc(virus.x, virus.y, pulseSize, 0, Math.PI * 2);
            ctx.fillStyle = '#FF3D3D';
            ctx.fill();
            
            // Шипы
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const spikeLength = pulseSize * 1.5;
                const spikeX = virus.x + Math.cos(angle) * spikeLength;
                const spikeY = virus.y + Math.sin(angle) * spikeLength;
                
                ctx.beginPath();
                ctx.moveTo(virus.x, virus.y);
                ctx.lineTo(spikeX, spikeY);
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#FF3D3D';
                ctx.stroke();
            }
            
            // Глаза
            ctx.beginPath();
            ctx.arc(virus.x - pulseSize/3, virus.y - pulseSize/4, pulseSize/5, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(virus.x + pulseSize/3, virus.y - pulseSize/4, pulseSize/5, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
            
            // Зрачки
            ctx.beginPath();
            ctx.arc(virus.x - pulseSize/3, virus.y - pulseSize/4, pulseSize/10, 0, Math.PI * 2);
            ctx.fillStyle = '#000000';
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(virus.x + pulseSize/3, virus.y - pulseSize/4, pulseSize/10, 0, Math.PI * 2);
            ctx.fillStyle = '#000000';
            ctx.fill();
        }
        
        // Рисуем ловушки
        for (const trap of gameState.traps) {
            drawTrap(trap.x, trap.y, trap.size);
        }
        
        for (const trap of gameState.movingTraps) {
            drawTrap(trap.x, trap.y, trap.size);
        }
        
        // Рисуем игрока с щитом, если активен
        ctx.beginPath();
        ctx.arc(gameState.player.x, gameState.player.y, config.playerSize/2, 0, Math.PI * 2);
        ctx.fillStyle = gameState.isShieldActive ? '#5B9CF0' : '#8FB8ED';
        ctx.fill();
        
        if (gameState.isShieldActive) {
            ctx.beginPath();
            ctx.arc(gameState.player.x, gameState.player.y, config.playerSize/2 + 5, 0, Math.PI * 2);
            ctx.strokeStyle = '#00FFFF';
            ctx.lineWidth = 3;
            ctx.stroke();
        }
        
        // Рисуем эффект ускорения, если активно
        if (gameState.isSpeedActive) {
            ctx.beginPath();
            ctx.moveTo(gameState.player.x, gameState.player.y);
            
            // Эффект "шлейфа" в направлении, противоположном движению
            const tailX = gameState.player.x - gameState.player.dx * 2;
            const tailY = gameState.player.y - gameState.player.dy * 2;
            
            ctx.lineTo(tailX, tailY);
            ctx.strokeStyle = '#FFCC00';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        
        // Отображаем количество оставшихся вирусов
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '16px Orbitron';
        ctx.textAlign = 'right';
        ctx.fillText(`Вирусов: ${gameState.viruses.length}/${config.virusCount}`, canvas.width - 20, 30);
    }

    // Рисуем ловушку
    function drawTrap(x, y, size) {
        ctx.save();
        ctx.translate(x, y);
        
        // Вращение ловушки
        ctx.rotate(Date.now() / 500);
        
        // Центр
        ctx.beginPath();
        ctx.arc(0, 0, size/2, 0, Math.PI * 2);
        ctx.fillStyle = '#16a541';
        ctx.fill();
        
        // Зубцы
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const spikeLength = size;
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(angle) * spikeLength, Math.sin(angle) * spikeLength);
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#FF3D3D';
            ctx.stroke();
        }
        
        ctx.restore();
    }

    // Столкновение с ловушкой
    function hitTrap() {
        gameState.lives--;
        updateUI();
        
        if (gameState.lives <= 0) {
            gameOver(false);
        } else {
            showRandomQuestion();
        }
    }

    // Показ случайного вопроса
    function showRandomQuestion() {
        if (!gameState.gameActive) return;
        
        gameState.gameActive = false;
        const question = questions[Math.floor(Math.random() * questions.length)];
        
        questionText.textContent = question.question;
        answerOptions.innerHTML = '';
        questionFeedback.textContent = '';
        questionFeedback.className = '';
        
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-button cyber-button';
            button.textContent = answer;
            button.onclick = () => checkAnswer(index, question.correct);
            answerOptions.appendChild(button);
        });
        
        questionModal.style.display = 'flex';
    }

    // Проверка ответа на вопрос
    function checkAnswer(selectedIndex, correctIndex) {
        const buttons = answerOptions.querySelectorAll('button');
        
        if (selectedIndex === correctIndex) {
            questionFeedback.textContent = 'Правильно! +50 очков';
            questionFeedback.className = 'correct';
            gameState.score += 50;
            updateUI();
            
            // Подсвечиваем правильный ответ зеленым
            buttons[selectedIndex].classList.add('correct');
        } else {
            questionFeedback.textContent = 'Неправильно! -1 жизнь';
            questionFeedback.className = 'incorrect';
            gameState.lives--;
            updateUI();
            
            // Подсвечиваем неправильный ответ красным, правильный - зеленым
            buttons[selectedIndex].classList.add('incorrect');
            buttons[correctIndex].classList.add('correct');
            
            if (gameState.lives <= 0) {
                setTimeout(() => {
                    questionModal.style.display = 'none';
                    gameOver(false);
                }, 1500);
                return;
            }
        }
        
        // Отключаем кнопки после ответа
        buttons.forEach(button => {
            button.disabled = true;
        });
        
        setTimeout(() => {
            questionModal.style.display = 'none';
            gameState.gameActive = true;
        }, 1500);
    }

    // Показ случайного факта
    function showRandomFact() {
        factText.textContent = facts[Math.floor(Math.random() * facts.length)];
        factModal.style.display = 'flex';
        gameState.gameActive = false;
    }

    // Завершение уровня
    function levelComplete() {
        gameState.score += 500 * gameState.level;
        gameState.level++;
        updateUI();
        
        // Увеличиваем сложность
        config.virusCount += 2;
        config.trapCount += 1;
        config.movingTrapCount += 1;
        
        // Перезапускаем уровень
        setTimeout(() => {
            initGame();
        }, 1000);
    }

    // Конец игры
    function gameOver(success) {
        gameState.gameActive = false;
        
        if (success) {
            gameOverTitle.textContent = 'Победа!';
            gameOverText.textContent = `Вы обезвредили все вирусы! Ваш счет: ${gameState.score}`;
        } else {
            gameOverTitle.textContent = 'Игра окончена!';
            gameOverText.textContent = `Ваш счет: ${gameState.score}`;
        }
        
        gameOverModal.style.display = 'flex';
    }

    // Обновление интерфейса
    function updateUI() {
        scoreElement.textContent = `Очки: ${gameState.score}`;
        livesElement.textContent = `Жизни: ${gameState.lives}`;
        bitsElement.textContent = `Биты: ${gameState.bits}`;
        
        shieldPowerup.querySelector('.count').textContent = gameState.shieldCount;
        speedPowerup.querySelector('.count').textContent = gameState.speedCount;
        scannerPowerup.querySelector('.count').textContent = gameState.scannerCount;
    }

    // Обработчики событий
    function setupEventListeners() {
        // Управление клавиатурой
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    gameState.keys.up = true;
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    gameState.keys.down = true;
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    gameState.keys.left = true;
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    gameState.keys.right = true;
                    break;
                case '1':
                    activateShield();
                    break;
                case '2':
                    activateSpeed();
                    break;
                case '3':
                    activateScanner();
                    break;
            }
        });
        
        document.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    gameState.keys.up = false;
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    gameState.keys.down = false;
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    gameState.keys.left = false;
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    gameState.keys.right = false;
                    break;
            }
        });
        
        // Кнопки апгрейдов
        shieldPowerup.addEventListener('click', activateShield);
        speedPowerup.addEventListener('click', activateSpeed);
        scannerPowerup.addEventListener('click', activateScanner);
        
        // Кнопка закрытия факта
        closeFactBtn.addEventListener('click', () => {
            factModal.style.display = 'none';
            gameState.gameActive = true;
        });
        
        // Кнопка перезапуска
        restartBtn.addEventListener('click', () => {
            gameOverModal.style.display = 'none';
            initGame();
        });
    }

    // Активация щита
    function activateShield() {
        if (gameState.shieldCount > 0 && !gameState.isShieldActive) {
            gameState.shieldCount--;
            gameState.isShieldActive = true;
            updateUI();
            
            shieldPowerup.classList.add('active');
            
            setTimeout(() => {
                gameState.isShieldActive = false;
                shieldPowerup.classList.remove('active');
            }, config.shieldDuration);
        }
    }

    // Активация ускорения
    function activateSpeed() {
        if (gameState.speedCount > 0 && !gameState.isSpeedActive) {
            gameState.speedCount--;
            gameState.isSpeedActive = true;
            updateUI();
            
            speedPowerup.classList.add('active');
            
            setTimeout(() => {
                gameState.isSpeedActive = false;
                speedPowerup.classList.remove('active');
            }, config.speedDuration);
        }
    }

    // Активация сканера
    function activateScanner() {
        if (gameState.scannerCount > 0 && !gameState.isScannerActive) {
            gameState.scannerCount--;
            gameState.isScannerActive = true;
            updateUI();
            
            scannerPowerup.classList.add('active');
            
            setTimeout(() => {
                gameState.isScannerActive = false;
                scannerPowerup.classList.remove('active');
            }, config.scannerDuration);
        }
    }

    // Запуск игры
    setupEventListeners();
    initGame();
});