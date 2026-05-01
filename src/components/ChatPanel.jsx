import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import { callAIProvider } from '../api/ai-providers'
import 'highlight.js/styles/atom-one-dark.css'

function ChatPanel({ apiKey, selectedTemplate, provider, model }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSend = async () => {
    if (!input.trim()) return
    if (!apiKey) {
      setError('请先输入 API Key')
      return
    }

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setError('')

    try {
      const history = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
      
      const response = await callAIProvider({
        provider,
        apiKey,
        model,
        prompt: input,
        history
      })
      const assistantMessage = { role: 'assistant', content: response }
      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      setError(err.message || '请求失败，请检查 API Key 和网络')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleExport = () => {
    if (messages.length === 0) {
      setError('没有可导出的内容')
      return
    }
    
    const content = messages.map(msg => {
      const role = msg.role === 'user' ? '用户' : 'AI助手'
      return `## ${role}\n\n${msg.content}\n\n---\n\n`
    }).join('')
    
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-doc-${new Date().getTime()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    setMessages([])
    setError('')
  }

  return (
    <div className="output-panel">
      <h2>💬 对话与输出</h2>
      
      <div className="output-content">
        {messages.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            color: 'var(--text-secondary)', 
            padding: '120px 20px',
            position: 'relative'
          }}>
            <div style={{ 
              fontSize: '80px', 
              marginBottom: '30px',
              animation: 'pulse 2s ease-in-out infinite'
            }}>🤖</div>
            <h3 style={{ 
              marginBottom: '16px',
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '2em',
              color: 'var(--accent-cyan)',
              letterSpacing: '2px'
            }}>欢迎使用 AI 文档生成器</h3>
            <p style={{ 
              fontSize: '1.2em',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.8'
            }}>
              在左侧配置面板选择 AI 提供商和模板<br/>
              开始您的创作之旅
            </p>
            <style>{`
              @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.8; }
              }
            `}</style>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} style={{ 
            marginBottom: '25px',
            animation: 'slideIn 0.4s ease-out',
            animationDelay: `${index * 0.05}s`
          }}>
            <style>{`
              @keyframes slideIn {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
            <div style={{ 
              fontWeight: '700', 
              marginBottom: '12px',
              color: msg.role === 'user' ? 'var(--accent-cyan)' : 'var(--accent-magenta)',
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.95em',
              letterSpacing: '1.5px',
              textTransform: 'uppercase'
            }}>
              {msg.role === 'user' ? '👤 你' : '🤖 AI 助手'}
            </div>
            <div style={{ 
              background: msg.role === 'user' 
                ? 'rgba(0, 245, 255, 0.05)' 
                : 'rgba(255, 0, 255, 0.05)',
              padding: '20px',
              borderRadius: '12px',
              lineHeight: '1.8',
              border: msg.role === 'user'
                ? '1px solid rgba(0, 245, 255, 0.2)'
                : '1px solid rgba(255, 0, 255, 0.2)'
            }}>
              {msg.role === 'assistant' ? (
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{msg.content}</ReactMarkdown>
              ) : (
                <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <span>AI 正在思考中...</span>
          </div>
        )}

        {error && (
          <div className="error-message">
            <strong>❌ 错误：</strong>{error}
          </div>
        )}
      </div>

      <div style={{ marginTop: '25px', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="输入消息... (Shift+Enter 换行，Enter 发送)"
          style={{
            flex: 1,
            padding: '16px',
            border: '2px solid var(--text-muted)',
            borderRadius: '12px',
            fontSize: '15px',
            fontFamily: 'Rajdhani, sans-serif',
            resize: 'none',
            minHeight: '70px',
            background: 'rgba(30, 39, 70, 0.6)',
            color: 'var(--text-primary)',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--accent-cyan)';
            e.target.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.3)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--text-muted)';
            e.target.style.boxShadow = 'none';
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="btn btn-primary"
          style={{ 
            minWidth: '140px',
            height: '70px'
          }}
        >
          {loading ? '发送中...' : '发送 🚀'}
        </button>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
        <button
          onClick={handleClear}
          className="btn"
          style={{ 
            width: 'auto', 
            padding: '14px 28px',
            background: 'rgba(229, 62, 62, 0.2)',
            color: '#ff4444',
            border: '1px solid rgba(229, 62, 62, 0.4)',
            fontSize: '14px'
          }}
        >
          清空 🗑️
        </button>
        <button
          onClick={handleExport}
          disabled={messages.length === 0}
          className="btn"
          style={{ 
            width: 'auto', 
            padding: '14px 28px',
            background: 'rgba(0, 255, 136, 0.2)',
            color: 'var(--accent-green)',
            border: '1px solid rgba(0, 255, 136, 0.4)',
            fontSize: '14px'
          }}
        >
          导出 📄
        </button>
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '16px', 
        background: 'rgba(255, 191, 0, 0.1)',
        border: '1px solid rgba(255, 191, 0, 0.3)',
        borderRadius: '10px',
        fontSize: '14px',
        color: '#ffbf00',
        fontWeight: '600'
      }}>
        <strong>⌨️ 快捷键：</strong> Enter 发送 | Shift+Enter 换行 | 支持多轮对话
      </div>
    </div>
  )
}

export default ChatPanel
