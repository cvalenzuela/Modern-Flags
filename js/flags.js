/*
=====================
Modern Flags: A index-based flag generator.
A Tool to visualize Economic development indexes as a Flag Generator.
By: Cristóbal Valenzuela while at @ NYU ITP
cvalenzuela@nyu.edu
cvalenzuelab.com
October 2016

Project for Data Visualization class: Phase 1 Project
New York

Tools used: p5.js, animated.css, bootstrap, FlatUI
=====================
*/

var data, countryDescriptionTag, countryCo2Tag, countryGiniTag, countryHdiTag, countryPopulationTag, countryName, selectedCountry, previousCountry,hdiLowest,hdiHighiest, giniLowest, giniHighiest, countryHdi, showCountryHdi, countryGini, countryPopulation, countryCo2, highiestPopulation, lowestPopulation, flagPoleY,startOfY,startOfX, canvasTag, hdiDescription, giniDescription, populationDescription, co2Description, selected, co2Lowest, co2Highiest;

 /* ---- Look for selected country in ul>li or for Random Value in JSON ---- */
if (document.addEventListener){
    document.addEventListener("click", function(event){    
        if(event.target.nodeName == "A"){
            if(event.target.innerText != "Country"){
                selectedCountry = event.target.innerText || event.srcElement.innerText;
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

document.getElementById('listOfCountries').addEventListener('click', resetCanvas);
    


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
    selected = false;
    
    /* ---- Create Static and Dynamic Tags  ---- */
    countryName = createElement('h6', "");
    countryHdi = createElement('p', "");
    countryGini = createElement('p', "");
    countryPopulation = createElement('p', "");
    countryCo2 = createElement('p', "");
    showCountryHdi = createElement('p', "");
    hdiDescription = createElement('p', "A country scores higher Human Development Index (HDI) when the lifespan is higher, the education level is higher, the GDP per capita is higher, the fertility rate is lower, and the inflation rate is lower.");
    giniDescription = createElement('p', "The Gini coefficient is a measure of inequality of a distribution. It is defined as a ratio with values between 0 and 1.  A Gini coefficient of 100% expresses maximal inequality.");
    populationDescription = createElement('p', "All the inhabitants of a particular country as in 2016.");
    co2Description = createElement('p', "CO2 emissions (metric tons per capita)");
    
    /* ---- Hide all Description Hoverable Text ---- */
    hdiDescription.hide();
    giniDescription.hide();
    populationDescription.hide();
    co2Description.hide();
    
    /* ---- Create variables for ID Tags: shows above the flag ---- */
    countryDescriptionTag = document.getElementById('countryDescription');
    countryHdiTag = document.getElementById('hdi');
    countryGiniTag = document.getElementById('gini');
    countryPopulationTag = document.getElementById('population');
    countryCo2Tag = document.getElementById('co2');
    canvasTag = document.getElementById('canvas');
    
    /* ---- Setup threshold values for mapping indexes ---- */
    hdiLowest = 0; // Worst: Niger = 0.246
    hdiHighiest = 1; // Best: Norway = 0.893
    giniLowest = 23; // Best: Ukraine = 24.8
    giniHighiest = 60; // Worst: Seychelles = 68
    highiestPopulation = 1376049; // China 
    lowestPopulation = 2000; // Tokelau = 1
    co2Lowest = 0.021349926; // Burundi
    co2Highiest = 44.01892637; // Qatar
}

/* ---- Draw ---- */
function draw() {

    /* ---- Draw the Flagpole ---- */
    startOfX = windowWidth/2-50;
    noStroke();
    fill('#EEEEEE');
    rect(startOfX,0,6,windowHeight); // Draw Flagpole
    rect(startOfX-16,475,40,20);
    
    /* ---- Check if the country selected is valid---- */
    if(selectedCountry != undefined && previousCountry != selectedCountry){
        
        /* ---- Prevents Descriptions to appear when nothing is selected ---- */
        selected = true;
        
        /* ---- Remove previous country ---- */
        resetCanvas();
        
        /* ---- Hide all Hoverable Text ---- */
        hdiDescription.hide();
        giniDescription.hide();
        populationDescription.hide();
        co2Description.hide();
        
        /* ---- Create new country ---- */
        countryName = createElement('h6', selectedCountry); 
        countryHdi = createElement('p', '<b>HDI:</b> ' + data[selectedCountry].hdi);
        countryGini = createElement('p', '<b>Gini Coefficient:</b> ' + data[selectedCountry].gini + '%');
        countryPopulation = createElement('p', '<b>Population:</b> ' + data[selectedCountry].population + '000');
        countryCo2 = createElement('p', '<b>CO2 Emissions: </b>' + data[selectedCountry].co2);
        showCountryHdi = createElement('p', '<b>HDI </b>' + data[selectedCountry].hdi);
        
        /* ---- Append as child of parent's div  ---- */
        countryName.parent(countryDescriptionTag);  
        countryHdi.parent(countryHdiTag);
        countryGini.parent(countryGiniTag);
        countryPopulation.parent(countryPopulationTag);
        countryCo2.parent(countryCo2Tag);
        showCountryHdi.parent(canvasTag);
        hdiDescription.parent(indexDescription);
        giniDescription.parent(indexDescription);
        populationDescription.parent(indexDescription);
        co2Description.parent(indexDescription);
        hdiDescription.addClass('animated');
        giniDescription.addClass('animated');
        populationDescription.addClass('animated');
        co2Description.addClass('animated');
        hdiDescription.addClass('leftInfoBox');
        giniDescription.addClass('leftInfoBox');
        populationDescription.addClass('leftInfoBox');
        co2Description.addClass('leftInfoBox');
        co2Description.addClass('animated');
  
        /* ---- Create new variables to draw with  ---- */
        var hdi = map(data[selectedCountry].hdi,hdiLowest,hdiHighiest,windowHeight/2+250,startOfY);
        var population = int(map(data[selectedCountry].population,lowestPopulation,highiestPopulation,70,250));
        var gini = map(data[selectedCountry].gini,giniLowest,giniHighiest,0,population-population/3);
        var co2 = map(data[selectedCountry].co2, co2Lowest, co2Highiest, 180,0);
        
        /* ==== The Flag ==== */
        /* ---- Draw Flag Container ---- */
        fill(random(40,200),random(40,200),random(40,200));
        rect(startOfX,hdi,population,population-population/3);
                
        /* ---- Draw Gini Inner Container and use CO2 Emissions as color ---- */
        fill(0,co2,0);
        console.log(co2);
        rect(startOfX,hdi,population,gini);
        
        /* ---- Draw Flag HDI Line ---- */
        stroke('#aaaaaa');
        line(startOfX - 20,hdi,startOfX-5,hdi);  
        showCountryHdi.position(startOfX - 55,hdi-5); 
        
        /* ---- Save country to prevent redraw everytime ---- */
        previousCountry = selectedCountry;    
    }
    
}

/* ---- Watch for rezing of the screen ---- */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight/2+100);
    resetCanvas();
}

/* ---- Reset Canvas when needed ---- */
function resetCanvas(){
    background('#D2D7D3');
    countryName.remove();
    countryHdi.remove();
    countryGini.remove();
    countryPopulation.remove();
    countryCo2.remove();
    showCountryHdi.remove();
}

/* ---- Show descriptions when hover over them ---- */
function showWhenHover(element){
    if(selected){
        element.removeClass('fadeOutLeft');
        element.addClass('fadeInLeft'); 
        element.show();   
    }

}

/* ---- Hide descriptions when not hover over them ---- */
function hideWhenNoHover(element){
    element.addClass('fadeOutLeft');
    element.removeClass('fadeInLeft');
}

/* ---- Cursor Styles---- */
document.getElementById("hdi").style.cursor = "pointer";
document.getElementById("gini").style.cursor = "pointer";
document.getElementById("population").style.cursor = "pointer";
document.getElementById("co2").style.cursor = "pointer";