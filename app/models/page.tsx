import models from "../../data/models.json";
import ModelAtlas from "../model-atlas";

export const metadata = {
  title: "Financial Models — FinLLM Atlas",
  description: "金融领域预训练、指令微调、多模态与推理模型的可筛选图谱。",
};

export default function ModelsPage(){
 return <main className="shell modelsPage">
  <nav className="nav"><a className="brand" href="/">FinLLM <i>Atlas</i></a><div className="navlinks"><a href="/">评测图谱</a><a href="/models" aria-current="page">金融模型</a><a href="/general">通用 Agent</a><a className="github" href="https://github.com/yuedai-pbc/FinEval-Atlas" target="_blank" rel="noreferrer">GitHub ↗</a></div></nav>
  <header className="modelsPageHero"><div><span className="eyebrow">FINANCIAL MODEL REGISTRY</span><h1>金融大模型<br/><span className="highlight">独立图谱</span></h1><p className="lede">聚焦模型本体：机构、参数规模、基座、训练路线、模态、开放权重与许可证。Benchmark、数据审计和 Human × Agent loop 留在评测首页。</p></div><aside><strong>{models.length}</strong><span>个代表性模型 / 家族</span><a href="/">← 返回金融评测图谱</a></aside></header>
  <div className="modelsBoundary"><b>MODEL ≠ AGENT</b><p>FinGPT 等持续演进项目按模型家族收录；FinRobot、FinAgent 等编排系统不作为独立基础模型重复计算。</p></div>
  <ModelAtlas models={models} />
  <footer className="footer"><span>FinLLM Atlas · Financial Models</span><a href="/">Evaluation Atlas →</a></footer>
 </main>;
}
