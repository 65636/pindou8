import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "拼豆图纸生成器",
  description: "把图片转换成带真实品牌色号、豆数统计和材料清单的可编辑拼豆图纸。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
