var data;

function preload(){
    data = loadJSON('../data/basicdata.json', gotData);
}

function setup(){
    canvas = createCanvas(170, 700);
    canvas.parent('canvas');
    noStroke();
}

function draw() {
    fill(random(40,200),random(40,200),random(40,200));
    rect(0,0,width,110);

    fill(random(40,200),random(40,200),random(40,200));
    for(var i = 0; i < random(0,3); i++){
        strips();
    }
    

    if(random() > 0.8){
        fill(random(40,200),random(40,200),random(40,200));
        for(var i = 0; i < 2; i++){
            for(var j = 0; j < 2; j++){ 
                fivePointStar(30+i*25,30+j*25,5);
            }
        }
    }
    else if(random() > 0.1){
        fill(random(20,250),random(40,200),random(40,250));
        fivePointStar(random(36,50),random(36,50),random(5,20));
     }
    
    // Stick
    fill(255);
    rect(0,0,-10,windowHeight);
    frameRate(0.5);
}

function gotData(data){
    println(data.Norway.population);
}

function star(x, y, radius1, radius2, npoints,count) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (count; count < TWO_PI; count += angle) {
    var sx = x + cos(count) * radius2;
    var sy = y + sin(count) * radius2;
    vertex(sx, sy);
    sx = x + cos(count+halfAngle) * radius1;
    sy = y + sin(count+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function fivePointStar(x,y,size){
    star(x,y, size, size*2, 5, 0.95); 
}

function strips(){
    fill(pastelColors());
    rect(0,0,width,random(0,100));
}

function tenPointStar(){
    star(random(20,width-20), random(20,height/2), 20, 10, 10, 0); 
}

// Random Pastel colors
function pastelColors(){
    var r = (Math.round(Math.random()* 127) + 127).toString(16);
    var g = (Math.round(Math.random()* 107) + 127).toString(16);
    var b = (Math.round(Math.random()* 127) + 127).toString(16);
    return '#' + r + g + b;
}