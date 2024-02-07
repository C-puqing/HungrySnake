// This file implements the class of Food
import './styles.css';
import {STEP} from '../snake/Snake';

class Food {
  element: HTMLElement;
  boundaryWidth: number = 0; // 面板宽度
  boundaryHeight: number = 0; // 面板高度

  constructor() {
    // 创建HTMLElement对象，并设置id为food
    this.element = document.createElement('div');
    this.element.id = 'food';
  }

  get X(): number {
    return parseInt(window.getComputedStyle(this.element).left, 10);
  }

  get Y() {
    return parseInt(window.getComputedStyle(this.element).top, 10);
  }

  // 食物的位置一定要可以被步长整除，且必须全部在面板内
  change() {
    const x = Math.round(Math.random() * (this.boundaryWidth / STEP - 1)) * STEP;
    const y = Math.round(Math.random() * (this.boundaryHeight / STEP - 1)) * STEP;
    this.element.style.left = x + 'px';
    this.element.style.top = y + 'px';
  }

  public init(boundaryWidth: number, boundaryHeight: number) {
    this.boundaryWidth = boundaryWidth;
    this.boundaryHeight = boundaryHeight;
    this.reset();
  }

  // 重置，清除面板上的食物
  reset() {
    this.element.style.visibility = 'hidden';
  }

  start() {
    this.element.style.visibility = 'visible';
    this.change();
  }
}

export default Food;
