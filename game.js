var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keypress(function () {
    if (level === 0) {
        $("h1").text("Level 0");
        nextsequence();
    }
})

function nextsequence() {
    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
}

function playSound(name) {
    var audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
       if(gamePattern.length-1 === currentLevel){
        setTimeout(function(){
            nextsequence();

        },1000);
       }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");  
        },200);
        $('h1').text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver(){
    level=0;
    gamePattern=[];
}

$(".btn").click(function (event) {
    var userChosenColour = event.target.id;
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})