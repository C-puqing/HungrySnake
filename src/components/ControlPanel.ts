// This file implements the class of Control Panel

export class ControlPanel {
  controlPanelElement: HTMLElement;

  constructor() {
    this.controlPanelElement = document.createElement('div');
    this.controlPanelElement.classList.add('control-panel');
  }

  public init(container: HTMLElement): void {
    container.appendChild(this.controlPanelElement);
    this.createStartButton();
    this.createResetButton();
  }

  // 创建开始游戏按钮
  private createStartButton(): void {
    const button = document.createElement('button');
    button.innerText = '开始游戏';
    button.addEventListener('click', () => {
      const restartEvent = new CustomEvent('start');
      this.controlPanelElement.dispatchEvent(restartEvent);
    });
    this.controlPanelElement.appendChild(button);
  }

  // 创建重置按钮
  private createResetButton(): void {
    const button = document.createElement('button');
    button.innerText = '重置';
    button.addEventListener('click', () => {
      const resetEvent = new CustomEvent('reset');
      this.controlPanelElement.dispatchEvent(resetEvent);
    });
    this.controlPanelElement.appendChild(button);
  }
}
