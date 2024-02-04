// This file implements the class of Control Panel

export class ControlPanel {
  controlPanelElement: HTMLElement;
  private restartCallback: (() => void) | undefined;

  constructor() {
    this.controlPanelElement = document.createElement('div');
    this.controlPanelElement.classList.add('control-panel');
  }

  public init(container: HTMLElement): void {
    container.appendChild(this.controlPanelElement);
    this.createStartButton();
  }

  // 创建开始游戏按钮
  private createStartButton(): void {
    const button = document.createElement('button');
    button.innerText = '开始游戏';
    button.addEventListener('click', () => {
      const restartEvent = new CustomEvent('restart');
      this.controlPanelElement.dispatchEvent(restartEvent);
    });
    this.controlPanelElement.appendChild(button);
  }
  public restart(callback: () => void) {
    this.restartCallback = callback;
  }
}
