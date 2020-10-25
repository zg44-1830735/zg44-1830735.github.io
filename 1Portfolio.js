(function(){
  "use strict";
  let aclicks = 1;
  let bclicks = 2;
  let cclicks = 2;
  let qu =  "";
  let kind = 0;

  function $(id) {
    return document.getElementById(id);
  }

  window.onload = function() {
    $("submit").style.visibility = "hidden";
    $("again").style.visibility = "hidden";
    $("activity-picture").addEventListener("mouseover", aprocessClick);
    $("love").addEventListener("mouseover", bprocessClick);
    $("p1").addEventListener("mouseover", cprocessClick);
    $("activity-picture").onclick = aprocessClick;
    $("love").onclick = bprocessClick;
    $("p1").onclick = cprocessClick;
    $("begin").onclick = smallGameInitial;
    $("submit").onclick = smallGameCheckAnswer;
    $("again").onclick = renewGame;
  };

/*
  window.addEventListener("load", initialize);
  function initialize() {
    let aclick = document.getElementById("activity-picture");
    let bclick = document.getElementById("love");
    let cclick = document.getElementById("p1");
    let dclick = document.getElementById("begin");
    aclick.addEventListener("click", aprocessClick);
    bclick.addEventListener("click", bprocessClick);
    cclick.addEventListener("click", cprocessClick);
    dclick.addEventListener("click", smallGame);

    function smallGameInitial() {
      let text = $("playgroundquestion");
      text.innerText = "What's the name of the person I love?";
      $("answer_window").style.display = "block";
      $("submit").style.visibility = "visible";
      $("begin").style.visibility = "hidden";
      $("language").style.display = "block";
    }

    function smallGameCheckAnswer() {
      let r = $("answer_window").value;

      let ans = $("languege").value;
    }
  }
  let ans = $("languege").value;
  if (r == "English"){
    if (isNaN(ans)) {
      $(result).innerText = "Please enter your guess.";
    } else if (ans == "Yuhan Xiao") {
      $(result).innerText = "Awesome! You Got it Correct!";
    } else {
      $(result).innerText = "Sorry, it seems that you don't know me well";
    }
  }
*/
  function aprocessClick() {
    let actImg = $("activity-picture");
    if (aclicks < 6) {

      actImg.src = "activity" + aclicks + ".jpg";
      aclicks++;
    } else {
      actImg.src = "activity6.jpg";
      aclicks = 1;
    }
  }


  function bprocessClick() {
    let bctImg = $("love");
    if (bclicks < 26) {
      bctImg.src = "love" + bclicks + ".jpg";
      bclicks++;
    } else {
      bctImg.src = "love26.jpg";
      bclicks = 1;
    }
  }

  function cprocessClick() {
    let cctImg = $("p1");
    if (cclicks < 15) {
      cctImg.src = "me" + cclicks + ".jpg";
      cclicks++;
    } else {
      cctImg.src = "me15.jpg";
      cclicks = 1;
    }
  }

  function renewGame() {
    $("again").style.visibility = "hidden";
    $("result").innerText = "";
    $("reward").innerText = "";
    $("playgroundquestion").innerText = "ooops";
    $("again").style.visibility = "invisible";
    if (kind == 1) {
      $("playground1").removeChild(document.querySelector(".award"));
    }
    $("playground1").removeChild(document.querySelector(".answer_window"));
    smallGameInitial();
  }


  function smallGameInitial() {
    let ques = ["The major I wanted to persuit before I came to uw",
                "The player I like the most",
                "The major I wanted to persuit now",
                "One thing made me sad recently",
                "What's the name of the person I love?",
                "what's the flavor of the ice-cream I love the most?",
                "what's the life I want to have?",
                "What's the subject I love the most, particularly in UW?",
                "What's the restaurant I love the most in ave?",
                "What kind of coffee I love the most?",
                "Why I seldom drink coffee?",
                "Which milk-tea I love the most in ave",
                "Which kind of milk-tea I love the most",
                "what kind of burger I ate the most in 2019-Winter in lp"
              ]
    let text = $("playgroundquestion");
    text.innerText = randomQuote(ques);
    let answer = document.createElement("INPUT");
    answer.type = "text";
    answer.classList.add("answer_window");
    $("playground1").insertBefore(answer, $("submit"));
    $("submit").style.visibility = "visible";
    $("begin").style.visibility = "hidden";
    $("language").style.display = "block";
  }

  function randomQuote(ques) {
    let r = Math.floor(Math.random()*ques.length);
    qu = ques[r]
    return qu;
  }


  function smallGameCheckAnswer() {
    var ques_a = {"The major I wanted to persuit before I came to uw" : "Statistics",
                  "The player I like the most" : "Lebron James",
                  "The major I wanted to persuit now" : "Computer Science",
                  "One thing made me sad recently" : "The person I love decided to transfer",
                  "What's the name of the person I love?" : "Yuhan Xiao",
                  "what's the flavor of the ice-cream I love the most?" : "cappuccino",
                  "what's the life I want to have?" : "In the forest by the river",
                  "What's the subject I love the most, particularly in UW?" : "ESRM",
                  "What's the restaurant I love the most in ave?" : "Tasty",
                  "What kind of coffee I love the most?" : "con panna",
                  "Why I seldom drink coffee?" : "I couldn't fall into sleep after drinking coffee",
                  "Which milk-tea I love the most in ave?" : "Kungfu Tea",
                  "Which kind of milk-tea I love the most" : "COCOA CREAM WOW MILK TEA",
                  "what kind of burger I ate the most in 2019-Winter in lp": "Smoke House"
                };
    let cor = ques_a[qu];
    let lan = $("language").value;
    let r = document.querySelector(".answer_window").value;
    let che = "English";
    if (lan == che){
      if (r == "") {
        $("result").innerText = "Please enter your guess.";
      } else if (r == cor) {
        $("result").innerText = "Awesome! You Got it Correct!";
        award();
      } else {
        $("result").innerText = "Sorry, it seems that you don't know me well";
      }
    }
    else {
      $("result").innerText = "Sorry the Chinese version is currently unavailable. Please use the English version";
      /*
      if (r == "") {
        $("result").innerText = "Please enter your guess.";
      } else if (r == "肖语涵") {
        $("result").innerText = "Awesome! You Got it Correct!";
      } else {
        $("result").innerText = "Sorry, it seems that you don't know me well";
      }
      */
    }
  }

  function award(){
    kind = Math.floor(Math.random()*2);
    $("again").style.visibility = "visible";
    if (kind == 1) {
    let choices = ["award_1.JPG",
                "award_2.JPG",
                "award_3.JPG",
                "award_4.JPG",
                "award_5.JPG",
                "award_6.JPG",
                "award_7.JPG",
                "award_8.JPG",
                "award_9.JPG",
                "award_10.JPG",
                "award_11.JPG"
              ]
      let choice = randomQuote(choices);
      let answer = document.createElement("IMG");
      answer.src = choice;
      answer.classList.add("award");
      $("playground1").appendChild(answer);
    } else {
      let awards = ["I used to use the eyeglass cleaning tissues to clean my mac screen",
                    "I once mispronounces 'caesar' as 'kaiser' and talked about it for almost two minutes in fromt of a large a group of people.",
                    "I have a strong conflict character",
                    "The first time I consider CSE as a major is because it's very popular in UW",
                    "I have no talent in almost all kinds of online games",
                    "I am not quit enjoying life in UW and consider transfer for a long time",
                    "Oops you got a bad luck",
                    "I tend to drink some beer, when I was despaired or after a period of stressful days",
                    "Before deciding coming to uw, I was struggled between WISC and UCSD. One day I felt tired of that and decided to come to UW."
                    ]
      let reward = randomQuote(awards);
      if (reward = "I tend to drink some beer, when I was despaired or after a period of stressful days") {
        reward = randomQuote(awards);
      }
      let re = "A secrete of me: " + reward;
      $("reward").innerText = re;
    }
  }


}



)();
