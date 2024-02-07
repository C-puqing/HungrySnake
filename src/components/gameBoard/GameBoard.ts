// src/components/GameBoard.ts
import Snake from './snake/Snake';
import Food from './food/Food';
import './styles.css';

export class GameBoard {
  boardElement: HTMLElement;
  snake: Snake;
  food: Food;
  // 检查是否吃到食物的定时器id
  private checkEatFoodTimer: number = 0;

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
    this.boardElement.appendChild(this.snake.container);
    this.boardElement.appendChild(this.food.element);
    const boardWidth = parseInt(window.getComputedStyle(this.boardElement).width);
    const boardHeight = parseInt(window.getComputedStyle(this.boardElement).height);
    this.snake.init(boardWidth, boardHeight);
    this.food.init(boardWidth, boardHeight);
  }

  start() {
    // 监听键盘方向键事件，控制蛇的移动
    document.addEventListener('keydown', this.handleKeyDown);
    // 监听移动事件，判断是否吃到食物
    document.addEventListener('move', this.handleMove);
    // 监听游戏结束事件
    document.addEventListener('gameOver', this.handleGameOver);
    this.snake.start();
    this.food.start();
    this.boardElement.appendChild(this.food.element);
  }

  // 重启游戏时重置蛇和食物的位置
  reset() {
    // 清除键盘监听事件
    document.removeEventListener('keydown', this.handleKeyDown);
    // 清除游戏结束事件
    document.removeEventListener('gameOver', this.handleGameOver);
    // 清除移动事件
    document.removeEventListener('move', this.handleMove);
    // 重置蛇和食物的位置
    this.snake.reset();
    this.food.reset();
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    // 如果e.key不是方向键，直接返回
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    // 调整蛇头的方向
    this.snake.adjustHeadDirection(e.key.replace('Arrow', '').toLowerCase());
  };

  private checkEatFood(): boolean {
    return this.snake.X === this.food.X && this.snake.Y === this.food.Y;
  }

  private handleGameOver = () => {
    alert('撞的头角峥嵘了都～～～');
    this.reset();
  };

  private handleMove = () => {
    if (this.checkEatFood()) {
      // 抛出得分事件，让外部组件更新得分
      document.dispatchEvent(new CustomEvent('score'));
      this.snake.grow();
      this.food.change();
    }
  };
}
