let box = document.querySelector('.box');
let Cscore = document.querySelector(".score");
let Crecord = document.querySelector(".record");

let snakepos = { x: 0, y: 0 };
let valocity = { x: 0, y: 0 };
const foodSound = new Audio("food.mp3");
const gameOver = new Audio("gameover.mp3");
function turnSound() {
    var audio = new Audio('move.mp3');
    audio.play();
};
const backSound = new Audio("backsound.mp3");
let score = 0;
let speed = 8;
let lastTime = 0;
let currentTime = 0;
let SnakeArr = [
    { x: 15, y: 15 }
];
let food = { x: 2, y: 5 };

function main(currentTime) {
    window.requestAnimationFrame(main);
    //console.log(currentTime);
    if ((currentTime - lastTime) / 1000 < 1 / speed) {
        return;
    }
    lastTime = currentTime;
    gameEngine();
}

function iscollide(snake) {
    //if snake hit the wall
    if (snake[0].x >= 18 || snake[0].x < 0 || snake[0].y >= 18 || snake[0].y < 0) {
        return true;
    }
    // if snake bite our
    for (let i = 1; i < SnakeArr.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
}

function gameEngine() {
    if (iscollide(SnakeArr)) {
        valocity = { x: 0, y: 0 };
        backSound.pause();
        gameOver.play();
        alert("Game Over");
        //document.write(" <h1> GAME OVER </h1>");
        SnakeArr = [{ x: 7, y: 1 }];
        score = 0;
    }

    //snake ki position food ke equal ho jaye tho

    if (SnakeArr[0].x === food.x && SnakeArr[0].y === food.y) {
        score += 1;
        foodSound.play();
        if (score > recordValue) {
            let recordValue = score;
            localStorage.setItem('maxRecord', JSON.stringify(recordValue));
            Crecord.innerHTML = "Record : " + recordValue;
        }
        Cscore.innerHTML = "Score : " + score;
        // snake ki tail ko genreate kr rha h, tail me add nhi hora h
        SnakeArr.unshift({ x: SnakeArr[0].x + valocity.x, y: SnakeArr[0].y + valocity.y });
        //Food genreate the random number
        let a = 2;
        let b = 18;
        food = ({ x: Math.floor(a + (b - a) * Math.random()), y: Math.floor(a + (b - a) * Math.random()) });
    }

    // tail ko add kr rha h 
    for (let i = SnakeArr.length - 2; i >= 0; i--) {
        SnakeArr[i + 1] = { ...SnakeArr[i] }; // ... ka matlab ki ek naye object ki equal kr re h taki refrence problem na aaye
    }

    //moving the snake
    SnakeArr[0].x += valocity.x;
    SnakeArr[0].y += valocity.y;

//Snake and Food display

    box.innerHTML = " ";
    SnakeArr.forEach((e, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        box.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    box.appendChild(foodElement);
}

let maxRecord = localStorage.getItem('maxRecord');

if (maxRecord === undefined || maxRecord === null) {
    recordValue = 0;
    localStorage.setItem('maxRecord', JSON.stringify(recordValue));
}
else {
    recordValue = JSON.parse(maxRecord);
    Crecord.innerHTML = "Record : " + maxRecord;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (element) => {
    valocity = { x: 0, y: 0 };

    turnSound();
    switch (element.key) {
        case "ArrowUp":
            valocity = { x: 0, y: -1 };
            backSound.play();
            break;

        case "ArrowRight":
            valocity = { x: 1, y: 0 };
            backSound.play();
            break;

        case "ArrowLeft":
            valocity = { x: -1, y: 0 };
            backSound.play();
            break;

        case "ArrowDown":
            valocity = { x: 0, y: 1 };
            backSound.play();
            break;
    }

});


let darkbtn = document.getElementById('darkbutton');
let darkbody = document.querySelector('body'); // main body le liye, id vali body nhi

darkbtn.addEventListener('click', () => {
    darkbody.classList.toggle('dark-theme');
});

const button = document.querySelector("#Change");
console.log(button);

const changeBackground = ()=>{
    const hexVal = Math.floor(Math.random()*0xffffff).toString(16);
    document.body.style.background = `#${hexVal}`;
}
button.addEventListener("click",changeBackground);