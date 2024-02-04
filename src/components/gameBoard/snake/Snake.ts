// This file implements the class of Snake
import './styles.css';

// 定义移动步长为常量
const STEP = 20;

class Snake {
  element: HTMLElement; // 蛇的容器元素
  head: HTMLImageElement; // 头部元素
  direction: string = 'right'; // 蛇当前的移动方向
  boundaryWidth: number = 0; // 面板宽度
  boundaryHeight: number = 0; // 面板高度
  private intervalId: number = 0; // 定时器id，初始为0

  constructor() {
    this.head = this.createHead();
    this.element = document.createElement('div');
    this.element.className = 'snake';
    this.element.id = 'snake';
    this.element.appendChild(this.head);
  }

  public init(boundaryWidth: number, boundaryHeight: number) {
    this.boundaryWidth = boundaryWidth;
    this.boundaryHeight = boundaryHeight;
    this.reset();
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

  // 移动，向面向移动10px
  move() {
    switch (this.direction) {
      case 'up':
        this.Y -= STEP;
        break;
      case 'down':
        this.Y += STEP;
        break;
      case 'left':
        this.X -= STEP;
        break;
      case 'right':
        this.X += STEP;
        break;
    }

    // 检查是否撞墙
    if (this.checkCollision()) {
      const gameOverEvent = new CustomEvent('gameOver');
      document.dispatchEvent(gameOverEvent);
      return;
    }
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

  // 重置，恢复初始状态
  public reset() {
    // 清除定时器
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.X = this.boundaryWidth / 2;
    this.Y = this.boundaryHeight / 2;
    // 清除所有身子
    for (let i = 1; i < this.element.children.length; i++) {
      this.element.removeChild(this.element.children[i]);
    }
    // 恢复面向右边
    this.adjustHeadDirection('right');
  }

  // 开始游戏
  public start() {
    this.intervalId = window.setInterval(() => {
      this.move();
    }, 1000);
  }

  private createHead(): HTMLImageElement {
    const head = new Image();
    head.className = 'snake-head';
    head.src = require('../../../assets/dragon-head.png');

    return head;
  }

  public adjustHeadDirection(value: string) {
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
