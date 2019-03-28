import {Tool} from "./tool.js";

export class Brush extends Tool {
  constructor(pad, client){
    super(pad, client);
    this.paint = false;
    this.prev = null;
  }

  setupEvents(){
    this.addEvent('mousedown', () => { this.paint = true; }, this.pad);
    this.addEvent('mouseup', () => { this.paint = false; this.prev = null; }, this.pad);
    this.addEvent('mousemove', (evt) => { this.paintOn(evt); }, this.pad);
    this.addEvent('mouseleave', () => { this.prev = null; }, this.pad);
  }

  paintOn(evt){
    if(this.paint) {
      let rect = this.pad.getBoundingClientRect();
      let pos = {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
      let p = this.pad.ctx.getImageData(pos.x, pos.y, 1,1);
      p.data[0] = 0;
      p.data[1] = 0;
      p.data[2] = 0;
      if(this.prev){
        this.pad.ctx.beginPath();
        this.pad.ctx.moveTo(this.prev.x, this.prev.y);
        this.pad.ctx.lineTo(pos.x, pos.y);
        this.pad.ctx.stroke();
      } else {
        this.pad.ctx.putImageData(p, pos.x, pos.y);
      }
      this.prev = pos;
    }
  }
}