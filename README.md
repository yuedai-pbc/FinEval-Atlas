# FinEval Atlas

🌐 在线浏览：https://yuedai-pbc.github.io/FinEval-Atlas/

面向金融大模型评测设计的开放研究仓库。它不是简单的论文列表，而是把每个 benchmark 拆成可比较的任务、样例、专家机制与评分 rubric，并通过网页可视化呈现。

## 内容结构

- `data/benchmarks.json`：网页唯一内容源；新增评测集时只需增加一条 JSON 记录。
- `app/explorer.tsx`：筛选、任务矩阵和 Demo Inspector。
- `app/page.tsx`：页面入口。
- `docs/schema.md`：数据字段与贡献规范。

## 本地运行

```bash
npm install
npm run dev
```

## 收录原则

1. 优先收录金融专用或包含金融职业场景的公开 benchmark。
2. 区分论文公开、数据公开、公开子集与仅提供评测服务。
3. Demo 仅用于解释数据结构；原始样例遵循上游许可证与引用要求。
4. 对专家参与、质检轮次、rubric 粒度和评分机制保留可核验来源。

## 下一步

- 接入论文中完整的数据集清单并补齐引用。
- 增加任务级 JSONL 样例与 rubric schema 校验。
- 建立“金融评测集准备模板”，支持内部专家标注与争议仲裁记录。

## License

网站代码可按 MIT 使用；汇总信息与上游数据的许可证彼此独立，请以各数据集原始发布页为准。
