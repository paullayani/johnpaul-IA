import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function generate(prompt: string, maxTokens = 2048): Promise<string> {
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
