# react-antd-template

基于`ant-pro-v5`做二次开发，移除不常用的模块，并且预留一些基础配置，从而做到开箱即用。

[antd-文档](https://beta-pro.ant.design/docs/getting-started-cn)

### 特性 🌟

- 移除多语言模块
- 移除单元测试
- 对`ant-pro-v5`做减法，优化`package`的命令行等
- 提供一个`crud`页面的最佳实践

### 快速开始

```shell
git clone git@github.com:liangjiayu/react-antd-template.git

npm i // 安装依赖
npm run start  // 开发
npm run build  // 打包

npm run lint
npm run lint:fix
```

### 注意要点

中后台项目是离不开后端服务的，所以初始化项目的时候，根据后端协议，修改对应的模块。

- 登录、获取用户信息，根据公司的登录方案，做对应的调整。
- `initialState`，初始化项目状态。`layout`，全局布局。
- `request`，预留了请求前的拦截器、响应拦截器，定义了`HttpError`、`BizError`，两种基础的错误类型，根据业务的数据结构做对应的调整。
- 开发建议，菜单和`pages`的文件目录、路由最好一一对应。
- 就近原则，网络服务和静态常量都可以优先放在对应页面的目录中，每一个页面就是最小单元，分割业务逻辑，维护性也比较高。

### 质量

- `eslint`、`prettier`、`stylelint`，预留对应的命令行
- `git-hook`，入库必须通过`eslint`，当然也可以把对应的规则忽略，但是`prettier`最好保留，统一小组的代码风格是很重要的。
