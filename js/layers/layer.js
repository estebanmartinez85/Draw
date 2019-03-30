export class Layer {
  constructor(canvas, width, height, index) {
    this.mainCanvas = canvas;

    this.createCanvas(width, height, index);
    this.setBGColor("#FFF");
    this.createPad();

    this.snapshots = [];
    this.saves = { undo: [], redo: [] };
  }

  createCanvas(width, height, index){
    this.index = index;
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.left = '0';
    this.canvas.style.top = '0';
    this.canvas.setAttribute('id', 'canvas');
    this.canvas.ctx = canvas.getContext('2d');
  }

  createPad() {
    this.pad = document.createElement('canvas');
    this.pad.width = this.canvas.width;
    this.pad.height = this.canvas.height;
    this.pad.style.position = "absolute";
    this.pad.style.left = "0";
    this.pad.style.top = "0";
    this.pad.setAttribute('id', 'layerPad');
    this.pad.ctx = this.pad.getContext('2d');
  }

  setIndex(index) {
    this.index = index;
    this.canvas.style.zIndex = index;
    for(let i in this.snapshots){
      this.snapshots[i].style.zIndex = this.index + i;
    }
    this.pad.style.zIndex = index + this.overlays.length;
  }

  setBGColor(bgColor) {
    this.canvas.style.backgroundColor = bgColor;
    this.canvas.ctx.fillStyle = bgColor;
    this.canvas.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
  }

  createOverlay() {
    let overlay = document.createElement('canvas');
    overlay.width = this.canvas.width;
    overlay.height = this.canvas.height;
    overlay.style.position = "absolute";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.setAttribute('id', 'overlay');
    overlay.ctx = overlay.getContext('2d');

    // let overlayIndex = this.snapshots.length;
    // overlay.style.zIndex = (this.index + (overlayIndex + 1)).toString();
    // this.snapshots.push(overlay);
    //
    // if (overlayIndex === 0) {
    //   this.canvas.insertAdjacentElement('afterend', overlay);
    // } else {
    //   this.pad.insertAdjacentElement('beforebegin', overlay);
    // }
  }

  save(){

  }
}