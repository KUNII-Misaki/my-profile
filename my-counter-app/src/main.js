import './style.css';

document.querySelector('#app').innerHTML = `
  <h1>カウンター</h1>
  <p id="count">0</p>
  <div class="flex flex-row">
  <button id="upbtn" class="counter upbtn">＋</button>
  <button id="downbtn" class="counter downbtn">－</button>
  <button id="reset" class="counter resetbtn">リセット</button>
  </div>
`;

const countEl = document.querySelector('#count');
const upbtn = document.querySelector('#upbtn');
const  downbtn = document.querySelector('#downbtn');
const reset = document.querySelector('#reset');
let count = 0;

function updateCount(){
  countEl.textContent = count;
  countEl.classList.remove('positive','negative','zero');
}

upbtn.addEventListener('click', () => {
  count += 1;
  countEl.textContent = count;
});



downbtn.addEventListener('click', () =>{
  count -= 1;
  countEl.textContent = count;
});

reset.addEventListener('click', () => {
  count = 0;
  countEl.textContent = count;
});
