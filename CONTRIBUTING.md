# 贡献指南

感谢你对 Prompt Optimizer for Claude Code 项目的关注！我们欢迎所有形式的贡献。

## 🤝 如何贡献

### 报告问题

如果你发现了bug或有功能建议：

1. 检查[现有issues](https://github.com/CGang00955/prompt-optimizer-for-claude/issues)
2. 如果没有相关issue，请[创建新issue](https://github.com/CGang00955/prompt-optimizer-for-claude/issues/new)

创建issue时请包含：
- 清晰的标题
- 详细的问题描述
- 复现步骤（如果是bug）
- 预期行为
- 实际行为
- 环境信息（操作系统、Node.js版本等）

### 提交代码

1. Fork本仓库
2. 创建你的特性分支：
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. 提交你的更改：
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
4. 推送到分支：
   ```bash
   git push origin feature/amazing-feature
   ```
5. 创建一个Pull Request

## 📋 开发环境设置

### 前置要求

- Node.js >= 14.0.0
- npm >= 6.0.0
- TypeScript
- tsx

### 安装

```bash
# 克隆仓库
git clone https://github.com/CGang00955/prompt-optimizer-for-claude.git
cd prompt-optimizer-for-claude

# 安装依赖
npm install

# 安装tsx（如果还没有）
npm install -g tsx
```

### 运行测试

```bash
# 运行所有测试
npm test

# 运行特定测试
npm run test:hooks

# 生成覆盖率报告
npm run test:coverage
```

### 代码规范

我们使用ESLint进行代码规范检查：

```bash
# 检查代码规范
npm run lint

# 自动修复
npm run lint:fix
```

## 🏗️ 项目结构

```
prompt-optimizer-for-claude/
├── hooks/                    # Hook实现
│   ├── prompt-optimizer-hook.ts    # 基础优化器
│   ├── metaprompt-enhancer-hook.ts # 元提示词强化器
│   └── prompt-optimizer-config.json # 配置文件
├── bin/                     # 可执行文件
├── scripts/                 # 构建和工具脚本
├── src/                     # 源代码
├── docs/                    # 文档
└── tests/                   # 测试文件
```

## 📝 提交信息规范

我们使用[Conventional Commits](https://www.conventionalcommits.org/)规范：

- `feat:` 新功能
- `fix:` 修复bug
- `docs:` 文档更新
- `style:` 代码格式（不影响功能）
- `refactor:` 重构
- `test:` 测试相关
- `chore:` 构建或辅助工具的变动

示例：
```
feat: add new optimization strategy
fix: resolve issue with Windows path handling
docs: update installation instructions
```

## 🧪 测试

### 添加新测试

1. 在`test.js`中添加测试用例
2. 确保测试覆盖新功能
3. 运行测试确保通过

### 测试类型

- **单元测试** - 测试单个功能
- **集成测试** - 测试组件交互
- **端到端测试** - 测试完整流程

## 📚 文档

- README.md - 项目主要文档
- CONTRIBUTING.md - 贡献指南
- CODE_OF_CONDUCT.md - 行为准则
- API文档 - 代码中的注释

## 🏷️ 发布流程

1. 更新版本号：
   ```bash
   npm version patch|minor|major
   ```
2. 更新CHANGELOG.md
3. 创建发布标签：
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

## 💡 贡献想法

我们特别欢迎以下类型的贡献：

### 新优化策略
- 提出新的提示词优化算法
- 支持更多任务类型的识别
- 改进质量评估系统

### 国际化
- 添加多语言支持
- 翻译文档

### 新功能
- GUI配置工具
- 提示词模板库
- 性能分析报告

### 改进
- 性能优化
- 错误处理改进
- 用户体验提升

## 📧 联系方式

- 项目主页：[https://github.com/CGang00955/prompt-optimizer-for-claude](https://github.com/CGang00955/prompt-optimizer-for-claude)
- 问题反馈：[Issues](https://github.com/CGang00955/prompt-optimizer-for-claude/issues)
- 功能建议：[Discussions](https://github.com/CGang00955/prompt-optimizer-for-claude/discussions)

## 📄 许可证

通过贡献代码，你同意你的贡献将在[MIT许可证](LICENSE)下发布。

---

再次感谢你的贡献！🎉