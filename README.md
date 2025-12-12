# 🚀 Prompt Optimizer for Claude Code

<div align="center">

![GitHub last commit](https://img.shields.io/github/last-commit/CGang00955/prompt-optimizer-for-claude)
![GitHub stars](https://img.shields.io/github/stars/CGang00955/prompt-optimizer-for-claude?style=social)
![GitHub license](https://img.shields.io/github/license/CGang00955/prompt-optimizer-for-claude)

**基于谷歌68页提示词圣经和老金元提示词技术的Claude Code自动优化器**

[一键安装](#-一键安装) • [使用示例](#-使用示例) • [工作原理](#-工作原理) • [贡献指南](#-贡献指南)

</div>

---

## ✨ 特性

- 🎯 **智能优化** - 自动检测并优化提示词的四大要素
- 🧠 **元提示词强化** - 老金原创的自动强化技术
- 📊 **质量评估** - 实时评分系统（0-4分）
- 🔍 **任务识别** - 智能识别任务类型并匹配最佳策略
- 🚀 **一键安装** - 仅需一行命令即可完成部署
- 🔧 **零配置** - 开箱即用，无需手动配置

## 🚀 一键安装

### 方法1：使用npx（推荐）

```bash
npx prompt-optimizer-for-claude
```

### 方法2：使用curl（Linux/Mac）

```bash
curl -sSL https://raw.githubusercontent.com/CGang00955/prompt-optimizer-for-claude/main/install.sh | bash
```

### 方法3：使用wget（Linux/Mac）

```bash
wget -qO- https://raw.githubusercontent.com/CGang00955/prompt-optimizer-for-claude/main/install.sh | bash
```

### 方法4：使用PowerShell（Windows）

```powershell
iwr -useb https://raw.githubusercontent.com/CGang00955/prompt-optimizer-for-claude/main/install.ps1 | iex
```

## 💻 使用方法

安装完成后，在Claude Code中：

### 基础使用

输入任何简短的提示词，Hook会自动优化：

```bash
# 输入：
写个报告

# Hook自动优化为：
你是一位专业的商业分析师，精通数据可视化和报告撰写。
请基于以下要求创作报告：
1. 包含执行摘要、数据分析和结论建议
2. 目标读者是管理层
3. 提供清晰的数据支持和图表说明
```

### 查看优化效果

每个提示词会显示：
- 📊 质量评分（0-4分）
- 📝 优化建议
- 🎯 任务类型识别
- 💡 改进提示

## 🎯 使用示例

| 原始提示词 | 优化后效果 |
|-----------|-----------|
| "写个文案" | 添加营销策划师角色 + 目标受众分析 + 转化要素 |
| "分析数据" | 添加数据科学家角色 + 分析框架 + 可视化建议 |
| "设计logo" | 添加品牌设计师角色 + 设计原则 + 应用场景 |
| "做个PPT" | 添加演示专家角色 + 结构化模板 + 视觉设计 |

## 🔧 工作原理

### 基于谷歌68页提示词圣经

- ✅ 自然语言精确表达
- ✅ 最佳词数控制（21词）
- ✅ 四大要素完整检测
- ✅ 上下文增强技术

### 老金元提示词技术

- ✅ 元认知层构建
- ✅ 动态模板生成
- ✅ 智能角色匹配
- ✅ 自适应优化

### 质量评估系统

```
评分标准：
- 角色设定 (Persona) - 1分
- 任务定义 (Task) - 1分
- 上下文信息 (Context) - 1分
- 格式要求 (Format) - 1分
总分：0-4分
```

## 📁 项目结构

```
prompt-optimizer-for-claude/
├── hooks/                           # Hook文件目录
│   ├── prompt-optimizer-hook.ts     # 基础优化器
│   ├── metaprompt-enhancer-hook.ts  # 元提示词强化器
│   └── prompt-optimizer-config.json # 配置文件
├── bin/                             # 可执行文件
│   └── install.js                   # 安装脚本
├── scripts/                         # 辅助脚本
├── src/                            # 源代码
└── docs/                           # 文档
```

## 🔍 故障排除

### Hook没有运行？

1. 检查是否安装成功：
   ```bash
   node ~/.claude/hooks/test.js
   ```

2. 验证tsx安装：
   ```bash
   tsx --version
   ```

3. 查看调试日志：
   ```bash
   export DEBUG_PROMPT_OPTIMIZER=1
   ```

### 重新安装

```bash
# 删除旧版本
rm -rf ~/.claude/hooks

# 重新安装
npx prompt-optimizer-for-claude
```

### 临时禁用

```bash
export CLAUDE_HOOKS_ENABLED=false
```

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/AmazingFeature`
3. 提交更改：`git commit -m 'Add some AmazingFeature'`
4. 推送到分支：`git push origin feature/AmazingFeature`
5. 提交Pull Request

## 📝 开发

```bash
# 克隆仓库
git clone https://github.com/CGang00955/prompt-optimizer-for-claude.git
cd prompt-optimizer-for-claude

# 安装依赖
npm install

# 运行测试
npm test

# 开发模式
npm run dev
```

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- 谷歌68页提示词圣经 - 提供了理论基础
- 老金 - 元提示词技术的原创者
- Claude团队 - 提供了强大的AI平台

## 📧 联系方式

- 项目主页：[https://github.com/CGang00955/prompt-optimizer-for-claude](https://github.com/CGang00955/prompt-optimizer-for-claude)
- 问题反馈：[Issues](https://github.com/CGang00955/prompt-optimizer-for-claude/issues)
- 功能建议：[Discussions](https://github.com/CGang00955/prompt-optimizer-for-claude/discussions)

---

<div align="center">

**[⬆ 回到顶部](#-prompt-optimizer-for-claude-code)**

Made with ❤️ by the community

</div>