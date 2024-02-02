// This file implements the class of Snake
class Snake {
  element: HTMLElement; // 贪吃蛇整体元素
  head: HTMLElement; // 头部元素
  body: HTMLCollection; // 身体元素
  boundaryWidth: number; // 可移动面板宽度
  boundaryHeight: number; // 可移动面板高度

  constructor() {
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('#snake > div') as HTMLElement;
    this.body = this.element.getElementsByTagName('div');
    this.boundaryWidth = document.getElementById('controlPanel')!.offsetWidth;
    this.boundaryHeight = document.getElementById('controlPanel')!.offsetHeight;
  }

  get X() {
    return this.head.offsetLeft;
  }

  get Y() {
    return this.head.offsetTop;
  }

  set X(value: number) {
    if (value < 0 || value > this.boundaryWidth) {
      alert('啊～～～ 撞墙啦');
      return;
    }
    // 判断原地掉头
    if (this.body[1] && (this.body[1] as HTMLElement).offsetLeft === value) {
      alert('啊～～～ 头都扭断了');
      return;
    }
    this.move();
    this.head.style.left = value + 'px';
    this.checkCollision();
  }

  set Y(value: number) {
    if (value < 0 || value > this.boundaryHeight) {
      alert('啊～～～ 撞墙啦');
      return;
    }
    // 判断原地掉头
    if (this.body[1] && (this.body[1] as HTMLElement).offsetTop === value) {
      alert('啊～～～ 头都扭断了');
      return;
    }
    this.move();
    this.head.style.top = value + 'px';
    this.checkCollision();
  }

  // 移动，所有元素向指定方向移动10px
  move() {
    for (let i = this.body.length - 1; i > 0; i--) {
      let X = (this.body[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.body[i - 1] as HTMLElement).offsetTop;
      (this.body[i] as HTMLElement).style.left = X + 'PX';
      (this.body[i] as HTMLElement).style.top = Y + 'PX';
    }
  }

  // 生长，每吃一个食物就要多一节身子
  grow() {
    let newBody = document.createElement('div');
    this.element.appendChild(newBody);
  }

  // 碰撞检测，检查头和身子的位置是否相等，若相等就是撞到一起了
  checkCollision() {
    for (let i = 1; i < this.body.length; i++) {
      let bd = this.body[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new Error('撞到自己了');
      }
    }
  }
}

export default Snake;
