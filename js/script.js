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

    for (let i = 0; i < 20; i++) {

        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);

    }


    setting.start = true;                    // стартуем игру
    gameArea.appendChild(car);             //рисуем див машинки
    setting.x = car.offsetLeft;              //положение машинки по оси x
    setting.y = car.offsetTop;              //положение машинки по оси y
    requestAnimationFrame(playGame);          //рисуем анимацию
}

function playGame() {
   
     
     
    if (setting.start) {
        moveRoad();
        if (keys.ArrowLeft && setting.x > 0) {               //двигаем машинку и ставим границы
            setting.x -= setting.speed;
        }
        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
        }

        if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {   //двигаем машинку 
            setting.y += setting.speed;
        }
        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }




        car.style.left = setting.x + "px";    //прорисовываем машинку на новых координатах
        car.style.top = setting.y + "px";

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

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function (line) {
       line.y += setting.speed;
       line.style.top = line.y+ 'px';
         
       if(line.y >= document.documentElement.clientHeight){ 
           line.y = 0;
       }

    });

}

