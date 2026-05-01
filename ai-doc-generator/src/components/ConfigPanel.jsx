import { useState } from 'react'
import { PROVIDERS, getModelsForProvider } from '../api/ai-providers'

const templates = [
  { id: 'doc', name: '📝 技术文档', prompt: '请帮我生成一份关于{topic}的技术文档，包括概述、架构设计、API接口、使用示例等章节。' },
  { id: 'code', name: '💻 代码生成', prompt: '请帮我编写{topic}的代码实现，要求代码规范、有注释、包含错误处理。' },
  { id: 'api', name: '🔌 API文档', prompt: '请为{topic}生成详细的API文档，包括请求参数、响应格式、示例代码。' },
  { id: 'tutorial', name: '📚 教程指南', prompt: '请创建一份关于{topic}的完整教程，从入门到进阶，包含实践案例。' },
  { id: 'review', name: '🔍 代码审查', prompt: '请审查以下代码并提供优化建议：\n\n{code}' },
  { id: 'custom', name: '✨ 自定义', prompt: '' }
]

function ConfigPanel({ apiKey, setApiKey, selectedTemplate, setSelectedTemplate, provider, setProvider, model, setModel }) {
  const [topic, setTopic] = useState('')
  const [customPrompt, setCustomPrompt] = useState('')

  const models = getModelsForProvider(provider)

  // 当提供商变化时自动选择第一个模型
  const handleProviderChange = (newProvider) => {
    setProvider(newProvider)
    const models = getModelsForProvider(newProvider)
    if (models.length > 0) {
      setModel(models[0].value)
    }
  }

  const getPrompt = () => {
    const template = templates.find(t => t.id === selectedTemplate)
    if (!template) return ''
    if (template.id === 'custom') return customPrompt
    return template.prompt.replace('{topic}', topic).replace('{code}', topic)
  }

  return (
    <div className="config-panel">
      <h2>⚙️ 配置面板</h2>
      
      <div className="form-group">
        <label>选择 AI 提供商</label>
        <select
          value={provider}
          onChange={(e) => handleProviderChange(e.target.value)}
          style={{ marginBottom: '10px' }}
        >
          {Object.entries(PROVIDERS).map(([key, config]) => (
            <option key={key} value={key}>
              {config.icon} {config.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>选择模型</label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          {models.map(m => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>API Key</label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder={`输入 ${PROVIDERS[provider].name} API Key`}
        />
      </div>

      <div className="form-group">
        <label>选择模板</label>
        <div className="templates-grid">
          {templates.map(template => (
            <button
              key={template.id}
              className={`template-btn ${selectedTemplate === template.id ? 'active' : ''}`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              {template.name}
            </button>
          ))}
        </div>
      </div>

      {selectedTemplate && selectedTemplate !== 'custom' && (
        <div className="form-group">
          <label>主题 / 内容</label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="输入文档主题或代码内容..."
          />
        </div>
      )}

      {selectedTemplate === 'custom' && (
        <div className="form-group">
          <label>自定义提示词</label>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="输入你的自定义提示词..."
            style={{ minHeight: '200px' }}
          />
        </div>
      )}

      <div className="form-group">
        <label>生成的提示词预览</label>
        <div style={{ 
          background: 'rgba(10, 14, 39, 0.6)', 
          padding: '16px', 
          borderRadius: '10px',
          fontSize: '14px',
          maxHeight: '180px',
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          fontFamily: 'JetBrains Mono, monospace',
          lineHeight: '1.6',
          color: 'var(--accent-cyan)',
          border: '1px solid rgba(0, 245, 255, 0.2)'
        }}>
          {getPrompt() || '请选择模板并输入内容...'}
        </div>
      </div>

      <div style={{ 
        background: 'rgba(0, 255, 136, 0.05)', 
        padding: '16px', 
        borderRadius: '10px',
        marginTop: '25px',
        fontSize: '14px',
        border: '1px solid rgba(0, 255, 136, 0.2)'
      }}>
        <strong style={{ color: 'var(--accent-green)' }}>💡 提示：</strong>
        <ul style={{ marginLeft: '20px', marginTop: '10px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          <li>支持 7 种 AI 提供商，灵活切换</li>
          <li>每个提供商有多个模型可选</li>
          <li>所有 API Key 仅在本地使用，不会上传</li>
          <li>使用模板快速开始，或自定义提示词</li>
        </ul>
      </div>
    </div>
  )
}

export default ConfigPanel
