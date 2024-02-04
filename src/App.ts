// 游戏的主要启动文件
import { GameBoard } from './components/gameBoard/GameBoard';
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

    // 控制面板添加重启事件监听
    this.controlPanel.controlPanelElement.addEventListener('restart', () => {
      this.scoreBoard.restart();
      this.gameBoard.restart();
    })

    // 游戏板添加游戏结束事件监听
    this.gameBoard.boardElement.addEventListener('gameOver', () => {
      alert('游戏结束，请再接再厉~');
    })
  }

  private createContainerElement(): HTMLElement {
    // 创建一个新的容器元素并添加到文档中
    const container = document.createElement('div');
    container.id = 'game-container';
    document.body.appendChild(container);
    return container;
  }
}
