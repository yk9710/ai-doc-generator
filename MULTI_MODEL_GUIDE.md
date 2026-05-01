# 🌐 多模型使用指南

## 支持的 AI 提供商

### 1. 🤖 小米 MiMo
- **API 地址**: https://mimo-api.xiaomimimo.com
- **可用模型**: 
  - `mimo-v2.5` - 旗舰模型，综合能力最强
  - `mimo-v2.5-lite` - 轻量级，速度快
  - `mimo-vision` - 多模态，支持图像理解
- **优势**: 中文优化好，性价比高，支持多模态
- **适用场景**: 日常文档生成、代码辅助、中文内容创作

### 2. 🧠 OpenAI
- **API 地址**: https://platform.openai.com
- **可用模型**:
  - `gpt-4o` - 最强模型，多模态
  - `gpt-4o-mini` - 快速响应
  - `gpt-4-turbo` - 高性能
  - `gpt-3.5-turbo` - 经济实惠
- **优势**: 全球最强AI，生态系统完善
- **适用场景**: 复杂推理、高质量内容生成、国际化项目

### 3. 🎯 Anthropic Claude
- **API 地址**: https://console.anthropic.com
- **可用模型**:
  - `claude-3-opus` - 最强推理能力
  - `claude-3-sonnet` - 平衡性能和速度
  - `claude-3-haiku` - 快速响应
- **优势**: 长文本处理优秀，安全性高
- **适用场景**: 长文档分析、深度内容创作、安全敏感场景

### 4. 🚀 智谱 AI (GLM)
- **API 地址**: https://open.bigmodel.cn
- **可用模型**:
  - `glm-4` - 旗舰模型
  - `glm-4-plus` - 增强版
  - `glm-4-flash` - 快速版
  - `glm-3-turbo` - 经济版
- **优势**: 中文能力强，国内访问快
- **适用场景**: 中文文档、国内项目、快速迭代

### 5. 🌙 月之暗面 Kimi
- **API 地址**: https://platform.moonshot.cn
- **可用模型**:
  - `moonshot-v1-8k` - 8K 上下文
  - `moonshot-v1-32k` - 32K 上下文
  - `moonshot-v1-128k` - 128K 超长上下文
- **优势**: 超长上下文，文档理解强
- **适用场景**: 长文档分析、论文阅读、代码库理解

### 6. 🔍 DeepSeek
- **API 地址**: https://platform.deepseek.com
- **可用模型**:
  - `deepseek-chat` - 对话模型
  - `deepseek-coder` - 代码专用
  - `deepseek-reasoner` - 推理模型
- **优势**: 代码能力强，性价比极高
- **适用场景**: 代码生成、技术文档、日常开发

### 7. 💎 通义千问 (Qwen)
- **API 地址**: https://dashscope.console.aliyun.com
- **可用模型**:
  - `qwen-max` - 最强模型
  - `qwen-plus` - 平衡版
  - `qwen-turbo` - 快速版
  - `qwen-coder` - 代码专用
- **优势**: 阿里云生态，多语言支持
- **适用场景**: 阿里云项目、多语言内容、企业应用

---

## 使用建议

### 场景推荐

#### 📝 技术文档生成
- **首选**: MiMo V2.5 或 DeepSeek（性价比高）
- **备选**: GPT-4o 或 Claude 3（质量最高）
- **中文文档**: 智谱 GLM-4 或 通义千问

#### 💻 代码生成与辅助
- **首选**: DeepSeek Coder（代码专用）
- **备选**: GPT-4o 或 Claude 3（理解力强）
- **快速迭代**: MiMo V2.5-Lite

#### 📚 教程内容创作
- **首选**: Claude 3 Sonnet（长文本优秀）
- **备选**: GPT-4o 或 Kimi（上下文长）
- **中文教程**: MiMo V2.5 或 智谱 GLM-4

#### 🔍 复杂推理任务
- **首选**: Claude 3 Opus 或 GPT-4o
- **备选**: DeepSeek Reasoner
- **性价比**: MiMo V2.5

#### 🌏 国际化项目
- **首选**: GPT-4o 或 Claude 3
- **多语言**: 通义千问 Qwen-Max

#### 🇨🇳 国内项目
- **首选**: MiMo V2.5 或 智谱 GLM-4
- **快速响应**: Kimi 或 DeepSeek

---

## 成本对比

### 价格参考（每百万 Token）

| 提供商 | 输入价格 | 输出价格 | 性价比 |
|--------|---------|---------|--------|
| MiMo V2.5 | ¥0.05 | ¥0.15 | ⭐⭐⭐⭐⭐ |
| DeepSeek | ¥0.10 | ¥0.20 | ⭐⭐⭐⭐⭐ |
| 智谱 GLM-4 | ¥0.10 | ¥0.30 | ⭐⭐⭐⭐ |
| Kimi | ¥0.15 | ¥0.30 | ⭐⭐⭐⭐ |
| 通义千问 | ¥0.20 | ¥0.40 | ⭐⭐⭐ |
| GPT-4o | ¥0.50 | ¥1.50 | ⭐⭐⭐ |
| Claude 3 | ¥0.75 | ¥2.25 | ⭐⭐ |

**建议**: 日常使用 MiMo 和 DeepSeek，复杂任务使用 GPT-4o 和 Claude 3。

---

## 快速切换

### 在应用中使用
1. 在左侧配置面板选择 AI 提供商
2. 选择具体模型
3. 输入对应的 API Key
4. 开始对话

### 切换场景示例

**场景1: 日常开发**
- 提供商: MiMo 或 DeepSeek
- 模型: mimo-v2.5 或 deepseek-chat
- 理由: 性价比高，响应快

**场景2: 重要文档**
- 提供商: OpenAI 或 Anthropic
- 模型: gpt-4o 或 claude-3-sonnet
- 理由: 输出质量最高

**场景3: 长文档分析**
- 提供商: 月之暗面
- 模型: moonshot-v1-128k
- 理由: 128K 超长上下文

**场景4: 代码生成**
- 提供商: DeepSeek
- 模型: deepseek-coder
- 理由: 代码专用模型

---

## API Key 获取指南

### 小米 MiMo
1. 访问 https://mimo-api.xiaomimimo.com
2. 注册账号
3. 进入控制台
4. 创建 API Key
5. 申请百万亿 Token 计划: https://100t.xiaomimimo.com/

### OpenAI
1. 访问 https://platform.openai.com
2. 注册账号（需海外手机号或邮箱）
3. 充值（需海外信用卡）
4. 创建 API Key

### Anthropic Claude
1. 访问 https://console.anthropic.com
2. 注册账号
3. 充值
4. 创建 API Key

### 智谱 AI
1. 访问 https://open.bigmodel.cn
2. 注册账号（支持手机号）
3. 实名认证
4. 创建 API Key

### 月之暗面 Kimi
1. 访问 https://platform.moonshot.cn
2. 注册账号
3. 创建 API Key

### DeepSeek
1. 访问 https://platform.deepseek.com
2. 注册账号
3. 创建 API Key

### 通义千问
1. 访问 https://dashscope.console.aliyun.com
2. 使用阿里云账号登录
3. 开通服务
4. 创建 API Key

---

## 最佳实践

### 1. 多模型对比
对同一任务使用不同模型生成，对比质量：
- 先用 MiMo/DeepSeek 快速生成初稿
- 再用 GPT-4o/Claude 优化关键部分
- 最后人工审核定稿

### 2. 成本控制
- 日常开发使用 MiMo 或 DeepSeek
- 重要任务使用 GPT-4o 或 Claude
- 定期查看各提供商用量和费用

### 3. 性能优化
- 简单任务使用轻量模型（更快、更便宜）
- 复杂任务使用旗舰模型（质量更高）
- 合理设置 temperature 和 max_tokens

### 4. 数据安全
- 所有 API Key 仅在本地使用
- 不会上传到任何服务器
- 定期轮换 API Key
- 不要将 API Key 提交到代码仓库

---

## 常见问题

### Q: 如何选择最适合的模型？
A: 根据任务类型、预算和质量要求选择。日常开发推荐 MiMo 或 DeepSeek，重要任务推荐 GPT-4o 或 Claude 3。

### Q: 可以同时使用多个提供商吗？
A: 可以！应用支持随时切换不同提供商和模型，对比输出质量。

### Q: API Key 安全吗？
A: 完全安全。所有 API Key 仅在浏览器本地使用，不会上传到任何服务器。

### Q: 哪个模型中文能力最强？
A: MiMo V2.5、智谱 GLM-4、通义千问的中文能力都很优秀，可以根据价格和需求选择。

### Q: 如何降低使用成本？
A: 
1. 日常使用性价比高的模型（MiMo、DeepSeek）
2. 合理设置 max_tokens，避免浪费
3. 优化提示词，减少无效调用
4. 申请各提供商的免费额度或激励计划

---

## 总结

本应用不依赖单一AI模型，而是提供多种选择：
- ✅ **7种主流提供商**灵活切换
- ✅ **20+个模型**覆盖不同场景
- ✅ **统一接口**，使用体验一致
- ✅ **成本可控**，按需选择
- ✅ **质量保障**，对比输出结果

根据你的需求，选择最合适的 AI 模型！🚀
