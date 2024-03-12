
//getting dom
let file=document.getElementById("filing");
let show=document.querySelector("img");
let choose=document.getElementById("choosebtn");
let slider=document.getElementById("range");
let values=document.querySelector("p");
let filteroptions=document.querySelectorAll(".buttonstyle");
let filtername=document.getElementById("lable");
let resetbtn=document.getElementById("reset");
let canvas=document.querySelector("canvas");
let savebtn=document.querySelector("#save");

//declaring variables
let  brightness=100, saturation=100 ,contrast=100,grayscale=0,invert=0;

//event listners
filteroptions.forEach(option => {
  option.addEventListener("click", filterlablechange);
});
file.addEventListener("change",loadimg);
choose.addEventListener("click",()=>file.click());
slider.addEventListener("input",update);
resetbtn.addEventListener("click",resetfun);
savebtn.addEventListener("click",savefun);

//function to display image on screen
function loadimg(){
let image=file.files[0];
show.src=URL.createObjectURL(image);
resetbtn.click();
show.classList.remove("hide");

}

//function for updating slider values and filter values on input
function update(){
    values.innerText=`${slider.value}%`;
    let activefilter=document.querySelector(".active");
    if(activefilter.innerText==="brightness")
    {
    brightness=slider.value;
    }
   else if(activefilter.innerText==="saturation")
   {
   saturation=slider.value;
   }
   else if(activefilter.innerText==="contrast")
   {
   contrast=slider.value;
   }
   else if(activefilter.innerText==="grayscale")
   {
   grayscale=slider.value;
   }
   else if(activefilter.innerText==="invert")
   {
   invert=slider.value;
   }
    applyfilter();
}

//funtion for applying filter on image
function applyfilter(){
show.style.filter=`brightness(${brightness}%) saturate(${saturation}%) contrast(${contrast}%) grayscale(${grayscale}%) invert(${invert}%)`;
}

//function for reseting filters
function resetfun(){
      brightness=100, saturation=100 ,contrast=100,grayscale=0,invert=0;
    applyfilter();
    filteroptions[0].click();
}

//function for changing lables name and slider values and making slected elements active
function filterlablechange(){ 
document.querySelector(".active").classList.remove("active");
filtername.innerText=this.innerText+":";
if(this.innerText==="brightness")
{
    slider.max="200";
slider.value=brightness;
values.innerText=`${brightness}%`;
}
else if(this.innerText==="saturation")
{
    slider.max="200";
slider.value=saturation;
values.innerText=`${saturation}%`;
}
else if(this.innerText==="contrast")
{
    slider.max="200";
slider.value=contrast;
values.innerText=`${contrast}%`;
}
else if(this.innerText==="grayscale")
{
    slider.max="100";
   slider.value=grayscale;
   values.innerText=`${grayscale}%`;
}
else if(this.innerText==="invert")
{
 slider.max="100";
slider.value=invert;
values.innerText=`${invert}%`;
}
this.classList.add("active");
}

//function for saving image

function savefun(){
    let canvas=document.createElement("canvas");
    let ctx=canvas.getContext("2d");
    canvas.width=show.naturalWidth;
    canvas.height=show.naturalHeight;
    ctx.filter=`brightness(${brightness}%) saturate(${saturation}%) contrast(${contrast}%) grayscale(${grayscale}%) invert(${invert}%)`;
    ctx.drawImage(show,0,0,canvas.width,canvas.height);

    let link=document.createElement("a");
     link.download="image.jpg";
     link.href=canvas.toDataURL();
     link.click();

}