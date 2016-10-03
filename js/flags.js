var data, selectedCountry, previousCountry;

// Look for the selected country.
if (document.addEventListener){
    document.addEventListener("click", function(event){
        if(event.target.nodeName == "A"){
            if(event.target.innerText != "Country"){
                selectedCountry = event.target.innerText || event.srcElement.innerText;
            }
        }
    });
}

// Load the data
function preload(){
    data = loadJSON('../data/basicdata.json', gotData);
}

function gotData(data){
   //println(data[n]); 
}

function setup(){
    canvas = createCanvas(170, 700);
    canvas.parent('canvas');
    noStroke();
    //frameRate(1);
}

function draw() {
    // Check which country is selected
    if(selectedCountry != undefined && previousCountry != selectedCountry){
        println(data[selectedCountry].gini)
        previousCountry = selectedCountry;
    }
    
    // Stick
    fill(255);
    rect(0,0,-10,windowHeight);
}


