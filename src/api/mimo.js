import axios from 'axios'

/**
 * 调用 MiMo API
 * @param {string} apiKey - MiMo API Key
 * @param {string} prompt - 用户输入的提示词
 * @param {Object} options - 可选配置
 * @returns {Promise<string>} AI 生成的内容
 */
export async function callMiMoAPI(apiKey, prompt, options = {}) {
  const {
    model = 'mimo-v2.5',
    temperature = 0.7,
    maxTokens = 4000,
    history = []
  } = options

  try {
    const messages = [
      {
        role: 'system',
        content: '你是一个专业的AI助手，擅长文档生成、代码编写和技术解答。请用中文回答，提供详细、准确、有用的信息。'
      },
      ...history,
      {
        role: 'user',
        content: prompt
      }
    ]
    const response = await axios.post(
      'https://api.mimo.xiaomimimo.com/v1/chat/completions',
      {
        model: model,
        messages: messages,
        temperature: temperature,
        max_tokens: maxTokens,
        stream: false
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 60000
      }
    )

    // 解析响应
    if (response.data && response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content
    } else {
      throw new Error('API 响应格式异常')
    }
  } catch (error) {
    // 错误处理
    if (error.response) {
      const status = error.response.status
      const data = error.response.data
      
      switch (status) {
        case 401:
          throw new Error('API Key 无效或已过期，请检查后重试')
        case 403:
          throw new Error('权限不足，请确认账户状态')
        case 429:
          throw new Error('请求过于频繁，请稍后重试')
        case 500:
          throw new Error('服务器错误，请稍后重试')
        default:
          throw new Error(data?.error?.message || `请求失败 (${status})`)
      }
    } else if (error.request) {
      throw new Error('网络错误，请检查网络连接')
    } else {
      throw new Error(error.message || '未知错误')
    }
  }
}

/**
 * 流式调用 MiMo API（支持实时输出）
 * @param {string} apiKey - MiMo API Key
 * @param {string} prompt - 用户输入的提示词
 * @param {Function} onChunk - 接收到数据块时的回调
 * @param {Object} options - 可选配置
 */
export async function callMiMoAPIStream(apiKey, prompt, onChunk, options = {}) {
  const {
    model = 'mimo-v2.5',
    temperature = 0.7,
    maxTokens = 4000
  } = options

  try {
    const response = await fetch('https://api.mimo.xiaomimimo.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: '你是一个专业的AI助手，擅长文档生成、代码编写和技术解答。请用中文回答，提供详细、准确、有用的信息。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: temperature,
        max_tokens: maxTokens,
        stream: true
      })
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
        break
      }

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          if (data === '[DONE]') {
            return
          }
          
          try {
            const parsed = JSON.parse(data)
            const content = parsed.choices?.[0]?.delta?.content || ''
            if (content) {
              onChunk(content)
            }
          } catch (e) {
            // 忽略解析错误
          }
        }
      }
    }
  } catch (error) {
    throw new Error(`流式请求失败: ${error.message}`)
  }
}

/**
 * 验证 API Key 是否有效
 * @param {string} apiKey - MiMo API Key
 * @returns {Promise<boolean>} 是否有效
 */
export async function validateApiKey(apiKey) {
  try {
    await callMiMoAPI(apiKey, '测试连接', { maxTokens: 10 })
    return true
  } catch (error) {
    return false
  }
}
