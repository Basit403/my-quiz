var questions = [];

fetch("questions.json")
    .then(res => {
        return res.json();
    })
    .then(loadedquestions => {
        console.log(loadedquestions);
        questions = loadedquestions;
        startquiz();
    });

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");

let currentquestionindex = 0;
let score = 0;

function startquiz(){
    currentquestionindex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showquestion();
}

function showquestion(){
    reset();
    let currentquestion = questions[currentquestionindex];
    let questionNo = currentquestionindex + 1;
    questionElement.innerHTML = questionNo + ". " + currentquestion.
    question;

    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectanswer);
    });
}

function reset(){
   nextButton.style.display = "none";
   while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
   }   
}

function selectanswer(e){
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";
    if (iscorrect) {
        selectedbtn.classList.add("yes");
        score++;
    } else {
        selectedbtn.classList.add("no");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showscore(){
    reset();
    questionElement.innerHTML = `You scored ${score} out of ${questions.
    length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function tonextbutton(){
    currentquestionindex++;
    if (currentquestionindex < questions.length) {
        showquestion();
    } else {
        showscore();
    }
}

nextButton.addEventListener("click", ()=>{
    if (currentquestionindex < questions.length){
        tonextbutton();
    } else {
        startquiz();
    }
})

startquiz();

