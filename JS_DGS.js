System.register("app/MyCanvas", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MyCanvas;
    return {
        setters: [],
        execute: function () {
            MyCanvas = /** @class */ (function () {
                function MyCanvas() {
                    this.mouse_x = 10;
                    this.mouse_y = 10;
                    this.canvas = document.createElement('canvas');
                    this.ctx = this.canvas.getContext('2d');
                    this.canvas.style.height = '90vh';
                    this.canvas.style.cursor = 'none';
                    this.canvas.onmousemove = this.mouseMove.bind(this);
                    setInterval(this.render.bind(this), 33);
                }
                MyCanvas.prototype.appendToBody = function () {
                    document.body.appendChild(this.canvas);
                };
                MyCanvas.prototype.loadImage = function (imgFile) {
                    var _this = this;
                    var fr = new FileReader();
                    fr.onload = function () {
                        _this.img = new Image();
                        _this.img.onload = function () {
                            _this.canvas.width = _this.img.width;
                            _this.canvas.height = _this.img.height;
                            console.log(_this.canvas.offsetHeight);
                            console.log(_this.canvas.height);
                        };
                        _this.img.src = fr.result;
                    };
                    fr.readAsDataURL(imgFile);
                };
                MyCanvas.prototype.mouseMove = function (e) {
                    var scale = this.canvas.offsetHeight / this.canvas.height;
                    this.mouse_x = e.offsetX / scale;
                    this.mouse_y = e.offsetY / scale;
                };
                MyCanvas.prototype.render = function () {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    if (this.img) {
                        this.ctx.drawImage(this.img, 0, 0);
                    }
                    this.ctx.beginPath();
                    this.ctx.moveTo(0, this.mouse_y);
                    this.ctx.lineTo(this.canvas.width, this.mouse_y);
                    this.ctx.stroke();
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.mouse_x, 0);
                    this.ctx.lineTo(this.mouse_x, this.canvas.height);
                    this.ctx.stroke();
                };
                MyCanvas.prototype.saveAs = function () {
                    this.canvas.toBlob(function (blob) {
                        // noinspection TypeScriptUnresolvedFunction
                        saveAs(blob, "pretty image.png");
                    });
                };
                return MyCanvas;
            }());
            exports_1("MyCanvas", MyCanvas);
        }
    };
});
System.register("main", ["app/MyCanvas"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function main() {
        var myCanvas = new MyCanvas_1.MyCanvas();
        myCanvas.appendToBody();
        var input = document.createElement('input');
        input.type = 'file';
        document.body.appendChild(input);
        var btn = document.createElement('button');
        btn.innerText = 'Kaydet';
        document.body.appendChild(btn);
        btn.onclick = function () {
            myCanvas.saveAs();
        };
        input.onchange = function () {
            var file = input.files[0];
            myCanvas.loadImage(file);
        };
    }
    exports_2("main", main);
    var MyCanvas_1;
    return {
        setters: [
            function (MyCanvas_1_1) {
                MyCanvas_1 = MyCanvas_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=JS_DGS.js.map