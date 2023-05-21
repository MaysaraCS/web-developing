const canvas = document.querySelector("canvas"),
toolBtns = document.querySelectorAll(".tool"),
fillColor = document.querySelector("#fill-color"),
sizeSlider = document.querySelector("#size-slider"),
colorsBtns = document.querySelectorAll(".colors .option"),
colorPicker = document.querySelector("#color-picker"),
clearCanvas = document.querySelector(".clrear-canvas"),
saveImg = document.querySelector(".save-img"),
ctx = canvas.getContext("2d");

// global variable with default value 
let prevMouseX , prevMouseY, snapShots,
isDrawing = false,
selectedTool = "brush",
brushWidth = 5,
selectedColor = "#000";

const setCanvasBackground = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0 , 0, canvas.width , canvas.height);
    ctx.fillStyle = selectedColor;
}

window.addEventListener("load" , () => {
    // setting canvas wid and hie to off wid and off hie to retunr viewable width / height of an element
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});

const drawRect = (e) => {
    // if fill color is not checked draw a rect with border else draw rec with background
    if(!fillColor.checked){
        //create circle according to the mouse pointer
        return ctx.strokeRect(e.offsetX , e.offsetY , prevMouseX - e.offsetX , prevMouseY - e.offsetY);
    }
        ctx.fillRect(e.offsetX , e.offsetY , prevMouseX - e.offsetX , prevMouseY - e.offsetY);
}
const drawCircle = (e) =>{
    ctx.beginPath(); // create a new path to draw circle 
    // getting radius for circle according to the mouse pointer
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX) , 2) + Math.pow((prevMouseY - e.offsetY) , 2));
    ctx.arc(prevMouseX , prevMouseY , radius , 0 , 2 * Math.PI); // create the circle according to the the mouse pointer 
    fillColor.checked ?  ctx.fill() : ctx.stroke(); // if fillcolor is checked fill circle else draw border circle
}

const drawTriangle = (e) =>{
    ctx.beginPath(); // create a new path to draw triangle 
    ctx.moveTo(prevMouseX , prevMouseY); // moving the triangle to the mouse pointer
    ctx.lineTo(e.offsetX , e.offsetY); // creating first line acccording to the mouse pointer
    ctx.lineTo(prevMouseX * 2 - e.offsetX , e.offsetY); // create the bottom line to the triangle 
    ctx.closePath(); // closing the triangle path for the third line draw automatically 
    //ctx.stroke();
    fillColor.checked ?  ctx.fill() : ctx.stroke(); // if fillcolor is checked fill triangle else draw border triangle
}

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY= e.offsetY;
    ctx.beginPath(); // create new path to draw from 
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    ctx.lineWidth = brushWidth ; // passing the brushWidth as line width
    snapShots = ctx.getImageData(0 , 0 , canvas.width , canvas.height);
}

const drawing = (e) =>{
    if(!isDrawing) return;

    ctx.putImageData(snapShots , 0 , 0 ); // adding copied canvas to this canvas 

    if(selectedTool == "brush" || selectedTool == "eraser" ) {
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX , e.offsetY); // create line according to the mouse pointer
        ctx.stroke(); // drawing filling line with color
    }
    else if(selectedTool == "rectangle"){
        drawRect(e);
    }
    else if(selectedTool == "circle"){
        drawCircle(e);
    }
    else{
        drawTriangle(e);
    }
}
toolBtns.forEach(btn => {
    btn.addEventListener("click" , () =>{ // adding click event to all tool option
        // removing active class from the previous options and adding on current clicked option
        document.querySelector(".options .active").classList.remove(".active");
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool);
    });
});

sizeSlider.addEventListener("change" , () => brushWidth = sizeSlider.value); // passing slider value as brush size 

colorsBtns.forEach(btn => {
    btn.addEventListener("click" , () => { // adding click events to all the colors buttons
        // removing active class from the previous options and adding on current clicked option
        document.querySelector(".options .selected").classList.remove(".selected");
        btn.classList.add("active");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});

colorPicker.addEventListener("change" , () => {
    // passing picked color value from color picker to last color btn background
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});

clearCanvas.addEventListener("click" , () =>{
    ctx.clearRect(0 , 0 ,canvas.width , canvas.height); // clear the whole canvas
    setCanvasBackground();
});
saveImg.addEventListener("click" , () =>{
    const link  = document.createElement("a"); // create <a> element
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL(); // passing the canvas data to the href value 
    link.click(); // clicking link to download image 
});

canvas.addEventListener("mousedown" , startDraw);
canvas.addEventListener("mousemove" , drawing);
canvas.addEventListener("mouseup" , () => isDrawing = false);