---
title: 从代码助手到工作控制台：Codex 与 GitHub Copilot 抢占 Agent 桌面
date: 2026-06-02
category: 技术
---

# 从代码助手到工作控制台：Codex 与 GitHub Copilot 抢占 Agent 桌面

2026 年 6 月，OpenAI 与 GitHub 几乎同时把 AI 工具推向了新的产品形态。

OpenAI 为 Codex 增加角色插件、Sites 和批注能力，让它从编程工具走向分析、设计、营销和团队协作。GitHub 则发布 Copilot App 技术预览，把多个 Agent、仓库、Issue、Pull Request、终端和 Canvas 集中到桌面工作台。

两条路线指向同一个趋势：AI 工具的下一场竞争，是谁能成为人类分配任务、查看过程和验收结果的控制台。

## Codex 正在离开纯编程工具的边界

OpenAI 在 6 月 2 日公布，Codex 每周用户已超过 500 万，其中约 20% 是分析师、营销人员、设计师和研究人员等非开发者，而且这部分用户增长速度超过开发者用户的三倍。

这个数据说明，代码生成正在变成一种通用生产方式。当 AI 能创建网页、脚本、仪表盘和轻量应用时，用户可以直接从业务问题出发，让 Agent 选择合适的交付形式。

Codex 新增的角色插件进一步强化了这个方向。首批六类插件覆盖数据分析、创意生产、销售、产品设计、股票研究和投资银行，共连接 62 个常用应用与 110 项技能。

插件的意义不是多几个工具按钮，而是把一类工作的上下文、操作规范和交付流程打包起来。模型能力只有进入真实工具链，才会变成稳定生产力。

## Sites 把 AI 输出从文件变成持续运行的空间

Codex Sites 目前面向 Business 与 Enterprise 用户预览，可以把分析和计划变成通过链接分享的仪表盘、项目看板或轻量应用。

传统 AI 输出通常停留在文本、代码块或下载文件。Sites 则让 Codex 直接生成团队可以继续使用和更新的界面，把产品复盘变成项目网页，把财务模型变成可调整假设的规划器。

AI 的交付物开始从“回答”变成“小型软件”。

与此同时，批注能力允许用户直接选中网站、代码、Markdown、文档、表格或幻灯片中的具体位置，再要求 Codex 修改。这种工作方式比反复在聊天框里描述“第三段第二句话”更自然，也更适合团队审阅。

## GitHub Copilot App 选择成为多 Agent 控制台

GitHub 的路线更贴近软件工程本身。

新的 Copilot App 提供统一的 My Work 视图，让开发者查看多个仓库里的活跃会话、Issue、Pull Request 和后台自动化。一个 Agent 可以排查线上问题，另一个实现需求，第三个处理代码审查意见，而人类从同一个界面观察和调度。

每个 Agent 会话运行在独立的 Git worktree 中。它们拥有真实分支副本，又不会互相覆盖工作区。Copilot App 负责创建和管理这些隔离环境，开发者不必手动切换分支或整理多个目录。

当 AI 可以并行工作时，真正的瓶颈会从生成速度转移到任务隔离、状态追踪和变更合并。

GitHub 还提供 Agent Merge，用于跟踪 CI、审查、失败检查和合并条件，让 Agent 进入 Pull Request 的完整生命周期。

## Canvas 让过程从聊天记录变成可检查对象

聊天适合表达意图，却不适合承载复杂项目的全部状态。长对话会混合计划、日志、错误和修改，让用户难以判断进度与待决策事项。

Canvas 可以展示计划、Pull Request、浏览器、终端、部署状态或工作流。Agent 更新画布，人类则在同一界面编辑、批准或改变方向。

聊天负责讨论模糊意图，Canvas 负责把工作变成可以看见、检查和干预的对象。GitHub 把这种模式称为 Agent Experience，未来 Agent 界面会出现更多差异视图、审批节点、终端和运行状态。

## 两家公司正在争夺不同层级的入口

Codex 与 Copilot App 的方向有明显差别。

Codex 更像通用工作执行平台。它用插件连接职业工具，通过 Sites 生成交互空间，再用批注承接审阅和迭代。

Copilot App 更像软件开发控制台。它以 GitHub 仓库、Issue、PR、CI 和 worktree 为基础，把多个 coding agent 纳入现有工程流程。

简单说，Codex 在扩大 Agent 能完成的工作种类，强调从想法到可分享成果；Copilot 在加深 Agent 对软件交付流程的控制，强调从任务到经过审查的代码。两者最终也会通过插件、SDK 和合作伙伴产生重叠。

真正的竞争点是哪个平台能保存完整上下文，并让用户把 Agent 的产出变成可信结果。

## 多 Agent 越快，越需要人类把关

多 Agent 并行不等于开发者只需点击“全部接受”。人仍要决定任务拆分、共享接口、合并条件和冲突处理，并在关键节点做判断。

没有清晰计划和质量门禁，多个 Agent 只会更快地产生更多待审代码。工作台的价值不是展示 AI 数量，而是让并行工作可控、可追踪、可停止。

## 我的判断

Codex 与 GitHub Copilot App 的变化，说明 AI 工具正在经历一次类似 IDE 的升级。

早期 IDE 把编辑器、编译器、调试器和版本控制集中起来。现在 Agent 工作台正在把模型、文件、终端、任务、审批和交付流程重新集中。

下一代 AI 产品的核心界面，很可能不是聊天框，而是一个能同时回答四个问题的工作台：

- 正在做什么
- 为什么这样做
- 做到了哪一步
- 哪些地方需要人类决定

信息足够清晰，Agent 才可能从偶尔使用的助手变成团队协作者。模型负责生成，工作台负责组织，后者可能才是 AI 工具的工程壁垒。

## 参考资料

- [OpenAI：Codex for every role, tool, and workflow](https://openai.com/index/codex-for-every-role-tool-workflow/)
- [GitHub：Copilot App，面向 Agent 的桌面开发体验](https://github.blog/news-insights/product-news/github-copilot-app-the-agent-native-desktop-experience/)
