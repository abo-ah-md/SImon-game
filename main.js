
//setting game  variables
let buttonColours =["red", "blue", "green", "yellow"];
let userClickedPattern=[];
let gamePattern=[];
let level=0;
let started= false;


//starting level
$(document).keydown(function() {
    if (!started) {
      
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level  " + level);
      
      nextSequence();
      started = true;
      
    }
   
  });

   //sound 
function playSound(name){ 
  var audio = new Audio(`sounds/${name}.mp3`);
audio.play();
}

//css class animation

function animatePress(currentColour)
{
$("#"+currentColour).addClass("pressed");
setTimeout(function() { 
$("#"+currentColour).removeClass("pressed");
},100)
}

//startOver
function startOver(){
started = false;
$("#level-title").text("Press A Key to Start");

userClickedPattern=[];
gamePattern=[];
level=0;
}


//player clicking
$(".btn").click(function () {
  
    let userChosenColour= this.id;

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);
  
    checkAnswer(userClickedPattern);
}); 

//checking the answer 
function checkAnswer(currentLevel) {
  
  let checker_2=1;
  let check_arr=[];
    for (let i = 0; i < gamePattern.length; i++) {

      
          if (currentLevel[i]===gamePattern[i]) {
            check_arr.push("true");
            console.log(check_arr);
            
          }
          else if (currentLevel[i]!==gamePattern[i]
            &&currentLevel.length==gamePattern.length){
                   check_arr.push("false");
                   console.log(check_arr);
                   checker_2=0;
                   break;
        }
     
    }
    for (let j = 0; j < check_arr.length; j++) {

       if(check_arr[j]=="false")
      {
        checker_2=0
        break;  

      }
      else if (check_arr[j]=="true"&&check_arr.length==gamePattern.length) {
        checker_2=2
      }
      
    }


    if (checker_2==2) {
      setTimeout(function() {      
        nextSequence();
        userClickedPattern=[]
        },1000)  
        checker_2=1;
      }
      else if (checker_2==0){
        
        let gameOverSound=new Audio("sounds/wrong.mp3");
        gameOverSound.play();
        $("body").addClass("game-over");

        setTimeout(() => {
          $("body").removeClass("game-over");
        }, 200);
        startOver()
        
      }
    }
  


//making the sequuence 
function nextSequence () { 
  
level++;
     $("#level-title").text("Level " + level)

let randomNumber=Math.floor((Math.random()*4))
  let randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
playSound(randomChosenColour)
 $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
 animatePress(randomChosenColour);
 


 }


