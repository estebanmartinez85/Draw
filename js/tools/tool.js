export class Tool {

  constructor(canvas){
    this.canvas = canvas;
  }

  setupEvents(canvas){}



  createTemporaryLayer(){
    let tempCanvas = document.createElement('canvas');
    tempCanvas.width = this.pad.width;
    tempCanvas.height = this.pad.height;
    tempCanvas.style.position = "absolute";
    tempCanvas.style.left = "0";
    tempCanvas.style.top = "0";
    tempCanvas.style.zIndex = this.client.layerPosition + 1;
    tempCanvas.ctx = tempCanvas.getContext('2d');
    return tempCanvas;
  }
}