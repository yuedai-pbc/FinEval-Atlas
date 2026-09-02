import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinEval Atlas",
  description: "金融评测数据集、专家机制与 Rubric 的可视化研究仓库",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "FinEval Atlas — 金融评测数据集图谱",
    description: "任务、专家流程、Rubric 与公开 Demo 的可视化研究地图",
    images: [{ url: "/og.png", width: 1680, height: 945, alt: "FinEval Atlas" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
