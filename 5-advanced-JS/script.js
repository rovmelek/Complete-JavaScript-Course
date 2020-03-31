var questionBank = {
    1: {
        question: "Who is the teacher of this course?",
        option: ["Jonas", "Mike", "Kevin"],
        answer: "Jonas"
    }
};

console.log(questionBank[1]["question"]);

for (i = 0; i <= questionBank[1]["option"].length; i++)
{
    console.log(questionBank[1]["option"][i]);
};

var userInput = prompt("Please input your answer: ");
console.log('User input: ' + userInput);
