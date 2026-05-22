import Anthropic from '@anthropic-ai/sdk'

function hasRealApiKey() {
  const key = process.env.ANTHROPIC_API_KEY
  return key && key !== 'your_anthropic_api_key' && key.startsWith('sk-')
}

export async function generate(prompt: string, maxTokens = 2048): Promise<string> {
  if (!hasRealApiKey()) throw new Error('NO_API_KEY')
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const res = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: maxTokens,
    messages: [{ role: 'user', content: prompt }],
  })
  return res.content[0].type === 'text' ? res.content[0].text : ''
}

export async function generateWithImage(
  prompt: string,
  imageBase64: string,
  mediaType: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif'
): Promise<string> {
  if (!hasRealApiKey()) throw new Error('NO_API_KEY')
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const res = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data: imageBase64 } },
          { type: 'text', text: prompt },
        ],
      },
    ],
  })
  return res.content[0].type === 'text' ? res.content[0].text : ''
}

export { hasRealApiKey }
