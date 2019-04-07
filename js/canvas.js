import { DrawLayer } from "./layers/drawLayer";

export class Canvas {
  constructor(elementId, width, height){
    this.width = width; 
    this.height = height;
    this.saves = [];
    this.observers = [];
    this.tool = null;
    this.layers = [];
    this.layerIndex = 0;
    this.currentLayer = null;
    this.events = [];
    app.modules.forEach((mod) => this.observers.push(mod));
    
    this.element = document.getElementById(elementId);

    let layer = new DrawLayer(this);
    this.element.insertAdjacentElement('beforeend', layer);
    this.addLayer(layer);
  }

  addLayer(layer){
    this.layers.push(layer);
    this.layer = layer;
    this.layerIndex = this.layers.length - 1;
  }

  changeLayer(index){
    this.layer = this.layers[index];
    this.layerIndex = index;
  }

  notifyObservers(){
    this.observers.forEach((obs) => obs.notify());
  }

  addEvent(eventName, handler, option = false){
    this.events.push({eventName: eventName, handler: handler, layer: this.layer, option: option});
    this.layer.canvas.addEventListener(eventName, handler, option);
  }
  
  clearEvents(){
    for(let u of this.events){
      u.layer.removeEventListener(u.eventName, u.handler, u.option);
    }
  }

  save(){
    this.saves = this.layers[this.layerIndex].save();
  }
}