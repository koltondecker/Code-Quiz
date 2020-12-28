
$("#button-start").on("click", function() {
    $("#front-page").addClass("hidden");
    $("#question-1").removeClass("hidden");
    runQuiz();
});

function runQuiz() {
    var i = 0;
    var j = 0;
    var timeSeconds = 10;
    var outOfTime;
    
    interval = setInterval(function() {
        if (timeSeconds > 0) {
            timeSeconds--;
            $("#time").text(timeSeconds);
        }
        else {
            $("#time").text("0");
            clearInterval(interval);
            allDone(j);
        }

      }, 1000);
    
    $(".answer-button").on("click", goToNextQuestion);

    function goToNextQuestion() {
        i++;
        j = i + 1;
        if (i < 3) {
            $("#question-" + i).addClass("hidden");
            $("#question-" + j).removeClass("hidden");
        }
        else {
            $("#question-" + i).addClass("hidden");
            clearInterval(interval);
            allDone(j);
        }
        return j;
    }

    function allDone(j) {
        if (j === 0) {
            $("#question-1").addClass("hidden");
        }
        else {
            $("#question-" + j).addClass("hidden");
        }
        $("#all-done").removeClass("hidden");
    } 

    $("#submit-initials").on("click", function submitHighscore() {
        window.location.href = "highscores.html";
    });
}
