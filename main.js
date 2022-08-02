import "./index.scss";
class Triangle {
  constructor(configs = {}) {
    const {
      steps = 8000,
      wrapperWidth = 500,
      wrapperHeight = 500,
      color = "black",
    } = configs;
    this.steps = steps;
    this.wrapperHeight = wrapperHeight;
    this.wrapperWidth = wrapperWidth;
    this.color = color;
  }

  init() {
    this.canvas = document.createElement("canvas");
    this.canvas.height = this.wrapperHeight;
    this.canvas.width = this.wrapperWidth;
    this.canvas.style.height = this.wrapperHeight + "px";
    this.canvas.style.width = this.wrapperWidth + "px";
    this.canvas.classList.add("triangle");
    this.canvas.id = "triangle";
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = this.color;
  }

  drawOriginPoints() {
    // 画个圆心
    const radius = this.canvas.clientWidth / 2;
    const centerPoint = { x: radius, y: radius };
    this._drawPoint(centerPoint.x, centerPoint.y);

    // 画三角形的3个点
    this.originPoints = [
      { x: radius, y: 0 },
      {
        x: centerPoint.x - radius * Math.cos(Math.PI / 6),
        y: centerPoint.y + radius / 2,
      },
      {
        x: centerPoint.x + radius * Math.cos(Math.PI / 6),
        y: centerPoint.y + radius / 2,
      },
    ];
    this.originPoints.forEach((point) => {
      this._drawPoint(point.x, point.y);
    });
  }

  _drawPoint(x, y) {
    this.ctx.fillRect(x - 0.5, y - 0.5, 1, 1);
  }

  _randomOrigin() {
    return this.originPoints[Math.floor(Math.random() * 3)];
  }

  _pickPoint() {
    return {
      x: Math.round(Math.random() * this.canvas.clientWidth),
      y: Math.round(Math.random() * this.canvas.clientWidth),
    };
  }

  iterate(point = null, count = 0) {
    if (!point) {
      point = this._pickPoint();
    }
    if (count > this.steps) return;
    const originPoint = this._randomOrigin();
    const newPoint = {
      x: (originPoint.x + point.x) / 2,
      y: (originPoint.y + point.y) / 2,
    };
    this._drawPoint(newPoint.x, newPoint.y);
    if (count % 60 === 0) {
      window.requestAnimationFrame(() => {
        this.iterate(newPoint, count + 1);
      });
    } else {
      this.iterate(newPoint, count + 1);
    }
  }

  start() {
    this.drawOriginPoints();
    this.iterate();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  restart() {
    this.clear()
    this.start()
  }
}

const triangle = new Triangle();

triangle.init();
triangle.start();


document.querySelector('.rerun').addEventListener('click', () => {
  triangle.restart()
})
