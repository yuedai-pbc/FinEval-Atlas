import Explorer from "./explorer";
import benchmarks from "../data/benchmarks.json";
import finsearchRaw from "../data/raw/finsearchcomp_data.json";
import FinChainSection from "./finchain-section";
import PaperLibrary from "./paper-library";
import BenchmarkDeepDives from "./benchmark-deep-dives";
import HumanArenaDemo from "./human-arena-demo";

export const metadata = {
  title: "FinEval Atlas — 金融评测数据集图谱",
  description: "面向金融大模型评测设计的数据集、任务、专家流程与 Rubric 可视化图谱。",
};

export default function Home() {
  return <>
    <Explorer benchmarks={benchmarks} finsearchRaw={finsearchRaw} />
    <HumanArenaDemo />
    <main className="shell"><FinChainSection /><BenchmarkDeepDives benchmarks={benchmarks} /><PaperLibrary benchmarks={benchmarks} /></main>
  </>;
}
