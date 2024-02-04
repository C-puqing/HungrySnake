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
    document.addEventListener('keydown', (e) => {
      this.snake.move(e);
      if (this.checkEatFood()) {
        this.snake.grow();
        this.food.change();
      }
    });

    document.addEventListener('gameOver', this.handleGameOver);
  }

  private checkEatFood(): boolean {
    return this.snake.X === this.food.X && this.snake.Y === this.food.Y;
  }

  // 重启游戏时重置蛇和食物的位置
  restart() {
    this.snake.restart();
    this.food.change();
  }

  private handleGameOver() {
    alert('Game Over!');
  }
}
