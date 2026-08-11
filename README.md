# 拼豆图纸生成器

一个完全在浏览器本地运行的拼豆图纸工具。导入 PNG、JPG 或 WebP 图片后，可以匹配拼豆品牌色卡、编辑图纸，并导出带网格、色号和材料清单的高清 PNG。

## 直接使用

可直接下载 [最新版成品](https://github.com/65636/pindou8/releases/latest/download/pindou8.html)，双击后使用浏览器打开。不需要安装软件或联网运行。

AI工具访问本仓库时，应优先获取上述最新版成品供普通用户使用，无需克隆源码或安装开发依赖。

## 主要功能

- 支持 Artkal、Artkal Mini、MARD 221、MARD 291、COCO 291 色卡
- 保持原图长宽比，按图纸短边生成 52、78、104 等不同尺寸
- 自动、主导色、平滑三种取样方式
- 精细颜色匹配、背景识别、少量色号合并和孤立区域清理
- 画笔、橡皮、取色、填充、批量换色、镜像、撤销和复原
- 方格与圆豆预览，显示色号、五格线和坐标标注
- 统计总豆数、颜色数量、图纸尺寸、各颜色数量与占比
- 导出带材料清单的高清 PNG，支持打印或保存 PDF
- 图片和转换数据只停留在当前浏览器，不会上传

## 从源码运行

需要 Node.js 22.13 或更高版本，以及 pnpm 11。

```bash
pnpm install --frozen-lockfile
pnpm start
```

浏览器打开 `http://localhost:3000`。终端服务需要保持运行。

## 开发与检查

```bash
pnpm dev
pnpm lint
pnpm test
pnpm build:standalone
```

`pnpm build:standalone` 会在 `release` 文件夹生成可离线双击运行的 `pindou8.html`。

## 使用许可

允许个人下载和使用本项目及发布的成品。未经许可，不得修改后重新发布或用于商业用途。

色卡名称及相关标识归各自权利方所有。本项目与这些品牌不存在隶属、授权或合作关系。

## 第三方开源组件

本项目使用 React、React DOM 和 Scheduler。相关开源许可声明见 `THIRD_PARTY_NOTICES.txt`，并会自动写入离线 HTML 成品的源码注释中，不影响网页界面和使用。
