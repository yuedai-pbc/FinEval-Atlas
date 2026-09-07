import Explorer from "./explorer";
import benchmarks from "../data/benchmarks.json";
import models from "../data/models.json";
import finsearchRaw from "../data/raw/finsearchcomp_demo.json";
import FinChainSection from "./finchain-section";
import PaperLibrary from "./paper-library";
import BenchmarkDeepDives from "./benchmark-deep-dives";
import HumanArenaDemo from "./human-arena-demo";

export const metadata = {
  title: "FinLLM Atlas — 金融大模型与评测图谱",
  description: "连接金融大模型、训练路线、开放状态、评测集、真实工作流与评分方法的双语研究图谱。",
};

export default function Home() {
  return <>
    <Explorer benchmarks={benchmarks} models={models} finsearchRaw={finsearchRaw} />
    <main className="shell"><FinChainSection /></main>
    <div className="shell"><div className="chapter"><span>05</span><div><b>HUMAN × AGENT LAYER</b><p>用人类基线、教学反馈和迁移测试闭合评测循环。</p></div></div></div>
    <HumanArenaDemo />
    <main className="shell"><div className="chapter"><span>06</span><div><b>RESEARCH LIBRARY</b><p>最后进入 benchmark 深度档案与论文索引。</p></div></div><BenchmarkDeepDives benchmarks={benchmarks} /><PaperLibrary benchmarks={benchmarks} /></main>
  </>;
}
