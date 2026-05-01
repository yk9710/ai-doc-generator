import { useState } from 'react'
import ChatPanel from './components/ChatPanel'
import ConfigPanel from './components/ConfigPanel'
import './index.css'

function App() {
  const [apiKey, setApiKey] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [provider, setProvider] = useState('mimo')
  const [model, setModel] = useState('mimo-v2.5')

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🚀 AI 文档生成器</h1>
        <p>多模型AI应用平台 - 支持 MiMo, OpenAI, Claude, 智谱, Kimi, DeepSeek, Qwen</p>
      </header>

      <div className="main-content">
        <ConfigPanel 
          apiKey={apiKey} 
          setApiKey={setApiKey}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          provider={provider}
          setProvider={setProvider}
          model={model}
          setModel={setModel}
        />
        <ChatPanel apiKey={apiKey} selectedTemplate={selectedTemplate} provider={provider} model={model} />
      </div>
    </div>
  )
}

export default App
