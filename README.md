# HungrySnake
A small snake game based on TypeScripts and JavaScripts

# 项目结构
- src/ 目录包含所有TypeScript源代码。
  - styles/ 目录包含所有CSS样式文件。
  - types/ 目录包含TypeScript类型定义。
  - utils/ 目录包含一些实用工具函数。
  - components/ 目录包含游戏的主要组件，如游戏板（GameBoard）、计分板（ScoreBoard）和控制面板（ControlPanel）。
  - App.ts 是游戏的主要启动文件，它将使用其他组件。
  - index.ts 是入口文件，用于引导整个应用程序。
- public/ 目录包含静态文件，如HTML和图片资源。
  - index.html 是游戏的HTML模板文件。
- package.json 包含项目依赖和脚本。
- tsconfig.json 包含TypeScript编译器的配置。
- webpack.config.js 包含Webpack的配置，用于构建和打包项目。
