# FinEval Atlas

金融大模型评测导航与实验记录库  
Financial LLM Evaluation Atlas and Experiment Log

## 中文简介

`FinEval Atlas` 是一个围绕金融领域大模型评测的双语导航与实验记录项目，重点整理金融知识评测、金融安全、金融行业任务、金融智能体能力以及相关 benchmark 的使用经验。

本项目不是 FinEval 原始数据集或官方评测仓库，而是一个面向研究复现、模型比较和金融 AI 方法梳理的个人研究型索引。它旨在帮助研究者更清楚地理解金融大模型评测应覆盖哪些能力、如何记录实验、如何报告边界，以及如何避免把 benchmark 分数误读为真实金融业务能力。

## Project Overview

`FinEval Atlas` is a bilingual research index and experiment log for financial large language model evaluation. It focuses on financial knowledge benchmarks, safety-oriented evaluation, industry-oriented tasks, financial agent capabilities, and practical notes for using related evaluation resources.

This repository is not the original FinEval dataset or its official benchmark implementation. Instead, it is a personal research-oriented atlas designed to support reproducible notes, model comparison, and structured thinking about financial AI evaluation. The goal is to make evaluation coverage, experiment assumptions, limitations, and reporting standards easier to inspect.

## 项目目标

- 整理金融大模型评测任务、能力维度和公开 benchmark 资源
- 记录不同模型在金融知识、推理、安全和工具使用场景中的实验设置
- 提供中英双语的评测说明、结果记录模板和复现清单
- 区分“考试型金融知识能力”和“真实金融业务可用性”
- 避免上传非公开题库、商业数据库、客户数据、API 密钥或受版权保护材料

## Goals

- Organize financial LLM evaluation tasks, capability dimensions, and public benchmark resources
- Track experiment settings for financial knowledge, reasoning, safety, and tool-use scenarios
- Provide bilingual templates for evaluation notes, result logging, and reproducibility checks
- Distinguish exam-style financial knowledge from real-world financial workflow readiness
- Avoid uploading private test sets, licensed commercial datasets, client data, API keys, or copyrighted materials

## Suggested Repository Structure

```text
FinEval-Atlas/
├── README.md
├── docs/
│   ├── benchmark_map.md
│   ├── evaluation_protocol.md
│   └── reporting_guidelines.md
├── templates/
│   ├── experiment_log_template.md
│   └── model_card_finance_template.md
├── examples/
│   └── synthetic_evaluation_note.md
└── sources/
    └── source_registry.csv
```

## 评测维度

| 中文维度 | English Dimension | 说明 |
| --- | --- | --- |
| 金融学术知识 | Financial academic knowledge | 金融、会计、经济学、统计等基础与专业知识 |
| 金融行业知识 | Financial industry knowledge | 银行、证券、保险、基金、监管和市场实践 |
| 金融安全与合规 | Financial safety and compliance | 风险提示、合规边界、幻觉识别、稳健回答 |
| 金融推理能力 | Financial reasoning | 多步计算、因果解释、情景分析和政策含义 |
| 金融智能体能力 | Financial agent capability | 工具调用、信息检索、任务规划和结果校验 |

## Evaluation Dimensions

| Dimension | Description |
| --- | --- |
| Financial academic knowledge | Core and advanced knowledge in finance, accounting, economics, and statistics |
| Financial industry knowledge | Banking, securities, insurance, funds, regulation, and market practice |
| Financial safety and compliance | Risk disclosure, compliance boundaries, hallucination checks, and robust responses |
| Financial reasoning | Multi-step calculation, causal explanation, scenario analysis, and policy interpretation |
| Financial agent capability | Tool use, retrieval, task planning, and result verification |

## 使用原则

1. 只使用公开、可引用、许可清晰的数据与资料。
2. 对非公开论文、商业数据库、监管内部材料和客户信息保持排除。
3. 不把单一 benchmark 排名等同于金融业务可部署能力。
4. 在报告结果时同时说明模型版本、提示词、采样参数、题目来源、重复次数和失败案例。
5. 对涉及投资、信贷、保险、监管和风控的任务，明确模型输出仅用于研究分析，不构成实际金融建议。

## Usage Principles

1. Use only public, citable, and license-compatible materials.
2. Exclude unpublished manuscripts, licensed commercial databases, internal regulatory documents, and client information.
3. Do not treat a single benchmark ranking as evidence of deployable financial capability.
4. Report model version, prompts, sampling settings, source coverage, repetitions, and failure cases.
5. For investment, credit, insurance, regulation, and risk-control tasks, clarify that model outputs are for research analysis only and do not constitute financial advice.

## Example Experiment Log

```markdown
## Experiment

- Model:
- Date:
- Evaluation set:
- Language:
- Prompt template:
- Decoding parameters:
- Number of runs:
- Scoring method:
- Main observations:
- Failure cases:
- Limitations:
- Reproducibility notes:
```

## Related Resources

- FinEval benchmark and paper: financial-domain LLM evaluation resources from SUFE-AIFLM-Lab
- FinEval: A Chinese Financial Domain Knowledge Evaluation Benchmark for Large Language Models
- FinEval 2.0: updated financial-domain benchmark covering broader knowledge and agent-oriented capabilities

## Citation and Attribution

If you use the original FinEval benchmark, please cite the official FinEval paper and repository according to their instructions. This repository is a derivative research atlas and does not redistribute the original benchmark unless the relevant license explicitly permits redistribution.

如果使用 FinEval 原始评测数据或官方代码，请按照 FinEval 官方论文和仓库要求进行引用。本仓库仅作为研究导航、实验记录和方法整理用途，不在未获授权的情况下重新分发原始评测数据。

## License

Repository notes, templates, and original documentation in this project may be released under the MIT License unless a file states otherwise. Third-party datasets, papers, benchmarks, and code remain governed by their original licenses.

本项目中原创的笔记、模板和说明文档可采用 MIT License；第三方数据集、论文、benchmark 和代码仍遵循其原始许可证。

## Maintainer

Yue Dai  
Research interests: financial AI, fintech, quantitative finance, market microstructure, alternative data, and trustworthy AI for financial institutions.
