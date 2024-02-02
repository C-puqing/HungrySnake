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
    this.createRestartButton();
  }

  // 创建重启按钮
  private createRestartButton(): void {
    const button = document.createElement('button');
    button.innerText = '重新开始';
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
