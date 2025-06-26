// const petImages = {
//   idle : 'https://cdn-icons-png.flaticon.com/512/5965/5965408.png',
//   feed : 'https://cdn-icons-png.flaticon.com/512/990/990346.png',
//   care : 'https://cdn-icons-png.flaticon.com/512/1998/1998611.png',
//   play : 'https://cdn-icons-png.flaticon.com/512/167/167748.png'
// };

// let feedStat = 50;
// let careStat = 50;
// let playStat = 50;
// let gameLoop;

// const img        = document.getElementById('petImage');
// const feedTxt    = document.getElementById('feedStat');
// const careTxt    = document.getElementById('careStat');
// const playTxt    = document.getElementById('playStat');
// const popup      = document.getElementById('popup');
// const popupMsg   = document.getElementById('popupMessage');
// const restartBtn = document.getElementById('restartBtn');

// const clamp = (val, min=0, max=100) => Math.max(min, Math.min(max, val));

// function updateStats(){
//   feedTxt.textContent = feedStat;
//   careTxt.textContent = careStat;
//   playTxt.textContent = playStat;
// }

// function showState(state){
//   img.src = petImages[state] || petImages.idle;
//   clearTimeout(img._timer);
//   img._timer = setTimeout(()=>img.src = petImages.idle, 2000);
// }

// function gameOver(reason){
//   clearInterval(gameLoop);
//   popupMsg.textContent = reason;
//   popup.classList.add('show');
//   disableButtons(true);
// }

// restartBtn.addEventListener('click',()=>location.reload());

// function disableButtons(disable){
//   document.querySelectorAll('.buttons button').forEach(btn=>{
//     btn.disabled = disable;
//     btn.style.filter = disable ? 'grayscale(1)' : 'none';
//   });
// }

// function feed(){
//   feedStat = clamp(feedStat + 5);
//   showState('feed');
//   updateStats();
// }

// function care(){
//   careStat = clamp(careStat + 5);
//   showState('care');
//   updateStats();
// }

// function play(){
//   playStat = clamp(playStat + 5);
//   showState('play');
//   updateStats();
// }

// gameLoop = setInterval(()=>{
//   feedStat = clamp(feedStat - 5);
//   careStat = clamp(careStat - 5);
//   playStat = clamp(playStat - 5);
//   updateStats();

//   if(feedStat === 0){
//     gameOver('Você perdeu o pet por negligência em fornecer alimentação adequada.');
//   } else if(careStat === 0){
//     gameOver('Se não for para dar amor, é melhor nem ter!');
//   } else if(playStat === 0){
//     gameOver('A falta de interação e brincadeiras pode ser considerada maus-tratos, especialmente se levar a sofrimento físico ou psicológico.');
//   }
// }, 2000); // <—— ALTERADO para 2 segundos

// document.getElementById('submitbutton').addEventListener('click',()=>{
//   const val = document.getElementById('inputforname').value.trim();
//   if(val) document.getElementById('name').textContent = val;
// });

// document.getElementById('feedButton').addEventListener('click',feed);
// document.getElementById('careButton').addEventListener('click',care);
// document.getElementById('playButton').addEventListener('click',play);

// updateStats();

const petImages = {
  idle : './img/cookie.png',
  feed : './img/food.png',
  care : './img/amor.png',
  play : './img/play.png'
};

/* ---------- VARIÁVEIS ---------- */
let feedStat = 50;
let careStat = 50;
let playStat = 50;
let gameLoop;           // ID do setInterval

/* ---------- ELEMENTOS ---------- */
const img        = document.getElementById('petImage');
const feedTxt    = document.getElementById('feedStat');
const careTxt    = document.getElementById('careStat');
const playTxt    = document.getElementById('playStat');
const popup      = document.getElementById('popup');
const popupMsg   = document.getElementById('popupMessage');
const restartBtn = document.getElementById('restartBtn');

/* ---------- FUNÇÕES BÁSICAS ---------- */
const clamp = (val, min = 0, max = 100) => Math.max(min, Math.min(max, val));

function updateStats() {
  feedTxt.textContent = feedStat;
  careTxt.textContent = careStat;
  playTxt.textContent = playStat;
}

function showState(state) {
  img.src = petImages[state] || petImages.idle;
  clearTimeout(img._timer);
  img._timer = setTimeout(() => (img.src = petImages.idle), 2000);
}

function disableButtons(disable) {
  document.querySelectorAll('.buttons button').forEach(btn => {
    btn.disabled = disable;
    btn.style.filter = disable ? 'grayscale(1)' : 'none';
  });
}

/* ---------- GAME OVER ---------- */
function gameOver(reason) {
  clearInterval(gameLoop);
  popupMsg.textContent = reason;
  popup.classList.add('show');
  disableButtons(true);
}

/* ---------- REINICIAR JOGO ---------- */
function resetGame() {
  // restaura valores
  feedStat = careStat = playStat = 50;
  updateStats();
  img.src = petImages.idle;

  // fecha pop-up e reativa botões
  popup.classList.remove('show');
  disableButtons(false);

  // reinicia loop
  clearInterval(gameLoop);
  gameLoop = setInterval(gameTick, 2000);
}

restartBtn.addEventListener('click', resetGame);

/* ---------- AÇÕES DO USUÁRIO ---------- */
function feed()  { feedStat  = clamp(feedStat  + 5); showState('feed');  updateStats(); }
function care()  { careStat  = clamp(careStat  + 5); showState('care');  updateStats(); }
function play()  { playStat  = clamp(playStat  + 5); showState('play');  updateStats(); }

document.getElementById('feedButton').addEventListener('click', feed);
document.getElementById('careButton').addEventListener('click', care);
document.getElementById('playButton').addEventListener('click', play);

/* ---------- LOOP PRINCIPAL ---------- */
function gameTick() {
  feedStat = clamp(feedStat - 5);
  careStat = clamp(careStat - 5);
  playStat = clamp(playStat - 5);
  updateStats();

  if (feedStat === 0) {
    gameOver('Você perdeu o pet por negligência em fornecer alimentação adequada.');
  } else if (careStat === 0) {
    gameOver('Se não for para dar amor, é melhor nem ter!');
  } else if (playStat === 0) {
    gameOver('A falta de interação e brincadeiras pode ser considerada maus-tratos, especialmente se causar sofrimento físico ou psicológico.');
  }
}

gameLoop = setInterval(gameTick, 2000);

/* ---------- NOME DO PET ---------- */
document.getElementById('submitbutton').addEventListener('click', () => {
  const val = document.getElementById('inputforname').value.trim();
  if (val) document.getElementById('name').textContent = val;
});

/* ---------- INICIALIZA ---------- */
updateStats();
