# YAO 个人作品集最终整理版

这是从本地最终预览版本整理出的独立作品集项目。主入口是 `preview.html`，包含首页、About、Work 项目展示、横向滚动画廊、项目 hover 图片/视频动效、Contact、微信二维码弹窗、项目弹窗和 PDF 项目详情页。

## 技术栈

- Vite
- 静态 HTML/CSS/JavaScript
- PDF.js
- Three.js、GSAP、HLS.js 等页面运行时依赖通过页面 CDN 引入
- pnpm

## 安装

```bash
pnpm install
```

## 本地运行

```bash
pnpm dev
```

也可以使用项目自带的静态预览服务：

```bash
pnpm run preview:portfolio
```

## 构建

```bash
pnpm build
```

构建产物会输出到 `dist/`，该目录不需要提交到 GitHub。

## 目录结构

```text
yao-portfolio-final/
├─ assets/
│  ├─ images/
│  │  └─ sky-trail/
│  ├─ videos/
│  └─ fonts/
├─ pdf/
├─ projects/
│  └─ assets/
├─ src/
├─ index.html
├─ preview.html
├─ package.json
├─ pnpm-lock.yaml
├─ vite.config.js
├─ server.mjs
└─ README.md
```

## 页面与功能

- `preview.html`：作品集主页面。
- `projects/21-day-fitness-challenge.html`：21 天运动打卡挑战 PDF 详情页。
- `projects/brand-upgrade.html`：品牌视觉升级 PDF 详情页。
- `pdf/`：项目 PDF 文件。
- `projects/assets/pdfjs/`：PDF 内嵌预览所需的 PDF.js 文件、字体和辅助资源。
- `assets/images/wechat-qr.png`：微信二维码弹窗图片。

## 大视频资源说明

压缩后的 AIGC 视频已接入项目，路径为 `assets/videos/aigc-monkey.mp4`，页面使用 `preload="metadata"`，不会在首页首次加载时预加载完整视频。

本地商业广告视频存在且约 4.8 MB，已复制为 `assets/videos/commercial-ad.mp4`。
