class Boid{



 constructor () {

  this.position = createVector(random(width), random(height));
  this.velocity = p5.Vector.random2D();
  this.velocity.setMag(random(5,10));
  this.acceleration = createVector();

  this.lineSize = 10 * resolutionScale;
  this.strokeWeight = resolutionScale/2;
 }

align(boids){

    let localRadius = 50;
    let count = 0;
    let steering = createVector();

    for(let other of boids){
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if(other != this && d < localRadius){
        steering.add(other.velocity);
        count++;
      }
    }
    if(count > 0){
      steering.div(count);
      steering.sub(this.velocity);
    }
    return steering;
}

flock(boids){

    let alignment = this.align(boids);
    this.acceleration = alignment;

}

alignWithGrid(boids, grid){

    for(let i = 0; i < grid.gridSize; i++){
      boids[i].position = createVector(grid.pos[i].x, grid.pos[i].y);
    }
}


 update(){

   this.position.add(this.velocity);
   this.velocity.add(this.acceleration);
 }




  show(){

    strokeWeight(this.strokeWeight);
    stroke(0);
    line(this.position.x , this.position.y, this.position.x, this.position.y - this.lineSize);
    line(this.position.x , this.position.y, this.position.x, this.position.y + this.lineSize);
    line(this.position.x - this.lineSize, this.position.y, this.position.x + this.lineSize, this.position.y);
  }

  respawn(){

    for(let i = 0; i < grid.gridSize; i++){
      flock.splice(0);
    }
    for(let i = 0; i < grid.gridSize; i++){
      flock.push(new Boid());
    }

    print(flock.length);
  }


}
