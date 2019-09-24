const score = document.querySelector(".score"),   //вытягиваем html елементы
    start = document.querySelector(".start"),
    gameArea = document.querySelector(".gameArea"),
    car = document.createElement('div');    //создаем див машинки

car.classList.add('car');

start.addEventListener('click', startGame);  //кликаем на старт
document.addEventListener('keydown', startRun);   //нажимаем на кнопку
document.addEventListener('keyup', stopRun);      // отпускаем кнопку

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const setting = {               // настройки !
    start: false,
    score: 0,
    speed: 3
};





function startGame(event) {
    start.classList.add('hide');
    setting.start = true;                    // стартуем игру
    gameArea.appendChild(car);             //рисуем див машинки
    requestAnimationFrame(playGame);          //рисуем анимацию
}

function playGame() {
    console.log('playGame!');
    if (setting.start) {
        requestAnimationFrame(playGame);      //зацикливаем анимацию! функция вызывает себя же
    }
}


function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;
}

function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
}



