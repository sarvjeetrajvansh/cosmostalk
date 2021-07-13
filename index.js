var btnConvert=document.querySelector("#btn-convert");
var txtInput=document.querySelector("#txt-input");
var apiSelector=document.querySelector("#select-heros");
var bannerImage=document.querySelector("#banner-image");


 /** handles actual bussiness logic 
 calls the api process it and return desired input **/ 
function clickHandler(){
    
        setImage("banner-image",apiSelector.value==""?"cosmos":apiSelector.value);
        setMessage("main-header",apiSelector.value==""?"Cosmos Talk":apiSelector.value+" "+"Talk");
        setMessage("txt-output",apiSelector.value==""?"cosmos":apiSelector.value+" "+"thoughts...");
   
    if(txtInput.value=="" || txtInput.value==null || txtInput.value==undefined ){

        setMessage("errorLabel","*please enter your thoughts first");
        setMessage("txt-output","Meh!! No thoughts to translate...");
        return;
    }
        setMessage("txt-output","Processing.....");
        fetch(urlConstructor(apiSelector.value,txtInput.value))
        .then(response => response.json())
        .then(data => {setMessage("txt-output",data.contents.translated.toString())})
}

//contruct url based on user choice
function urlConstructor(inputapi,input){
    return "https://api.funtranslations.com/translate/"+inputapi+".json"+"?text="+input;
}
function setImage(id, imageSrc){
    document.getElementById(id).src=`${imageSrc+".png"}`;
}

//set custom message on custom element
function setMessage(id,Message){
    document.getElementById(id).innerHTML=Message;
}
//clean custom message set on screen
function cleanError(){
    document.getElementById("errorLabel").innerHTML="";
    document.getElementById("txt-output").innerHTML="";
}

txtInput.addEventListener("input",cleanError);
btnConvert.addEventListener("click",clickHandler);