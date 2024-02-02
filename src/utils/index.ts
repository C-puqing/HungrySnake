// 这里定义一些辅助函数，例如随机生成食物的位置、检测碰撞等

// 例如，定义一个生成随机数的函数
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
