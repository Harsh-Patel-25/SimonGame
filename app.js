let gameSeq = [];
let userSeq = [];
let btns = ["box1", "box2", "box3", "box4"];

let started = false;
let level = 0;

let highscore = 0;

let h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    console.log("Game Started");
    levelup();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelup() {
  userSeq = [];
  level++;

  h3.innerText = `Level ${level}\nHighest Score: ${highscore}`;
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`#${randColor}`);

  gameSeq.push(randColor);
  console.log(gameSeq);

  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    if (level - 1 > highscore) {
      highscore = level - 1;
    }

    h3.innerText = `Game Over! Score: ${level - 1} \nPress any key to restart \nHighest Score: ${highscore}`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "white";
    },200);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userId = btn.getAttribute("id");
  userSeq.push(userId);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let b of allBtns) {
  b.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
