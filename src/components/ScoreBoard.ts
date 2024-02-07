// This file implements the class of Score Panel
export class ScoreBoard {
  boardElem: HTMLElement; // 面板DOM元素

  score = 0; // 当前分数值
  curScoreElem: HTMLElement; // 当前分数DOM

  targetScore: number; // 当前等级最高分数，达到后触发升级事件
  targetScoreElem: HTMLElement; // 目标分数DOM

  level = 1; // 当前等级
  levelElem: HTMLElement; // 展示等级的DOM元素
  maxLevel: number; // 最高等级

  constructor(maxLevel: number = 5, targetScore: number = 10) {
    // 构造外部面板
    this.boardElem = document.createElement('div');
    this.boardElem.classList.add('score-board');
    // 构造当前分数DOM
    this.curScoreElem = this.createScoreColumn('当前分数', this.score.toString());
    // 构造目标分数DOM
    this.targetScore = targetScore;
    this.targetScoreElem = this.createScoreColumn('目标分数', this.targetScore.toString());
    // 构造当前关卡DOM
    this.levelElem = this.createScoreColumn('当前关卡', this.level.toString());
    this.maxLevel = maxLevel;
  }

  public init(container: HTMLElement): void {
    this.boardElem.append(this.curScoreElem, this.targetScoreElem, this.levelElem);
    container.appendChild(this.boardElem);
  }

  private createScoreColumn(label: string, value: string): HTMLElement {
    // 创建包含得分的div元素
    const scoreColumn = document.createElement('div');
    scoreColumn.className = 'scoreboard-column';

    // 创建得分标签的span元素
    const scoreLabel = document.createElement('span');
    scoreLabel.className = 'scoreboard-label';
    scoreLabel.textContent = label + ': ';

    // 创建得分值的span元素
    const scoreValue = document.createElement('span');
    // scoreValue.id = 'current-score';
    scoreValue.className = 'scoreboard-value';
    scoreValue.textContent = value;

    // 将标签和值的span元素添加到div元素中
    scoreColumn.appendChild(scoreLabel);
    scoreColumn.appendChild(scoreValue);

    return scoreColumn;
  }

  reset() {
    this.score = 0;
    this.curScoreElem.querySelector('span:last-child')!.innerHTML = this.score.toString();

    this.level = 1;
    this.levelElem.querySelector('span:last-child')!.innerHTML = this.level.toString();
  }

  updateScore() {
    this.score += 1;
    if (this.score >= this.targetScore) {
      this.score = 0;
      this.updateLevel();
    }
    const valueSpan = this.curScoreElem.querySelector('span:last-child')!;
    valueSpan.innerHTML = this.score.toString();
  }

  // 升级
  updateLevel() {
    this.level += 1;
    const valueSpan = this.levelElem.querySelector('span:last-child')!;
    valueSpan.innerHTML = this.level.toString();
    if (this.level >= this.maxLevel) {
      document.dispatchEvent(new CustomEvent('ending'));
    }
  }
}
