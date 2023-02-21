const time = document.querySelector('.time');
const dateShow = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const body = document.body;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const play = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');

let randomNum;

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    greeting.textContent = `Good ${getTimeOfDay()},`;
    setTimeout(showTime, 1000);
}
showTime();

function showDate() {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString('en-Us', options);
    dateShow.textContent = currentDate;
}

function showGreeting() {
    const date = new Date();
    const hours = date.getHours();
    return hours;
}

function getTimeOfDay() {
    let timeOfDay = ['morning', 'afternoon', 'evening', 'night'];
    return timeOfDay.at(Math.trunc(showGreeting() / 6) - 1);
}

function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
        getWeather();
    } else {
        city.value = 'Minsk';
        getWeather();
    }
}
window.addEventListener('load', getLocalStorage)

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

randomNum = getRandomNum(1, 20);

function setBg() {
    const img = new Image();
    const timeOfDay = getTimeOfDay();
    let bgNum = randomNum;
    bgNum = String(bgNum).padStart(2, '0');
    img.src = `https://raw.githubusercontent.com/zeddlex1/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
        body.style.backgroundImage = `url('${img.src}')`;
  };
}


function getSlideNext() {
    if (++randomNum > 20) { randomNum = 1};
    setBg();
}
slideNext.addEventListener('click', getSlideNext);

function getSlidePrev() {
    if (--randomNum < 1) { randomNum = 20};
    setBg();
}
slidePrev.addEventListener('click', getSlidePrev);

setBg();

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=441a91cfa6142dead65965eed1c0d17e&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (res.status === 404) {
      weatherError.textContent = `Error! city not found for '${city.value}'!`;
      weatherIcon.className = '';
      temperature.textContent = ``;
      weatherDescription.textContent = '';
      wind.textContent = ``;
      humidity.textContent = ``;
  } else if (res.status === 400) {
      weatherError.textContent = 'Error! Nothing to geocode for \'\'!';
      weatherIcon.className = '';
      temperature.textContent = ``;
      weatherDescription.textContent = '';
      wind.textContent = ``;
      humidity.textContent = ``;
  } else {
      weatherError.textContent = ``;
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
  }
}
city.addEventListener('change', getWeather);

async function getQuotes() {
  const quotes = 'https://raw.githubusercontent.com/zeddlex1/Quotes/main/data.json';
  const res = await fetch(quotes);
  const data = await res.json();
  randomNumber = getRandomNum(0, 101);
  quote.textContent = `"${data[randomNumber].quote}"`;
  author.textContent = data[randomNumber].author;
}
getQuotes();

changeQuote.addEventListener('click', getQuotes);

let isPlay = false;
let playNum = 0;
pl = ['Aqua Caelestis.mp3', 'Ennio Morricone.mp3', 'River Flows In You.mp3', 'Summer Wind.mp3']

import playList from './playList.js';
console.log(playList);

const audio = new Audio();

function playAudio() {
  audio.src = `assets/sounds/${pl[playNum]}`;
  audio.currentTime = 0;
    if (!isPlay) {
      audio.play();
      isPlay = true;
  } else {
        audio.pause();
        isPlay = false;
    }
}

play.addEventListener('click', playAudio);
play.addEventListener('click', toggleBtn);

playPrevBtn.addEventListener('click', playPrev);
playPrevBtn.addEventListener('click', toggleBtn);

playNextBtn.addEventListener('click', playNext);
playNextBtn.addEventListener('click', toggleBtn);

function toggleBtn() {
    if (isPlay) {
        play.classList.add('pause');
    } else {
        play.classList.remove('pause');
    }
}

function playNext() {
    if (++playNum > 3) { playNum = 0};
    isPlay = false;
    playAudio();
}

function playPrev() {
    if (--playNum < 0) { playNum = 3};
    isPlay = false;
    playAudio();
}









