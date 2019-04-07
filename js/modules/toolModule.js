import { Module } from "./module.js";

export class ToolModule extends Module {
    constructor(canvas, parentElement){
        super(canvas, parentElement);
    }

    loadTool(toolName) {
        return function(e) {
          if(this.canvas.tool) this.canvas.tool.clearEvents();
          this.canvas.tool = new toolNames[toolName](pad, client);
          this.canvas.tool.setupEvents();
        }
      }
    
    onCanvasChanged(){

    }
}