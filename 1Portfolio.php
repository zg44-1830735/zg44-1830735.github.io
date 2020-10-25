<?php

$ques = array( "The major I wanted to persuit before I came to uw",
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
            "what kind of burger I ate the most in 2019-Winter in lp");

$quesp = array("The major I wanted to persuit before I came to uw" => "Statistics",
              "The player I like the most" => "Lebron James",
              "The major I wanted to persuit now" => "Computer Science",
              "One thing made me sad recently" => "The person I love decided to transfer",
              "What's the name of the person I love?" => "Yuhan Xiao",
              "what's the flavor of the ice-cream I love the most?" => "cappuccino",
              "what's the life I want to have?" => "In the forest by the river",
              "What's the subject I love the most, particularly in UW?" => "ESRM",
              "What's the restaurant I love the most in ave?" => "Tasty",
              "What kind of coffee I love the most?" => "con panna",
              "Why I seldom drink coffee?" => "I couldn't fall into sleep after drinking coffee",
              "Which milk-tea I love the most in ave?" => "Kungfu Tea",
              "Which kind of milk-tea I love the most" => "COCOA CREAM WOW MILK TEA",
              "what kind of burger I ate the most in 2019-Winter in lp" => "Smoke House");

   if (isset($_GET["question"])) {
     $question = $_GET["question"];
     if ($question === "random") {
       header("Content-type: application/json");
       $val = array_rand($ques);
       $select = array($ques[$val],$quesp[$ques[$val]]);

       $return_array = $select;
       print(json_encode($return_array));
     }
     else{

     }
   }



?>
