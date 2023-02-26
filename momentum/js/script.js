import playList from './playList.js';

const time = document.querySelector('.time');
const dateShow = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const greetingContainer = document.querySelector('.greeting-container');
const name = document.querySelector('.name');
const body = document.body;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weather = document.querySelector('.weather');
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
const playListContainer = document.querySelector('.play-list');
const playItems = document.querySelectorAll('.play-item');
const language = document.querySelectorAll('.language li');
const imagesCollection = document.querySelectorAll('.images-collection li');
const showSettings = document.querySelectorAll('.show li');
const quoteCommon = document.querySelector('.quote-common');
const player = document.querySelector('.player');
const links = document.querySelector('.links');
const settingsIcon = document.querySelector('.settings-icon');
const settings = document.querySelector('.settings');
const tags = document.querySelector('.tags');

let randomNum;
let randomNumber;
let autoNextSong;
let timeOfDay;
let error404Text;
let error400Text;
let speedWind;
let ms;
let levelHumidity;

const blocks = [time, dateShow, greetingContainer, quoteCommon, weather, player, links];

let lng = 'en';

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate(lng);
    if (lng === 'en') {
        greeting.textContent = `Good ${getTimeOfDay(lng)},`;
    } else {
        greeting.textContent = `${getTimeOfDay(lng)},`;
    }
    setTimeout(showTime, 1000);
}

showTime();

function showDate(lng) {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString(lng, options);
    dateShow.textContent = currentDate;
}

function showGreeting() {
    const date = new Date();
    const hours = date.getHours();
    return hours;
}

function getTimeOfDay(lng) {
    if (lng === 'en') {
        timeOfDay = ['morning', 'afternoon', 'evening', 'night'];
    } else {
        timeOfDay = ['Доброе утро', 'Добрый день', 'Добрый вечер', 'Спокойной ночи'];
    }
    return timeOfDay.at(Math.trunc(showGreeting() / 6) - 1);

}

if (lng === 'en' && localStorage.getItem('language') === 'en') {
    name.placeholder = "[Enter name]";
    city.placeholder = "[Enter city]";
} else {
    name.placeholder = "[Введите имя]";
    city.placeholder = "[Введите город]";
}

function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
    localStorage.setItem('language', lng);
    if (imagesCollection[1].classList.contains('active')) {
        imagesCollection[1].textContent = '';
        localStorage.setItem('images collection', imagesCollection[1].textContent);
    } else if (imagesCollection[2].classList.contains('active')) {
        imagesCollection[1].textContent = '';
        localStorage.setItem('images collection', imagesCollection[2].textContent);
    } else {
        imagesCollection[1].textContent = '';
        localStorage.setItem('images collection', imagesCollection[0].textContent);
    }
    
    localStorage.setItem('tags', tags.value);     
    showSettings.forEach((item, i) => item.classList.contains('selected') ? localStorage.setItem(`isShow${i}`, true) : localStorage.setItem(`isShow${i}`, false));
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
        localStorage.getItem('language') === 'en' ? city.value = 'Minsk' : city.value = 'Минск';
        getWeather();
    }
    if (localStorage.getItem('language')) {
        lng = localStorage.getItem('language');
        getQuotes();
        getWeather();
    }

    if (localStorage.getItem('tags')) {
        tags.value = localStorage.getItem('tags');
    }
    
    if (localStorage.getItem('images collection')) {
        if (localStorage.getItem('images collection') === 'GitHub' || localStorage.getItem('images collection') === '') {
            imagesCollection[0].classList.add('active');
            setBg();
        } else if (localStorage.getItem('images collection') === 'Unsplash API') {
            imagesCollection[1].classList.add('active');
            tags.style.visibility = 'visible';
            getLinkToImageUnsplash();
        } else {
            imagesCollection[2].classList.add('active');
            tags.style.visibility = 'visible';
            
            setTimeout(getLinkToImageFlickr, 1000)
        }
    }

        for (let i = 0; i < Object.keys(localStorage).length; ++i) {
            if (localStorage.getItem(`isShow${i}`) === 'true') {
                showSettings[i].classList.add('selected');
                blocks[i].style.visibility = 'visible';
            } else {
                showSettings[i].classList.remove('selected');
                blocks[i].style.visibility = 'hidden';
            }
        }

        
}

window.addEventListener('load', getLocalStorage);

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

randomNum = getRandomNum(1, 20);

function setBg() {
    const img = new Image();
    const timeOfDay = getTimeOfDay('en');
    let bgNum = randomNum;
    bgNum = String(bgNum).padStart(2, '0');
    if (imagesCollection[0].classList.contains('active')) {
        img.src = `https://raw.githubusercontent.com/zeddlex1/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
        img.onload = () => {
            body.style.backgroundImage = `url('${img.src}')`;
        }
    } else if (imagesCollection[1].classList.contains('active')) {
        getLinkToImageUnsplash();
    } else if (imagesCollection[2].classList.contains('active')) {
        getLinkToImageFlickr();
    }

}

function getSlideNext() {
    if (++randomNum > 20) {
        randomNum = 1;
    }
    setBg();
}

slideNext.addEventListener('click', getSlideNext);

function getSlidePrev() {
    if (--randomNum < 1) {
        randomNum = 20;
    }
    setBg();
}

slidePrev.addEventListener('click', getSlidePrev);

setBg();

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lng}&appid=441a91cfa6142dead65965eed1c0d17e&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (lng === 'en') {
        error404Text = 'Error! city not found for';
        error400Text = 'Error! Nothing to geocode for';
        speedWind = 'Wind speed';
        ms = 'm/s';
        levelHumidity = 'Humidity';
    } else {
        error404Text = 'Ошибка! город не найден для';
        error400Text = 'Ошибка! Невозможно отобразить погоду для';
        speedWind = 'Скорость ветра';
        ms = 'м/с';
        levelHumidity = 'Влажность';
    }

    if (res.status === 404) {
        weatherError.textContent = `${error404Text} '${city.value}'!`;
        weatherIcon.className = '';
        temperature.textContent = ``;
        weatherDescription.textContent = '';
        wind.textContent = ``;
        humidity.textContent = ``;
    } else if (res.status === 400) {
        weatherError.textContent = `${error400Text} \'\'!`;
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
        wind.textContent = `${speedWind}: ${data.wind.speed.toFixed(0)} ${ms}`;
        humidity.textContent = `${levelHumidity}: ${data.main.humidity}%`;
    }
}

city.addEventListener('change', getWeather);

async function getQuotes() {
    const quotes = `js/data_${lng}.json`;
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

const audio = new Audio();

function playAudio() {
    audio.src = playList[playNum].src;
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
play.addEventListener('click', activeSong);



playPrevBtn.addEventListener('click', playPrev);
playPrevBtn.addEventListener('click', toggleBtn);
playPrevBtn.addEventListener('click', activeSong);

playNextBtn.addEventListener('click', playNext);
playNextBtn.addEventListener('click', toggleBtn);
playNextBtn.addEventListener('click', activeSong);


function toggleBtn() {
    if (isPlay) {
        play.classList.add('pause');
    } else {
        play.classList.remove('pause');
    }
}

function playNext() {
  clearTimeout(autoNextSong);
    if (++playNum > playList.length - 1) {
        playNum = 0;
    }
    isPlay = false;
    playAudio();
}

function playPrev() {
    if (--playNum < 0) {
        playNum = playList.length - 1;
    }
    isPlay = false;
    playAudio();
}

playList.forEach((el, i) => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = playList[i++].title;
    playListContainer.append(li);
})

function activeSong() {
    document.querySelectorAll('.play-item').forEach((el, i) => i === playNum ? el.classList.add('item-active') : el.classList.remove('item-active'));

    const currentTime = Date.now();
    let durationTime = playList[playNum].duration

    let countTime = Number(durationTime[0] + durationTime[1]) * 60000 + Number(durationTime[3] + durationTime[4]) * 1000;
  
  if (isPlay) {
        autoNextSong = setTimeout(autoPlaySong, countTime);
    } else {
        clearTimeout(autoNextSong);
    }
}

function autoPlaySong() {
    playNext();
    toggleBtn();
    activeSong();
}

async function getLinkToImageUnsplash() {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tagsChose()}&client_id=wA8Toc25vfpB0tEFnfS_IL1PeqxgL0df2HWn6jkiATw`;
    const res = await fetch(url);
    const data = await res.json();
    body.style.backgroundImage = `url('${data.urls.regular}')`;
     body.style.transition = 'background-image 1s ease-in-out';
    body.style.background = 'background: center/cover, rgba(0, 0, 0, 0.5)';
    body.style.backgroundBlendMode = 'background-blend-mode: multiply';    
}

async function getLinkToImageFlickr() {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=cb6e7435db5f98f67d905b588dc2b8af&tags=${tagsChose()}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    body.style.backgroundImage = `url('${data.photos.photo[getRandomNum(0, data.photos.photo.length - 1)].url_l}')`;
     body.style.transition = 'background-image 1s ease-in-out';
    body.style.background = 'background: center/cover, rgba(0, 0, 0, 0.5)';
    body.style.backgroundBlendMode = 'background-blend-mode: multiply';
}

tags.addEventListener('change', tagsInput);

function tagsInput() {
    tags.value;
    if (imagesCollection[1].classList.contains('active')) {
        getLinkToImageUnsplash();
    } else if (imagesCollection[2].classList.contains('active')) {
        getLinkToImageFlickr();
    }
}

function tagsChose() {
    if (tags.value != '') {
        return tags.value
    } else {
        return getTimeOfDay('en');
    }
}

tags.style.visibility = 'hidden';
showSettings[7].style.cursor = 'auto';

document.addEventListener('click', function (e) {
    if (Array.from(language).some(i => i.contains(e.target))) {
        lng = e.target.textContent.toLowerCase();
        getWeather();
        getQuotes();
        
        language.forEach((el, i) => language[i].contains(e.target) ? el.classList.add('active') : el.classList.remove('active'));
        city.value === 'Minsk' && lng === 'ru' ? city.value = 'Минск' : city.value === 'Минск' && lng === 'en' ? city.value = 'Minsk' : null;
        if (lng === 'ru') {
            ruSettings();
        } else {
            enSettings();
        }
    }

    if (Array.from(imagesCollection).some(i => i.contains(e.target))) {
        imagesCollection.forEach((item, i) => imagesCollection[i].contains(e.target) ? item.classList.add('active') : item.classList.remove('active'));
        imagesCollection[0].classList.contains('active') ? tags.style.visibility = 'hidden' : tags.style.visibility = '';
        setBg();
    }

    if (Array.from(showSettings).some(i => i.contains(e.target))) {
        e.target.classList.toggle('selected');

        for (let i = 0; i < showSettings.length - 1; i++) {
          if (i === showSettings.length - 1) { 
            showSettings[i].classList.remove('selected');            
          }
            if (showSettings[i].classList.contains('selected')) {
                blocks[i].style.opacity = '1';
                blocks[i].style.transition = '.6s';
            } else {
                 blocks[i].style.opacity = '0';
                blocks[i].style.transition = '.6s';
            }
        }
    }

    if (!(settingsIcon.contains(e.target)) && !(settings.contains(e.target))) {
      settings.classList.remove('opened');
    }
});

settingsIcon.addEventListener('click', settingsOpen);

function settingsOpen() {
    if (lng === 'en') {
        enSettings();
        language[0].classList.add('active');
    } else {
        ruSettings();
        language[1].classList.add('active');
    }
    settings.classList.toggle('opened');
    
}

function enSettings() {
    document.querySelector('.settings h2').textContent = 'Settings';
    document.querySelector('.language p').textContent = 'Language';
    document.querySelector('.images-collection p').textContent = 'Images collection';
    document.querySelector('.images-collection input').placeholder = 'Tags';
    document.querySelector('.show p').textContent = 'Show';
    document.querySelector('.show li:nth-child(1)').textContent = 'Time';
    document.querySelector('.show li:nth-child(2)').textContent = 'Date';
    document.querySelector('.show li:nth-child(3)').textContent = 'Greeting';
    document.querySelector('.show li:nth-child(4)').textContent = 'Quote';
    document.querySelector('.show li:nth-child(5)').textContent = 'Weather';
    document.querySelector('.show li:nth-child(6)').textContent = 'Player';
    document.querySelector('.show li:nth-child(7)').textContent = 'Links';
    name.placeholder = "[Enter name]";
    city.placeholder = "[Enter city]";
}

function ruSettings() {
    document.querySelector('.settings h2').textContent = 'Настройки';
    document.querySelector('.language p').textContent = 'Язык';
    document.querySelector('.images-collection p').textContent = 'Коллекция картинок';
    document.querySelector('.images-collection input').placeholder = 'Теги';
    document.querySelector('.show p').textContent = 'Видимость';
    document.querySelector('.show li:nth-child(1)').textContent = 'Время';
    document.querySelector('.show li:nth-child(2)').textContent = 'Дата';
    document.querySelector('.show li:nth-child(3)').textContent = 'Приветствие';
    document.querySelector('.show li:nth-child(4)').textContent = 'Цитата';
    document.querySelector('.show li:nth-child(5)').textContent = 'Погода';
    document.querySelector('.show li:nth-child(6)').textContent = 'Плеер';
    document.querySelector('.show li:nth-child(7)').textContent = 'Ссылки';
    name.placeholder = "[Введите имя]";
    city.placeholder = "[Введите город]";
}


    