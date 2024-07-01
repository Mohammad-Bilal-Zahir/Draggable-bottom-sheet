
const showModelBtn = document.querySelector(".show-model");
const BottomSheet = document.querySelector(".bottom-sheet");
const sheetOverlay = BottomSheet.querySelector(".sheet-overlay");
const sheetContent = BottomSheet.querySelector(".content");
const dragIcon = BottomSheet.querySelector(".drag-icon");

let isDragging = false, startY, startHeight;

const showBottomSheet = () =>{
    BottomSheet.classList.add("show");
    document.body.style.overflowY = "hidden";
    updatdeSheetHeight(50);

}

const hideBottomSheet = ()=>{
    BottomSheet.classList.remove("show");
    document.body.style.overflowY = "auto";
}
const updatdeSheetHeight = (height)=>{
sheetContent.style.height = `${height}vh`;
BottomSheet.classList.toggle("fullscreen", height=== 100);
}







const dragStart = (e)=>{
    isDragging = true;
    startY= e.pageY || e.touches?.[0].pageY;
    startHeight = parseInt(sheetContent.style.height);
    BottomSheet.classList.add("dragging");
}


const dragging = (e)=>{
    if(!isDragging) return;
    const delta = startY - (e.pageY || e.touches?.[0].pageY);
    const newHeight = startHeight + delta / window.innerHeight * 100;
    sheetContent.style.height = `${e.pageY}vh`;
    updatdeSheetHeight(newHeight);
    console.log(e.pageY);
}

const dragStop = ()=>{
    isDragging  = false;
    BottomSheet.classList.remove("dragging");
    const sheetHeight = parseInt(sheetContent.style.height);
    sheetHeight < 25 ? hideBottomSheet() : sheetHeight > 75 ? updatdeSheetHeight(100) : updatdeSheetHeight(50);
}


document.addEventListener("mouseup",dragStop);
dragIcon.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", dragging);

document.addEventListener("touchend",dragStop);
dragIcon.addEventListener("touchstart", dragStart);
document.addEventListener("touchmove", dragging);

showModelBtn.addEventListener("click",showBottomSheet);
sheetOverlay.addEventListener("click",hideBottomSheet);