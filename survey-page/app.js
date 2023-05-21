const ul_1 = document.querySelector(".option1");
const ul_2 = document.querySelector(".option2");
const ul_3 = document.querySelector(".option3");

const q1 = document.querySelector(".q1");
const q2 = document.querySelector(".q2");
const q3 = document.querySelector(".q3");

const survey = document.querySelector(".survey");
const end = document.querySelector(".end");

// first q
ul_1.addEventListener("click" , function(){
    //console.log("hey it's working");
    q1.style.display = "none";
    q2.style.display = "block";
});
// second q
ul_2.addEventListener("click" , function(){
    //console.log("hey it's working");
    q2.style.display = "none";
    q3.style.display = "block";
});

// display thank u
ul_3.addEventListener("click" , function() {
    q3.style.display = "none";
    survey.style.display = "none";
    end.style.display = "block";
});