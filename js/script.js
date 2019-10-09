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
    speed: 5,
    traffic: 3
};

//audio
const audio = new Audio();           
audio.src = './soundMenu.mp3';
let allow = false;                   
audio.addEventListener('loadeddata', () => {
allow = true;
});
//audio


function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement + 1;
}



function startGame(event) 
{
    start.classList.add('hide');
    gameArea.innerHTML='';                   //обновляем игру! ужаляем все елементы
    score.style.top = 0;
    

    for (let i = 0; i < getQuantityElements(100)+1; i++) {

        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);

    }

    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.top = enemy.y + 'px';
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.background = 'transparent url(./image/enemy2.png) center/cover no-repeat';
        gameArea.appendChild(enemy);
    }

    if(allow){
        audio.play();   //вкл  аудио если загружено
     }    
                    
    
    setting.score = 0;                      //очки 
    setting.start = true;                    // стартуем игру
    gameArea.appendChild(car);             //рисуем див машинки
    car.style.left = gameArea.offsetWidth/2 - car.offsetWidth/2;                   
    car.style.top = 'auto';                  //прорисовываем машинку на старт внизу
    car.style.bottom = '10px';
    setting.x = car.offsetLeft;              //положение машинки по оси x
    setting.y = car.offsetTop;              //положение машинки по оси y
    requestAnimationFrame(playGame);          //рисуем анимацию


}

function playGame() {



    if (setting.start) {
        setting.score += setting.speed;  //очки считаються от сеттинга
        score.innerHTML = 'SCORE<br>' + setting.score;

        moveRoad();
        moveEnemy();
        if (keys.ArrowLeft && setting.x > 0) {               //двигаем машинку и ставим границы
            setting.x -= setting.speed;
            car.classList.remove('scaleDefolt');
            car.classList.remove('scaleRight');
            car.classList.add('scaleLeft');
        }
        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
            car.classList.remove('scaleDefolt');
            car.classList.remove('scaleLeft');
            car.classList.add('scaleRight');
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
    car.classList.add('scaleDefolt');
    
}

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function (line) {
        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if (line.y >= document.documentElement.clientHeight) {
            line.y = -100;
        }

    });

}

function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function (item) {
        let carRect = car.getBoundingClientRect();         // получаем размеры и позицию машинки 
        let enemyRect = item.getBoundingClientRect();      // получаем размеры и позицию енеми


        if (carRect.top <= enemyRect.bottom &&
            carRect.right-6 >= enemyRect.left &&
            carRect.left+6 <= enemyRect.right &&
            carRect.bottom >= enemyRect.top) {                //столкновения машинок
            setting.start = false;
            start.classList.remove('hide');        //удаляем с кнопки старт  класс стайл
            
            score.style.top = start.offsetHeight;  //рисуем очки ниже под стартом
          
        }




        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';

        if (item.y >= document.documentElement.clientHeight) {
            item.y = -100 * setting.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }

    });

}

