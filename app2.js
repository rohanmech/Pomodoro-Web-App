console.log("coded by Akash :)");
const min = document.getElementById("min");
const content = document.getElementById("content");
const sec = document.getElementById("sec");
const start_btn = document.getElementById("start");
const reset_btn = document.getElementById("reset");
var task_status = document.getElementById("task_status");
let interval1;
let interval2;

//-----------------check marks--------
const checkmarks = document.getElementById('checkmark');

const checkmarks_array = checkmarks.children;


// timmings -----------------------------

const work_timming = 2; //in minute
const break_timming = 2; // in minute
const long_break_timming = 5; //in minute
const setSecond = 3;
const Total_time = work_timming * break_timming*setSecond * 1000;
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
let timeout1;
start_btn.addEventListener("click", () => {
  click_sound.play();
  if(!isTimmerRunning)
  { isTimmerRunning=true;
    timmer(work_timming);//1st cycle
    
    
        setTimeout(() => {
          
         timeout1= timmer(work_timming); // 2nd cycle
          setTimeout(() => {
          
            timmer(work_timming);// 3rd cycle
    
            setTimeout(() => {
              
              timmer(work_timming);// 4th cycle
                
              setTimeout(()=>{
                task_status.innerHTML = tasks[3];
                alarm_sound.play();
                Break(long_break_timming);
                isTimmerRunning=false; // long break cycle
              },Total_time+10);   
                  
              
            }, Total_time);
          }, Total_time);
        }, Total_time);
    
    
    
  }
 


  }
 
);
// start_btn.addEventListener("click", () => {
//   click_sound.play();
//   if (Count_Lap <= 4 && isTimmerRunning == false) {
//     console.log(Count_Lap);
//     isTimmerRunning = true;
//     task_status.innerHTML = tasks[1];
//     timmer(work_timming);
//   } else if (Count_Lap == 5) {
//     task_status.innerHTML = tasks[3];
//     console.log("long break");
//     Break(long_break_timming);
//   } else {
//     console.log("not running");
//     return;
//   }
// });

//----------------------------------------

function Break(time_limit) {
  const timeLimit = time_limit;
  let updating_min = timeLimit - 1;
  let second = setSecond;
  interval2 = setInterval(() => {
    second--;
    if (second === -1) {
      second = setSecond - 1;
      updating_min--;
    }
    if (updating_min == 0 && second == 0) {
      console.log("breakover");
      timeout_sound.play();
         if(!alarm_sound.ended)
         {
                alarm_sound.pause();
                alarm_sound.currentTime=0;
         }
      task_status.innerHTML = tasks[0];
      checkmarks_array[Count_Lap-1].style. visibility='visible'
      Count_Lap++;
      
      clearInterval(interval2);
      
      // isTimmerRunning = false;
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
  let second = setSecond;

  interval1 = setInterval(() => {
    task_status.innerHTML = tasks[1];
    second--;
    if (second === -1) {
      second = setSecond - 1;
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
      //debugger
      
     
        click_sound.play();
       
        alarm_sound.pause();
        alarm_sound.currentTime = 0;
     
     setTimeout(()=>{
    location.reload();
     
     },500)
        
      
     
      // task_status.innerHTML = tasks[0];
      
      // clearInterval(interval1);
      // clearInterval(interval2);
      
      // //
      // //isTimmerRunning = false;
      // min.innerHTML = "25";
      // sec.innerHTML = "00";
    
      

    });
  }, 1000);
}
