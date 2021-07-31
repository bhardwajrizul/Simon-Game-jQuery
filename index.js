let gameHasStarted = false;
let currentLevel = 1;

let colors = ["red", "blue", "green", "yellow"];
let currentColor;
let currentColors = [];
let index = 0;

$(document).keypress(function(event){
    if(!gameHasStarted){
        gameHasStarted = true;
        updateHeading();
        displayNewColor();
        gameStart();
    }
    console.log(event.kecode);
})


function displayNewColor() {
    currentColor = randomColor(colors);
    currentColors.push(currentColor);

    
    setTimeout(function () {
        $("." + currentColor).addClass("pressed");
    }, 200);

    
    
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 400);

    setTimeout(function () {
        playSound(currentColor);;
    }, 400);
    
    
    console.log(currentColors);
}

function updateHeading() {
    if(gameHasStarted)
        $(".heading").text("Level " + currentLevel);
    else if(!gameHasStarted)
        $(".heading").text("Press A Key To Play Again !!");
}

function randomColor(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function gameStart() {
    $(".column").click(function(event) {
        mouseClickCheck(event);
    })
}

function mouseClickCheck(event){
    $("." + Object.values($(event.currentTarget.classList))[1]).addClass("pressed");
    setTimeout(function() {
        $("." + Object.values($(event.currentTarget.classList))[1]).removeClass("pressed");
    },100);
    
    playSound(Object.values($(event.currentTarget.classList))[1]);
    
    if (index < currentColors.length && Object.values($(event.currentTarget.classList))[1] === currentColors[index]){
        index++;
    }
    else if (Object.values($(event.currentTarget.classList))[1] !== currentColors[index]) {
        console.log("wrong");
        gameOver();
        return;
    }

    if(index >= currentColors.length) {
        currentLevel++;
        displayNewColor();
        updateHeading();
        index = 0;
    }
    
    console.log(index);
    console.log(currentColors);

}
function gameOver() {
    let wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("gameOver");
    setTimeout(function() {
        $("body").removeClass("gameOver");
    }, 1000);
    resetValues();
    updateHeading();
}

function resetValues() {
    currentColors = [];
    index = 0;
    currentLevel = 1;
    gameHasStarted = false;
    $(".column").off("click");
}

function playSound(event) {
    buttonColor = event;
    switch (buttonColor) {
        case "red":
            let red = new Audio("sounds/red.mp3");
            red.play();
            break;
        case "green":
            let green = new Audio("sounds/green.mp3");
            green.play();
            break;
        case "blue":
            let blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;
        case "yellow":
            let yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
        default:
            break;
    }
}
