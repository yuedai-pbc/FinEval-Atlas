import Explorer from "./explorer";
import benchmarks from "../data/benchmarks.json";
import models from "../data/models.json";
import finsearchRaw from "../data/raw/finsearchcomp_demo.json";
import ModelAtlas from "./model-atlas";
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
    <Explorer benchmarks={benchmarks} finsearchRaw={finsearchRaw} />
    <main className="shell"><ModelAtlas models={models} /></main>
    <HumanArenaDemo />
    <main className="shell"><FinChainSection /><BenchmarkDeepDives benchmarks={benchmarks} /><PaperLibrary benchmarks={benchmarks} /></main>
  </>;
}
