export class Layer {
  constructor(width, height, index = 0) {
    this.index = index;

    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    
    this.canvas.style.left = '0';
    this.canvas.style.top = '0';
    this.canvas.style.zIndex = index;
    this.canvas.style.position = 'absolute';
    
    this.canvas.setAttribute('id', 'layerCanvas');
    this.canvas.ctx = canvas.getContext('2d');
  }

  setIndex(index) {
    this.index = index;
    this.canvas.style.zIndex = index;
  }

  save(){
    
  }
}