var i = 0;

$("#button-start").on("click", function() {
    $("#front-page").addClass("hidden");
    $("#question-1").removeClass("hidden");
});

$(".answer-button").on("click", goToNextQuestion);

function goToNextQuestion() {
    i++;
    var j = i + 1;
    if (i < 3) {
        $("#question-" + i).addClass("hidden");
        $("#question-" + j).removeClass("hidden");
    }
    else {
        $("#question-" + i).addClass("hidden");
        $("#all-done").removeClass("hidden");
    }
}

$("#submit-initials").on("click", function submitHighscore() {
    window.location.href = "highscores.html";
});
