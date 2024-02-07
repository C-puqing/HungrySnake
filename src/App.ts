// 游戏的主要启动文件
import {GameBoard} from './components/gameBoard/GameBoard';
import {ScoreBoard} from './components/ScoreBoard';
import {ControlPanel} from './components/ControlPanel';

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
    document.addEventListener('reset', () => {
      this.scoreBoard.reset();
      this.gameBoard.reset();
    });

    // 控制面板添加开始游戏事件监听
    document.addEventListener('start', () => {
      this.scoreBoard.reset();
      this.gameBoard.start();
    });

    // 添加得分事件监听，更新计分板
    document.addEventListener('score', () => {
      this.scoreBoard.updateScore();
    });

    document.addEventListener('ending', () => {
      alert('🎉恭喜通关🎉');
      this.scoreBoard.reset();
      this.gameBoard.reset();
    });
  }

  private createContainerElement(): HTMLElement {
    // 创建一个新的容器元素并添加到文档中
    const container = document.createElement('div');
    container.id = 'game-container';
    document.body.appendChild(container);
    return container;
  }
}
