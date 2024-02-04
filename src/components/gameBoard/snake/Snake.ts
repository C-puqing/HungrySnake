// This file implements the class of Snake
import './styles.css';

class Snake {
  element: HTMLElement; // 蛇的容器元素
  head: HTMLImageElement; // 头部元素
  direction: string = 'right'; // 蛇当前的移动方向
  boundaryWidth: number = 0; // 面板宽度
  boundaryHeight: number = 0; // 面板高度

  constructor() {
    this.head = this.createHead();
    this.element = document.createElement('div');
    this.element.className = 'snake';
    this.element.appendChild(this.head);
  }

  public init(boundaryWidth: number, boundaryHeight: number) {
    this.boundaryWidth = boundaryWidth;
    this.boundaryHeight = boundaryHeight;
    this.head.style.left = (this.boundaryWidth / 2) + 'px';
    this.head.style.top = (this.boundaryHeight / 2) + 'px';
  }

  get X() {
    return this.head.offsetLeft;
  }

  get Y() {
    return this.head.offsetTop;
  }

  // 设置蛇头的横坐标
  set X(value: number) {
    this.head.style.left = value + 'px';
  }

  set Y(value: number) {
    this.head.style.top = value + 'px';
  }

  // 移动，所有元素向指定方向移动10px
  move(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowUp':
        this.Y -= 10;
        break;
      case 'ArrowDown':
        this.Y += 10;
        break;
      case 'ArrowLeft':
        this.X -= 10;
        break;
      case 'ArrowRight':
        this.X += 10;
        break;
    }

    // 检查是否撞墙
    if (this.checkCollision()) {
      const gameOverEvent = new CustomEvent('gameOver');
      document.dispatchEvent(gameOverEvent);
      return;
    }
    // 调整蛇头的方向
    this.adjustHeadDirection(e.key.replace('Arrow', '').toLowerCase());
  }

  // 生长，每吃一个食物就要多一节身子
  grow() {
    const bodyElement = document.createElement('div');
    bodyElement.className = 'snake-body';
    this.element.appendChild(bodyElement);
  }

  // 碰撞检测，检查头和身子的位置是否相等，若相等就是撞到一起了
  checkCollision(): boolean {
    // 如果蛇头撞到了边界，返回true
    if (this.X < 0 || this.X >= this.boundaryWidth || this.Y < 0 || this.Y >= this.boundaryHeight) {
      return true;
    }
    for (let i = 1; i < this.element.children.length; i++) {
      const bodyElement = this.element.children[i] as HTMLElement;
      if (this.X === bodyElement.offsetLeft && this.Y === bodyElement.offsetTop) {
        return true;
      }
    }
    return false;
  }

  // 重启游戏时重置蛇的位置，恢复到画板中间
  restart() {
    this.X = this.boundaryWidth / 2;
    this.Y = this.boundaryHeight / 2;
    // 清除所有身子
    for (let i = 1; i < this.element.children.length; i++) {
      this.element.removeChild(this.element.children[i]);
    }
  }

  private createHead(): HTMLImageElement {
    // const head = document.createElement('div');
    // head.className = 'snake-head';

    const head = new Image();
    head.className = 'snake-head';
    head.src = require('../../../assets/dragon-head.png');

    return head;
  }

  private adjustHeadDirection(value: string) {
    this.direction = value;
    switch (this.direction) {
      case 'left':
        this.head.style.transform = 'rotate3d(0, 1, 0, 180deg)';
        break;
      case 'right':
        this.head.style.transform = 'rotate3d(0, 1, 0, 0deg)';
        break;
      case 'up':
        this.head.style.transform = 'rotate3d(0, 0, 1, -90deg)';
        break;
      case 'down':
        this.head.style.transform = 'rotate3d(0, 0, 1, 90deg)';
        break;
    }
  }
}

export default Snake;
