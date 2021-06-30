# 一、简答题

#### 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
初始化参数：根据用户在命令窗口输入的参数以及 webpack.config.js 文件的配置，得到最后的配置。
开始编译：根据上一步得到的最终配置初始化得到一个 compiler 对象，注册所有的插件 plugins，插件开始监听 webpack 构建过程的生命周期的环节（事件），不同的环节会有相应的处理，然后开始执行编译。
确定入口：根据 webpack.config.js 文件中的 entry 入口，开始解析文件构建 AST 语法树，找出依赖，递归下去。
编译模块：递归过程中，根据文件类型和 loader 配置，调用相应的 loader 对不同的文件做不同的转换处理，再找出该模块依赖的模块，然后递归本步骤，直到项目中依赖的所有模块都经过了本步骤的编译处理。
编译过程中，有一系列的插件在不同的环节做相应的事情，比如 UglifyPlugin 会在 loader 转换递归完对结果使用 UglifyJs 压缩覆盖之前的结果；再比如 clean-webpack-plugin ，会在结果输出之前清除 dist 目录等等。
完成编译并输出：递归结束后，得到每个文件结果，包含转换后的模块以及他们之间的依赖关系，根据 entry 以及 output 等配置生成代码块 chunk。
打包完成：根据 output 输出所有的 chunk 到相应的文件目录。

　

　

　

#### 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。
Plugin 通过勾子机制进行实现，是一个函数，或class,通过调用apply方法对plugin调用，传入compiler,通过调用hook的tap方法对插件进行注册。
loader 相当于一个函数，接受传入内容，要求返回一个js代码字符串
　

　

　

# 二、编程题

#### 1、使用 Webpack 实现 Vue 项目打包任务

具体任务及说明：

1. 在 code/vue-app-base 中安装、创建、编辑相关文件，进而完成作业。
2. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
3. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
4. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
5. 尽可能的使用上所有你了解到的功能和特性



**提示：(开始前必看)**

在视频录制后，webpack 版本以迅雷不及掩耳的速度升级到 5，相应 webpack-cli、webpack-dev-server 都有改变。

项目中使用服务器的配置应该是改为下面这样：

```json
// package.json 中部分代码
"scripts": {
	"serve": "webpack serve --config webpack.config.js"
}
```

vue 文件中 使用 style-loader 即可

**其它问题, 可先到 https://www.npmjs.com/ 上搜索查看相应包的最新版本的配置示例, 可以解决大部分问题.**



#### 作业要求

本次作业中的编程题要求大家完成相应代码后

- 提交一个项目说明文档，要求思路流程清晰。
- 或者简单录制一个小视频介绍一下实现思路，并演示一下相关功能。
- 最终将录制的视频或说明文档和代码统一提交至作业仓库。