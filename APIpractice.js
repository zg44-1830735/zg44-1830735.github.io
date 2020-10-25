(function() {
  "use strict";

  window.addEventListener("load", initialize);

  const URL = "https://opentdb.com/api.php";
  const COLORS = ["#F00", "#FFA500", "#FF0", "#008000", "#00F", "#800080"];
  const NUM_QUESTIONS = 100;

  let timer = null;
  let questions = null;
  let numCorrect = 0;
  let point = 0;
  let remainingTime = null;
  let numberOfQuestion = 0;


  function initialize() {
    setHead();
    fetchCategories();
    $("go").addEventListener("click", fetchQuestions);
    $("renew").addEventListener("click", resetPlayground);
  }

  function setHead() {
    let head = $("Head");
    let count = 0;
    setInterval(function() {
      count++;
      if (count >= COLORS.length) {
        count = 0;
      }
      head.style.color = COLORS[count];
    }, 100);
  }

    function resetPlayground() {
      questions = null;
      numCorrect = 0;
      point = 0;
      remainingTime = null;
      numberOfQuestion = 0;
      $("conclusion").innerText = "";
      $("time_title").innerText = "Select time (in seconds): ";
      $("category_title").innerText = " Select Category: ";
      $("difficulty_title").innerText = " Select Difficulty: ";
      $("Diffcilty").classList.toggle("hide");
      $("time").classList.toggle("hide");
      $("category").classList.toggle("hide");
      $("renew").classList.toggle("hide");
      $("go").classList.toggle("hide");
    }


  function fetchCategories() {
    let request = "https://opentdb.com/api_category.php";
    fetch(request, {mode: "cors"})
      .then(checkStatus)
      .then(JSON.parse)
      .then(getCate)
      .catch(handleError);
  }

  function getCate(response) {
    let categories = response.trivia_categories;
    for (let i = 0; i < categories.length; i++) {
      let cagetory = document.createElement("option");
      cagetory.value = categories[i].id;
      cagetory.text = categories[i].name;
      $("category").appendChild(cagetory);
      $("category").classList.toggle("hide");

      $("selections").classList.toggle("hide");
    }
  }

  function fetchQuestions() {
    $("error").classList.add("hide");
    let category = $("category").value;
    let query = URL + "?amount=" + NUM_QUESTIONS + "&category=" + 10;

    fetch(query, {mode: "cors"})
      .then(checkStatus)
      .then(JSON.parse)
      .then(function(response) {
        questions = response.results;
        initialPlaygruond();
      })
      .catch(handleError);
  }

  function initialPlaygruond() {
    $("total_point_text").innerText = "Total points:";
    $("cor_text").innerText = "Number of Questions Correct:";
    $("remaining_time_text").innerText = "Remaining Time:";
    $("time_title").innerText = "";
    $("category_title").innerText = "";
    $("difficulty_title").innerText = "";
    $("go").classList.toggle("hide");
    $("Diffcilty").classList.toggle("hide");
    $("category").classList.toggle("hide");
    $("time").classList.toggle("hide");
    $("playground").classList.toggle("hide");
    remainingTime = parseInt($("time").value);
    appendQuestion();
    displayTime();
    timer = setInterval(function() {
      if (remainingTime > 0) {
        remainingTime--;
        displayTime();
        displayPoint();
        displayCorrect();
      } else {
        closePlayGround();
      }
    }, 1000);
  }

  function appendQuestion() {

    if (remainingTime > 0) {
      let data = questions.pop();
      let question = data.question;
      let answers = null;
      if (data.type === "boolean") {
        answers = ["True", "False"];
      } else {
        answers = randomizeChoices(data);
      }
      let questionNode = document.createElement("ol");
      questionNode.classList.add("question");
      questionNode.type = "a";
      questionNode.innerHTML = (numberOfQuestion + 1) + ". " +  question;
      for (let i = 0; i < answers.length; i++) {
        let choice = document.createElement("li");
        if (answers[i].toString() === data.correct_answer) {
          choice.classList.add("right");
        }
        choice.innerHTML = answers[i];
        choice.addEventListener("click", checkAnswer);
        choice.classList.add("choice");
        choice.classList.add("unselected");
        questionNode.appendChild(choice);
      }
      $("question").appendChild(questionNode);
    }
  }

  function randomizeChoices(data) {
    let preresult = [data.correct_answer];
    for (let i = 0; i < data.incorrect_answers.length; i++) {
      preresult.push(data.incorrect_answers[i]);
    }
    let result = [];
    while (preresult.length > 0) {
      let index = Math.floor(Math.random() * preresult.length);
      let option = preresult.splice(index, 1);
      result.push(option);
    }
    return result;
  }


  function checkAnswer() {
    if (this.classList.contains("right")) {
      numCorrect++;
      point += 18;
      this.classList.add("correct");
      removeEvents(this.parentNode);
    } else {
      if (!this.classList.contains("incorrect")) {
        point -=7;
      }
      this.classList.add("incorrect");
      removeEvents(this.parentNode);
    }
    numberOfQuestion++;
    if (questions.length > 0) {
      replaceQuestion();
    } else {
      endGame();
    }
  }

  function removeEvents(question) {
    if (question !== null) {
      let choices = question.children;
      for (let i = 0; i < choices.length; i++) {
        choices[i].removeEventListener("click", checkAnswer);
        choices[i].classList.remove("choice");
      }
    }
  }

  function replaceQuestion() {
    setTimeout(function() {
      $("question").innerHTML = "";
      appendQuestion();
    }, 1000);
  }

  function closePlayGround() {
    clearInterval(timer);
    timer = null;
    $("question").innerHTML = "";
    $("total_point").innerText = "";
    $("cor").innerText = "";
    $("total_point_text").innerText = "";
    $("cor_text").innerText = "";
    $("remaining_time").innerText = "";
    $("remaining_time_text").innerText = "";
    $("conclusion").innerText = "Congratulation! You got " + numCorrect + " number of Questions Correct! And you got " + point + "points!";
    removeEvents($("question").lastElementChild);
    numCorrect = 0;
    $("renew").classList.toggle("hide");
    $("playground").classList.toggle("hide");
  }


















  function displayTime() {
    if (remainingTime <= 0) {
      $("remaining_time").innerText = "0s";
    } else {
      $("remaining_time").innerText = remainingTime + "s";
    }
  }

  function displayPoint() {
    $("total_point").innerText = point;
  }

  function displayCorrect() {
    $("cor").innerText = numCorrect;
  }

  function handleError(response) {
   let error = "Oooooops! There is something went wrong! We got a(n) " +
                  response.status + " error. Please refresh the page.";
   $("error").innerText = error;
   $("error").classList.remove("hide");
 }



  function $(id) {
    return document.getElementById(id);
  }



  function qs(query) {
    return document.querySelector(query);
  }


  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300 || response.status == 0) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }
})();
