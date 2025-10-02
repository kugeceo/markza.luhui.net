# 虺创标志设计工具
# markza.luhui.net
轻松打造专属徽标 Markza 虺创是一款直观的徽标设计工具，无需设计经验，几分钟内即可创建专业级的品牌标识。

![Markza Logo](favicon.svg)

Markza 是一款直观易用的在线标志设计工具，旨在帮助用户无需专业设计经验即可快速创建专业级品牌标识。通过简洁的界面和强大的自由绘制功能，任何人都能轻松设计出独特的标志。

## 功能特点

- **自由绘制工具**：通过鼠标或触摸设备在画布上自由创作
- **丰富的样式控制**：
  - 自定义线条颜色
  - 调整线宽（1-20px）
  - 实时预览效果
- **操作灵活性**：
  - 撤销上一步操作
  - 一键清除画布
- **多格式导出**：
  - PNG 图片（适合网页和社交媒体）
  - SVG 矢量文件（适合印刷和缩放）
- **本地存储**：自动保存设计进度，刷新页面不丢失
- **响应式设计**：适配桌面和移动设备

## 在线演示

可以通过以下链接访问在线版本：
- 主站点：[markza.luhui.net](https://markza.luhui.net)
- 自由绘制演示：[markza.luhui.net/freedraw-demo.html](https://markza.luhui.net/freedraw-demo.html)

## 本地安装与运行

### 前提条件

- 现代浏览器（Chrome, Firefox, Safari, Edge 等）
- 本地服务器环境（可选，用于开发测试）

### 安装步骤

1. 克隆本仓库：
   ```bash
   git clone https://github.com/kugeceo/markza.luhui.net.git
   cd markza.luhui.net
   ```

2. 运行本地服务器（多种方法可选）：

   - 使用 Python 内置服务器：
     ```bash
     # Python 3.x
     python -m http.server 8000
     
     # Python 2.x
     python -m SimpleHTTPServer 8000
     ```

   - 使用 Node.js 的 http-server：
     ```bash
     npm install -g http-server
     http-server -p 8000
     ```

3. 在浏览器中访问：`http://localhost:8000`

## 使用指南

### 进入自由绘制界面

有三种方式可以进入绘制功能：

1. **从主界面进入**：打开主页面后，点击右下角的"自由绘制标志"按钮
2. **直接访问演示页**：打开 `http://localhost:8000/freedraw-demo.html`
3. **通过测试页面**：打开 `http://localhost:8000/test-draw-functionality.html`

### 基本绘制操作

1. **绘制线条**：在画布区域按住鼠标左键（或触摸屏幕）并移动
2. **选择颜色**：点击颜色选择器，从调色板中选择所需颜色
3. **调整线宽**：拖动"线宽"滑块，设置线条粗细（范围1-20px）
4. **撤销操作**：点击"撤销"按钮，取消上一步绘制
5. **清除画布**：点击"清除画布"按钮，确认后清空当前内容

### 导出作品

完成设计后，可以将作品导出为两种格式：

1. **导出为PNG**：
   - 点击"导出为PNG图片"按钮
   - 在生成的预览图下方，点击"下载PNG图片"
   - 文件将以"markza-logo.png"为名保存

2. **导出为SVG**：
   - 点击"导出为SVG文件"按钮
   - 文件将以"markza-logo.svg"为名直接下载
   - SVG格式支持在专业设计软件中进一步编辑

### 导入到主界面

1. 完成绘制后，点击"导入到主界面"按钮
2. 系统会提示"标志已成功导入！"
3. 切换回主界面，导入的标志将显示在预览区域
4. 导入的数据存储在浏览器的localStorage中，页面刷新后仍可保留

## 部署指南

Markza 是一个纯前端项目，可以轻松部署到各种静态网站托管平台。

### Vercel 部署

1. 登录 Vercel 账号：[https://vercel.com](https://vercel.com)
2. 点击"New Project"按钮
3. 选择"Import Git Repository"
4. 输入仓库URL：`https://github.com/kugeceo/markza.luhui.net`
5. 点击"Import"按钮
6. 在项目配置页面，保持默认设置：
   - Framework Preset: 选择"Other"
   - Root Directory: 保持为空
   - Build Command: 留空
   - Output Directory: 留空
7. 点击"Deploy"按钮
8. 部署完成后，Vercel 将提供一个URL，如 `https://markza-luhui-net.vercel.app`

### Netlify 部署

1. 登录 Netlify 账号：[https://netlify.com](https://netlify.com)
2. 点击"New site from Git"按钮
3. 选择"GitHub"并授权访问你的仓库
4. 搜索并选择 `markza.luhui.net` 仓库
5. 在部署设置页面：
   - Build command: 留空
   - Publish directory: 留空（默认使用根目录）
6. 点击"Deploy site"按钮
7. 部署完成后，Netlify 将生成一个随机域名，你也可以自定义域名

### GitHub Pages 部署

1. 确保仓库已推送到 GitHub
2. 进入仓库设置页面
3. 滚动到"GitHub Pages"部分
4. 在"Source"下拉菜单中，选择"main"分支（或你的主分支）
5. 点击"Save"按钮
6. 页面将刷新，显示你的网站URL，通常格式为：`https://kugeceo.github.io/markza.luhui.net/`

### 其他静态托管服务

由于这是一个纯静态网站，也可以部署到：
- GitLab Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Surge.sh
- Render

部署方法基本类似：上传所有文件到服务的根目录，无需特殊配置。

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- Canvas API (用于绘制功能)
- localStorage (用于数据存储)

## 目录结构

```
markza.luhui.net/
├── index.html               # 主页面
├── favicon.svg              # 网站图标
├── editor/
│   ├── index.html           # 主编辑界面
│   ├── freedraw-demo.html   # 自由绘制演示页面
│   ├── test-draw-functionality.html # 功能测试页面
│   ├── editor-draw.html     # 集成绘制功能的编辑器
│   └── freedraw-feature-readme.md # 功能说明文档
├── about/                   # 关于页面
├── guide/                   # 使用指南
├── terms/                   # 服务条款
├── privacy/                 # 隐私政策
├── assets/
│   ├── css/                 # 样式文件
│   ├── js/
│   │   └── freeDraw.js      # 绘制功能核心逻辑
│   └── images/              # 图片资源
└── fonts/                   # 字体文件
```

## 浏览器兼容性

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- 移动设备浏览器 (iOS Safari, Android Chrome)

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详见 LICENSE 文件

## 联系方式

- 项目维护者: kugeceo
- 项目地址: [https://github.com/kugeceo/markza.luhui.net](https://github.com/kugeceo/markza.luhui.net)

---

感谢使用 Markza 标志设计工具！希望它能帮助你创建出令人惊艳的品牌标识。
