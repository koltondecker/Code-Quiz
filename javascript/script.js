
$("#button-start").on("click", function() {
    $("#front-page").addClass("hidden");
    $("#question-1").removeClass("hidden");
    startTimer();
});

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


$(".answer-button").on("click", goToNextQuestion);

function goToNextQuestion() {
    count++;
    j = count + 1;

    if ($(this).hasClass("correct-answer")) {
        $("#answer-correctness-text").text("Correct!");
    }
    else {
        score -= 10;
        $("#time").text(score);
        $("#answer-correctness-text").text("Wrong!");

    }

    if (count < 3) {
        $("#question-" + count).addClass("hidden");
        $("#question-" + j).removeClass("hidden");
    }
    else {
        $("#question-" + count).addClass("hidden");
        clearInterval(interval);
        allDone(j);
    }

    return j, score;
}

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

$("#submit-initials").on("click", function submitHighscore() {
    initials = document.getElementById("InitialsInput").value;
    if (initials === "") {
        alert("Must insert initials");
        return;
    }
    newHighScore.initials = initials;
    newHighScore.score = score;
    // window.location.href = "https://koltondecker.github.io/Code-Quiz/html/highscores.html";
    window.location.pathname = "/Users/koltondecker/Bootcamp-Homework/Code-Quiz/html/highscores.html"
    populateHighscores(initials, newHighScore);
    return initials, newHighScore.initials, newHighScore.score;
});

// if (window.location.href === "https://koltondecker.github.io/Code-Quiz/html/highscores.html") {
//     populateHighscores();
// }

if (window.location.pathname === "/Users/koltondecker/Bootcamp-Homework/Code-Quiz/html/highscores.html") {
    populateHighscores();
}

function populateHighscores() {
    currentHighscores = JSON.parse(localStorage.getItem("highscore"));

    if(currentHighscores !== null) {
        highscoreArray = currentHighscores;
    }

    if(newHighScore.initials !== "" && newHighScore.score !== undefined) {
        if(currentHighscores !== null) {
            for(i = 0; i < highscoreArray.length; i++) {
                if(highscoreArray[i].initials === newHighScore.initials) {
                    highscoreArray[i].score = score;
                }
            }    
            if(highscoreArray.some(e => e.initials === newHighScore.initials) === false) {
                highscoreArray.push(newHighScore);
            }

            highscoreArray.sort(function(a, b) {
                return parseFloat(b.score - a.score);
            });
        }
        else {
            highscoreArray.push(newHighScore);
        }
    }
    localStorage.setItem("highscore", JSON.stringify(highscoreArray));

    for (i = 0; i < highscoreArray.length; i++) {
        var rank = i + 1;
        $("#table-body").append("<tr> <th scope='row'>" + rank + "</th> <td>" + highscoreArray[i].initials + "</td> <td>" + highscoreArray[i].score + "</td> </tr>");
    }
} 

$("#button-clear-scores").on("click", function(event) {
    localStorage.removeItem("highscore");
    var tableBody = document.getElementById("#table-body");
    tableBody.textContent = "";
});  