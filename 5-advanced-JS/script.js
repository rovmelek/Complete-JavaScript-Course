(function (global) {
    class questionObj
    {
        constructor(question, option, answer)
        {
            this.question = question;
            this.option = option;
            this.answer = answer;
        }
    }

    class questionBankObj
    {
        constructor()
        {
            this.questions = [];
        }

        addQuestion(question, option, answer)
        {
            this.questions.push(new questionObj(question, option, answer));
        }

        getQuestion(questionNumber)
        {
            return this.questions[questionNumber].question;
        }

        getOption(questionNumber)
        {
            return this.questions[questionNumber].option;
        }

        isString(input)
        {
            return (typeof input) === "string";
        }

        getAnswer(questionNumber)
        {
            var answer = this.questions[questionNumber].answer;

            return this.isString(answer) ? answer.toUpperCase() : answer.toString().toUpperCase();
        }

        checkAnswer(questionNumber, userInput)
        {
            return userInput.toUpperCase() === this.getAnswer(questionNumber);
        }

        displayQuestionAndOption(questionNumber)
        {
            console.log("Q: " + this.getQuestion(questionNumber));
    
            for (var i = 0; i < this.getOption(questionNumber).length; i++)
            {
                console.log(this.getOption(questionNumber)[i]);
            }
        }

        getQuestionNumber(min, max)
        {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }

    // main()

    // initiate the environment
    var score = 0;
    var questionNumber = 0;
    var questionBank = new questionBankObj();

    // add question, options and answer to the question bank
    questionBank.addQuestion(
        "Who is the teacher of this course?",
        ["Jonas", "Mike", "Kevin"],
        "Jonas"
    )

    questionBank.addQuestion(
        "What year is this year?",
        [2019, 2020, 2021, 2022],
        2020
    )

    questionBank.addQuestion(
        "What language is being taught in this course?",
        ["Java", "JavaScript", "Python", "Perl", "PHP"],
        "JavaScript"
    )

    // start the main loop
    do
    {
        questionNumber = questionBank.getQuestionNumber(0, 3);

        console.log("Asking question number " + (questionNumber + 1 ))

        questionBank.displayQuestionAndOption(questionNumber)
        
        var userInput = prompt("Please input your answer (type \"exit\" to leave): ");

        if (userInput.toUpperCase() === "EXIT")
        {
            console.log("==========")
            console.log("Exiting the game.")
            console.log("Your final score is " + score);
        }
        else
        {
            if (questionBank.checkAnswer(questionNumber, userInput))
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