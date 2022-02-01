let timer = null;
let isCounting = false;

// const $minutes = select(".minutes");
const $seconds = select(".seconds");
const $centi = select(".centi");
const $start = select(".start-btn")
const $reset = select(".reset-btn")
const $flag = select(".flag-btn")
const $ul = select(".record-row")

// let minutes = 0;
let seconds = 0;
let centi = 0;

function appendZero(number) {
  if (number < 10) {
    return "0" + String(number);
  }
  return String(number);
}

function calcMinuts(seconds) {
  let minutes = seconds / 60;
  return Math.floor(minutes);
}

function calcSeconds(centi) {
  let _seconds = centi / 100;
  return Math.floor(_seconds);
}

function startCountingUp() {
  let _timePassed = 0;
  timer = setInterval(() => {
    if (_timePassed > 99) {
      _timePassed = 0;
      centi = 0;
    }

    _timePassed = _timePassed + 1;
    centi = _timePassed;
    seconds = calcSeconds(seconds * 100 + centi);
    minutes = calcMinuts(seconds);
    isCounting = true

  }, 10);
}

function renderTime() {
  setInterval(() => {
    $seconds.innerHTML = appendZero(seconds);
    $centi.innerHTML = appendZero(centi);
    // $minutes.innerHTML = appendZero(minutes);
  }, 10);
}

let toggle = () => {
  if (!isCounting) {
    startCountingUp();
    renderTime();
    $start.innerText = 'stop'
    isCounting = true;

  } else {
    stopCountingUp();
    isCounting = false;
    $start.innerText = 'start';
  }
}

function Timer() {
  $start.addEventListener("click", toggle)
  $reset.addEventListener('click', reset)
  $flag.addEventListener('click', showFlag)
}

function stopCountingUp() {
  clearInterval(timer)
}

let reset = () => {
  console.log('first');
   seconds = 0;
   centi = 0;
}

let showFlag = () => {
  let now = createElement('span',timeNow(),'now')
  let dispute = createElement('span', timeDispute(),'')
  let li = createElement('li','')

  li.appendChild(now)
  li.appendChild(dispute)

  $ul.appendChild(li)
}

function createElement(elem,text,className){
  let tag = document.createElement(elem)
  tag.innerText = text

  if(className){
  tag.classList.add(className)

  }

  return tag
}

function timeNow(){
  let _seconds 
  let _centi
  
  if(seconds < 10){
    _seconds = "0" + seconds
  }

  _centi = centi

  if(centi < 10){
    _centi = "0" + centi
  }

  let time = _seconds  + ':' + _centi
  return time
}

function timeDispute(){
  let times = document.querySelectorAll('.now')
  let time;
  let sec
  if(times.length > 0){
    let tDis = (times[times.length - 1].innerText).split(':')
    let tDisS = Number(tDis[0])
    let tDisC = Number(tDis[1])
    let _centi = centi - tDisC;

    if (_centi < 0){
      sec = (seconds - tDisS) - 1;
    }else{
      sec = seconds - tDisS
    }

    if(sec < 10){
      sec = '0' + sec
    }

  time = sec + ':' + _centi
  }else{
    time = '00:00'
  }
  return time
}