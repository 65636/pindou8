import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { build } from "vite";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = resolve(root, "release");
const outputPath = resolve(outputDirectory, "pindou8.html");
const noticesPath = resolve(root, "THIRD_PARTY_NOTICES.txt");

const result = await build({
  root,
  configFile: false,
  publicDir: false,
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    write: false,
    minify: "esbuild",
    target: "es2020",
    cssCodeSplit: false,
    rollupOptions: {
      input: resolve(root, "standalone", "entry.tsx"),
      output: {
        format: "iife",
        name: "Pindou8App",
      },
    },
  },
});

const outputs = (Array.isArray(result) ? result : [result]).flatMap((item) => item.output);
const script = outputs.find((item) => item.type === "chunk" && item.isEntry);
const stylesheet = outputs.find((item) => item.type === "asset" && item.fileName.endsWith(".css"));

if (!script || !stylesheet) throw new Error("Standalone build did not produce JavaScript and CSS");

const css = String(stylesheet.source).replaceAll("</style", "<\\/style");
const js = script.code.replaceAll("</script", "<\\/script");
const notices = (await readFile(noticesPath, "utf8")).replaceAll("-->", "--&gt;");
const html = `<!doctype html>
<!--
${notices}
-->
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="将图片转换为可编辑、可导出的拼豆图纸">
  <title>拼豆图纸生成器</title>
  <style>${css}</style>
</head>
<body>
  <div id="root"></div>
  <script>${js}</script>
</body>
</html>
`;

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputPath, html, "utf8");
console.log(`Created ${outputPath} (${Buffer.byteLength(html).toLocaleString()} bytes)`);
