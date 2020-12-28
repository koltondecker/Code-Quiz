
$("#button-start").on("click", function() {
    $("#front-page").addClass("hidden");
    $("#question-1").removeClass("hidden");
    runQuiz();
});

function runQuiz() {
    var i = 0;
    var j = 0;
    var timeSeconds = 100;
    var outOfTime;
    var score = timeSeconds;
    var currentHighscores;
    var highscoreArray = [];
    var newHighScore;
    
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
    
    $(".answer-button").on("click", goToNextQuestion);

    function goToNextQuestion() {
        i++;
        j = i + 1;

        if ($(this).hasClass("correct-answer")) {
            $("#answer-correctness-text").text("Correct!");
        }
        else {
            score -= 10;
            $("#time").text(score);
            $("#answer-correctness-text").text("Wrong!");

        }

        if (i < 3) {
            $("#question-" + i).addClass("hidden");
            $("#question-" + j).removeClass("hidden");
        }
        else {
            $("#question-" + i).addClass("hidden");
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
        newHighScore = "initials: " + $("#InitialsInput").val() + ", score: " + score;
        currentHighscores = JSON.parse(localStorage.getItem("highscore"));
        if(currentHighscores !== null) {
            highscoreArray = currentHighscores;
        }
        highscoreArray.push(newHighScore);
        localStorage.setItem("highscore", JSON.stringify(highscoreArray));
        window.location.href = "highscores.html";
    });
}
