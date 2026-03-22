# OpenClaw Agent 踩坑实录：多源知识检索落地

为了备战三月份的 AI Agent 开发比赛，最近这段时间一直在折腾本地知识库和智能体的搭建。过程中踩了不少坑，在这里做个简单的复盘。

## 为什么选择 OpenClaw？

在对比了市面上几种主流的 Agent 框架后，OpenClaw 在轻量化和多源知识接入方面表现得极其克制且高效。

### 核心痛点与解决思路

在实际开发中，最大的阻碍是**上下文窗口溢出**和**检索召回率低**。

1.  **文本分块 (Chunking) 策略：** 不能无脑按字数切分。需要结合 Markdown 的标题层级或者代码块边界进行语义切分。
2.  **向量数据库的调优：** 选择了轻量级的本地向量方案，优化了检索时的 Top-K 阈值。

```python
# 一个简单的 Agent 检索逻辑伪代码
def agent_retrieve(query, context_db):
    vectors = embed(query)
    results = context_db.search(vectors, top_k=3)
    
    if not results:
        return "本地知识库中未找到相关记录，请求大模型降级处理..."
        
    return build_prompt(query, results)
```

系统的底层逻辑已经跑通，接下来的重点是优化提示词工程（Prompt Engineering）和界面的流式输出体验。
