// This file implements the class of Snake
import './styles.css';

// 定义移动步长为常量
export const STEP = 40;

class Snake {
  container: HTMLElement; // 蛇的容器元素
  direction: string = 'right'; // 蛇当前的移动方向
  boundaryWidth: number = 0; // 面板宽度
  boundaryHeight: number = 0; // 面板高度
  private intervalId: number = 0; // 定时器id，初始为0
  private initialPosition: {x: number; y: number} = {x: 0, y: 0}; // 蛇的初始位置

  constructor() {
    const snakeHead = this.createHead();
    this.container = document.createElement('div');
    this.container.id = 'snake-container';
    this.container.appendChild(snakeHead);
  }

  public init(boundaryWidth: number, boundaryHeight: number) {
    this.boundaryWidth = boundaryWidth;
    this.boundaryHeight = boundaryHeight;
    this.initialPosition.x = Math.floor((boundaryWidth / STEP - 1) / 2) * STEP;
    this.initialPosition.y = Math.floor((boundaryHeight / STEP - 1) / 2) * STEP;
    this.reset();
  }

  get head(): HTMLImageElement {
    return this.container.children[0] as HTMLImageElement;
  }

  get length(): number {
    if (!this.container.children) return 0;
    return this.container.children.length;
  }

  // 取图片中心点的横坐标作为蛇的横坐标
  get X() {
    return parseInt(window.getComputedStyle(this.head).left, 10);
  }

  // 取图片中心点的横坐标作为蛇的横坐标
  get Y() {
    return parseInt(window.getComputedStyle(this.head).top, 10);
  }

  // 移动，向面向移动10px
  move() {
    // 记录蛇头移动前的位置
    const prevX = this.head.offsetLeft;
    const prevY = this.head.offsetTop;
    switch (this.direction) {
      case 'up':
        this.head.style.top = this.head.offsetTop - STEP + 'px';
        break;
      case 'down':
        this.head.style.top = this.head.offsetTop + STEP + 'px';
        break;
      case 'left':
        this.head.style.left = this.head.offsetLeft - STEP + 'px';
        break;
      case 'right':
        this.head.style.left = this.head.offsetLeft + STEP + 'px';
        break;
    }

    // 检查是否撞墙
    if (this.checkCollision()) {
      document.dispatchEvent(new CustomEvent('gameOver'));
      return;
    }

    for (let i = this.length - 1; i > 0; i--) {
      const bodyElement = this.container.children[i] as HTMLElement;
      if (i === 1) {
        bodyElement.style.left = prevX + 'px';
        bodyElement.style.top = prevY + 'px';
        continue;
      }
      const prevBody = this.container.children[i - 1] as HTMLElement;
      bodyElement.style.left = prevBody.offsetLeft + 'px';
      bodyElement.style.top = prevBody.offsetTop + 'px';
    }

    // 抛出移动事件
    document.dispatchEvent(new CustomEvent('move'));
  }

  // 生长，每吃一个食物就要多一节身子
  grow() {
    const bodyElement = document.createElement('div');
    bodyElement.className = 'snake-body';
    // 设置新的身子的位置，如果前进方向是向右，则在蛇尾的左边，向左则在右边，向上则在下边，向下则在上边
    const lastBody = this.container.children[this.length - 1] as HTMLElement;
    switch (this.direction) {
      case 'up':
        bodyElement.style.left = lastBody.offsetLeft + 'px';
        bodyElement.style.top = lastBody.offsetTop + lastBody.offsetHeight + 'px';
        break;
      case 'down':
        bodyElement.style.left = lastBody.offsetLeft + 'px';
        bodyElement.style.top = lastBody.offsetTop - lastBody.offsetHeight + 'px';
        break;
      case 'left':
        bodyElement.style.left = lastBody.offsetLeft + lastBody.offsetWidth + 'px';
        bodyElement.style.top = lastBody.offsetTop + 'px';
        break;
      case 'right':
        bodyElement.style.left = lastBody.offsetLeft - lastBody.offsetWidth + 'px';
        bodyElement.style.top = lastBody.offsetTop + 'px';
        break;
    }
    this.container.appendChild(bodyElement);
  }

  // 碰撞检测，检查头和身子的位置是否相等，若相等就是撞到一起了
  checkCollision(): boolean {
    // 如果蛇头的中心点撞到了边界，返回true
    if (this.X < 0 || this.X >= this.boundaryWidth || this.Y < 0 || this.Y >= this.boundaryHeight) {
      return true;
    }
    // 如果蛇头的位置和身体的位置重合，则认为撞到了自己
    for (let i = 1; i < this.length; i++) {
      const bodyElement = this.container.children[i] as HTMLElement;
      if (this.head.offsetLeft === bodyElement.offsetLeft && this.head.offsetTop === bodyElement.offsetTop) {
        return true;
      }
    }
    return false;
  }

  // 重置，恢复初始状态
  public reset() {
    // 清除定时器
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
    // 图片位于面板中间
    this.head.style.left = this.initialPosition.x + 'px';
    this.head.style.top = this.initialPosition.y + 'px';
    // 清除所有身子
    this.container.replaceChildren(this.head);
    // 恢复面向右边
    this.adjustHeadDirection('right');
  }

  // 开始游戏
  public start() {
    this.intervalId = window.setInterval(() => {
      this.move();
    }, 500);
  }

  private createHead(): HTMLImageElement {
    const head = new Image();
    head.className = 'snake-head';
    head.src = require('../../../assets/dragon-head.png');
    return head;
  }

  public adjustHeadDirection(value: string) {
    // 不允许原地掉头
    if (
      (value === 'left' && this.direction === 'right') ||
      (value === 'right' && this.direction === 'left') ||
      (value === 'up' && this.direction === 'down') ||
      (value === 'down' && this.direction === 'up')
    )
      return;
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
