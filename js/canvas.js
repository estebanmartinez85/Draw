export class Canvas {
  constructor(app){
    this.app = app;
    this.saves = [];
    this.context = null;
    this.observers = [];
    this.tool = null;
    this.layers = [];
    this.layerIndex = 0;
    app.modules.forEach((mod) => this.observers.push(mod));
    
  }

  addLayer(layer){
    this.layers.push(layer);
    this.context = layer.canvas.ctx;
    this.layerIndex = this.layers.length - 1;
  }

  notifyObservers(){
    this.observers.forEach((obs) => obs.notify());
  }
  
}