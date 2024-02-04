const path = require('path');

module.exports = {
  mode: 'development',
  // 入口文件
  entry: './src/index.ts', // 假设你的入口文件是 src/index.js

  // 输出配置
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出到 dist 目录
    filename: 'main.js', // 输出文件名
    publicPath: '/', // 确保 publicPath 是根目录
  },

  // 模块处理规则
  module: {
    rules: [
      // TypeScript 文件处理
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // CSS 文件处理
      {
        test: /\.css$/,
        use: [
          'style-loader', // 将 CSS 注入到 DOM 中
          'css-loader', // 解析 CSS 文件
        ],
      },
      // 图片文件处理
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
