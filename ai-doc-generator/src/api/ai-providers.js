import axios from 'axios'

// 支持的模型提供商配置
export const PROVIDERS = {
  mimo: {
    name: '小米 MiMo',
    apiUrl: 'https://api.mimo.xiaomimimo.com/v1/chat/completions',
    models: ['mimo-v2.5', 'mimo-v2.5-lite', 'mimo-vision'],
    icon: '🤖'
  },
  openai: {
    name: 'OpenAI',
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    icon: '🧠'
  },
  anthropic: {
    name: 'Anthropic Claude',
    apiUrl: 'https://api.anthropic.com/v1/messages',
    models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
    icon: '🎯'
  },
  zhipu: {
    name: '智谱 AI',
    apiUrl: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    models: ['glm-4', 'glm-4-plus', 'glm-4-flash', 'glm-3-turbo'],
    icon: '🚀'
  },
  moonshot: {
    name: '月之暗面 Kimi',
    apiUrl: 'https://api.moonshot.cn/v1/chat/completions',
    models: ['moonshot-v1-8k', 'moonshot-v1-32k', 'moonshot-v1-128k'],
    icon: '🌙'
  },
  deepseek: {
    name: 'DeepSeek',
    apiUrl: 'https://api.deepseek.com/chat/completions',
    models: ['deepseek-chat', 'deepseek-coder', 'deepseek-reasoner'],
    icon: '🔍'
  },
  qwen: {
    name: '阿里云 通义千问',
    apiUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
    models: ['qwen-max', 'qwen-plus', 'qwen-turbo', 'qwen-coder'],
    icon: '💎'
  }
}

/**
 * 通用 AI API 调用函数
 * @param {Object} config - 调用配置
 * @param {string} config.provider - 提供商名称 (mimo|openai|anthropic|zhipu|moonshot|deepseek|qwen)
 * @param {string} config.apiKey - API Key
 * @param {string} config.model - 模型名称
 * @param {string} config.prompt - 用户输入
 * @param {Array} config.history - 对话历史
 * @param {Object} config.options - 其他选项
 * @returns {Promise<string>} AI 生成的内容
 */
export async function callAIProvider(config) {
  const {
    provider = 'mimo',
    apiKey,
    model,
    prompt,
    history = [],
    options = {}
  } = config

  const {
    temperature = 0.7,
    maxTokens = 4000,
    systemPrompt = '你是一个专业的AI助手，擅长文档生成、代码编写和技术解答。请用中文回答，提供详细、准确、有用的信息。'
  } = options

  const providerConfig = PROVIDERS[provider]
  if (!providerConfig) {
    throw new Error(`不支持的提供商: ${provider}`)
  }

  try {
    // 根据不同提供商构建不同的请求格式
    let requestData, headers

    if (provider === 'anthropic') {
      // Anthropic Claude API 格式
      requestData = {
        model: model || providerConfig.models[0],
        max_tokens: maxTokens,
        temperature: temperature,
        system: systemPrompt,
        messages: [
          ...history,
          { role: 'user', content: prompt }
        ]
      }
      headers = {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      }
    } else {
      // OpenAI 兼容格式 (MiMo, OpenAI, 智谱, Moonshot, DeepSeek, Qwen)
      requestData = {
        model: model || providerConfig.models[0],
        messages: [
          { role: 'system', content: systemPrompt },
          ...history,
          { role: 'user', content: prompt }
        ],
        temperature: temperature,
        max_tokens: maxTokens,
        stream: false
      }
      headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
      
      // 特殊处理某些提供商
      if (provider === 'qwen') {
        // 通义千问可能需要额外的 header
        headers['X-DashScope-SSE'] = 'disable'
      }
    }

    const response = await axios.post(providerConfig.apiUrl, requestData, {
      headers,
      timeout: 60000
    })

    // 解析响应
    if (provider === 'anthropic') {
      // Claude 响应格式
      if (response.data && response.data.content && response.data.content.length > 0) {
        return response.data.content[0].text
      }
    } else {
      // OpenAI 兼容格式
      if (response.data && response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].message.content
      }
    }

    throw new Error('API 响应格式异常')
  } catch (error) {
    // 错误处理
    if (error.response) {
      const status = error.response.status
      const data = error.response.data
      
      let errorMessage = `请求失败 (${status})`
      
      switch (status) {
        case 401:
          errorMessage = 'API Key 无效或已过期，请检查后重试'
          break
        case 403:
          errorMessage = '权限不足，请确认账户状态'
          break
        case 404:
          errorMessage = 'API 端点不存在，请检查配置'
          break
        case 429:
          errorMessage = '请求过于频繁，请稍后重试'
          break
        case 500:
          errorMessage = '服务器错误，请稍后重试'
          break
        default:
          errorMessage = data?.error?.message || data?.message || errorMessage
      }
      
      throw new Error(`[${providerConfig.name}] ${errorMessage}`)
    } else if (error.request) {
      throw new Error(`网络错误，请检查网络连接`)
    } else {
      throw new Error(error.message || '未知错误')
    }
  }
}

/**
 * 流式调用 AI API
 * @param {Object} config - 调用配置
 * @param {Function} config.onChunk - 接收到数据块时的回调
 * @param {Function} config.onComplete - 完成时的回调
 * @param {Function} config.onError - 错误时的回调
 */
export async function callAIProviderStream(config) {
  const {
    provider = 'mimo',
    apiKey,
    model,
    prompt,
    history = [],
    options = {},
    onChunk,
    onComplete,
    onError
  } = config

  const {
    temperature = 0.7,
    maxTokens = 4000,
    systemPrompt = '你是一个专业的AI助手。'
  } = options

  const providerConfig = PROVIDERS[provider]

  try {
    let requestData, headers

    if (provider === 'anthropic') {
      requestData = {
        model: model || providerConfig.models[0],
        max_tokens: maxTokens,
        temperature: temperature,
        system: systemPrompt,
        messages: [
          ...history,
          { role: 'user', content: prompt }
        ],
        stream: true
      }
      headers = {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      }
    } else {
      requestData = {
        model: model || providerConfig.models[0],
        messages: [
          { role: 'system', content: systemPrompt },
          ...history,
          { role: 'user', content: prompt }
        ],
        temperature: temperature,
        max_tokens: maxTokens,
        stream: true
      }
      headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(providerConfig.apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestData)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      
      if (done) {
        if (onComplete) onComplete()
        break
      }

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          if (data === '[DONE]') {
            if (onComplete) onComplete()
            return
          }
          
          try {
            const parsed = JSON.parse(data)
            let content = ''
            
            if (provider === 'anthropic') {
              content = parsed.delta?.text || ''
            } else {
              content = parsed.choices?.[0]?.delta?.content || ''
            }
            
            if (content && onChunk) {
              onChunk(content)
            }
          } catch (e) {
            // 忽略解析错误
          }
        }
      }
    }
  } catch (error) {
    if (onError) {
      onError(error)
    } else {
      throw error
    }
  }
}

/**
 * 验证 API Key 是否有效
 * @param {string} provider - 提供商
 * @param {string} apiKey - API Key
 * @returns {Promise<boolean>} 是否有效
 */
export async function validateApiKey(provider, apiKey) {
  try {
    await callAIProvider({
      provider,
      apiKey,
      prompt: '测试连接',
      options: { maxTokens: 10 }
    })
    return true
  } catch (error) {
    return false
  }
}

/**
 * 获取提供商的模型列表
 * @param {string} provider - 提供商
 * @returns {Array} 模型列表
 */
export function getModelsForProvider(provider) {
  const config = PROVIDERS[provider]
  if (!config) return []
  return config.models.map(model => ({
    value: model,
    label: model
  }))
}
