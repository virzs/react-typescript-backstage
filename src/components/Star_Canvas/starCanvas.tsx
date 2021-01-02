import React from "react";

export interface starsField {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
}

let starConfig = ["#fff", "#f17c67", "#DDF0ED", "#376956"];

class StarCanvas extends React.Component {
  canvas: React.RefObject<HTMLCanvasElement>;
  constructor(props: any) {
    super(props);
    this.canvas = React.createRef();
  }
  componentDidMount() {
    this.tick();
  }
  drawing = () => {
    const canvas = this.canvas.current;
    if (canvas !== undefined && canvas !== null) {
      let ctx = canvas.getContext("2d");
      if (ctx !== null) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let stars: Array<starsField> = [], //数组
          FPS: number = 1, //每秒的帧数
          x: number = canvas.width; //星星的个数

        //创建星星
        for (let i = 0; i < x; i++) {
          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random(),
            vx: Math.floor(Math.random() * 10) - 5,
            vy: Math.floor(Math.random() * 10) - 5,
          });
        }

        //绘制场景
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "lighter";
        for (let i = 0, x = stars.length; i < x; i++) {
          let s = stars[i];
          ctx.fillStyle =
            starConfig[Math.floor(Math.random() * starConfig.length)];
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
          ctx.fill();
        }
        //更新星星位置
        for (let i = 0, x = stars.length; i < x; i++) {
          let s = stars[i];
          s.x += s.vx / FPS;
          s.y += s.vy / FPS;
          if (s.x < 0 || s.x > canvas.width) s.x = -s.x;
          if (s.y < 0 || s.y > canvas.height) s.y = -s.y;
        }
      }
    }
  };
  tick = () => {
    this.drawing();
    requestAnimationFrame(this.drawing);
    //TODO 解决刷新问题
  };
  render() {
    return <canvas ref={this.canvas}></canvas>;
  }
}

export default StarCanvas;
