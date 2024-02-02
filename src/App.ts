// 游戏的主要启动文件
import { GameBoard } from './components/GameBoard';
import { ScoreBoard } from './components/ScoreBoard';
import { ControlPanel } from './components/ControlPanel';

export class App {
  private gameBoard: GameBoard;
  private scoreBoard: ScoreBoard;
  private controlPanel: ControlPanel;

  constructor() {
    this.gameBoard = new GameBoard();
    this.scoreBoard = new ScoreBoard();
    this.controlPanel = new ControlPanel();
  }

  public start(): void {
    // 获取或创建页面的主要容器元素
    const container = document.getElementById('game-container') || this.createContainerElement();

    // 初始化计分板、游戏板和控制面板
    this.scoreBoard.init(container);
    this.gameBoard.init(container);
    this.controlPanel.init(container);

    // 将控制面板的按钮事件绑定到游戏板的控制方法
    this.controlPanel.onMove((direction) => this.gameBoard.moveSnake(direction));

    // 可以在这里添加更多的游戏启动逻辑，例如开始游戏循环、设置定时器等
  }

  private createContainerElement(): HTMLElement {
    // 创建一个新的容器元素并添加到文档中
    const container = document.createElement('div');
    container.id = 'game-container';
    document.body.appendChild(container);
    return container;
  }
}
