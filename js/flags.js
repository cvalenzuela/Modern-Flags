var data, countryDescriptionTag, countryGiniTag, countryHdiTag, countryPopulationTag, countryName, selectedCountry, previousCountry,hdiLowest,hdiHighiest, giniLowest, giniHighiest, countryHdi, countryGini, countryPopulation, flagPoleY;

 /* ---- Look for selected country in ul>li or for Random Value in JSON ---- */
if (document.addEventListener){
    document.addEventListener("click", function(event){
        if(event.target.nodeName == "A"){
            if(event.target.innerText != "Country"){
                selectedCountry = event.target.innerText || event.srcElement.innerText;
                console.log(selectedCountry);
            }
        }
        else if(event.target.innerText == "Random"){
            // Loop through all Objects in Json, store them in an array and randomly pick one
            var list = []
            for (var key in data) {
                if (data.hasOwnProperty(key)){
                    list.push(key);
                }
            }
            selectedCountry = list[int(random(int(list.length)))];
        }
    });
}

 /* ---- Load Data  ---- */
function preload(){
    data = loadJSON('../data/basicdata.json');
}

function setup(){
    canvas = createCanvas(windowWidth, windowHeight/2+100)
    //canvas = createCanvas(170, 700);
    canvas.parent('canvas');
    noStroke();
    
    /* ---- Create Dynamic Elements  ---- */
    countryName = createElement('h6', " ");
    countryHdi = createElement('p', " ");
    countryGini = createElement('p', " ");
    countryPopulation = createElement('p', " ");
    
    /* ---- Create variables for ID Tags  ---- */
    countryDescriptionTag = document.getElementById('countryDescription');
    countryHdiTag = document.getElementById('hdi');
    countryGiniTag = document.getElementById('gini');
    countryPopulationTag = document.getElementById('population');
    
    /* ---- Setup threshold values for indexes  ---- */
    hdiLowest = 0.246; // Worst: Niger
    hdiHighiest = 0.893; // Best: Norway
    giniLowest = 24.8; // Best: Ukraine
    giniHighiest = 68; // Worst: Seychelles
}

function draw() {
    
    /* ---- Check if the country selected is valid---- */
    if(selectedCountry != undefined && previousCountry != selectedCountry){
        
        /* ---- Remove previous country ---- */
        countryName.remove();
        countryHdi.remove();
        countryGini.remove();
        countryPopulation.remove();
        
        /* ---- Create new country ---- */
        countryName = createElement('h6', selectedCountry); 
        countryHdi = createElement('p', '<b>Human Development Index:</b> ' + data[selectedCountry].hdi);
        countryGini = createElement('p', '<b>Gini Coefficient:</b> ' + data[selectedCountry].gini);
        countryPopulation = createElement('p', '<b>Population:</b> ' + data[selectedCountry].population + '000');
        
        /* ---- Append as child of parent's div  ---- */
        countryName.parent(countryDescriptionTag);  
        countryHdi.parent(countryHdiTag);
        countryGini.parent(countryGiniTag);
        countryPopulation.parent(countryPopulationTag);

        /* ---- Create new variables to draw  ---- */
        var hdi = int(map(data[selectedCountry].hdi,hdiLowest,hdiHighiest,0,windowHeight/2+100 ));
        var gini = int(map(data[selectedCountry].gini,giniLowest,giniHighiest,0,width));
        var population = data[selectedCountry].population;
        
        /* ---- Drag the Flag ---- */
        fill(random(40,200),random(40,200),random(40,200));
        rect(0,hdi,width/4,110);
        previousCountry = selectedCountry;
        
    }
    
    /* ---- Drag the Flagpole ---- */
    fill('#EEEEEE');
    rect(0,0,10,windowHeight);

}

/* ---- Watch for rezing of the screen ---- */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight/2+100);
}
