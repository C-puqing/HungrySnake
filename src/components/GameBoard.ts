// src/components/GameBoard.ts
export class GameBoard {
  boardElement: HTMLElement;

  constructor() {
    this.boardElement = document.createElement('div');
    this.boardElement.classList.add('game-board');
  }

  public init(container: HTMLElement): void {
    container.appendChild(this.boardElement);
  }

  public moveSnake(direction: string): void {
    // TODO: 实现根据方向移动蛇的逻辑
    console.log(`Move snake ${direction}`);
  }
}
