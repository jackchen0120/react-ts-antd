# 前言
NodeJS全栈开发之前端基于 React全家桶+TypeScript+Antd 构建用户界面，功能包括：登录，注册，找回密码，自动登录，登出，错误页面，todoList增删改查CRUD。本项目场景虽然简单，但涵盖功能比较齐全，适合初中级学习前端开发的小伙伴。如果觉得不错的话，请老铁们给个:heart:star，也期待与大家一起交流学习。 

[在线DEMO演示](http://106.55.168.13:9000/)

[手摸手教你大厂都在用 React+TS+Antd 快速入门到NodeJS全栈项目实战](https://juejin.cn/post/6859354172127936526)


# 部分截图

## 登录/注册

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ef511287b0441d68787c60d9d0f8a92~tplv-k3u1fbpfcp-zoom-1.image" width="900" alt="登录/注册" />

## 首页

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5e5af7c493441d3b44d873be743079a~tplv-k3u1fbpfcp-zoom-1.image" width="900" alt="首页" />

## 新增任务

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/903c1f02f12a44a696449e215f125e99~tplv-k3u1fbpfcp-zoom-1.image" width="900" alt="新增任务" />

## 修改密码

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8fdc9c6390874c5985ab9d7c9de3bd1f~tplv-k3u1fbpfcp-zoom-1.image" width="900" alt="修改密码" />

## 错误页面

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2baeb7a255da4147a56da9c603e28892~tplv-k3u1fbpfcp-zoom-1.image" width="900" alt="修改密码" />


# 目录结构

```
│  .gitignore                 // git忽略配置
│  config-overrides.js        // webpack自定义配置
│  package.json               // npm包管理所需模块及配置信息
│  paths.json                 // src路径配置
│  tsconfig.json              // typescript配置
│  yarn.lock                  // 自动锁定安装包版本       
├─public
│      favicon.ico            // 图标
│      index.html             // 入口html文件          
└─src
    │  App.tsx                // 路由组件 
    │  declaration.d.ts       // 依赖声明文件
    │  index.tsx              // 入口主文件
    │  react-app-env.d.ts     // 声明文件
    ├─assets                  // 存放公共图片
    ├─components              // 公共组件 
    │      404.tsx            // 错误页面
    │      Footer.tsx         // 底部模板组件
    │      Header.tsx         // 头部模板组件
    ├─router
    │      config.js          // 项目路由配置 
    │      index.js           // 单页面路由注册组件
    │      permissionAuth.js  // 登录权限控制组件
    ├─store                   // 全局store状态管理
    │  │  actionTypes.js      // 拆分actionType的类型定义常量
    │  │  index.js            // 创建store管理仓库  
    │  ├─actions              // 拆分action，将它封装到一个函数里面去管理
    │  │      auth.js         // 权限action单独管理
    │  │      index.js        // 合并多个不同action，统一对外输出
    │  │      user.js         // 用户action单独管理
    │  └─reducers             // 创建reducer，更新state数据操作
    │          index.js       // 合并多个不同reducer，统一对外输出
    │          user.js        // 创建用户reducer，更新state数据操作
    ├─styles
    │      base.less           // 基础样式  
    │      footer.less         // 底部样式
    │      header.less         // 头部样式
    │      home.less           // 首页样式
    │      login.less          // 登录样式
    ├─utils
    │      api.js              // 统一封装API接口调用方法
    │      network.js          // axios封装与拦截器配置
    │      url.js              // 自动部署服务器环境
    │      valid.js            // 统一封装公用模块方法
    └─views
            Home.tsx           // 首页
            Login.tsx          // 登录页面
```


# 技术栈
* create-react-app
* React v16.13
* react-router-dom v5.2
* redux v4.0
* react-redux v7.2
* react-thunk v2.3
* typescript v3.7
* antd v4.5
* axios v0.19
* react-persist v6.0
 
# 功能模块
* 登录（登出）
* 注册
* 记住密码
* 忘记密码（修改密码）
* todoList增删改查
* 点亮红星标记
* 查询条件筛选
* 错误页面

# 下载安装依赖
```
git clone https://github.com/jackchen0120/react-ts-antd
cd react-ts-antd
yarn / yarn install
```

## 开发模式
```
yarn start
```
运行之后，访问地址：http://localhost:9000

## 生产环境打包
```
yarn build
```

## 获取更多项目实战经验及各种源码资源

欢迎关注作者公众号：**懒人码农**

<img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly91c2VyLWdvbGQtY2RuLnhpdHUuaW8vMjAyMC81LzEzLzE3MjBlM2U0ZmQ5NDZiZDQ?x-oss-process=image/format,png" width="430" alt="公众号二维码" />
