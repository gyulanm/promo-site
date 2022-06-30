const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const board = document.querySelector('#board');

let timeEl;
let scoreEl;

let time = 0;
let score = 0;
let timer;

startBtn.addEventListener('click', e => {
    e.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', e => {
    if (e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        timeEl = document.querySelector('#time');
        scoreEl = document.querySelector('#score');
        startGame();
    }
})

board.addEventListener('click', e => {
    if (e.target.classList.contains('box')) {
        score++;
        setScore(score);
        e.target.remove();
        createRandomBox();
    }
})


function startGame() {
    timer = setInterval(decreaseTime, 1000);
    createRandomBox();
    setTime(time);
    setScore(score);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current<10) current=`0${time}`
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `${value} SEC`;
}
function setScore (value) {
    scoreEl.innerHTML = `SCORE: ${value}`;
}


function finishGame() {
    clearInterval(timer);

    timeEl.classList.add('hide');
    scoreEl.classList.add('hide');

    const button = document.createElement('button');

    button.classList.add('btn__start');

    button.innerText = 'Начать заново';

    button.addEventListener('click', () => {
        console.log('click');
        time = 0;
        score = 0;
        screens[1].classList.remove('up');
        board.innerHTML = `<div class="time" id="time"></div>
        <div class="score" id="score"></div>`
    });

    
    board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`;

    board.appendChild(button);


}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max-min) + min)
}

function createRandomBox() {
    const box = document.createElement('img');

    const size = getRandomNumber(100, 200);
    const boxNumber= getRandomNumber(1,11);

    const {width, height} = board.getBoundingClientRect();

    const x=getRandomNumber(0, width-size);
    const y=getRandomNumber(0, height-size);

    box.classList.add('box');
    box.style.width = `${size}px`;
    box.style.height = `${size}px`;
    box.style.top = `${y}px`;
    box.style.left = `${x}px`;
    box.src= `./img/box${boxNumber}.svg`;
    
    board.append(box);
}
