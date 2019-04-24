class GradientLayer{

  constructor(x, y,w,h, c1, c2, axis){

    this.x = x;
    this.y = y;
    this.c1 = c1;
    this.c2 = c2;
    this.axis = axis;
    this.w = w;
    this.h = h;

  }



show(x, y, c1, c2, axis){

  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + this.h; i+=resolutionScale) {
      let inter = map(i, y, y + this.h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c,255);
      line(x, i, x + this.w, i);
      }
    } else if (axis === X_AXIS) {
      // Left to right gradient
      for (let i = x; i <= x + this.w; i+=resolutionScale) {
        let inter = map(i, x, x + this.w, 0, 1);
        let c = lerpColor(c1, c2, inter);

        stroke(c,255);
        line(i, y, i, y + this.h);
      }
    }
  }

showAndMove(x, y, w, h, c1, c2, axis){

  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i+=6) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, 0);
      stroke(c);
      strokeWeight(2);
      //fill(c);
      line(x, i, x + w, i);
      }
    } else if (axis === X_AXIS) {
      // Left to right gradient
      for (let i = x; i <= x + w; i++) {
        let inter = map(i, x, x + w, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, y, i, y + h);
      }
    }
  }

  respawn(){

    for(let i = 0 ; i < gradientLayers.length; i++)
      {
        gradientLayers.splice(0);
      }
    for(let i = 0; i < images.length; i++){

    let w = random(0,images[i].width);
    gradientLayers.push(new GradientLayer(images[i].x, images[i].y, w, images[i].height, color1,color2, X_AXIS));
    }
    if(images.length > 2){
    let h = random(images[2].height);
    horizontalGradient = new GradientLayer(images[2].x, images[2].y,images[2].width,h, Y_AXIS);
    }

    print(gradientLayers.length);
  }
}
