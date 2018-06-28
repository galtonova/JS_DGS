export class MyCanvas {

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private img: HTMLImageElement;

  private mouse_x = 10;
  private mouse_y = 10;

  constructor() {
    this.canvas = document.createElement('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');

    this.canvas.style.height = '90vh';
    this.canvas.style.cursor = 'none';

    this.canvas.onmousemove = this.mouseMove.bind(this);

    setInterval(this.render.bind(this), 33);
  }

  appendToBody() {
    document.body.appendChild(this.canvas);
  }

  loadImage(imgFile: File) {
    const fr = new FileReader();
    fr.onload = () => {
      this.img = new Image();
      this.img.onload = () => {
        this.canvas.width = this.img.width;
        this.canvas.height = this.img.height;
        console.log(this.canvas.offsetHeight);
        console.log(this.canvas.height);
      };
      this.img.src = fr.result;
    };
    fr.readAsDataURL(imgFile);
  }

  mouseMove(e: MouseEvent) {
    const scale = this.canvas.offsetHeight / this.canvas.height;

    this.mouse_x = e.offsetX / scale;
    this.mouse_y = e.offsetY / scale;
  }

  render() {
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    if (this.img) {
      this.ctx.drawImage(this.img,0,0);
    }

    this.ctx.beginPath();
    this.ctx.moveTo(0,this.mouse_y);
    this.ctx.lineTo(this.canvas.width,this.mouse_y);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(this.mouse_x, 0);
    this.ctx.lineTo(this.mouse_x, this.canvas.height);
    this.ctx.stroke();
  }

  saveAs() {
    this.canvas.toBlob(function(blob) {
      // noinspection TypeScriptUnresolvedFunction
      saveAs(blob, "pretty image.png");
    });
  }

}