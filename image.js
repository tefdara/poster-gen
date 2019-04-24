class myImage{

  constructor(image){
    this.pos = [];
    this.scaleX = 1920/4;
    this.scaleY = 1200/4;
    this.width = this.scaleX * resolutionScale;
    this.height = this.scaleY * resolutionScale;
    this.img = image
    this.logos = [];
    this.posSeed = floor(random(0,grid.pos.length));

    // for(let x = grid.gridScale; x += grid.gridScale; x < width - grid.gridScale ){
    //   for(let y = grid.gridscale; y += grid.gridScale; y < height - grid.gridscale){
    //     let randGridLoc = createVector(x,y);
    //     this.pos.push(randGridLoc);
    //   }
    // }

    // if(random(grid.pos).x > grid.gridScale && random(grid.pos).x < width - grid.gridScale){
    //
    // }
    this.randPos = random(grid.pos);
    this.x = this.randPos.x;
    this.y = this.randPos.y;

  }

  show(){

    //if(this.randPos.x > grid.gridScale && this.randPos.x < width - grid.gridScale * 4 && this.randPos.y > grid.gridScale && this.randPos.y < height - grid.gridScale * 4){
    image(this.img, this.x, this.y, this.width, this.height);
    // }
  }


  respawn(){

    for(let i = 0; i < this.randPos; i++){
      this.randPos.splice(0);
    }

    this.randPos = random(grid.pos);
    this.x = this.randPos.x;
    this.y = this.randPos.y;

    for(let i = 0; i < images.length; i++){
      images.splice(0);
    }
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

  }
}
