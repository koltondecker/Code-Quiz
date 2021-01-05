//On click function that hides start page elements, and shows question 1 while starting our timer function.
$("#button-start").on("click", function() {
    $("#front-page").addClass("hidden");
    $("#question-1").removeClass("hidden");
    startTimer();
});

//Declaring and intializing variables.
var count = 0;
var j = 0;
var timeSeconds = 100;
var score = timeSeconds;
var currentHighscores;
var highscoreArray = [];
var newHighScore = {
    initials: "",
    score: undefined
};
var initials = "";
var newHighScore;

//Timer function that is based on the initalized timeSeconds variable of 100 and runs every 1 second.
function startTimer() {
    interval = setInterval(function() {
    if (timeSeconds > 0) {
        score--;
        $("#time").text(score);
    }
    else {
        $("#time").text("0");
        clearInterval(interval);
        allDone(j);
    }
    return score;
    }, 1000);
}

//Every time an answer button is clicked, the next question function is called to display the next question in our html.
$(".answer-button").on("click", goToNextQuestion);

//Next question function uses count variables to check which question we are on and which one it is to display next based on id values from html file.
function goToNextQuestion() {
    count++;
    j = count + 1;

    if ($(this).hasClass("correct-answer")) {
        $("#answer-correctness-text").text("Correct!");
    }
    //Subtracts 10 from score and time with wrong answers.
    else {
        score -= 10;
        $("#time").text(score);
        $("#answer-correctness-text").text("Wrong!");

    }

    if (count < 3) {
        $("#question-" + count).addClass("hidden");
        $("#question-" + j).removeClass("hidden");
    }
    //After we are out of new questions, it then stops the time and runs the allDone function.
    else {
        $("#question-" + count).addClass("hidden");
        clearInterval(interval);
        allDone(j);
    }

    return j, score;
}

//Displays our All Done page with final score and ability to submit intials to the highscores page.
function allDone(j) {
    if (j === 0) {
        $("#question-1").addClass("hidden");
    }
    else {
        $("#question-" + j).addClass("hidden");
    }
    $("#all-done").removeClass("hidden");
    $("#final-score").text(score);
} 
//submit button on click function stores the score and initials into our 'newHighScore' object which will eventually be pushed to our local storage array.
$("#submit-initials").on("click", function submitHighscore() {
    initials = document.getElementById("InitialsInput").value;
    if (initials === "") {
        alert("Must insert initials");
        return;
    }
    newHighScore.initials = initials;
    newHighScore.score = score;
    //Changes to our highscores.html file when submit button is clicked.
    window.location.href = "https://koltondecker.github.io/Code-Quiz/html/highscores.html";
    //Runs our function to populate the highscores to our highscores page table.
    populateHighscores(initials, newHighScore);
    return initials, newHighScore.initials, newHighScore.score;
});
//If statement will run our populate highscores function if user ever wants to jump straight to the highscores page and not take the quiz.
if (window.location.href === "https://koltondecker.github.io/Code-Quiz/html/highscores.html") {
    populateHighscores();
}

//Populates highscores table from our local storage and new highscore object from quiz.
function populateHighscores() {
    currentHighscores = JSON.parse(localStorage.getItem("highscore"));
    //Checks if local storage has any values.
    if(currentHighscores !== null) {
        highscoreArray = currentHighscores;
    }
    //
    if(newHighScore.initials !== "" && newHighScore.score !== undefined) {
        if(currentHighscores !== null) {
            //Checks if initials already exist in highscores so we can update the score associated with those initials rather than create another element with the same initials.
            for(i = 0; i < highscoreArray.length; i++) {
                if(highscoreArray[i].initials === newHighScore.initials) {
                    highscoreArray[i].score = score;
                }
            }
            //If initials don't exist in the array, then we will push the new score. 
            if(highscoreArray.some(e => e.initials === newHighScore.initials) === false) {
                highscoreArray.push(newHighScore);
            }
            // Sort function sorts highscore array into descending order. 
            highscoreArray.sort(function(a, b) {
                return parseFloat(b.score - a.score);
            });
        }
        else {
            highscoreArray.push(newHighScore);
        }
    }
    localStorage.setItem("highscore", JSON.stringify(highscoreArray));
    //For loop appends table elements to page for highscores table.
    for (i = 0; i < highscoreArray.length; i++) {
        var rank = i + 1;
        $("#table-body").append("<tr> <th scope='row'>" + rank + "</th> <td>" + highscoreArray[i].initials + "</td> <td>" + highscoreArray[i].score + "</td> </tr>");
    }
} 

//Button that removes highscore array from local storage and clears all text content from our table body element so there will be no more highscores displayed.
$("#button-clear-scores").on("click", function(event) {
    localStorage.removeItem("highscore");
    var tableBody = document.getElementById("#table-body");
    tableBody.textContent = "";
});  