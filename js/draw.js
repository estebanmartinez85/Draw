import {settings} from "./settings.js";
import {DrawClient} from "./drawClient.js";

const main = ((settings) => {
  const toolNames = {};
  let layers = [];
  let saves = { undo: [], redo: [] };
  let pad;
  let client = new DrawClient();
  let img = new Image();


  function loadTool(toolName) {
    return function(e) {
      if(client.tool) client.tool.clearEvents();
      client.tool = new toolNames[toolName](pad, client);
      client.tool.setupEvents();
    }
  }

  function createPad(){
    let canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.width = settings.width;
    canvas.height = settings.height;
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.setAttribute('id', 'pad');
    canvas.style.zIndex = 9999999;

    let parent = document.getElementById(settings.Id);
    parent.style.height =  settings.height;
    parent.style.width = settings.width;
    parent.setAttribute("style",`position: absolute; width: ${settings.width}px; height: ${settings.height}px`);
    parent.appendChild(canvas);

    pad = canvas;
    pad.save = () => {
      saves.undo.push({
          layerPosition: client.layerPosition,
          canvas: layers[client.layerPosition].canvas,
          overlayPosition: layers[client.layerPosition].overlays.length,
          overlay: layers[client.layerPosition].overlays[layers[client.layerPosition].overlays.length - 1]
      });
      if(saves.undo.length === settings.saves + 1) {
        let shifted = saves.undo.shift();
        console.log(shifted.canvas);
        shifted.canvas.ctx.drawImage(shifted.overlay , 0, 0);
        layers[shifted.layerPosition].overlays[shifted.overlayPosition - 1].remove();
        layers[shifted.layerPosition].overlays.shift();

        for(let o in layers[shifted.layerPosition].overlays){
          layers[shifted.layerPosition].overlays[o].style.zIndex = parseInt(o) + 1;
        }

        for(let i in saves.undo){
          saves.undo[i].overlayPosition = saves.undo[i].overlayPosition - 1;
        }

      }
      saves.redo.splice(0,saves.redo.length);
      createOverlay(client.layerPosition);
    };

    window.addEventListener('keydown', (evt) => {
      if(evt.code === 'KeyL') addLayer();
      if(evt.code === 'KeyZ') {
        img.src = './icons/line_icon.png';
        layers[0].canvas.ctx.drawImage(img, 200, 200);

        if(saves.undo.length > 0){
          console.log("UNDO");
          let lastLayer = saves.undo.pop();
          let layer = layers[lastLayer.layerPosition];

          layer.overlays[lastLayer.overlayPosition - 1].remove();
          layer.overlays.splice(lastLayer.overlayPosition - 1, 1);

           for(let i in layer.overlays){
             layer.overlays[i].style.zIndex = (lastLayer.layerPosition * 1000) + parseInt(i) + 1;
           }

           saves.redo.push(lastLayer);
           console.log(saves.redo);
        }
      }
      if(evt.code === 'KeyR'){
        console.log('Rotating');
        let c = layers[0].canvas;
        c.ctx.clearRect(200,200,32,32);
        c.ctx.translate(216,216);
        c.ctx.rotate(Math.PI / 180);
        c.ctx.translate(-216,-216);
        c.ctx.drawImage(img, 200, 200);    
        
        let t = c.cloneNode();
        t.ctx = t.getContext('2d');
        t.ctx.drawImage(c, 0,0);
        console.log(t.ctx);
        c.ctx.drawImage(t, 250, 250);

      }
      if(evt.code === 'KeyX'){
        if(saves.redo.length > 0){
          console.log("REDO");
          let lastLayer = saves.redo.pop();
          let layer = layers[lastLayer.layerPosition];

          layer.overlays[layer.overlays.length - 1].insertAdjacentElement('beforebegin', lastLayer.overlay);
          layer.overlays.splice(lastLayer.overlayPosition - 1, 0, lastLayer.overlay);
          for(let i in layer.overlays){
            layer.overlays[i].style.zIndex = (lastLayer.layerPosition * 1000) + parseInt(i) + 1;
          }
          saves.undo.push(lastLayer);
        }
      }
      if(evt.code === 'KeyC'){
        console.log("CLEAR");
        for(let layer of layers){
          for(let overlay of layer.overlays){
            overlay.remove();
          }
          layer.overlays.splice(0, layer.overlays.length);
          layer.overlay.remove();
        }
        layers.splice(0, layers.length);

        addLayer(settings.backgroundColor);
      }

    });
  }

  function addLayer(backgroundColor = null){
    let canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.width = settings.width;
    canvas.height = settings.height;
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.setAttribute('id', 'canvas');
    canvas.style.zIndex = (layers.length * 1000).toString();
    document.getElementById(settings.Id).appendChild(canvas);

    canvas.ctx = canvas.getContext('2d');
    if(backgroundColor !== null) {
      canvas.ctx.fillStyle = backgroundColor;
      canvas.ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    layers.push({canvas: canvas, overlays: []});
    client.layerPosition = layers.length - 1;
    createOverlay(layers.length - 1);
  }

  function setLayer(index){
    let overlayIndex = layers[index].overlays.length - 1;
    pad.ctx = layers[index].overlays[overlayIndex].getContext('2d');
    client.layerPosition = index;
  }

  function createOverlay(layerIndex){
    let overlay = document.createElement('canvas');
    overlay.width = pad.width;
    overlay.height = pad.height;
    overlay.style.position = "absolute";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.setAttribute('id', 'overlay');
    overlay.ctx = overlay.getContext('2d');

    let overlayIndex = layers[layerIndex].overlays.length;
    overlay.style.zIndex = (layerIndex * 1000) + (overlayIndex + 1); //(parseInt(layers[layerPosition].overlay.style.zIndex) + overlayPosition + 1).toString();
    layers[layerIndex].overlays.push(overlay);

    if(parseInt(overlayIndex) === 0) {
      layers[layerIndex].canvas.insertAdjacentElement('afterend', overlay);
    } else {
      layers[layerIndex].overlays[overlayIndex - 1].insertAdjacentElement('afterend', overlay);
    }

    pad.ctx = overlay.getContext('2d');
  }

  function loadMenu(){
    let menu = document.querySelector('#DrawMenu');

    if(menu) {
      for (let tool in toolNames) {
        if(toolNames.hasOwnProperty(tool))
        {
          let btn = document.createElement('input');
          btn.setAttribute("type", 'image');

          let name = tool.toLowerCase();
          btn.src = `./icons/${name}_icon.png`;
          btn.addEventListener('click', loadTool(tool));

          menu.appendChild(btn);
        }
      }
    }
  }

  function loadPlugins() {
    for (let t in settings.tools) {
      if (settings.tools.hasOwnProperty(t)) {
        let name = settings.tools[t].name;
        if (name) {
          toolNames[name] = settings.tools[t];
        }
      }
    }
  }

  createPad();
  addLayer(settings.backgroundColor);
  setLayer(0);
  loadPlugins();
  loadMenu();
})(settings);