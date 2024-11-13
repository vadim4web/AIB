const SDC_run = function () {
    let userName = prompt("\nHello!\nMy name is SolarDaysCalculator 2021.\nAnd what is your name?");
    let userYear = parseInt(prompt(userName + ", do You want to know how many days are You live on the Earth?!\nIf your answer \'yes\' - then type your birth year, like YYYY, and press ENTER, please."), 10);
    let userMonth = parseInt(prompt("Good. Now, please type your birth month, like MM, and press ENTER."), 10);
    let userDay = parseInt(prompt("Ok. The last You need to type is your birth date . So, please do it, like DD, and press ENTER."), 10);
    alert("Congratulations, " + userName + ", today is your " + Math.ceil((new Date() - new Date(userYear, userMonth - 1, userDay)) / 1000 / 60 / 60 / 24) + "-th sunny day !!!\n\n2021 Alex Briz (c) SolarDaysCalculator");
};

const SDC_wraper = document.createElement('div');
SDC_wraper.classList.add('block');
// SDC_wraper.classList.add('last');
document.body.appendChild(SDC_wraper);

const SDC_text = document.createElement('h2');
SDC_text.innerText = 'Solar Days Calculator \(.java\)\n.java vs. .js\n\(java in left corner and javascript on the right\)';
SDC_text.style.fontSize = '1.5rem';
SDC_text.style.maxWidth = '60vw';

SDC_wraper.appendChild(SDC_text);

const SDC_run_btn = document.createElement('button');
SDC_run_btn.value = `Run -> SunnyDayzCalculator`;
SDC_run_btn.innerText = `Run -> SunnyDayzCalculator`;
SDC_run_btn.style.width = '50vw';
SDC_run_btn.style.height = '10vw';
SDC_run_btn.style.fontSize = '1rem';
SDC_run_btn.style.fontWeight = '900';


SDC_wraper.appendChild(SDC_run_btn);

SDC_run_btn.addEventListener('click', SDC_run);

const img1 = document.createElement('img');
img1.style.width = '50%';
img1.style.height = '50%';
img1.src = './portfolio/z_java_vs_js.png'
img1.alt = 'alt_txt';

SDC_wraper.appendChild(img1);