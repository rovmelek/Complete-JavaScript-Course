(function (global) {
    var score = 0;
    var questionBank =
    {
        1: {
            question: "Who is the teacher of this course?",
            option: ["Jonas", "Mike", "Kevin"],
            answer: "Jonas"
        },
        2: {
            question: "What year is this year?",
            option: [2019, 2020, 2021, 2022],
            answer: 2020
        },
        3: {
            question: "What language is being taught in this course?",
            option: ["Java", "JavaScript", "Python", "Perl", "PHP"],
            answer: "JavaScript"
        }
    };

    function genRndInteger(min, max)
    {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    function displayQuestionOption(questionNumber)
    {
        console.log("Q: " + questionBank[questionNumber]["question"]);

        for (i = 0; i < questionBank[questionNumber]["option"].length; i++)
        {
            console.log(questionBank[questionNumber]["option"][i]);
        };
    };

    function checkInput(userInput)
    {
        var answer = questionBank[questionNumber]["answer"];

        function isString(input)
        {
            return (typeof input) === "string";
        }

        function getAnswer()
        {
            return isString(answer) ? answer.toUpperCase() : answer.toString().toUpperCase();
        }
    
        // console.log("The type of user input " + userInput + " is " + (typeof userInput));
        // console.log("Correct answer is " + getAnswer());
        return userInput.toUpperCase() === getAnswer();
    };

    do
    {
        var questionNumber = genRndInteger(1, 4);

        // console.log("Asking question number " + questionNumber)

        displayQuestionOption(questionNumber)

        var userInput = prompt("Please input your answer (type \"exit\" to leave): ");

        // console.log('User input: ' + userInput);
        if (userInput.toUpperCase() === "EXIT")
        {
            console.log("==========")
            console.log("Exiting the game.")
            console.log("Your final score is " + score);
        }
        else
        {
            if (checkInput(userInput))
            {
                console.log("==> " + userInput + " is the correct answer.")
                score += 1;
            }
            else {
                console.log("==> " + userInput + " is NOT the correct answer.")
            }
            console.log("Current score: " + score);
            console.log("==========")
        }
    }
    while (userInput.toUpperCase() !== "EXIT")

})(window);