"use client";

import {useState} from "react";
import "./long-horizon-benchmarks.css";

const items = [
  {
    id:"osworld", name:"OSWorld", venue:"NeurIPS 2024 · Datasets & Benchmarks", scale:"369 tasks", horizon:"GUI / multi-app / stateful", color:"#ef765e",
    paper:"https://proceedings.neurips.cc/paper_files/paper/2024/hash/5d413e48f84dc61244b6be550f1cd8f5-Abstract-Datasets_and_Benchmarks_Track.html", code:"https://github.com/xlang-ai/OSWorld", data:"https://osworld-v1.xlang.ai/", raw:"https://github.com/xlang-ai/OSWorld/blob/main/evaluation_examples/examples/libreoffice_calc/357ef137-7eeb-4c80-a3bb-0951f26a8aff.json",
    task:"I have calculated the total work hours from the everyday hours... multiply the total hours with the hourly rate... Help me fill in the cell the correct answer. Don't touch irrelevant blank regions.",
    fields:["snapshot: libreoffice_calc","input file: Multiply_Time_Number.xlsx","target artifact: /home/user/Multiply_Time_Number.xlsx","trajectory id: 357ef137-…"],
    rubric:["执行后保存真实工作簿，而不是生成文本答案","compare_table 定位 Sheet 0 / E3","数值必须约等于 191.6667，容差 0.001","不得改动无关空白区域"],
    why:"环境先下载并打开工作簿；Agent 通过鼠标键盘操作 Calc；最终评分器从 VM 取回文件并检查单元格状态。任务难度来自 GUI grounding、应用知识和不可逆状态，而非提示词长度。"
  },
  {
    id:"workarena", name:"WorkArena++", venue:"NeurIPS 2024 · Datasets & Benchmarks", scale:"682 tasks", horizon:"enterprise workflow / compositional", color:"#d9f36b",
    paper:"https://proceedings.neurips.cc/paper_files/paper/2024/hash/0b82662b6c32e887bb252a74d8cb2d5e-Abstract-Datasets_and_Benchmarks_Track.html", code:"https://github.com/ServiceNow/WorkArena", data:"https://github.com/ServiceNow/WorkArena/tree/workarena-plus-plus", raw:"https://github.com/ServiceNow/WorkArena/blob/main/tests/test_task_from_config.py",
    task:'Create a new problem with “Request for a Blackberry” as Problem statement, Impact “3 - Low”, Category “Hardware”, and the specified Description.',
    fields:["task class + seed + fixed_config","ServiceNow live initial state","setup(page) → natural-language goal","cheat(page) → oracle trace","validate(page) → reward/done/info"],
    rubric:["任务由程序生成，不是静态 JSON 问答行","执行前 validate 必须 reward=0 / done=false","官方 oracle 完成后 validate 必须 reward=1 / done=true","组合任务把检索、计算、导航和写操作串联"],
    why:"每个实例由任务类、随机种子和 ServiceNow 状态生成。WorkArena++ 还能自动产生 ground-truth observation/action traces；评测看最终企业系统状态，而不是让 LLM judge 猜是否完成。"
  },
  {
    id:"agencybench", name:"AgencyBench", venue:"ACL 2026 · Main Long Paper", scale:"138 tasks · 32 scenarios", horizon:"~90 calls / ~1M tokens / hours", color:"#8dd3c7",
    paper:"https://aclanthology.org/2026.acl-long.337/", code:"https://github.com/GAIR-NLP/AgencyBench", data:"https://github.com/GAIR-NLP/AgencyBench/tree/main/AgencyBench-v2", raw:"https://github.com/GAIR-NLP/AgencyBench/blob/main/AgencyBench-v2/Research/scenario1/description.json",
    task:"Identify a public synthetic AI-consciousness QA dataset; implement a reproducible fetch script; save its README and a random sample; then build metadata conforming to the supplied schema.",
    fields:["deliverable: fetch_consciousness_dataset.py","deliverable: README snapshot","deliverable: search_data_1.json","user simulator may return iterative feedback","Docker sandbox stores artifacts and trajectories"],
    rubric:["10: dataset fully matches; README/sample captured; schema exact; script reruns","7: mostly correct but minor reproducibility/schema gap","3: dataset mismatch or missing evidence/deliverables","0: no usable deliverables"],
    why:"这是典型 artifact-based 长程任务：查询只是开始，真正被评分的是多文件交付物、可复现脚本、schema 合规和迭代修复。评分组合规则、视觉 judge 与 LLM judge。"
  },
  {
    id:"mlagentbench", name:"MLAgentBench", venue:"ICML 2024", scale:"13 ML tasks", horizon:"experiment → inspect → revise", color:"#b3a7ff",
    paper:"https://proceedings.mlr.press/v235/huang24y.html", code:"https://github.com/snap-stanford/MLAgentBench", data:"https://github.com/snap-stanford/MLAgentBench/tree/main/MLAgentBench/benchmarks", raw:"https://github.com/snap-stanford/MLAgentBench/blob/main/MLAgentBench/benchmarks/cifar10/scripts/research_problem.txt",
    task:"Given train.py, improve the current model performance with a simple change. Training epochs must stay within 10. Save per-class probabilities for test examples to submission.csv as shown in train.py.",
    fields:["workspace contains editable train.py","agent may read/write files and execute code","metric is computed by task-specific eval.py","submission.csv is a required artifact","history records plans, actions and observations"],
    rubric:["必须实际提升任务指标，不按文字流畅度评分","训练 epoch ≤ 10","submission.csv 格式和测试集行数正确","代码必须能在环境内重新执行"],
    why:"长程性来自闭环实验：阅读基线、提出改动、运行训练、检查分数/报错、继续修改。它特别适合借鉴到量化建模、预测和金融模型迭代任务。"
  },
  {
    id:"swebench", name:"SWE-bench", venue:"ICLR 2024", scale:"2,294 issues (original)", horizon:"repo-scale diagnosis / patch / tests", color:"#f6c85f",
    paper:"https://openreview.net/forum?id=VTF8yNQM66", code:"https://github.com/SWE-bench/SWE-bench", data:"https://huggingface.co/datasets/princeton-nlp/SWE-bench", raw:"https://github.com/SWE-bench/SWE-bench/blob/main/docs/guides/evaluation.md",
    task:"Given a real GitHub issue and the repository at base_commit, produce a model_patch that resolves the issue without regressing existing behavior.",
    fields:["instance_id","repo + base_commit","problem_statement + optional hints","patch / test_patch","FAIL_TO_PASS + PASS_TO_PASS"],
    rubric:["应用 model_patch 后，FAIL_TO_PASS 测试必须转为通过","原本通过的 PASS_TO_PASS 测试必须继续通过","在隔离 Docker 镜像中重现实例","resolved 是可执行二元结果，不依赖 LLM judge"],
    why:"任务不规定推理路径；Agent必须探索代码库、定位跨文件原因、编辑、运行测试并修复失败。其最大启示是：开放式长任务仍可用隐藏回归测试做确定性终态验证。"
  }
];

export default function LongHorizonBenchmarks(){
  const [active,setActive]=useState(0); const x=items[active];
  return <section className="section lh" id="long-horizon-lab">
    <div className="sectionHead"><div><span className="kicker">LONG-HORIZON BENCHMARK LAB</span><h2>五套顶会长程 Agent 原始 Demo</h2></div><p>逐项保留官方任务文本、环境字段与评分逻辑。中文只负责解释结构；英文 demo 来自官方仓库，不是重新编造的金融例子。</p></div>
    <div className="lhTabs">{items.map((b,i)=><button key={b.id} className={i===active?"active":""} onClick={()=>setActive(i)} style={{"--accent":b.color} as React.CSSProperties}><b>{b.name}</b><span>{b.venue}</span></button>)}</div>
    <article className="lhPanel" style={{"--accent":x.color} as React.CSSProperties}>
      <header><div><span className="lhVenue">{x.venue}</span><h3>{x.name}</h3></div><div className="lhStats"><b>{x.scale}</b><span>{x.horizon}</span></div></header>
      <div className="lhLinks"><a href={x.paper} target="_blank">论文</a><a href={x.code} target="_blank">官方代码</a><a href={x.data} target="_blank">数据 / 环境</a><a href={x.raw} target="_blank">原始 Demo ↗</a></div>
      <div className="lhGrid">
        <div className="lhRaw"><label>OFFICIAL TASK / 原始任务</label><pre>{x.task}</pre></div>
        <div><label>INSTANCE FIELDS / 实例组成</label><ol>{x.fields.map(v=><li key={v}>{v}</li>)}</ol></div>
        <div><label>EVALUATOR / RUBRICS</label><ol>{x.rubric.map(v=><li key={v}>{v}</li>)}</ol></div>
        <div className="lhWhy"><label>为什么它是长程任务</label><p>{x.why}</p></div>
      </div>
      <p className="lhAudit">审计口径：页面只节选一个官方实例用于可视化；完整字段、附件、轨迹和 evaluator 请点击“原始 Demo”。不同版本的数据规模和排行榜结果不可直接混用。</p>
    </article>
  </section>
}
