# mvc-to-ssr

> 一个依次从 MVC、SPA、SSR 进程演变的案例

## 版本

### mvc 版本

- mvc 版本是 MVC 的渲染逻辑，
- 主要逻辑：简单来说 html 负责样式，后端负责数据逻辑。例如 PHP 模板渲染
- 部署：非静态页面部署
- 缺点：前后端不分离，开发效率低。

### spa 版本

- spa 版本是 MMVM 客户端渲染逻辑，
- 主要逻辑：html 负责样式、数据逻辑，后端负责给数据。例如 Vue 单页面
- 部署：静态页面部署
- 缺点：单页面，seo 不友好，渲染速度有待优化。

### ssr 版本

- ssr 版本是 MVVM 服务端渲染逻辑，
- 主要逻辑：html 负责样式、数据逻辑，后端负责给数据。例如 Nuxt 服务端渲染
- 部署：非静态页面部署
- **优点**：前后端分离，seo 友好，渲染速度快。

## 使用

### mvc 使用

`npm i & npm run dev`

### spa 使用

vscode 打开 index.html，右键 Open In Default Brower

### ssr 使用

`npm i & npm run dev`

## 参考内容

https://github.com/wmui/vue-ssr-demo
