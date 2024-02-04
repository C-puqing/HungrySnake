// src/components/GameBoard.ts
import Snake from './snake/Snake';
import Food from './food/Food';
import './styles.css';

export class GameBoard {
  boardElement: HTMLElement;
  snake: Snake;
  food: Food;

  constructor() {
    // 创建游戏面板
    this.boardElement = document.createElement('div');
    this.boardElement.classList.add('game-board');
    // 创建贪吃蛇
    this.snake = new Snake();
    this.food = new Food();
  }

  public init(container: HTMLElement): void {
    container.appendChild(this.boardElement);
    this.snake.init(parseInt(window.getComputedStyle(this.boardElement).width),
      parseInt(window.getComputedStyle(this.boardElement).height));
    this.boardElement.appendChild(this.snake.element);
    // 监听键盘方向键事件，控制蛇的移动
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      // 如果e.key不是方向键，直接返回
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      // 调整蛇头的方向
      this.snake.adjustHeadDirection(e.key.replace('Arrow', '').toLowerCase());
      if (this.checkEatFood()) {
        this.snake.grow();
        this.food.change();
      }
    });

    document.addEventListener('gameOver', () => {
      alert('撞的头角峥嵘了都～～～');
      this.reset();
    });
  }

  private checkEatFood(): boolean {
    return this.snake.X === this.food.X && this.snake.Y === this.food.Y;
  }

  // 重启游戏时重置蛇和食物的位置
  reset() {
    // 重置蛇和食物的位置
    this.snake.reset();
    this.food.change();
  }

  start() {
    this.snake.start();
    this.food.change();
  }
}
