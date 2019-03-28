import {Tool} from "./tool.js";
import {settings} from "../settings.js";

export class Line extends Tool {
  constructor(layers, client){
    super(layers, client);
    this.startPoint = { x:0, y:0 };
    this.layer = this.createTemporaryLayer();
  }

  setupEvents(){
    this.addEvent('mousedown', (evt) => {
      this.pad[this.client.layerPosition].insertAdjacentElement('afterend', this.overlay);
      const rect = this.overlay.getBoundingClientRect();
      this.startPoint.x = evt.clientX - rect.left;
      this.startPoint.y = evt.clientY - rect.top;
    }, this.pad[this.client.layerPosition]);
    this.addEvent('mousemove', (evt) => {
      this.overlay.ctx.clearRect(0,0,this.overlay.width, this.overlay.height);
      const rect = this.overlay.getBoundingClientRect();
      this.overlay.ctx.beginPath();
      this.overlay.ctx.moveTo(this.startPoint.x, this.startPoint.y);
      this.overlay.ctx.lineTo(evt.clientX - rect.left,evt.clientY - rect.top);
      this.overlay.ctx.stroke();
    }, this.overlay);
    this.addEvent('mouseup', () => {
      this.pad[this.client.layerPosition].ctx.drawImage(this.overlay,0,0);
      this.overlay.ctx.fillStyle = settings.backgroundColor;
      this.overlay.ctx.clearRect(0,0,this.overlay.width, this.overlay.height);
      this.overlay.remove();
    }, this.overlay);
    this.addEvent('mouseleave', () => {
      this.overlay.ctx.fillStyle = settings.backgroundColor;
      this.overlay.ctx.clearRect(0,0,this.overlay.width, this.overlay.height);
      this.overlay.remove();
    }, this.overlay);
  }
}