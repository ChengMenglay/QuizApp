const startBtn=document.querySelector(".btn-start");
const infoBox=document.querySelector(".info-box");
const exitBtn=document.querySelector(".exit-btn");
const continueBtn=document.querySelector(".next-btn");
const quiz=document.querySelector(".quiz");
const timeSecond=document.querySelector(".time-process");
const timeLine=document.querySelector(".time-line");
startBtn.onclick=()=>{
    infoBox.classList.add("activeInfo");
}
exitBtn.onclick=()=>{
    infoBox.classList.remove("activeInfo"); 
}
continueBtn.onclick=()=>{
    infoBox.classList.remove("activeInfo");
    startBtn.classList.remove("activeInfo");
    quiz.classList.add("activeQuiz");
    showOption(0);
    StartTime(15);
    StartLine(0);
}
const box=[
    {
        question:"What does HTML stand for?",
        numberOfQuestion:"1",
        correct:"Hyper Text Markup Language",
        answer:["Hyper Text Preprocessor",
                "Hyper Text Markup Language",
                "Hyper Text Multiple Language",
                "Hyper Tool Multi Language"]
    },
    {
        question:"What does CSS stand for?",
        numberOfQuestion:"2",
        correct:"Cascading Style Sheet",
        answer:["Common Style Sheet",
                "Colorful Style Sheet",
                "Computer Style Sheet",
                "Cascading Style Sheet"]
    },
    {
        question:"What does PHP stand for?",
        numberOfQuestion:"3",
        correct:"Hypertext Preprocessor",
        answer:["Hypertext Preprocessor",
                "Hypertext Programming",
                "Hypertext Preprogramming",
                "Hometext Preprocessor"]
    },
    {
        question:"What does SQL stand for?",
        numberOfQuestion:"4",
        correct:"Structured Query Language",
        answer:["Stylish Question Language",
                "Stylesheet Query Language",
                "Statement Question Language",
                "Structured Query Language"]
    },
    {
        question:"What does XML stand for?",
        numberOfQuestion:"5",
        correct:"eXtensible Markup Language",
        answer:["eXtensible Markup Language",
                "eXecutable Multiple Language",
                "eXTra Multi-Program Language",
                "eXamine Multiple Language"]
    },
]
let count=0;
let point=0;
let timeWidth=0;
let counter;
let countTime=15;
document.querySelector(".btn-next").onclick=()=>{
    if(count <box.length-1){
        count++;
        showOption(count);
        clearInterval(counter);
        clearInterval(countline);
        StartTime(countTime);
        StartLine(timeWidth);
    }
    if(count==4){
      document.querySelector(".btn-submit").style.display="block";
      document.querySelector(".btn-next").style.display="none";
    }
    
}

showOption=(index)=>{
    let Que=`
    <div class="question">${box[index]["question"]}</div>
    `
    let Answ=`
    <div class="answer">${box[index].answer[0]}</div>
    <div class="answer">${box[index].answer[1]}</div>
    <div class="answer">${box[index].answer[2]}</div>
    <div class="answer">${box[index].answer[3]}</div>
    `
    let step=`
    <div class="step-question"><span>${box[index]["numberOfQuestion"]}</span> of <span> 5</span> questoin</div>
    `
    document.querySelector(".question-list").innerHTML=Que;
    document.querySelector(".answer-list").innerHTML=Answ;
    document.querySelector(".step").innerHTML=step;
    const options=document.querySelectorAll(".answer");
    for(let i=0;i<options.length;i++){
        options[i].setAttribute('onclick','optionSelected(this)')
    }
    optionSelected=(answer)=>{
        const userAns=answer.textContent;
        const correctAns=box[count].correct;
        clearInterval(counter);
        clearInterval(countline);
        if(userAns==correctAns){
            answer.classList.add('correct');
            for(let i=0;i<options.length;i++){
                options[i].classList.add("disable");
            }
            answer.innerHTML=correctAns+"<i class='bx bx-check'></i>";
            point++;
        }
        else{
            answer.classList.add('incorrect');
            for(let i=0;i<options.length;i++){
                options[i].classList.add("disable");
            }
            answer.innerHTML=userAns+"<i class='bx bx-x'></i>";
        }
        for(let i=0;i<options.length;i++){
           if(options[i].textContent==correctAns){
            options[i].setAttribute('class','answer correct');
            options[i].innerHTML=correctAns+"<i class='bx bx-check'></i>";
           }
        }
    }
    
}
const Result=document.querySelector(".Result")
document.querySelector(".btn-submit").onclick=()=>{
    Result.classList.add("result");
    document.querySelector(".points").innerHTML=point;
    count=0;
}
const quitQuiz=document.querySelector(".btn-quit");
const playAgain=document.querySelector(".btn-again");
quitQuiz.onclick=()=>{
    document.querySelector(".btn-submit").style.display="none";
    document.querySelector(".btn-next").style.display="block";
    Result.classList.remove("result");
    startBtn.classList.add("activeInfo");
    quiz.classList.remove("activeQuiz");
    point=0;
    clearInterval(counter);
    clearInterval(countline);
}
playAgain.onclick=()=>{
    document.querySelector(".btn-submit").style.display="none";
    document.querySelector(".btn-next").style.display="block";
    Result.classList.remove("result");
    quiz.classList.add("activeQuiz");
    showOption(count);
    clearInterval(counter);
    clearInterval(countline);
    StartTime(15);
    StartLine(0);
    point=0;
}
StartTime=(countTime)=>{
    counter=setInterval(timer,1000);
    function timer(){
        const options=document.querySelectorAll(".answer");
        timeSecond.textContent=countTime;
        countTime--;
        if(countTime<10){
            timeSecond.textContent="0"+countTime;
        }
        if(countTime<=0){
            clearInterval(counter);
            timeSecond.textContent="00";
            for(let i=0;i<options.length;i++){
                options[i].classList.add("disable");
            }
        }
    }
}
StartLine=(timeWidth)=>{
    countline=setInterval(timeline,150);
    function timeline(){
        timeLine.style.width=timeWidth+"%";
        timeWidth+=1;
        if(timeWidth>100){
            clearInterval(countline);
        }
    }
}
