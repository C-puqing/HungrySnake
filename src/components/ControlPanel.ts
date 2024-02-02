// This file implements the class of Control Panel


export class ControlPanel {
  private readonly controlPanelElement: HTMLElement;
  private moveCallback: ((direction: string) => void) | undefined

  constructor() {
    this.controlPanelElement = document.createElement('div');
    this.controlPanelElement.classList.add('control-panel');
  }

  public init(container: HTMLElement): void {
    container.appendChild(this.controlPanelElement);
    this.createButtons();
  }

  private createButtons(): void {
    const directions = ['up', 'down', 'left', 'right'];
    directions.forEach(direction => {
      const button = document.createElement('button');
      button.innerText = direction;
      button.addEventListener('click', () => {
        if (this.moveCallback) {
          this.moveCallback(direction);
        }
      });
      this.controlPanelElement.appendChild(button);
    });
  }

  public onMove(callback: (direction: string) => void): void {
    this.moveCallback = callback;
  }
}

// import Snake from '../classes/Snake';
// import Food from '../classes/Food';
// import ScorePanel from './ScorePanel';

// class ControlPanel {
//   private controlPanelElem: HTMLElement;
//   private moveCallback: (direction: string) => void;
//
//   constructor() {
//     this.snake = new Snake();
//     this.food = new Food();
//     this.scorePanel = new ScorePanel();
//     this.init();
//   }
//
//   snake: Snake;
//   food: Food;
//   scorePanel: ScorePanel;
//   direction: string = '';
//   isAlive: boolean = true;
//
//
//
//   private init() {
//     document.addEventListener('keydown', this.keydownHandler.bind(this));
//     this.run();
//   }
//
//   private keydownHandler(event: KeyboardEvent) {
//     console.log(event.key);
//     this.direction = event.key;
//   }
//
//   private run() {
//     let X = this.snake.X;
//     let Y = this.snake.Y;
//
//     switch (this.direction) {
//       case 'ArrowUp':
//       case 'Up':
//         Y += 10;
//         break;
//       case 'ArrowDown':
//       case 'Down':
//         Y -= 10;
//         break;
//       case 'ArrowLeft':
//       case 'Left':
//         X -= 10;
//         break;
//       case 'ArrowRight':
//       case 'Right':
//         X += 10;
//         break;
//     }
//
//     this.checkEat(X, Y);
//     try {
//       this.snake.X = X;
//       this.snake.Y = Y;
//     } catch (e) {
//       alert((e as Error).message);
//       this.isAlive = false;
//     }
//     this.isAlive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
//   }
//
//   private checkEat(X: number, Y: number) {
//     if (X === this.food.X && Y === this.food.Y) {
//       this.food.change();
//       this.scorePanel.addScore();
//       this.snake.grow();
//     }
//   }
// }
