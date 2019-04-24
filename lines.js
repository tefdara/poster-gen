class Line{




  constructor(){

      this.length = 60 * resolutionScale;
      this.position = createVector (width-this.length,  0);
      this.positionLeft = createVector (0,  0);
      this.strokeWeight = resolutionScale/1.5;
  }



  show(){
      stroke(0);
      strokeWeight(this.strokeWeight);
      this.length = 60 * resolutionScale;
      line(this.position.x, this.position.y,
        this.position.x + this.length, this.position.y);
        line(this.positionLeft.x, this.position.y,
          this.positionLeft.x + this.length, this.position.y);


  }

  spawn(lineArray){
      for(let i = 0; i < lineArray.length; i++){
          //if(lineArray[i].position.x > width/2)
          lineArray[i].position.y += random(0,1);
          //if(lineArray[i].position.x < width/2)
          //lineArray[i].position = createVector(this.positionLeft.x, this.position.y + random(0,1) * i);
          if(lineArray[i].position.y > height) lineArray[i].position.y = 0;
      }

  }

  respawn(){

    this.position = createVector (width-this.length,  0);

  }





}
