import {Tool} from "./tool.js";

export class Clear extends Tool{
  constructor(layers, client){
    super(layers, client);
    console.log(layers);
    for(let l in layers){
      for(let o in layers[l].overlays){
        o.remove();
      }
      layers[l].overlays.splice(0, layers[l].overlays.length - 1);
      layers[l].overlay.ctx.clearRect(0,0,layers[l].overlay.width, layers[l].overlay.height);
    }
  }
}