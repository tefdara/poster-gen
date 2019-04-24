let time = 0;

const flock = [];
const lines = [];
var boxes = [];
let globalScale = 100;

var gridScalar = 16;

var resolutionScale = 1;
var resolutionScaleMin = 1;
var resolutionScaleMax = 3;

var changeResolution = ['x1', 'x2', 'x3'];

var grid;
var box;
//var l;
//
// Image gradient layer
let gradientLayers = [];
let horizontalGradient;
let color1, color2;
var c1 = [0,0,0];
var c2 = [255,255,13];
const Y_AXIS = 1;
const X_AXIS = 2;

//Barcode gradient Layer
let linesGradient = [];

var backgroundColor = [240,240,240];

 var landscape = true;
 var startTimer = false;
// var clickLandscape = true;

//Gui bools
var showBoxes = true;
var showGrid = true;
var showLines = true;
var showYellowLines = true;
var saveSketch = false;

//images
var imagesGui = ['VRGirl', 'Robots', 'SensorGirl'];
//the main image holding positions etc.

//images
let pics = [];
let images = [];
let logos = [];
let img2;
let img3;
let myFont;
var applyGradientToImage = false;

//GUI
let gui;
let gui2;
var landscapeButton;
var portraitButton;
let resolutionSlider;

let lineCount = 700;

var timeIsUp = false;

function preload() {
  loadImages();
  myFont = loadFont('assets/Fifty-Semibold-CAPS.otf');
}


function setup() {

  frameRate(30);
  colorMode(RGB);
  //
  // landscapeButton = createButton('landscape');
  // portraitButton = createButton('Portrait');
  // landscapeButton.mousePressed(makeLandscape);
  // portraitButton.mousePressed(makePortrait);
  //
  // resolutionSlider = createSlider(1,3,1,1);
  // resolutionSlider.mouseReleased(changeScale);
  //createP('');

  createCanvas(1920 * resolutionScale, 1080 * resolutionScale);


  grid = new Grid();
  box = new MyBox();


  for(let i = 0; i < 112; i++){
    flock.push(new Boid());
  }

  for(let i = 0; i <  grid.gridSize/3; i++){
    boxes.push(new MyBox());
  }

  for(let i = 0; i < box.pos.length; i++){
     boxes[i].position = createVector(boxes[i].pos[i].x, boxes[i].pos[i].y);
  }


  for(let i = 0 ; i < resolutionScale * lineCount; i++){
    lines.push(new Line());
    lines[i].position = createVector(lines[i].position.x, lines[i].position.y + random(0,height));
  }

  // for(let i = 0; i < 3; i++){
  //   let p = new myImage(pics[i]);
  //   images.push(p);
  // }

  spawnNonOverlappingImages();

  setUpImageGradient();

  for(let i = 0; i < 2; i++){
  linesGradient.push(new GradientLayer(0,0,lines[1].length, height,color1,color2,Y_AXIS));
  }
  //gradient layer
  //c1 = color(255,255,77);

  textFont(myFont);
  textSize(56 * resolutionScale);

  gui = createGui('Basic Options', 1,20);
  gui2 = createGui('Save!', 1,470);
  gui2.addGlobals('saveSketch');
  gui.addGlobals('globalScale', 'changeResolution', 'myFont', 'l', 'resolutionScale', 'showBoxes', 'showGrid', 'showLines', 'showYellowLines', 'landscape',
  'backgroundColor', 'c1', 'c2' );

}





function draw() {


  background(backgroundColor);
  renderGrid();
  renderBoxes();


  drawImage();
  for(let i = 0; i < flock.length; i++){
    fill(0);

    textSize(56 * resolutionScale);
    text('Creative', flock[20].position.x  , 50 * resolutionScale);
    text('Informatics', flock[22].position.x  , 100 * resolutionScale);
  }


  drawImageGradient();

  renderLines();
  renderYellowLines();

  if(saveSketch){
    save('ci-data-driven-poster.jpg');
    saveSketch = !saveSketch;

  }
    // image(logos[0], grid.pos[0].y, height - grid.gridScale, width/20,height/26);
    // image(logos[1], grid.pos[0].y, height - grid.gridScale * 1.9 , width/4,height/4);
    // image(logos[2], grid.pos[3].y, height - grid.gridScale , width/14,height/19);
    // image(logos[3], grid.pos[4].y + grid.gridScale/3, height - grid.gridScale , width/10,height/19);
    // image(logos[4], grid.pos[6].y  , height - grid.gridScale , width/9,height/19);



  // for(let i = 0; i < images.length; i++){
  //
  //   //gradientLayers[0].show(images[0].x, images[0].y, images[0].width, images[0].height/2, color1,color2, X_AXIS);
  //   //gradientLayers[1].show(images[1].x, images[1].y, images[1].width/2, images[1].height, color1,color2, Y_AXIS);
  //   //gradientLayers[floor(random(i))].show(images[i].x, images[i].y, images[i].width/2, images[i].height, color1,color2, Y_AXIS);
  //
  //   // fill(color1);
  //   // noStroke();
  //   //rectMode(CORNER);
  //   //rect(images[i].x, images[i].y, images[i].width/2, images[i].height);
  // }
  //tint(255,127);



 startTimer = !landscape;
 if(startTimer){
   timeIsUp = timer(0.5);
   if(timeIsUp){
     print("tine");
     for(let i = 0 ; i < lineCount; i++){
       lines[i].position.y += random(0,height);
     }
   }
   //time = 0;
 }

}

//resizeCanvas(1080 * resolutionScale, 1920 * resolutionScale);

function mousePressed() {
  // changeScale();
  // if(landscape){
  //   makeLandscape();
  // }
  // else if(!landscape){
  //   makePortrait();
  // }
}

function mouseReleased() {
  responsiveGrid();
}

function mouseDragged(){

}

//resizeCanvas(1080 * resolutionScale, 1920 * resolutionScale);

//Main Elements

//----------------------------
//--// initialisations
function initialiseGrid(){

}
//----------------------------
//--// The Grid
function renderGrid(){

 if(showGrid){
   for(let i = 0; i < grid.gridSize; i++){
     //boid.flock(flock);
     flock[i].alignWithGrid(flock, grid);
     flock[i].show();
     //  boid.update();
   }
 }
}
//----------------------------
//--// The Boxes
function renderBoxes(){

  if(showBoxes){

    for(let box of boxes){
      box.show();
      box.adjustPosition(box);
    }

    for(let i = 0; i < grid.gridSize / 3; i++){
      boxes[floor(random(grid.gridSize/7,grid.gridSize/3))].drawLine();
    }

    for(let i = 0; i < grid.gridSize / 3; i++){
      boxes[floor(random(grid.gridSize/4,grid.gridSize/3))].drawLineAcross();
      }
  }
}
//----------------------------
//--// The Lines

function renderLines(){

  if(showLines){
    for(let l of lines){
      l.show();
      l.spawn(lines);
    }
  }
}

function renderYellowLines(){

  if(showYellowLines){
    linesGradient[0].showAndMove(0,0, lines[1].length, random(height * +30),color2,color1,Y_AXIS);
    linesGradient[1].showAndMove(width - lines[1].length,0, lines[1].length, random(height * +30),color2,color1,Y_AXIS);
  }
}

function responsiveGrid(){

  if(landscape){
  resizeCanvas(1080 * resolutionScale, 1920 * resolutionScale);
  }
  else if(!landscape){
    resizeCanvas(1920 * resolutionScale, 1080 * resolutionScale);
  }

  grid.reSizeGrid();

  for(let cross of flock){
    cross.respawn();
  }
  for(let box of boxes){
    box.respawn();
  }
  for(let l of lines){
    l.respawn();
  }

  for(let image of images){
    image.respawn();
  }

  for(let gradient of gradientLayers){
    gradient.respawn();
  }


}

function loadImages(){

    for(let i = 0; i < 3; i++){
      pics[i] = loadImage('assets/images/Picture' + i + '.jpg');
    }

    for(let i =0; i < 5; i++){
      logos[i] = loadImage('assets/images/logo' + i + '.PNG');
    }
}

function drawImage(){

    // if(applyGradientToImage){
    //   tint(c1);
    // }
    for(let image of images){
      image.show();
    }

    // if(grid.pos[pic.posSeed].x > (1920/4)*resolutionScale && grid.pos[pic.posSeed].x <  width - (1920/4)*resolutionScale)
    // {
    //   image(img, pic.pos[pic.posSeed].x , pic.pos[pic.posSeed].y, (1920/4)*resolutionScale,(1200/4)*resolutionScale);
    // }
    // if(grid.pos[pic.posSeed].x < (1920/4)*resolutionScale){
    //
    //   image(img, pic.pos[pic.posSeed].x + (1920/4)*resolutionScale , pic.pos[pic.posSeed].y, (1920/4)*resolutionScale,(1200/4)*resolutionScale);
    // }
    // if(grid.pos[pic.posSeed].x >  width - (1920/4)*resolutionScale){
    //   image(img, pic.pos[pic.posSeed].x - (1920/4)*resolutionScale , pic.pos[pic.posSeed].y, (1920/4)*resolutionScale,(1200/4)*resolutionScale);
    // }

    //print(pic.pos[1].x);
    //image(img2, flock[floor(random(0,111))].position.x, flock[floor(random(0,111))].position.y, (1920/4)*resolutionScale,(1200/4)*resolutionScale);
    //image(img2, flock[floor(random(0,111))].position.x, flock[floor(random(0,111))].position.y, (1920/4)*resolutionScale,(1200/4)*resolutionScale);
}

function spawnNonOverlappingImages(){

  var protection = 0;
  while (images.length < 4) {
  // Pick a random circle

  var imageIndex = random(pics);
  var imag = new myImage(imageIndex);

  //cheking to see if it's in grid and not the same image
  var outsideGrid = false;
  var sameImage = false;
  //var missingImage = true;
  // Does it overlap any previous circles?
  var overlapping = false;
  for (var j = 0; j < images.length; j++) {
    var other = images[j];
    var d = dist(imag.x, imag.y, other.x, other.y);
    if (d < imag.width + grid.gridScale) {
    overlapping = true;
    }
    if(imag.img == other.img) sameImage = true;
  }

  //detecting placments that are too close to the edges
  var edgeLeft = dist(imag.x, imag.y, 0,imag.y);
  var edgeRight = dist(imag.x, imag.y, width, imag.y);
  var edgeBottom = dist(imag.x, imag.y, imag.x, height);
  if(edgeRight < imag.width + grid.gridScale || edgeBottom < imag.height + grid.gridScale) outsideGrid = true;

  //all images added?
  //if(images.length == 3) missingImage = true;
  // If not keep it!
  if (!overlapping && !outsideGrid && !sameImage) {
    images.push(imag);
  }

  // Are we stuck?
  protection++;

  if (protection > 1000) {
    break;
  }
 }

 print(images.length);
}

function makePortrait(){
  resizeCanvas(1080 * resolutionScale, 1920 * resolutionScale);
  grid.reSizeGrid();
  for(let cross of flock){
    cross.respawn();
  }
  for(let box of boxes){
    box.respawn();
  }
  for(let l of lines){
    l.respawn();
  }

  for(let image of images){
    image.respawn();
  }

  for(let gradient of gradientLayers){
    gradient.respawn();
  }
}

function makeLandscape(){
  resizeCanvas(1920 * resolutionScale, 1080 * resolutionScale);
  grid.reSizeGrid();
  for(let cross of flock){
    cross.respawn();
  }
  for(let box of boxes){
    box.respawn();
  }
  for(let l of lines){
    l.respawn();
  }

  for(let image of images){
    image.respawn();
  }

  for(let gradient of gradientLayers){
    gradient.respawn();
  }
}

function changeScale(){

  switch(changeResolution){

    case 'x1':
    resolutionScale = 1;
    grid.reSizeGrid();

    for(let cross of flock){
      cross.respawn();
    }
    for(let box of boxes){
      box.respawn();
    }
    for(let l of lines){
      l.respawn();
    }

    for(let image of images){
      image.respawn();
    }

    for(let gradient of gradientLayers){
      gradient.respawn();
    }
    break;

    case 'x2':
    resolutionScale = 2;
    grid.reSizeGrid();

    for(let cross of flock){
      cross.respawn();
    }
    for(let box of boxes){
      box.respawn();
    }
    for(let l of lines){
      l.respawn();
    }

    for(let image of images){
      image.respawn();
    }

    for(let gradient of gradientLayers){
      gradient.respawn();
    }
    break;

    case '3':
    resolutionScale = 3;
    grid.reSizeGrid();

    for(let cross of flock){
      cross.respawn();
    }
    for(let box of boxes){
      box.respawn();
    }
    for(let l of lines){
      l.respawn();
    }

    for(let image of images){
      image.respawn();
    }

    for(let gradient of gradientLayers){
      gradient.respawn();
    }
    break;
  }
}

function timer(t){
  //time = 0;
  time += (frameCount%10)/60;

  if(time > t){
    return true;
  }
}

function setUpImageGradient(){
  color2 = color(0,0,0);
  color1 = color(255,255,13);
  for(let i = 0; i < images.length; i++){
    let w = random(0,images[i].width);
    gradientLayers.push(new GradientLayer(images[i].x, images[i].y, w, images[i].height, color1,color2, X_AXIS));
  }
  if(images.length > 2){
  let h = random(images[2].height);
  horizontalGradient = new GradientLayer(images[2].x, images[2].y,images[2].width,h);
  }
}

function drawImageGradient(){

  color1 = color(c1);
  color2 = color(c2);
  gradientLayers[0].show(images[0].x, images[0].y, color1,color2, Y_AXIS);
  gradientLayers[1].show(images[1].x, images[1].y,color1,color2, X_AXIS);
  if(images.length > 2){
  horizontalGradient.show(images[2].x, images[2].y,color1,color2, Y_AXIS);
  }
}
