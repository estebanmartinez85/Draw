import {Brush} from "./tools/brush.js";
import {Line} from "./tools/line.js";
import {Clear} from "./tools/clear.js";

export const settings = {
  backgroundColor: "#222",
  Id: 'drawCanvas',
  width: 1024,
  height: 640,
  saves: 5,
  tools: [
    Brush,
    Line,
    Clear
  ]
};
