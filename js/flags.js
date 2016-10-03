var data, countryDescriptionTag, countryGiniTag, countryHdiTag, countryPopulationTag, countryName, selectedCountry, previousCountry,hdiLowest,hdiHighiest, giniLowest, giniHighiest, countryHdi, showCountryHdi, countryGini, countryPopulation, highiestPopulation, lowestPopulation, flagPoleY,startOfY,startOfX, canvasTag;

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

/* ---- Load Data ---- */
function preload(){
    data = loadJSON('../data/basicdata.json');
}

/* ---- Setup ---- */
function setup(){
    canvas = createCanvas(windowWidth, windowHeight/2+100)
    canvas.parent('canvas');
    noStroke();
    startOfY = 0;
    
    /* ---- Create Dynamic Elements  ---- */
    countryName = createElement('h6', " ");
    countryHdi = createElement('p', " ");
    countryGini = createElement('p', " ");
    countryPopulation = createElement('p', " ");
    showCountryHdi = createElement('p', " ");
    
    /* ---- Create variables for ID Tags  ---- */
    countryDescriptionTag = document.getElementById('countryDescription');
    countryHdiTag = document.getElementById('hdi');
    countryGiniTag = document.getElementById('gini');
    countryPopulationTag = document.getElementById('population');
    canvasTag = document.getElementById('canvas');
    
    /* ---- Setup threshold values for indexes  ---- */
    hdiLowest = 0; // Worst: Niger = 0.246
    hdiHighiest = 1; // Best: Norway = 0.893
    giniLowest = 24.8; // Best: Ukraine
    giniHighiest = 68; // Worst: Seychelles
    highiestPopulation = 1376049; // China 
    lowestPopulation = 1; // Tokelau
}

/* ---- Draw ---- */
function draw() {

    /* ---- Draw the Flagpole ---- */
    startOfX = windowWidth/2-50;
    noStroke();
    fill('#EEEEEE');
    rect(startOfX,0,6,windowHeight); // Draw Flagpole
    
    /* ---- Check if the country selected is valid---- */
    if(selectedCountry != undefined && previousCountry != selectedCountry){
        
        /* ---- Remove previous country ---- */
        resetCanvas();
        
        /* ---- Create new country ---- */
        countryName = createElement('h6', selectedCountry); 
        countryHdi = createElement('p', '<b>Human Development Index:</b> ' + data[selectedCountry].hdi);
        countryGini = createElement('p', '<b>Gini Coefficient:</b> ' + data[selectedCountry].gini);
        countryPopulation = createElement('p', '<b>Population:</b> ' + data[selectedCountry].population + '000');
        showCountryHdi = createElement('p', '<b>HDI </b>' + data[selectedCountry].hdi);
        
        /* ---- Append as child of parent's div  ---- */
        countryName.parent(countryDescriptionTag);  
        countryHdi.parent(countryHdiTag);
        countryGini.parent(countryGiniTag);
        countryPopulation.parent(countryPopulationTag);
        showCountryHdi.parent(canvasTag);

        /* ---- Create new variables to draw  ---- */
        var hdi = map(data[selectedCountry].hdi,hdiLowest,hdiHighiest,windowHeight/2+250,startOfY);
        var gini = int(map(data[selectedCountry].gini,giniLowest,giniHighiest,0,width));
        var population = int(map(data[selectedCountry].population,lowestPopulation,highiestPopulation,80,250));
        
        /* ---- Draw the Flag ---- */
        fill(random(40,200),random(40,200),random(40,200));
        rect(startOfX,hdi,population,population-population/3); // Draw the flag
        stroke('#aaaaaa');
        line(startOfX - 20,hdi,startOfX-5,hdi);  // Draw HDI Line
        showCountryHdi.position(startOfX - 55,hdi-5);
        previousCountry = selectedCountry;
        println(hdi);
        
    }

}

/* ---- Watch for rezing of the screen ---- */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight/2+100);
}

/* ---- Reset Canvas when needed ---- */
function resetCanvas(){
    background('#D2D7D3');
    countryName.remove();
    countryHdi.remove();
    countryGini.remove();
    countryPopulation.remove();
    showCountryHdi.remove();
}