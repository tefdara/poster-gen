class MyBox{



constructor(){

    this.position = createVector(0,0);
    this.size = 120 * resolutionScale;
    this.strokeWeight = resolutionScale/1.5;

    this.pos = [];

    for(let i = 0; i < grid.gridSize / 3; i++){
      let gridPos = createVector(grid.pos[floor(random(0,grid.gridSize))].x, grid.pos[floor(random(0,grid.gridSize))].y );
      //let gridPos = createVector = createVector(flock[floor(random(0,grid.gridSize))].position.x, flock[floor(random(0,grid.gridSize))].position.y);
      this.pos.push(gridPos);
    }
}


show(){

  rectMode(CENTER);
  stroke(0);
  noFill();
  rect(this.position.x, this.position.y, this.size, this.size);

}

adjustPosition(){

  for(let i = 0; i < box.pos.length; i++){
     boxes[i].position = createVector(boxes[i].pos[i].x * resolutionScale, boxes[i].pos[i].y * resolutionScale);
  }
}


drawLine(){

  stroke(0);
  strokeWeight(this.strokeWeight);
  noFill();
  line(this.position.x + this.size/2, this.position.y - this.size/2, this.position.x - this.size/2, this.position.y + this.size/2);

}

drawLineAcross(){

  stroke(0);
  strokeWeight(this.strokeWeight);
  fill(0);
  line(this.position.x - this.size/2, this.position.y - this.size/2, this.position.x + this.size/2, this.position.y + this.size/2);

}

alignWithGrid(boxes, flock){

    for(let i = 0; i < boxes.length/3; i++){
      boxes[i].position = createVector(boxes[i].position.x * resolutionScale, boxes[i].position.y * resolutionScale);
    }
    //noLoop();
}

respawn(){

  // for(let i = 0; i < grid.gridSize / 3; i++){
  //   this.pos.splice(0);
  // }
  // for(let i = 0; i < grid.gridSize / 3; i++){
  //   let gridPos = createVector(grid.pos[floor(random(0,grid.gridSize))].x, grid.pos[floor(random(0,grid.gridSize))].y );
  //   this.pos.push(gridPos);
  // }

  for(let i = 0; i <  grid.gridSize/3; i++){
    boxes.splice(0);
  }

  for(let i = 0; i <  grid.gridSize/3; i++){
    boxes.push(new MyBox());
  }

  for(let i = 0; i < box.pos.length; i++){
     boxes[i].position = createVector(boxes[i].pos[i].x, boxes[i].pos[i].y);
  }

}





}
