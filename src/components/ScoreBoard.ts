// This file implements the class of Score Panel
export class ScoreBoard {
  boardElem: HTMLElement; // 面板DOM元素

  score = 0; // 当前分数值
  scoreElem: HTMLElement; // 展示分数的DOM元素
  maxScore: number; // 当前等级最高分数，达到后触发升级事件

  level = 1; // 当前等级
  levelElem: HTMLElement; // 展示等级的DOM元素
  maxLevel: number; // 最高等级

  constructor(maxLevel: number = 10, maxScore: number = 10) {
    this.boardElem = document.createElement('div');
    this.boardElem.classList.add('score-board')
    this.scoreElem = document.getElementById('score')!;
    this.maxScore = maxScore;
    this.levelElem = document.getElementById('level')!;
    this.maxLevel = maxLevel;
  }

  public init(container: HTMLElement): void {
    container.appendChild(this.boardElem);
  }

  // 加分事件
  updateScore() {
    this.score += 1;
    this.scoreElem.innerHTML = this.score + '';
    // 判断当前分数是否需要升级
    if (this.score >= this.maxScore) {
      this.upgrade();
    }
  }

  // 升级
  upgrade() {
    if (this.level >= this.maxLevel) {
      // TODO: 增加弹窗，恭喜通关～ /撒花
      return;
    }
    // 修改元素内容
    this.levelElem.innerHTML = ++this.level + '';
    this.score = 0;
  }
}
