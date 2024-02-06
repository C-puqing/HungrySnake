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
    this.boardElement.appendChild(this.snake.element);
    const boardWidth = parseInt(window.getComputedStyle(this.boardElement).width);
    const boardHeight = parseInt(window.getComputedStyle(this.boardElement).height);
    this.snake.init(boardWidth, boardHeight);
    this.food.init(boardWidth, boardHeight);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    // 如果e.key不是方向键，直接返回
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    // 调整蛇头的方向
    this.snake.adjustHeadDirection(e.key.replace('Arrow', '').toLowerCase());
    this.snake.move();
    if (this.checkEatFood()) {
      this.snake.grow();
      this.food.change();
    }
  }

  private handleGameOver = () => {
    alert('撞的头角峥嵘了都～～～');
    this.reset();
  }

  private checkEatFood(): boolean {
    console.log(this.snake.X, this.snake.Y, this.food.X, this.food.Y);
    return this.snake.X === this.food.X && this.snake.Y === this.food.Y;
  }

  // 重启游戏时重置蛇和食物的位置
  reset() {
    // 清除键盘监听事件
    document.removeEventListener('keydown', this.handleKeyDown);
    // 清除游戏结束事件
    document.removeEventListener('gameOver', this.handleGameOver);
    // 清除检查是否吃到食物的定时器
    window.clearInterval(this.checkEatFoodTimer);
    // 重置蛇和食物的位置
    this.snake.reset();
    this.food.reset();
  }

  start() {
    // 监听键盘方向键事件，控制蛇的移动
    document.addEventListener('keydown', this.handleKeyDown);
    // 监听游戏结束事件
    document.addEventListener('gameOver', this.handleGameOver);
    // 启动定时器检查蛇是否吃到食物
    this.checkEatFoodTimer = window.setInterval(() => {
      if (this.checkEatFood()) {
        // 抛出得分事件，让外部组件更新得分
        document.dispatchEvent(new CustomEvent('score'));
        this.snake.grow();
        this.food.change();
      }
    }, 200);
    this.snake.start();
    this.food.change();
    this.boardElement.appendChild(this.food.element);
  }
}
