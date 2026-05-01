# 🚀 AI 文档生成器

基于 AI 大模型的智能文档生成与代码辅助工具

## ✨ 功能特性

### 🌐 多模型支持
支持 **7 种 AI 提供商**，灵活切换：
- 🤖 **小米 MiMo** - mimo-v2.5, mimo-vision
- 🧠 **OpenAI** - GPT-4o, GPT-4 Turbo
- 🎯 **Anthropic Claude** - Claude 3 Opus/Sonnet/Haiku
- 🚀 **智谱 AI** - GLM-4, GLM-4-Plus
- 🌙 **月之暗面 Kimi** - Moonshot-v1
- 🔍 **DeepSeek** - DeepSeek Chat/Coder
- 💎 **通义千问** - Qwen-Max/Plus/Turbo

### 📝 智能文档生成
- **技术文档**: 自动生成完整的技术文档
- **API 文档**: 生成详细的 API 接口文档
- **教程指南**: 创建从入门到进阶的教程
- **代码生成**: 根据需求生成规范代码

### 💬 对话交互
- 多轮对话，支持上下文记忆
- 实时 Markdown 渲染
- 代码语法高亮显示

### 🎨 用户友好
- 直观的可视化界面
- 预置多种专业模板
- 支持自定义提示词
- 一键导出 Markdown 文件

## 🛠️ 技术栈

- **前端框架**: React 19
- **构建工具**: Vite 5
- **Markdown 渲染**: react-markdown + rehype-highlight
- **HTTP 客户端**: Axios
- **AI 模型**: 支持多种 AI 提供商 (MiMo, OpenAI, Claude, 智谱, Kimi, DeepSeek, Qwen)

## 📦 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

应用将在 http://localhost:3001 启动

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

## 🎯 使用指南

### 1. 获取 API Key
选择一个或多个 AI 提供商，注册并获取 API Key：
- **小米 MiMo**: https://mimo-api.xiaomimimo.com
- **OpenAI**: https://platform.openai.com
- **Anthropic**: https://console.anthropic.com
- **智谱 AI**: https://open.bigmodel.cn
- **月之暗面**: https://platform.moonshot.cn
- **DeepSeek**: https://platform.deepseek.com
- **通义千问**: https://dashscope.console.aliyun.com

### 2. 配置应用
- 选择 AI 提供商（支持 7 种）
- 选择具体模型（每个提供商有多个模型）
- 输入对应的 API Key
- 选择适合的文档模板
- 输入主题或内容

### 3. 开始使用
- 点击"发送"或按 Enter 键开始生成
- 支持多轮对话，AI 会记住上下文
- 满意后可点击"导出"保存为 Markdown 文件

## 📋 可用模板

| 模板 | 说明 |
|------|------|
| 📝 技术文档 | 生成包含概述、架构、API 示例的完整文档 |
| 💻 代码生成 | 生成规范、有注释的代码实现 |
| 🔌 API文档 | 生成详细的 API 接口文档 |
| 📚 教程指南 | 创建完整的教程和指南 |
| 🔍 代码审查 | 审查代码并提供优化建议 |
| ✨ 自定义 | 自由输入提示词 |

## 🌟 特色功能

### 多提供商支持
不局限于单一模型，可根据需求选择最合适的 AI 提供商。

### 多轮对话
AI 会记住对话历史，支持上下文连续的对话体验。

### 代码高亮
自动识别代码语言并应用语法高亮，提升可读性。

### 一键导出
将对话内容导出为 Markdown 文件，方便保存和分享。

### 实时预览
提示词实时预览，确保生成内容符合预期。

### 灵活切换
随时切换不同的 AI 提供商和模型，对比不同模型的输出质量。

## 📁 项目结构

```
ai-doc-generator/
├── src/
│   ├── api/
│   │   └── mimo.js              # MiMo API 集成
│   ├── components/
│   │   ├── ChatPanel.jsx        # 对话面板
│   │   └── ConfigPanel.jsx      # 配置面板
│   ├── App.jsx                  # 主应用
│   ├── main.jsx                 # 入口文件
│   └── index.css                # 样式文件
├── APPLICATION.md               # 小米 Token 计划申请材料
├── package.json
├── vite.config.js
└── index.html
```

## 🔧 API 配置

### 环境变量（可选）
创建 `.env` 文件：
```env
VITE_MIMO_API_KEY=your_api_key_here
```

### API 端点
默认使用: `https://api.mimo.xiaomimimo.com/v1/chat/completions`

## 📝 开发说明

### 添加新模板
在 `src/components/ConfigPanel.jsx` 中的 `templates` 数组添加新模板。

### 自定义样式
修改 `src/index.css` 文件来自定义界面样式。

### API 扩展
在 `src/api/mimo.js` 中扩展 API 功能，支持更多模型和参数。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

- **Xiaomi MiMo**: 提供强大的 AI 模型支持
- **MiMo Orbit 计划**: 百万亿 Token 激励计划

---

**开发状态**: ✅ 已完成 MVP 版本  
**最后更新**: 2026年5月1日
