import {MyCanvas} from "./app/MyCanvas";

export function main() {

  const myCanvas = new MyCanvas();

  myCanvas.appendToBody();

  const input = document.createElement('input') as HTMLInputElement;
  input.type = 'file';
  document.body.appendChild(input);

  const btn = document.createElement('button') as HTMLButtonElement;
  btn.innerText = 'Kaydet';
  document.body.appendChild(btn);


  btn.onclick = () => {
    myCanvas.saveAs();
  };

  input.onchange = () => {
    const file = input.files[0];
    myCanvas.loadImage(file);
  };
}