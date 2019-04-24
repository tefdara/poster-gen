class Grid{

  constructor () {

   this.gridScale = 120 * resolutionScale;

    this.pos = [];
    for(let i = this.gridScale; i < width ; i+= this.gridScale){
        for(let j = this.gridScale; j < height - this.gridScale; j+= this.gridScale){
          let gridPos = createVector(i,j);
          this.pos.push(gridPos);
        }
    }

    this.gridSize = this.pos.length;
  }

 reSizeGrid(){

  this.gridScale = 120 * resolutionScale;
  let gridPos;
    for(let i = this.gridScale ; i < width ; i+=this.gridScale){
        for(let j = this.gridScale; j < height - this.gridScale; j+=this.gridScale){
            this.pos.splice(0);
            //print(this.pos[20].x);
        }
    }

    for(let i = this.gridScale ; i < width ; i+=this.gridScale){
        for(let j = this.gridScale; j < height - this.gridScale; j+=this.gridScale){
          let gridPos = createVector(i,j);
          this.pos.push(gridPos);
        }
    }

    this.gridSize = this.pos.length;
  }
}
