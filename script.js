window.addEventListener('load', function () {
  setInterval(myTimer, 1000);
});

function rand(min=0, max=255) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function randRGB() {
  let r = rand();
  let g = rand();
  let b = rand();  
  return `rgb(${r},${g},${b})`;
}

console.log(`rand() = ${rand()}`);

let logo = document.getElementById('logo');

function make_logo_bg() {
  let cur_col = randRGB();
  cur_col = 'black';
  for (let i = 0; i < 650; i++) {
    let dot = document.createElement('div');
    dot.id = `${i}`;
    logo.appendChild(dot);
    dot.innerText = ` `;
    dot.style.backgroundColor = `${cur_col}`;
  }
}
make_logo_bg();

function reset_logo_bg() {
  cur_col = 'black';
  for (let i = 0; i < 650; i++) {
    let dot = document.getElementById(`${i}`);
    dot.style.backgroundColor = `${cur_col}`;
    if (dot.classList.contains('shadowed')) {
      dot.classList.remove('shadowed');
    }
  }
}

function myTimer() {
  const d = new Date();
  document.getElementById('timer').innerHTML = d.toLocaleTimeString();
  document.getElementById('timer_2').innerHTML = d.toLocaleTimeString();
}
document.getElementById('timer_2').classList.add('mirrored');

document.addEventListener('DOMContentLoaded', () => {
  console.log('Message from Javascript:\nDOMContentLoaded');

  document.body.style.margin = 0;
  document.body.style.padding = 0;

  let min_AIB_id_map = [
    612, 562, 512, 462, 412, 362, 312, 262, 212, 162, 112, 62, 12,
    12, 61, 110, 159, 208, 257, 306, 355, 404, 453, 502, 551, 600,
    552, 504, 456, 408, 360, 312, 264, 216, 168, 120, 72, 24,
    24, 74, 124, 174, 224, 274, 324, 374, 424, 474, 524, 574, 624,
    576, 528, 480, 432, 384, 336, 288, 240, 192, 144, 96,
    48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36,
    86, 136, 186, 236, 286, 336, 386, 436, 486, 536, 586, 636,
    587, 538, 489, 440, 391, 342, 293, 244, 195, 146, 97, 48];

  function paint_j(j, cur_col) {

    let el = document.getElementById(`${min_AIB_id_map[j]}`);
    el.style.backgroundColor = `${cur_col}`;
    el.classList.add('shadowed');
  }

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
  const doSomething = async (cur_col) => {
    for (let j = 0; j < min_AIB_id_map.length; j++) {
      await sleep(100);
      paint_j(j, cur_col);
    }
  }

  let cur_col = randRGB();
  doSomething(cur_col);

  const loop_painting = setTimeout(() => {
    setInterval(function () {
      reset_logo_bg();
      let cur_col = randRGB();
      doSomething(cur_col);
    }, 12000);
  }, 1);

  function click_handler(event) {
    let ET = event.target;
    if (ET.style.backgroundColor === 'white') {
      let myTimeout = setTimeout(() => {
        ET.style.backgroundColor = 'green';
      }, 500);
    }
    else {
      let myTimeout = setTimeout(() => {
        ET.style.backgroundColor = 'white';
      }, 500);
    }
  }
  logo.addEventListener('click', click_handler);
});