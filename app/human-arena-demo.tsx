"use client";

import {useMemo,useState} from "react";
import "./human-arena-demo.css";

type Track="E1"|"E2"|"E3";
type Role="analyst"|"teacher"|"judge";

const tasks={
 E1:{title:"跨时间演化",company:"千方科技 · 2020H1 时点",question:"基于截至 2020-08-21 可见的信息，更新 2020 全年 EPS 判断，并说明相较 Q1 判断为何变化。",evidence:[
  ["2019FY","2020-04-16 可见","营收 87.22 亿元；归母净利润 10.13 亿元；EPS 0.69；经营现金流 9.37 亿元"],
  ["2020Q1","2020-04-28 可见","营收 16.52 亿元；归母净利润 1.15 亿元；EPS 0.08；经营现金流 -4.20 亿元"],
  ["2020H1","2020-08-21 可见","营收 37.14 亿元；归母净利润 4.74 亿元；EPS 0.32；经营现金流 -4.38 亿元"]
 ],memory:"Q1 经验：疫情冲击使盈利承压，全年 EPS 需要下调；后续必须检查项目恢复和现金流。",actionLabel:"你如何处理已有经验？",actions:["保留","修订","停用"],suggested:"修订",answer:"将全年 EPS 区间上调至约 0.68–0.75；H1 利润恢复快于 Q1 隐含节奏，但经营现金流仍弱，需要保留风险折价。",feedback:"隐藏终点：2020FY 正式披露基本 EPS 为 0.72。评分同时检查预测误差、更新方向、引用证据和未来信息泄漏。"},
 E2:{title:"经验过时",company:"千方科技 · 股本变更后",question:"发行完成后计算和解释每股指标。旧股本经验还能否直接用于当前计算？",evidence:[
  ["旧状态","历史有效","发行前总股本 1,491,019,775 股"],
  ["公司事件","2020-08-20","非公开发行 90,562,440 股"],
  ["新状态","当前有效","发行后期末总股本 1,581,183,315 股"]
 ],memory:"历史经验：该公司总股本约 14.91 亿股，可用净利润除以该股数估算 EPS。",actionLabel:"你如何处理这条旧经验？",actions:["保留","修订","停用当前适用性"],suggested:"停用当前适用性",answer:"14.91 亿股只能保留为发行前历史事实，不能直接用于发行后的当前计算；应读取新股本，并在会计 EPS 中进一步检查加权平均股数。",feedback:"关键陷阱：正式披露基本 EPS 为 0.72；用期末股本机械相除约为 0.69。只换成新期末股本但不检查加权平均口径，不能得满分。"},
 E3:{title:"跨公司迁移",company:"JPM → Wells Fargo · 2024FY",question:"把在 JPM 任务中学到的经验迁移到 Wells Fargo，判断其盈利增长是否伴随资产负债表扩张。",evidence:[
  ["WFC 净利润","SEC 10-K","2023: $19.142bn → 2024: $19.722bn"],
  ["WFC 基本 EPS","SEC 10-K","2023: 4.88 → 2024: 5.43"],
  ["WFC 总资产","SEC 10-K","2023: $1.932468tn → 2024: $1.929845tn"],
  ["WFC 权益","SEC 10-K","2023: $185.735bn → 2024: $179.120bn"]
 ],memory:"JPM 经验：核验 filing 与单位，分别计算盈利和资产负债表同比；JPM 2024 的实体结论是“利润增长并伴随资产扩张”。",actionLabel:"哪些经验可以迁移？",actions:["整条迁移","只迁移分析程序","全部拒绝"],suggested:"只迁移分析程序",answer:"迁移 filing 校验、单位对齐和同比计算程序，但拒绝 JPM 的实体结论。WFC 净利润约增 3.03%、EPS 增 11.27%，总资产约降 0.14%、权益降 3.56%，并非资产负债表扩张。",feedback:"核心评分是 Procedure Transfer Gain 与 Entity Leakage：方法迁移得分，照搬 JPM 数值或公司结论属于硬错误。"}
} as const;

const roleCopy={
 analyst:["人类分析师","独立完成任务；提交结论、证据、置信度和经验操作。"],
 teacher:["专家教师","先查看 Agent 草稿，指出错误并写成可复用纠正规则；下一题检查是否复发。"],
 judge:["专家裁判","不重做整题；逐条判断证据、结论、时间合规与经验操作是否满足 rubric。"]
} as const;

export default function HumanArenaDemo(){
 const [track,setTrack]=useState<Track>("E1"); const [role,setRole]=useState<Role>("analyst");
 const [selectedEvidence,setSelectedEvidence]=useState<string[]>([]); const [action,setAction]=useState("");
 const [answer,setAnswer]=useState(""); const [confidence,setConfidence]=useState(70); const [submitted,setSubmitted]=useState(false);
 const task=tasks[track];
 const reset=(next:Track)=>{setTrack(next);setSelectedEvidence([]);setAction("");setAnswer("");setSubmitted(false)};
 const toggle=(id:string)=>setSelectedEvidence(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
 const readiness=useMemo(()=>[answer.trim().length>18,selectedEvidence.length>0,Boolean(action)].filter(Boolean).length,[answer,selectedEvidence,action]);
 const score=submitted?Math.min(100,42+selectedEvidence.length*9+(action===task.suggested?22:4)+(answer.trim().length>45?18:8)):0;
 return <section id="human-arena" className="haSection">
  <div className="haHeading"><div><span>HUMAN PARTICIPATION PROTOTYPE</span><h2>人进入 Arena 后，实际做什么？</h2></div><p>同一个冻结信息世界、同一套核心 rubric。这里完整演示人类分析师、专家教师和专家裁判在 E1–E3 中的参与方式。</p></div>
  <div className="haRoleBar">{(Object.keys(roleCopy) as Role[]).map(r=><button key={r} className={role===r?"active":""} onClick={()=>setRole(r)}><b>{roleCopy[r][0]}</b><span>{roleCopy[r][1]}</span></button>)}</div>
  <div className="haTrackTabs">{(Object.keys(tasks) as Track[]).map(t=><button key={t} className={track===t?"active":""} onClick={()=>reset(t)}><b>{t}</b><span>{tasks[t].title}</span></button>)}</div>
  <div className="haWorkspace">
   <aside className="haEvidence"><div className="haLabel">01 / 当时可见材料</div><h3>{task.company}</h3><p className="haFreeze">信息冻结：禁止互联网与未来披露</p>{task.evidence.map((e,i)=>{const id=`${track}-${i}`;return <button key={id} className={selectedEvidence.includes(id)?"selected":""} onClick={()=>toggle(id)}><span>{e[0]} · {e[1]}</span><p>{e[2]}</p><i>{selectedEvidence.includes(id)?"已引用":"点击引用"}</i></button>})}</aside>
   <main className="haTask"><div className="haLabel">02 / 当前任务</div><h3>{task.question}</h3>
    {role==="teacher"&&<div className="haAgentDraft"><b>Agent 草稿</b><p>{track==="E2"?"继续使用历史股本 14.91 亿股计算，得到约 0.73 元。":track==="E3"?"沿用 JPM 经验，因此 WFC 也是盈利增长并伴随资产扩张。":"沿用 Q1 悲观判断，预计全年 EPS 约 0.45 元。"}</p><span>你的目标：指出错误，并把纠正写成下一任务可复用的规则。</span></div>}
    {role==="judge"&&<div className="haAgentDraft"><b>待审答案</b><p>{task.answer}</p><span>你的目标：引用 rubric 证据判定通过、部分通过或失败，而不是凭整体印象打分。</span></div>}
    <label className="haInput"><span>{role==="teacher"?"专家纠正与可复用规则":role==="judge"?"裁判理由":"你的结论与更新理由"}</span><textarea value={answer} onChange={e=>setAnswer(e.target.value)} placeholder={role==="analyst"?"写出结论、计算或预测区间，并解释相较此前判断发生了什么变化……":"指出具体错误、对应证据，以及后续应执行的检查规则……"}/></label>
    <div className="haAction"><span>{task.actionLabel}</span>{task.actions.map(a=><button key={a} className={action===a?"active":""} onClick={()=>setAction(a)}>{a}</button>)}</div>
    <label className="haConfidence"><span>置信度 <b>{confidence}%</b></span><input type="range" min="10" max="100" value={confidence} onChange={e=>setConfidence(Number(e.target.value))}/></label>
    <div className="haSubmit"><span>{readiness}/3 必填项完成 · 已引用 {selectedEvidence.length} 条证据</span><button disabled={readiness<3} onClick={()=>setSubmitted(true)}>冻结并提交</button></div>
   </main>
   <aside className="haScore"><div className="haLabel">03 / 提交后反馈</div>{!submitted?<div className="haLocked"><b>评分已隐藏</b><p>提交前不显示终点和标准答案，防止后续判断被污染。</p></div>:<><div className="haScoreRing"><strong>{score}</strong><span>/ 100 demo score</span></div><div className="haGold"><b>参考行为</b><p>{task.answer}</p></div><div className="haReveal"><b>隐藏评测信息</b><p>{task.feedback}</p></div><button className="haRetry" onClick={()=>{setSubmitted(false);setAnswer("")}}>用反馈再做一次</button></>}</aside>
  </div>
  <div className="haLoop"><div><b>① 人独立作答</b><span>建立 Human Baseline</span></div><i>→</i><div><b>② 专家纠正 Agent</b><span>生成带来源的教学经验</span></div><i>→</i><div><b>③ 下一任务重测</b><span>检查纠正是否保留与迁移</span></div><i>→</i><div><b>④ 专家裁判仲裁</b><span>处理开放式结论与分歧</span></div></div>
  <p className="haFootnote">Demo 中的即时分数只用于演示交互；正式 Arena 使用冻结金标、原子 rubric、双人盲评和分歧仲裁。人类与 Agent 共用结果评分，时间、成本和记忆轨迹分别记录。</p>
 </section>
}
