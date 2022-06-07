console.log("coded by Rohan :)");
const min = document.getElementById("min");
const content = document.getElementById("content");
const sec = document.getElementById("sec");
const start_btn = document.getElementById("start");
const reset_btn = document.getElementById("reset");
var task_status = document.getElementById("task_status");
let interval1;
let interval2;

// timmings -----------------------------

const work_timming = 2  // 25; //in minute
const break_timming = 1  // 5; // in minute
const long_break_timming = 3 // 30; //in minute

//--------------------------

var Count_Lap = 1; //increments until 4
var isTimmerRunning = false;
//--------------------------------------
const tasks = ["POMODORO TIMER", "WORK", "BREAK", "LONG BREAK"];
//------------------------------------------
let click_sound = new Audio("./assets/click.mp3");
let alarm_sound = new Audio("./assets/alarm.mp3");
let timeout_sound = new Audio("./assets/timeout.mp3");
let apple_img = new Image(300, 300);

apple_img.src = "./assets/apple.png";

content.appendChild(apple_img);
apple_img.style.position = "relative";
apple_img.style.top = "-150px";
apple_img.style.zIndex = "-99";

//-----------------------------------------
start_btn.addEventListener("click", () => {
  click_sound.play();
  if (Count_Lap <= 4 && isTimmerRunning == false) {
    console.log(Count_Lap);
    isTimmerRunning = true;
    task_status.innerHTML = tasks[1];
    timmer(work_timming);
  } else if (Count_Lap == 5) {
    task_status.innerHTML = tasks[3];
    console.log("long break");
    Break(long_break_timming);
  } else {
    console.log("not running");
    return;
  }
});

//----------------------------------------

function Break(time_limit) {
  const timeLimit = time_limit;
  let updating_min = timeLimit - 1;
  let second = 6;  // 10;
  interval2 = setInterval(() => {
    second--;
    if (second === -1) {
      second = 5;  // 9;
      updating_min--;
    }
    if (updating_min == 0 && second == 0) {
      console.log("breakover");
      timeout_sound.play();
      task_status.innerHTML = tasks[0];
      clearInterval(interval2);
      Count_Lap++;
      isTimmerRunning = false;
    }
    console.log(updating_min);

    second = second < 10 && second >= 0 ? `0${second}` : second;
    min.innerHTML =
      updating_min < 10 && updating_min >= 0
        ? `0${updating_min}`
        : updating_min;
    sec.innerHTML = second;
  }, 1000);
}

//------------------------------------------------
function timmer(time_limit) {
  const timeLimit = time_limit;
  let updating_min = timeLimit - 1;
  let second = 6;  // 60;

  interval1 = setInterval(() => {
    second--;
    if (second === -1) {
      second = 5;  // 9;
      updating_min--;
    }
    if (updating_min === 0 && second === 0) {
      console.log("timeover");
      alarm_sound.play();
      clearInterval(interval1);
      task_status.innerHTML = tasks[2];
      Break(break_timming);
    }
    //console.log(updating_min);
    second = second < 10 && second >= 0 ? `0${second}` : second;
    min.innerHTML =
      updating_min < 10 && updating_min >= 0
        ? `0${updating_min}`
        : updating_min;
    sec.innerHTML = second;

    reset_btn.addEventListener("click", () => {
      click_sound.play();
      alarm_sound.pause();
      alarm_sound.currentTime = 0;
      task_status.innerHTML = tasks[0];
      clearInterval(interval1);
      clearInterval(interval2);
      Count_Lap = 1;
      isTimmerRunning = false;
      min.innerHTML = "25";
      sec.innerHTML = "00";
    });
  }, 1000);
}
