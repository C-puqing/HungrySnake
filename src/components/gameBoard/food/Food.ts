// This file implements the class of Food
import "./styles.css";

class Food {
  element: HTMLElement;
  boundaryWidth: number = 0; // 面板宽度
  boundaryHeight: number = 0; // 面板高度

  constructor() {
    // 创建HTMLElement对象，并设置id为food
    this.element = document.createElement('div');
    this.element.id = 'food';
  }

  get X() {
    return this.element.offsetLeft + this.element.offsetWidth / 2;
  }

  get Y() {
    return this.element.offsetTop + this.element.offsetHeight / 2;
  }

  // 由于设定蛇每次移动20px，所以食物的位置要被20整除
  change() {
    const elemWidth = parseInt(window.getComputedStyle(this.element).width);
    const elemHeight = parseInt(window.getComputedStyle(this.element).height);
    const left = Math.floor(Math.random() * ((this.boundaryWidth - elemWidth) / 20)) * 20;
    const top = Math.floor(Math.random() * ((this.boundaryHeight - elemHeight) / 20)) * 20;
    this.element.style.left = left + 'px';
    this.element.style.top = top + 'px';
  }

  public init(boundaryWidth: number, boundaryHeight: number) {
    this.boundaryWidth = boundaryWidth;
    this.boundaryHeight = boundaryHeight;
    this.reset()
  }

  // 重置，清除面板上的食物
  reset() {
    this.element.style.visibility = 'hidden';
  }

  start () {
    this.element.style.visibility = 'visible';
    this.change();
  }
}

export default Food;
