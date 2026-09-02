"use client";
import {useState} from "react";
import "./paper-library.css";

type B={id:string;name:string;year:string;scope:string;summary:string;tasks:string[];expert:string;rubric:string;access:string;paper:string;data:string};
const venue:Record<string,string>={gdpval:"OpenAI Research · 2025（非会议论文）",tau:"ICLR 2025；τ³-bench 为后续扩展",bigfinance:"2026 Preprint",financebench:"2023 Preprint",finqa:"EMNLP 2021",prbench:"2025 Preprint",finsearchcomp:"ICLR 2026",finsight:"ACL 2026 Main",finchain:"ACL 2026 Main",multifinben:"ACL 2026 Main",finmragbench:"Findings of ACL 2026",fincallsurprise:"ACL 2026 Main",finch:"Findings of ACL 2026",agencybench:"ACL 2026 Main",workarena:"NeurIPS 2024 Datasets & Benchmarks",osworld:"NeurIPS 2024 Datasets & Benchmarks",gaia:"ICLR 2024",bankertoolbench:"2026 Preprint"};
const points:Record<string,string[]>={
 gdpval:["从真实职业交付物而非短问答衡量模型价值","44 个职业、9 个行业，金融岗位单独可筛选","专家以盲测方式比较模型与人类成果"],
 tau:["多轮用户互动与工具调用共同决定成败","数据库最终状态检查任务是否真正完成","领域政策约束行为；pass^k 衡量稳定性"],
 bigfinance:["覆盖找数、口径判断、计算和来源追踪","真实金融研究问题而非模板化算术","逐点加权 rubric 支持诊断式评分"],
 financebench:["基于真实上市公司披露的开放式问答","答案必须与证据字符串及文档来源对应","专门暴露 RAG 检索和财报推理错误"],
 finqa:["财报文本与表格联合数值推理","金标包含可执行程序而不只有答案","多阶段人工标注与程序执行验证"],
 prbench:["高风险专业任务采用专家 criteria","同时检查准确性、合规、推理和沟通","金融与法律分领域报告能力差异"],
 finsearchcomp:["Greater China 与 Global 双市场","T1 实时、T2 简单历史、T3 复杂历史三层任务","70 名金融专家构造并多阶段质检 635 题"],
 finsight:["从研究目标生成发布级公司/行业长报告","数据分析、引用写作和 VLM 图表迭代结合","20 项评测目标与九维长报告质量评估"],
 finchain:["58 主题的可执行符号金融推理","逐步金标与最终答案同时可验证","ChainEval 用 DTW 对齐不同长度推理链"],
 multifinben:["36 个数据集、5 种语言与三种模态","同时覆盖单语、双语和多语设置","难度感知汇总避免简单任务主导总分"],
 finmragbench:["真实年报的多文档、多页、多模态检索","887 个专家核验 QA、五类分析任务","分开考察检索证据与答案生成"],
 fincallsurprise:["融合电话会音频、文本、新闻和财务信号","以 earnings surprise 作为真实市场标签","重点检查多模态互补性与时点泄漏"],
 finch:["电子表格中心的端到端财务会计工作流","172 工作流、384 任务与大规模跨文件依赖","成果级检查 Excel、PDF、Word 等真实交付物"],
 agencybench:["平均约 90 次工具调用的超长程任务","模拟用户持续反馈而非一次性提示","在沙箱中同时检查功能和视觉成果"],
 workarena:["ServiceNow 中可复现的企业知识工作流","组合规划、检索、逻辑和算术能力联合评测","环境最终状态提供可执行成功判定"],
 osworld:["真实操作系统和常用桌面应用","视觉观察、鼠标键盘与跨应用操作","369 个任务由环境状态函数验证"],
 gaia:["现实助理问题需要浏览、工具、推理和多模态","Level 1–3 控制所需步骤与工具复杂度","最终采用可规范化短答案，测试集隐藏"],
 bankertoolbench:["投行数据室到模型与 pitchbook 的完整链路","Excel、PPT、PDF/Word 多文件必须数字一致","资深银行家定义成果级细粒度 criteria"]
};
const appendix:Record<string,string>={
 finchain:"附录 A–B 公开模板生成 prompt、自动验证约束、10 位专家校准与逐模板审核、问题标签、返修统计及两套 1–5 分人评 rubric；附录 C–F 给出模型配置、指标消融、分领域结果和错误类型。",
 finsight:"附录展示公司级案例、报告评价 prompt/维度与补充人评结果；官方仓库未发布完整 20 项目标清单、金标券商报告或论文评测脚本。",
 finsearchcomp:"附录进一步拆分 T1/T2/T3、地区与行业覆盖，说明专家构题、来源核验、时间敏感答案更新和 judge 设计；本站另有 635 条官方原始记录浏览器。",
 finqa:"附录说明运算符集合、程序标注规范、数据划分、人工质量控制与误差分析；官方仓库提供完整 JSON 数据和执行脚本。",
 financebench:"论文附录给出样例、答案类型、公司/行业分布及评价说明；官方数据包含问题、答案、证据和文档定位字段。",
 finmragbench:"附录细化五类任务、多文档/多页证据构造、专家验证与检索—生成实验设置；应以官方仓库版本和论文 PDF 对照。",
 finch:"附录描述真实文件脱敏、工作流拆分、跨格式预处理、专家标注时长与成果级 judge；官方仓库开放评测管线，数据入口另列。",
 default:"已把论文与数据/代码入口并列；附录中的构建细节将按原文标注，若作者未开放附录材料或完整数据，会明确显示为未公开而不是补写推测内容。"
};

export default function PaperLibrary({benchmarks}:{benchmarks:B[]}){
 const [open,setOpen]=useState("finchain");
 return <section id="paper-library" className="section paperLibrary"><div className="sectionHead"><div><span className="kicker">PAPER DOSSIERS</span><h2>全部论文档案</h2></div><p>每篇统一展示会议、摘要导读、主要卖点、评测设计、专家与 rubric、附录构建线索。摘要为中文转述，点击论文可核对原文。</p></div><div className="dossierList">{benchmarks.map(b=><article key={b.id} className={`dossier ${open===b.id?"open":""}`}><button className="dossierHead" onClick={()=>setOpen(open===b.id?"":b.id)}><span>{venue[b.id]||b.year}</span><b>{b.name}</b><em>{b.access}</em><i>{open===b.id?"−":"+"}</i></button>{open===b.id&&<div className="dossierBody"><div className="dossierAbstract"><span>ABSTRACT · 中文转述</span><p>{b.summary}</p><div className="dossierLinks"><a href={b.paper} target="_blank">论文原文 ↗</a><a href={b.data} target="_blank">数据 / 代码 ↗</a></div></div><div><span>主要卖点</span><ol>{(points[b.id]||b.tasks).map(x=><li key={x}>{x}</li>)}</ol></div><div><span>评测设计要点</span><p><b>覆盖：</b>{b.scope}</p><p><b>任务：</b>{b.tasks.join(" · ")}</p><p><b>专家：</b>{b.expert}</p><p><b>Rubric：</b>{b.rubric}</p></div><div className="appendixBox"><span>APPENDIX · 构建细节</span><p>{appendix[b.id]||appendix.default}</p></div></div>}</article>)}</div></section>
}
