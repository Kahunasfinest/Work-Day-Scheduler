function setCurrentDay() {
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
}


  setCurrentDay();


$(".saveBtn").on("click", function () {
  var timeBlockId = $(this).parent().attr("id");
  var userInput = $(this).siblings(".description").val();
  localStorage.setItem(timeBlockId, userInput);
});

function updateColors() {
  var currentHour = dayjs().hour();

  $(".time-block").each(function () {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);

    $(this).toggleClass("past present future", blockHour < currentHour, blockHour === currentHour);

    if (blockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });
}

function displaySavedInput() {
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var savedInput = localStorage.getItem(timeBlockId);
    $(this).find(".description").val(savedInput);
  });
}

updateColors();
displaySavedInput();

setInterval(function () {
  updateColors();
}, 60000);