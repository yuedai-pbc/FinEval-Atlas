"use client";
import {useMemo,useState} from "react";

export type FinModel={id:string;name:string;year:string;organization:string;parameters:string;baseModel:string;languages:string[];modality:string[];stage:string;access:string;license:string;focus:string[];summary:string;paper:string;code:string;model:string;evidence:string};

const accessFilters=["全部","开放权重","受限开放","未公开权重"];
const modalityFilters=["全部","文本","多模态"];

export default function ModelAtlas({models}:{models:FinModel[]}){
 const [access,setAccess]=useState("全部"); const [modality,setModality]=useState("全部"); const [query,setQuery]=useState("");
 const filtered=useMemo(()=>models.filter(m=>{
  const a=access==="全部"||(access==="开放权重"&&m.access.includes("开放")&&!m.access.includes("受限")&&!m.access.includes("未公开"))||(access==="受限开放"&&m.access.includes("受限"))||(access==="未公开权重"&&m.access.includes("未公开"));
  const mm=modality==="全部"||(modality==="文本"&&m.modality.length===1)||(modality==="多模态"&&m.modality.length>1);
  const q=(m.name+m.organization+m.summary+m.focus.join("")+m.baseModel).toLowerCase().includes(query.toLowerCase());
  return a&&mm&&q;
 }),[models,access,modality,query]);
 const open=models.filter(m=>m.access.includes("开放")&&!m.access.includes("未公开")).length;
 const reasoning=models.filter(m=>m.stage.includes("强化")||m.stage.includes("GRPO")).length;
 return <section id="models" className="section modelAtlas">
  <div className="sectionHead"><div><span className="kicker">FINANCIAL MODEL LANDSCAPE</span><h2>金融大模型图谱</h2></div><p>按“模型本体”收录，框架和 Agent 系统不冒充独立模型；开放性以权重能否取得为准，并保留许可证与基座依赖。</p></div>
  <div className="modelStats"><div><strong>{models.length}</strong><span>模型 / 家族</span></div><div><strong>{open}</strong><span>可取得权重</span></div><div><strong>{reasoning}</strong><span>强化推理路线</span></div><div><strong>{new Set(models.flatMap(m=>m.focus)).size}</strong><span>能力标签</span></div></div>
  <div className="modelControls"><div><small>权重状态</small>{accessFilters.map(x=><button key={x} className={access===x?"active":""} onClick={()=>setAccess(x)}>{x}</button>)}</div><div><small>模态</small>{modalityFilters.map(x=><button key={x} className={modality===x?"active":""} onClick={()=>setModality(x)}>{x}</button>)}</div><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜索模型 / 机构 / 基座..." /></div>
  <div className="modelTimeline">{filtered.map(m=><article className="modelCard" key={m.id}>
   <div className="modelYear">{m.year}</div><div className="modelBody">
    <div className="modelTitle"><div><span>{m.organization}</span><h3>{m.name}</h3></div><b className={m.access.includes("未公开")?"closed":m.access.includes("受限")?"limited":"open"}>{m.access}</b></div>
    <p>{m.summary}</p>
    <div className="modelSpecs"><span><small>参数</small>{m.parameters}</span><span><small>基座</small>{m.baseModel}</span><span><small>训练路线</small>{m.stage}</span><span><small>模态 / 语言</small>{m.modality.join(" · ")} / {m.languages.join(" · ")}</span></div>
    <div className="modelTags">{m.focus.map(x=><i key={x}>{x}</i>)}<i>{m.license}</i></div>
    <div className="modelLinks"><a href={m.paper} target="_blank" rel="noreferrer">论文 / 官方说明 ↗</a>{m.code&&<a href={m.code} target="_blank" rel="noreferrer">代码 ↗</a>}{m.model&&<a href={m.model} target="_blank" rel="noreferrer">模型 ↗</a>}<span>核验：{m.evidence}</span></div>
   </div>
  </article>)}</div>
  {!filtered.length&&<div className="empty">没有符合当前筛选条件的模型。</div>}
  <p className="provenance">口径说明：FinGPT、Open-FinLLMs 按持续演化的模型家族收录；通用 GPT/Qwen/Llama 仅作为基座时不单列；FinRobot、FinAgent 等编排系统归入 Agent 层而非模型层。信息核验截至 2026-09，版本与许可仍应以链接中的官方页面为准。</p>
 </section>;
}
