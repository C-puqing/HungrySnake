// This file implements the class of Food
class Food {
  elements: HTMLElement;

  constructor() {
    this.elements = document.getElementById('food')!;
  }

  get X() {
    return this.elements.offsetLeft;
  }

  get Y() {
    return this.elements.offsetTop;
  }

  // 由于设定蛇每次移动10px，所以食物的位置要被10整除
  change() {
    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;
    this.elements.style.top = top + 'px';
    this.elements.style.left = left + 'px';
  }
}

export default Food;
