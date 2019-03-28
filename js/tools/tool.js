export class Tool {

  constructor(pad, client){
    this.pad = pad;
    this.client = client;
    this.events = [];
    this.addEvent('mouseup', () => { this.pad.save(); }, this.pad);
  }

  setupEvents(canvas){

  }

  addEvent(eventName, handler, layer, option = false){
    this.events.push({eventName: eventName, handler: handler, overlay: layer, option: option});
    layer.addEventListener(eventName, handler, option);
  }

  clearEvents(){
    for(let u of this.events){
      u.overlay.removeEventListener(u.eventName, u.handler, u.option);
    }
  }

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