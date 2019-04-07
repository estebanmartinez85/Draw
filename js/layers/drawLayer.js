import { Layer } from "./layer.js";

export class DrawLayer extends Layer {
    constructor(mainCanvas, index = 0){
        super(mainCanvas, index);
    }

    save(){
        let self = this;
        let oldImageData = this.canvas.ctx.getImageData(0,0,this.canvas.width, this.canvas.height);
        return () => {
            self.canvas.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
            self.canvas.ctx.putImageData(oldImageData, 0, 0);
        }
    }
}